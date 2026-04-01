import { Link } from "react-router-dom";
import { useLang } from "../../contexts/LangContext";

export default function HelloWorld() {
  const { t } = useLang();

  return (
    <>
      <div className="mb-10">
        <h1 className="font-serif text-[1.75rem] font-normal mb-2 leading-[1.3]">
          {t.helloWorldTitle}
        </h1>
        <span className="text-[0.85rem] text-fg-dim">{t.helloWorldDate}</span>
      </div>

      <div className="[&_p]:mb-5 [&_p]:text-fg [&_p]:leading-[1.75] [&_a]:text-fg [&_a]:decoration-rule [&_a]:underline-offset-[3px] [&_a]:underline hover:[&_a]:decoration-fg [&_h2]:font-serif [&_h2]:text-[1.25rem] [&_h2]:font-medium [&_h2]:mt-10 [&_h2]:mb-4 [&_blockquote]:border-l-2 [&_blockquote]:border-rule [&_blockquote]:pl-5 [&_blockquote]:my-6 [&_blockquote]:text-fg-dim [&_blockquote]:italic [&_code]:text-[0.9em] [&_code]:bg-rule [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded">
        <p>{t.helloWorldP1}</p>
        <p>{t.helloWorldP2(<code>umjo.me</code>)}</p>

        <h2>{t.whySelfHost}</h2>

        <p>{t.helloWorldP3}</p>

        <blockquote>{t.helloWorldQuote}</blockquote>

        <p>{t.helloWorldP4}</p>
      </div>

      <Link
        to="/writing"
        className="inline-block mt-12 text-[0.9rem] text-fg-dim no-underline transition-colors duration-200 hover:text-fg"
      >
        {t.allWriting}
      </Link>
    </>
  );
}
