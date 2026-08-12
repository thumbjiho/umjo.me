import { Link } from "react-router-dom";

export default function PostLayout({ title, date, children }) {
  return (
    <article>
      <header className="mb-10">
        <h1 className="font-serif text-[1.75rem] font-bold mb-2 leading-[1.3]">
          {title}
        </h1>
        <time className="text-[0.85rem] text-fg-dim">{date}</time>
      </header>

      <div className="blog-content">
        {children}
      </div>

      <Link
        to="/writing"
        className="inline-block mt-12 text-[0.9rem] text-fg-dim no-underline transition-colors duration-200 hover:text-fg"
      >
        ← 블로그
      </Link>
    </article>
  );
}
