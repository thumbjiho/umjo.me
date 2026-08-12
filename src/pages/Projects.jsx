import ItemList from "../components/ItemList";

const projectItems = [
  { date: "2025 –", title: "프로젝트 알파 — 짧은 설명", href: "#" },
  { date: "2024 –", title: "프로젝트 베타 — 또 다른 설명", href: "#" },
  { date: "2023", title: "프로젝트 감마 — 또 하나의 설명", href: "#" },
];

export default function Projects() {
  return <><h1 className="font-serif text-[1.75rem] font-normal mb-8">프로젝트</h1><ItemList items={projectItems} /></>;
}
