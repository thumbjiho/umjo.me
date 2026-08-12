const item = (title, rating = null, season = null, detail = null) => ({
  title,
  rating,
  season,
  detail,
});

const album = (title, artist, rating = null) => ({
  title,
  artist,
  rating,
  season: null,
});

export const mediaByYear = [
  {
    year: "2026",
    movies: [
      item("스파이더맨: 브랜드 뉴 데이", 4.0, null, "데스틴 대니얼 크레턴"),
      item("호프", 3.0, null, "나홍진"),
      item("고트: 더 레전드", 2.5, null, "타이리 딜리헤이 & 애덤 로제트"),
      item("토이 스토리 5", 4.0, null, "앤드루 스탠턴"),
      item("만달로리안과 그로구", 3.0, null, "존 패브로"),
      item("디스클로저 데이", 3.0, null, "스티븐 스필버그"),
      item("호퍼스", 2.5, null, "대니얼 총"),
      item("마이클", 3.5, null, "안톤 후쿠아"),
      item("프로젝트 헤일메리", 4.5, null, "필 로드 & 크리스토퍼 밀러"),
      item("너자 2", 4.0, null, "자오쯔"),
      item("오디세이", 4.5, null, "크리스토퍼 놀란"),
    ],
    dramas: [
      item("더 보이즈", 2.0, 5, "Prime Video"),
      item("릭 앤 모티", 4.0, 9, "Adult Swim"),
      item("하우스 오브 드래곤", 4.0, 3, "HBO Max"),
      item("만달로리안", 4.0, 1, "Disney+"),
      item("안도르", 3.5, 1, "Disney+"),
      item("안도르", 3.5, 2, "Disney+"),
    ],
    books: [],
    albums: [
      album("LOVE$ICK", "Kid Milli", 4.0),
      album("MAINSTREAM", "O KASHII GANG", 3.0),
      album("Pop Is Crying", "BewhY", 4.5),
      album("도모", "희대의", 4.0),
      album("2000 TAPE", "김하온 · 나우아임영 · JMIN", 2.5),
      album("halfblood (bloodluxe)", "slayr", 4.5),
    ],
    games: [item("마블 라이벌즈", 4.0, null, "NetEase Games")],
  },
  {
    year: "2025년 이전",
    movies: [],
    dramas: [],
    books: [],
    albums: [],
    games: [],
  },
];
