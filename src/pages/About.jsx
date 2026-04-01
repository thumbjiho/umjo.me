import { useLang } from "../contexts/LangContext";

export default function About() {
  const { t } = useLang();

  return (
    <>
      <h1 className="font-serif text-[1.75rem] font-normal mb-8">{t.aboutTitle}</h1>

      <div className="[&_p]:mb-5 [&_p]:text-fg-dim [&_p]:max-w-[55ch] [&_a]:text-fg [&_a]:decoration-rule [&_a]:underline-offset-[3px] [&_a]:underline hover:[&_a]:decoration-fg">
        <p>{t.aboutP1}</p>
        <p>{t.aboutP2}</p>
        <p>{t.aboutP3}</p>
        <p>
          {t.aboutContact}
          <a href="mailto:thumbjiho@gmail.com" target="_blank" rel="noopener noreferrer">thumbjiho@gmail.com</a>.
        </p>
      </div>
    </>
  );
}
