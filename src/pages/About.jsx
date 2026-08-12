export default function About() {
  return (
    <>
      <h1 className="font-serif text-[1.75rem] font-bold mb-8">소개</h1>
      <div className="[&_p]:mb-5 [&_p]:text-fg-dim [&_p]:max-w-[55ch] [&_p]:leading-[1.75] [&_a]:text-fg [&_a]:decoration-rule [&_a]:underline-offset-[3px] [&_a]:underline hover:[&_a]:decoration-fg">
        <p>
          안녕하세요. 서울에서 프로덕트 디자이너로 일하는 엄지호입니다.
          사람들이 복잡한 기술을 자연스럽게 이해하고 사용할 수 있도록
          제품의 구조와 경험을 설계합니다.
        </p>
        <p>
          연세대학교에서 나노과학공학과 인터랙션 디자인을 공부했고, 현재는
          티오리에서 제품을 만들고 있습니다. 화면 안의 경험뿐 아니라 영상,
          팟캐스트, 3D 프린팅처럼 아이디어가 실제 형태가 되는 과정에도
          관심이 많습니다.
        </p>
        <p>
          이곳에는 작업한 프로젝트와 사용 중인 도구, 배우고 생각한 것들을
          기록합니다. 완성된 결과만 보여주기보다 만들면서 발견한 과정도
          천천히 남겨보려 합니다.
        </p>
        <p>
          궁금한 점이나 함께 나누고 싶은 이야기가 있다면{" "}
          <a href="mailto:thumbjiho@gmail.com">thumbjiho@gmail.com</a>으로
          연락해 주세요.
        </p>
      </div>
    </>
  );
}
