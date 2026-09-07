import Link from "next/link";
import { Check } from "@phosphor-icons/react/ssr";
import { pricing } from "@/content/pricing";
import { primaryCta } from "@/content/nav";

export function PricingGrid() {
  return (
    <div>
      <p className="type-meta mb-8">{pricing.disclaimer}</p>
      <div className="divide-y divide-brand-border border-y border-brand-border">
        {pricing.tiers.map((tier) => (
          <article key={tier.title} className="grid gap-6 py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <h2 className="type-title text-2xl text-brand-ink">{tier.title}</h2>
              <p className="type-meta mt-1">{tier.timing}</p>
              <p className="type-body mt-4 text-brand-steel">{tier.blurb}</p>
              <p className="type-data mt-5 text-xl text-brand-ink">{tier.price}</p>
            </div>
            <ul className="space-y-2.5">
              {tier.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brand-ink">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-cobalt" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-10">
        <Link href={primaryCta.href} className="btn-primary">
          {primaryCta.label}
        </Link>
      </div>
    </div>
  );
}
