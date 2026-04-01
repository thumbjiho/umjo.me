import { createContext, useContext, useState } from "react";

const LangContext = createContext();

const translations = {
  en: {
    writing: "Writing",
    projects: "Projects",
    about: "About",
    allWriting: "← All writing",
    homeGreeting: "Hello, I'm Jiho.",
    homeDesc: (theoriLink) => (
      <>
        I'm a product designer at {theoriLink} in korea.
        <br />I love video production, podcasting, and 3D printing,
        tools, general trivia, sci-fi novels, board games, working out
        and anything related to Apple.
      </>
    ),
    aboutTitle: "About",
    aboutP1: "Hi — I'm Jiho. I'm based in Seoul, South Korea.",
    aboutP2:
      "I'm interested in [your interests here]. I'm a product designer at Theori. I studied Nano Science Engineering & Interaction Design at Yonsei University.",
    aboutP3:
      "This site is still under construction. I'll be sharing projects, writing, and other work here over time. For now, consider this a placeholder — more to come soon.",
    aboutContact: "You can reach me at ",
    whySelfHost: "Why self-host?",
    helloWorldTitle: "Hello, world",
    helloWorldDate: "January 2026",
    helloWorldP1:
      "This is the first post on this site. I've been meaning to start writing for a while, and now that I've set up a simple place to publish, there are no more excuses.",
    helloWorldP2: (code) => (
      <>
        The site is plain HTML, hosted from a Mac Mini at home,
        managed with git, and pointed at {code}. No build step, no
        framework, no CDN. Just files on a machine I own.
      </>
    ),
    helloWorldP3:
      "There's something satisfying about the entire stack being yours. The domain, the server, the markup. When you hit save and push, it's live — no deploy pipeline, no vendor lock-in, no monthly bill beyond electricity.",
    helloWorldQuote:
      "The best time to start writing was years ago. The second best time is now.",
    helloWorldP4: "More to come. Thanks for reading.",
  },
  ko: {
    writing: "글쓰기",
    projects: "프로젝트",
    about: "소개",
    allWriting: "← 모든 글",
    homeGreeting: "안녕하세요, 엄지호입니다.",
    homeDesc: (theoriLink) => (
      <>
        서울 강남의 {theoriLink}에서 프로덕트 디자이너로 일하고
        있습니다.
        <br />
        영상 제작, 팟캐스팅, 3D 프린팅, 도구, 잡상식, SF 소설,
        보드게임, 운동, 그리고 애플(Apple)과 관련된 것들을 좋아합니다.
      </>
    ),
    aboutTitle: "소개",
    aboutP1: "안녕하세요 — 엄지호입니다.",
    aboutP2:
      "저는 [관심사]에 관심이 있습니다. 티오리에서 프로덕트 디자이너로 일하고 있으며, 연세대학교에서 나노과학공학과 인터랙션 디자인을 전공했습니다.",
    aboutP3:
      "이 사이트는 아직 공사 중입니다. 시간이 지나면 프로젝트, 글, 기타 작업물을 공유할 예정입니다. 지금은 준비 중이니 조금만 기다려 주세요.",
    aboutContact: "연락은 ",
    whySelfHost: "왜 셀프 호스팅인가?",
    helloWorldTitle: "안녕, 세상아",
    helloWorldDate: "2026년 1월",
    helloWorldP1:
      "이 사이트의 첫 번째 글입니다. 오래전부터 글을 쓰고 싶었는데, 이제 간단한 공간을 만들었으니 더 이상 핑계가 없습니다.",
    helloWorldP2: (code) => (
      <>
        이 사이트는 순수 HTML로, 집에 있는 Mac Mini에서 호스팅하고,
        git으로 관리하며, {code}을 가리키고 있습니다. 빌드 단계도,
        프레임워크도, CDN도 없습니다. 제가 소유한 기계 위의 파일들일
        뿐입니다.
      </>
    ),
    helloWorldP3:
      "전체 스택이 자신의 것이라는 데서 오는 만족감이 있습니다. 도메인, 서버, 마크업. 저장하고 푸시하면 바로 라이브 — 배포 파이프라인도, 벤더 종속도, 전기세 외의 월 비용도 없습니다.",
    helloWorldQuote:
      "글쓰기를 시작하기 가장 좋은 때는 몇 년 전이었고, 두 번째로 좋은 때는 바로 지금입니다.",
    helloWorldP4:
      "더 많은 글이 올 예정입니다. 읽어주셔서 감사합니다.",
  },
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("lang") || "en",
  );

  const toggleLang = () =>
    setLang((l) => {
      const next = l === "en" ? "ko" : "en";
      localStorage.setItem("lang", next);
      return next;
    });

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
