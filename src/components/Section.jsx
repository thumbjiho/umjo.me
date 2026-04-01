export default function Section({ title, children }) {
  return (
    <section className="mb-14">
      <h2 className="font-sans text-[0.8rem] font-medium uppercase tracking-[0.08em] text-fg-dim mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}
