import ItemList from "../components/ItemList";

const writingItems = [
  { date: "2026년 3월", title: "첫 번째 블로그 글", href: "/writing/first-post" },
  { date: "2026년 2월", title: "오래가는 것을 만드는 일", href: "/writing/on-building" },
  { date: "2026년 1월", title: "안녕, 세상아", href: "/writing/hello-world" },
];

export default function Writing() {
  return <><h1 className="font-serif text-[1.75rem] font-normal mb-8">글쓰기</h1><ItemList items={writingItems} /></>;
}
