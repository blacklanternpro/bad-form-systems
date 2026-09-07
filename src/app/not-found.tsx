import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60dvh] items-center justify-center bg-brand-black px-4 py-20">
      <div className="max-w-lg">
        <h1 className="type-display mb-4 text-3xl text-brand-ink">Page not found</h1>
        <p className="type-body mb-8 text-brand-steel">
          That URL is not part of the BAD FORM Systems site.
        </p>
        <Link href="/" className="btn-primary">
          Back to overview
        </Link>
      </div>
    </section>
  );
}
