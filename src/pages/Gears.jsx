const gearSections = [
  {
    title: "컴퓨팅",
    groups: [
      { title: "데스크", items: [] },
      { title: "휴대용 기기", items: [] },
    ],
  },
  {
    title: "촬영 · 오디오",
    groups: [{ title: "카메라와 음향", items: [] }],
  },
  {
    title: "메이킹 · 취미",
    groups: [{ title: "도구와 장비", items: [] }],
  },
  {
    title: "소프트웨어",
    groups: [{ title: "자주 쓰는 앱", items: [] }],
  },
];

function GearGroup({ group }) {
  return (
    <div>
      <h3 className="mb-3 text-[0.9rem] font-medium text-fg">
        {group.title}
      </h3>
      {group.items.length > 0 ? (
        <ul className="space-y-3 text-[0.95rem] text-fg-dim">
          {group.items.map((item) => (
            <li key={item.name} className="pl-4 border-l border-rule">
              <div className="text-fg">{item.name}</div>
              {item.details?.length > 0 && (
                <ul className="mt-1 space-y-0.5 text-[0.88rem]">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[0.9rem] text-fg-dim">정리 중입니다.</p>
      )}
    </div>
  );
}

export default function Gears() {
  return (
    <>
      <div className="mb-12">
        <h1 className="font-serif text-[1.75rem] font-bold mb-3">장비</h1>
        <p className="text-fg-dim max-w-[55ch]">
          일과 취미에 사용하는 장비와 도구를 기록합니다.
        </p>
      </div>

      <div className="space-y-12">
        {gearSections.map((section) => (
          <section key={section.title}>
            <h2 className="pb-3 mb-6 font-serif text-[1.25rem] font-bold border-b border-rule">
              {section.title}
            </h2>
            <div className="grid grid-cols-2 gap-x-10 gap-y-8 max-sm:grid-cols-1">
              {section.groups.map((group) => (
                <GearGroup key={group.title} group={group} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
