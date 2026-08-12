import Section from "../components/Section";
import ItemList from "../components/ItemList";
import ProjectGrid from "../components/ProjectGrid";
import { projects } from "../data/projects";

const writingItems = [
  { date: "2026년 8월", title: "마크다운 렌더링 벤치마크", href: "/writing/markdown-benchmark" },
  { date: "2026년 3월", title: "[작성 중] 첫 번째 블로그 글", href: "/writing/first-post" },
  { date: "2026년 2월", title: "[작성 중] 두 번째 블로그 글", href: "/writing/on-building" },
  { date: "2026년 1월", title: "[작성 중] 안녕, 세상아", href: "/writing/hello-world" },
];

export default function Home() {
  const theoriLink = (
    <a href="https://theori.io/ko" target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:decoration-fg">
      티오리
    </a>
  );

  return (
    <>
      <div className="mb-16">
        <h1 className="font-serif text-[2rem] font-bold leading-[1.35] mb-5 tracking-tight max-sm:text-[1.6rem]">
          안녕하세요, 엄지호입니다.
        </h1>
        <p className="text-base text-fg-dim max-w-[52ch]">
          서울 강남의 {theoriLink}에서 프로덕트 디자이너로 일하고 있습니다.
          <br />
          영상 제작, 팟캐스팅, 3D 프린팅, 도구, 잡상식, SF 소설, 보드게임, 운동, 그리고 애플과 관련된 것들을 좋아합니다.
        </p>
      </div>
      <Section title="블로그"><ItemList items={writingItems} /></Section>
      <Section title="프로젝트"><ProjectGrid projects={projects} /></Section>
    </>
  );
}
