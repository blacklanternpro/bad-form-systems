import { coexistence } from "@/content/coexistence";

export function Layers() {
  return (
    <div className="mb-16 divide-y divide-brand-border border-y border-brand-border">
      {coexistence.layers.map((layer) => (
        <article key={layer.title} className="grid gap-6 py-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)]">
          <div>
            <p className="type-meta mb-2">{layer.owner}</p>
            <h2 className="type-title text-2xl text-brand-ink">{layer.title}</h2>
            <p className="type-data mt-2 text-sm text-brand-cobalt">{layer.stack}</p>
          </div>
          <div>
            <p className="type-body mb-6 text-brand-steel">{layer.body}</p>
            <ul className="space-y-2.5">
              {layer.items.map((item) => (
                <li key={item} className="border-l-2 border-brand-ply pl-3 text-sm text-brand-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export function DayLoop() {
  return (
    <div className="mb-16">
      <h2 className="type-title mb-8 text-2xl text-brand-ink sm:text-3xl">{coexistence.loopTitle}</h2>
      <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {coexistence.loop.map((step) => (
          <li key={step.time} className="border-t border-brand-border pt-5">
            <p className="type-data text-sm text-brand-cobalt">{step.time}</p>
            <p className="type-meta mt-1">{step.place}</p>
            <p className="mt-4 font-medium text-brand-ink">{step.lead}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-steel">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function GrowStops() {
  return (
    <div>
      <h2 className="type-title mb-2 text-2xl text-brand-ink sm:text-3xl">{coexistence.growTitle}</h2>
      <ol className="max-w-3xl list-decimal pl-6 marker:font-[family-name:var(--font-docket)] marker:text-brand-steel">
        {coexistence.grow.map((stop) => (
          <li key={stop.title} className="border-b border-brand-ply py-6 pl-2 last:border-b-0 last:pb-0">
            <h3 className="type-hero mb-3 text-[1.15rem] text-brand-ink md:text-[1.25rem]">{stop.title}</h3>
            <p className="type-docket max-w-[48ch] text-[0.95rem] leading-relaxed text-brand-ink">{stop.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
