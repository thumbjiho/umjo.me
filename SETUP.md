# umjo.me — Self-Hosting Setup Guide

Your site is plain static HTML. No build step, no framework. Here's how to get it live on your Mac Mini at `umjo.me`.

---

## 1. Git Setup

On your Mac Mini:

```bash
# Create a bare repo (this is what you push to)
mkdir -p ~/repos/umjo.me.git
cd ~/repos/umjo.me.git
git init --bare

# Create the live site directory
mkdir -p ~/sites/umjo.me
```

Set up a **post-receive hook** so pushing automatically deploys:

```bash
cat > ~/repos/umjo.me.git/hooks/post-receive << 'EOF'
#!/bin/bash
GIT_WORK_TREE=$HOME/sites/umjo.me git checkout -f
echo "Deployed to ~/sites/umjo.me at $(date)"
EOF

chmod +x ~/repos/umjo.me.git/hooks/post-receive
```

On your **local machine** (laptop, wherever you edit):

```bash
# Initialize the site folder as a git repo
cd /path/to/your/site
git init
git add .
git commit -m "initial commit"

# Add your Mac Mini as a remote
# Replace <mac-mini-ip> with the local IP or hostname
git remote add mini ssh://your-user@<mac-mini-ip>/~/repos/umjo.me.git

# Push to deploy
git push mini main
```

Now every `git push mini main` deploys instantly.

> **Tip**: You can also add GitHub/GitLab as a second remote for backup:
> ```bash
> git remote add origin git@github.com:yourname/umjo.me.git
> git push origin main  # backup
> git push mini main    # deploy
> ```

---

## 2. Web Server (Caddy)

Caddy is the easiest option — it handles HTTPS automatically via Let's Encrypt.

```bash
# Install Caddy on Mac Mini
brew install caddy
```

Create a Caddyfile:

```bash
cat > ~/Caddyfile << 'EOF'
umjo.me {
    root * /Users/YOUR_USERNAME/sites/umjo.me
    file_server
    try_files {path} {path}/index.html
    encode gzip

    header {
        X-Frame-Options "DENY"
        X-Content-Type-Options "nosniff"
    }
}
EOF
```

Replace `YOUR_USERNAME` with your macOS username.

Start Caddy:

```bash
# Run in foreground first to test
caddy run --config ~/Caddyfile

# Once it works, run as a background service
brew services start caddy
```

Caddy will automatically obtain and renew an SSL certificate for `umjo.me`.

---

## 3. Domain DNS (umjo.me)

You need to point `umjo.me` to your Mac Mini's public IP.

### Find your public IP:
```bash
curl ifconfig.me
```

### At your domain registrar, set these DNS records:

| Type | Name | Value            | TTL  |
|------|------|------------------|------|
| A    | @    | YOUR_PUBLIC_IP   | 300  |
| A    | www  | YOUR_PUBLIC_IP   | 300  |

If you want `www.umjo.me` to redirect to `umjo.me`, update your Caddyfile:

```
www.umjo.me {
    redir https://umjo.me{uri} permanent
}
```

---

## 4. Router / Network Setup

On your home router:

1. **Port forward** ports `80` and `443` to your Mac Mini's local IP
2. Optionally set a **static local IP** for the Mac Mini (e.g., `192.168.1.100`) so the port forwarding doesn't break

### If your ISP gives you a dynamic public IP:

Use a free Dynamic DNS service, or just set up a cron job to check and update:

```bash
# Check IP every 5 minutes, notify you if it changes
crontab -e
# Add:
*/5 * * * * curl -s ifconfig.me > /tmp/current_ip && diff -q /tmp/current_ip /tmp/last_ip || (cp /tmp/current_ip /tmp/last_ip && echo "IP changed to $(cat /tmp/current_ip)" | mail -s "IP changed" you@email.com)
```

Or use Cloudflare as your DNS provider — they have an API you can script against to auto-update A records. There are many open-source "Cloudflare DDNS" scripts for this.

---

## 5. Keep Caddy Running After Reboot

The `brew services start caddy` command should handle this, but verify:

```bash
# Check it's registered as a launch daemon
brew services list | grep caddy
```

If you prefer manual control:

```bash
# Create a launchd plist
cat > ~/Library/LaunchAgents/com.caddy.web.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.caddy.web</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/caddy</string>
        <string>run</string>
        <string>--config</string>
        <string>/Users/YOUR_USERNAME/Caddyfile</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
EOF

launchctl load ~/Library/LaunchAgents/com.caddy.web.plist
```

---

## File Structure

```
~/sites/umjo.me/
├── index.html              ← Homepage
├── about/
│   └── index.html          ← /about
├── writing/
│   ├── index.html          ← /writing (listing)
│   └── hello-world/
│       └── index.html      ← /writing/hello-world (post)
├── projects/
│   └── index.html          ← /projects
└── feed.xml                ← RSS (add later)
```

### Adding a new blog post:

1. Create `writing/my-new-post/index.html` (copy hello-world as a template)
2. Add a link to it in `writing/index.html` and `index.html`
3. `git add . && git commit -m "new post" && git push mini main`

That's it. Live in seconds.

---

## Quick Reference

| Task                    | Command                              |
|-------------------------|--------------------------------------|
| Deploy                  | `git push mini main`                 |
| Backup to GitHub        | `git push origin main`               |
| Check site status       | `curl -I https://umjo.me`            |
| Restart Caddy           | `brew services restart caddy`        |
| Check Caddy logs        | `caddy log --config ~/Caddyfile`     |
| Check public IP         | `curl ifconfig.me`                   |
