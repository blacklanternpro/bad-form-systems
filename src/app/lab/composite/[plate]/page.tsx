import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StillComposite } from "@/components/lab/composite/StillComposite";
import { stillPlates, stillSlugs, type StillSlug } from "@/content/stills";
import "@/styles/ims.css";
import "../composite.css";

export const metadata: Metadata = {
  title: "Still composite",
  description: "Live IMS mapped into the photographed glass. Lab only.",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return stillSlugs.map((plate) => ({ plate }));
}

function isStillSlug(value: string): value is StillSlug {
  return (stillSlugs as readonly string[]).includes(value);
}

export default async function CompositePage({
  params,
  searchParams,
}: {
  params: Promise<{ plate: string }>;
  searchParams: Promise<{ capture?: string | string[]; debug?: string | string[] }>;
}) {
  const { plate } = await params;
  if (!isStillSlug(plate)) notFound();

  const query = await searchParams;
  const readFlag = (value: string | string[] | undefined) =>
    (Array.isArray(value) ? value[0] : value) === "1";

  const capture = readFlag(query.capture);
  const debug = readFlag(query.debug);
  const still = stillPlates[plate];

  if (capture) {
    return (
      <div data-still-capture-page="" className="still-capture-page">
        <StillComposite still={still} debug={debug} />
      </div>
    );
  }

  return (
    <section className="composite-lab bg-brand-black">
      <div className="mx-auto max-w-6xl px-4">
        <p className="type-docket text-sm text-brand-steel">
          Lab only. {still.stage.width} by {still.stage.height}, writes {still.output}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {stillSlugs.map((slug) => (
            <Link key={slug} href={`/lab/composite/${slug}`} className="btn-text text-sm">
              {slug}
            </Link>
          ))}
          <Link href={`/lab/composite/${plate}?debug=1`} className="btn-text text-sm">
            Debug quad
          </Link>
          <Link href={`/lab/composite/${plate}?capture=1`} className="btn-text text-sm">
            Capture frame
          </Link>
        </div>
      </div>
      <div className="composite-lab-stage">
        <StillComposite still={still} debug={debug} />
      </div>
    </section>
  );
}
