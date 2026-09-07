export function PageIntro({
  title,
  body,
  compact = false,
}: {
  title: string;
  body: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-10" : "mb-14"}>
      <h1 className="type-display mb-5 text-[2rem] text-brand-ink sm:text-4xl lg:text-[2.75rem]">{title}</h1>
      <p className="type-body text-brand-steel">{body}</p>
    </div>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-brand-black py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
