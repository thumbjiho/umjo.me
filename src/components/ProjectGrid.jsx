const tones = {
  green: "bg-[#dff3e5] dark:bg-[#243a2b]",
  blue: "bg-[#e1ebf7] dark:bg-[#24313f]",
  orange: "bg-[#f4e7d8] dark:bg-[#3e3025]",
};

function PlaceholderPreview({ tone }) {
  return (
    <div className={`aspect-[16/10] overflow-hidden rounded-md p-5 ${tones[tone]}`}>
      <div className="h-full overflow-hidden rounded-md border border-black/10 bg-white/80 shadow-sm dark:border-white/10 dark:bg-[#1b1b1b]/90">
        <div className="flex items-center gap-1.5 border-b border-black/10 px-3 py-2 dark:border-white/10">
          <span className="size-1.5 rounded-full bg-black/20 dark:bg-white/20" />
          <span className="size-1.5 rounded-full bg-black/20 dark:bg-white/20" />
          <span className="size-1.5 rounded-full bg-black/20 dark:bg-white/20" />
        </div>
        <div className="grid h-full grid-cols-[30%_1fr] gap-3 p-3">
          <div className="rounded-sm bg-black/[0.06] dark:bg-white/[0.07]" />
          <div className="space-y-2 pt-1">
            <div className="h-2 w-3/5 rounded-full bg-black/20 dark:bg-white/20" />
            <div className="h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10" />
            <div className="h-1.5 w-4/5 rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mt-4 h-8 rounded-sm bg-black/[0.06] dark:bg-white/[0.07]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MahjongPreview() {
  const tiles = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];

  return (
    <div className="flex aspect-[16/10] flex-col items-center justify-center overflow-hidden rounded-md border border-stone-200 bg-stone-50 px-4 shadow-sm">
      <p className="mb-5 text-[0.72rem] font-semibold text-stone-700">대기패 계산기</p>
      <div className="flex gap-1">
        {tiles.map((tile, index) => (
          <span
            key={tile}
            className={`flex h-9 w-6 items-center justify-center rounded-sm border bg-white text-[0.65rem] font-semibold shadow-sm ${
              index === 4
                ? "border-rose-300 text-rose-600"
                : "border-stone-200 text-stone-700"
            }`}
          >
            {tile}
          </span>
        ))}
      </div>
      <div className="mt-5 rounded-full bg-emerald-500 px-4 py-1.5 text-[0.58rem] font-medium text-white">
        대기패 계산하기
      </div>
    </div>
  );
}

function ProjectPreview({ project }) {
  if (project.image) {
    return (
      <div className="aspect-[16/10] overflow-hidden rounded-md border border-rule bg-black shadow-sm">
        <img
          src={project.image}
          alt={`${project.title} 미리보기`}
          className={`h-full w-full object-cover ${project.imagePosition || "object-center"}`}
        />
      </div>
    );
  }

  if (project.preview === "mahjong") {
    return <MahjongPreview />;
  }

  return <PlaceholderPreview tone={project.tone} />;
}

// 아웃링크 화살표: Lucide arrow-up-right(24 격자의 7–17, viewBox 5–19)를 글자의 절반 남짓 크기로,
// 대문자 높이 가운데에 맞춘다. 끝과 이음은 둥글게, 선은 약 1px (ccw.umjo.me 와 같은 모양)
function OutArrow() {
  return (
    <svg
      viewBox="5 5 14 14"
      aria-hidden="true"
      className="ml-[0.3em] inline-block h-[0.62em] w-[0.62em] align-[0.05em] text-fg-dim opacity-70 transition-opacity group-hover:opacity-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 max-sm:grid-cols-1">
      {projects.map((project) => (
        <a
          key={project.title}
          href={project.href || undefined}
          target={project.href ? "_blank" : undefined}
          rel={project.href ? "noopener noreferrer" : undefined}
          className={`group block no-underline ${project.href ? "cursor-pointer" : "cursor-default"}`}
        >
          <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
            <ProjectPreview project={project} />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[0.95rem] font-medium text-fg">
                {project.title}
                {project.href && <OutArrow />}
              </h3>
              <span className="shrink-0 text-[0.78rem] text-fg-dim tabular-nums">
                {project.date}
              </span>
            </div>
            <p className="mt-1 text-[0.85rem] leading-relaxed text-fg-dim">
              {project.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
