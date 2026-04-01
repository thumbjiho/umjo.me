import { Link } from "react-router-dom";

export default function ItemList({ items }) {
  return (
    <div>
      {items.map(({ date, title, href }, i) => {
        const className = `flex items-baseline gap-4 py-2 border-b border-rule no-underline text-fg transition-opacity duration-200 hover:opacity-60 max-sm:flex-col max-sm:gap-0.5 ${
          i === 0 ? "border-t" : ""
        }`;

        if (href.startsWith("http") || href === "#") {
          return (
            <a key={href + i} href={href} target="_blank" rel="noopener noreferrer" className={className}>
              <span className="text-[0.82rem] text-fg-dim whitespace-nowrap min-w-[5.5rem] tabular-nums max-sm:min-w-0">
                {date}
              </span>
              <span className="text-[0.95rem]">{title}</span>
            </a>
          );
        }

        return (
          <Link key={href + i} to={href} className={className}>
            <span className="text-[0.82rem] text-fg-dim whitespace-nowrap min-w-[5.5rem] tabular-nums max-sm:min-w-0">
              {date}
            </span>
            <span className="text-[0.95rem]">{title}</span>
          </Link>
        );
      })}
    </div>
  );
}
