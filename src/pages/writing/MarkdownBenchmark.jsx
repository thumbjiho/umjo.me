import PostLayout from "../../components/PostLayout";

export default function MarkdownBenchmark() {
  return (
    <PostLayout title="마크다운 렌더링 벤치마크" date="2026년 8월">
      <p className="lead">
        블로그에서 자주 사용하는 마크다운 요소가 화면 크기와 테마에 따라
        자연스럽게 보이는지 확인하기 위한 벤치마크 포스팅입니다.
      </p>

      <img
        src="/markdown-benchmark.svg"
        alt="마크다운 렌더링 벤치마크 표지"
      />
      <p className="caption">이미지와 캡션이 본문 폭 안에서 표시되는 예시입니다.</p>

      <h2>텍스트와 제목</h2>
      <p>
        문장 안에서 <strong>굵은 글씨</strong>, <em>기울임 글씨</em>, 그리고
        <del>취소선</del>을 함께 사용할 수 있습니다. <a href="https://commonmark.org/" target="_blank" rel="noopener noreferrer">외부 링크</a>는
        본문과 구분되면서도 지나치게 튀지 않아야 합니다.
      </p>
      <h3>세 번째 단계 제목</h3>
      <p>
        제목 단계가 깊어져도 본문의 흐름과 위계가 분명하게 보여야 합니다.
        긴 문장은 모바일 화면에서도 편안한 행간과 줄 길이를 유지합니다.
      </p>

      <hr />

      <h2>목록</h2>
      <ul>
        <li>순서가 없는 첫 번째 항목</li>
        <li>두 번째 항목
          <ul>
            <li>한 단계 안쪽의 중첩 목록</li>
            <li>또 하나의 세부 항목</li>
          </ul>
        </li>
      </ul>
      <ol>
        <li>문제 정의하기</li>
        <li>작은 단위로 구현하기</li>
        <li>화면에서 직접 확인하기</li>
      </ol>
      <ul className="task-list">
        <li><input type="checkbox" checked readOnly /> 완료된 작업</li>
        <li><input type="checkbox" readOnly /> 아직 남은 작업</li>
      </ul>

      <h2>인용과 코드</h2>
      <blockquote>
        좋은 글의 레이아웃은 내용을 장식하기보다 읽는 흐름을 방해하지 않는
        쪽에 가깝습니다.
      </blockquote>
      <p>
        짧은 코드는 문장 안에서 <code>npm run build</code>처럼 표시합니다.
      </p>
      <pre><code>{`function greet(name) {
  return \`안녕하세요, \${name}님.\`;
}

console.log(greet("엄지호"));`}</code></pre>

      <h2>표</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>요소</th><th>용도</th><th>상태</th></tr>
          </thead>
          <tbody>
            <tr><td>제목</td><td>문서의 위계 표현</td><td>완료</td></tr>
            <tr><td>이미지</td><td>시각 자료와 캡션</td><td>완료</td></tr>
            <tr><td>코드</td><td>명령어와 예제</td><td>완료</td></tr>
          </tbody>
        </table>
      </div>
    </PostLayout>
  );
}
