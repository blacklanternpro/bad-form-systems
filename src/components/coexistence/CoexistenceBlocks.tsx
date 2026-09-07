import { Check } from "@phosphor-icons/react/ssr";
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
                <li key={item} className="flex items-start gap-2 text-sm text-brand-ink">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-cobalt" aria-hidden />
                  <span>{item}</span>
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
    <div>
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
