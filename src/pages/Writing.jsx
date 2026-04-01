import ItemList from "../components/ItemList";
import { useLang } from "../contexts/LangContext";

const writingItems = [
  { date: "2026 Mar", title: "Your first blog post goes here", href: "/writing/first-post" },
  { date: "2026 Feb", title: "On building things that last", href: "/writing/on-building" },
  { date: "2026 Jan", title: "Hello, world", href: "/writing/hello-world" },
];

export default function Writing() {
  const { t } = useLang();

  return (
    <>
      <h1 className="font-serif text-[1.75rem] font-normal mb-8">{t.writing}</h1>
      <ItemList items={writingItems} />
    </>
  );
}
