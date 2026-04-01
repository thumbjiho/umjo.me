import ItemList from "../components/ItemList";
import { useLang } from "../contexts/LangContext";

const projectItems = [
  { date: "2025 –", title: "Project Alpha — a short description", href: "#" },
  { date: "2024 –", title: "Project Beta — another short description", href: "#" },
  { date: "2023", title: "Project Gamma — yet another one", href: "#" },
];

export default function Projects() {
  const { t } = useLang();

  return (
    <>
      <h1 className="font-serif text-[1.75rem] font-normal mb-8">{t.projects}</h1>
      <ItemList items={projectItems} />
    </>
  );
}
