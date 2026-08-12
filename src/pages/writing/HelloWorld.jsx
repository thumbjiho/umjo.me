import { Link } from "react-router-dom";

export default function HelloWorld() {
  return (
    <>
      <div className="mb-10">
        <h1 className="font-serif text-[1.75rem] font-normal mb-2 leading-[1.3]">안녕, 세상아</h1>
        <span className="text-[0.85rem] text-fg-dim">2026년 1월</span>
      </div>
      <div className="[&_p]:mb-5 [&_p]:text-fg [&_p]:leading-[1.75] [&_a]:text-fg [&_a]:decoration-rule [&_a]:underline-offset-[3px] [&_a]:underline hover:[&_a]:decoration-fg [&_h2]:font-serif [&_h2]:text-[1.25rem] [&_h2]:font-medium [&_h2]:mt-10 [&_h2]:mb-4 [&_blockquote]:border-l-2 [&_blockquote]:border-rule [&_blockquote]:pl-5 [&_blockquote]:my-6 [&_blockquote]:text-fg-dim [&_blockquote]:italic [&_code]:text-[0.9em] [&_code]:bg-rule [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded">
        <p>이 사이트의 첫 번째 글입니다. 오래전부터 글을 쓰고 싶었는데, 이제 간단한 공간을 만들었으니 더 이상 핑계가 없습니다.</p>
        <p>이 사이트는 순수 HTML로, 집에 있는 Mac Mini에서 호스팅하고, git으로 관리하며, <code>umjo.me</code>을 가리키고 있습니다. 빌드 단계도, 프레임워크도, CDN도 없습니다. 제가 소유한 기계 위의 파일들일 뿐입니다.</p>
        <h2>왜 셀프 호스팅인가?</h2>
        <p>전체 스택이 자신의 것이라는 데서 오는 만족감이 있습니다. 도메인, 서버, 마크업. 저장하고 푸시하면 바로 라이브 — 배포 파이프라인도, 벤더 종속도, 전기세 외의 월 비용도 없습니다.</p>
        <blockquote>글쓰기를 시작하기 가장 좋은 때는 몇 년 전이었고, 두 번째로 좋은 때는 바로 지금입니다.</blockquote>
        <p>더 많은 글이 올 예정입니다. 읽어주셔서 감사합니다.</p>
      </div>
      <Link to="/writing" className="inline-block mt-12 text-[0.9rem] text-fg-dim no-underline transition-colors duration-200 hover:text-fg">← 모든 글</Link>
    </>
  );
}
