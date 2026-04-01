const footerLinks = [
  { href: "https://github.com/thumbjiho", label: "GitHub" },
  { href: "https://x.com/umgiorgio", label: "X (Twitter)" },
  { href: "https://youtube.com/@엄조조", label: "YouTube" },
  {
    href: "https://www.linkedin.com/in/jiho-um-301a7b1b3/",
    label: "LinkedIn",
  },
  { href: "mailto:thumbjiho@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-rule flex gap-5 flex-wrap">
      {footerLinks.map(({ href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.85rem] text-fg-dim no-underline transition-colors duration-200 hover:text-fg"
        >
          {label}
        </a>
      ))}
    </footer>
  );
}
