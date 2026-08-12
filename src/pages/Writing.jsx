import ItemList from "../components/ItemList";

const writingItems = [
  { date: "2026년 8월", title: "마크다운 렌더링 벤치마크", href: "/writing/markdown-benchmark" },
  { date: "2026년 3월", title: "첫 번째 블로그 글", href: "/writing/first-post" },
  { date: "2026년 2월", title: "오래가는 것을 만드는 일", href: "/writing/on-building" },
  { date: "2026년 1월", title: "안녕, 세상아", href: "/writing/hello-world" },
];

export default function Writing() {
  return <><h1 className="font-serif text-[1.75rem] font-bold mb-8">블로그</h1><ItemList items={writingItems} /></>;
}
