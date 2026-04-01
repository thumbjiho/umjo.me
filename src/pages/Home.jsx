import Section from "../components/Section";
import ItemList from "../components/ItemList";
import { useLang } from "../contexts/LangContext";

const writingItems = [
  { date: "2026 Mar", title: "[WIP] My first blog post will be here", href: "/writing/first-post" },
  { date: "2026 Feb", title: "[WIP] My second blog post will be here", href: "/writing/on-building" },
  { date: "2026 Jan", title: "[WIP] Hello, world", href: "/writing/hello-world" },
];

const projectItems = [
  { date: "2025 –", title: "Project Alpha — a short description", href: "#" },
  { date: "2024 –", title: "Project Beta — another short description", href: "#" },
  { date: "2023", title: "Project Gamma — yet another one", href: "#" },
];

export default function Home() {
  const { t } = useLang();

  const theoriLink = (
    <a
      href="https://theori.io/ko"
      target="_blank"
      rel="noopener noreferrer"
      className="text-fg underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:decoration-fg"
    >
      Theori
    </a>
  );

  return (
    <>
      <div className="mb-16">
        <h1 className="font-serif text-[2rem] font-normal leading-[1.35] mb-5 tracking-tight max-sm:text-[1.6rem]">
          {t.homeGreeting}
        </h1>
        <p className="text-base text-fg-dim max-w-[52ch]">
          {t.homeDesc(theoriLink)}
        </p>
      </div>

      <Section title={t.writing}>
        <ItemList items={writingItems} />
      </Section>

      <Section title={t.projects}>
        <ItemList items={projectItems} />
      </Section>
    </>
  );
}
