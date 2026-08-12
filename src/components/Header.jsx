import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { to: "/writing", label: "블로그" },
    { to: "/projects", label: "프로젝트" },
    { to: "/gears", label: "장비" },
    { to: "/watching", label: "매체" },
    { to: "/about", label: "소개" },
  ];

  return (
    <nav className="flex items-center gap-6 mb-16 max-sm:mb-12">
      <Link
        to="/"
        style={{ fontFamily: '"Newsreader", Georgia, serif' }}
        className="text-[1.1rem] font-medium text-fg no-underline mr-auto"
      >
        umjo.me
      </Link>
      {navLinks.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={`text-[0.9rem] no-underline transition-colors duration-200 hover:text-fg ${
            pathname.startsWith(to) ? "text-fg" : "text-fg-dim"
          }`}
        >
          {label}
        </Link>
      ))}
      <button
        onClick={toggleTheme}
        aria-label="테마 전환"
        className="p-1.5 ml-2 text-fg-dim transition-colors duration-200 hover:text-fg cursor-pointer bg-transparent border-none"
      >
        {theme === "dark" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </nav>
  );
}
