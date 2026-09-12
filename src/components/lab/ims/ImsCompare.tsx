import Link from "next/link";
import { IMS_DESK, IMS_PHONE, imsBuildIds, imsCopy, imsFieldBuilds, imsHref } from "@/content/ims";
import { stillPlates, stillSlugs } from "@/content/stills";

interface ImsIframeProps {
  title: string;
  src: string;
  width: number;
  height: number;
  scale: number;
}

function ImsIframe({ title, src, width, height, scale }: ImsIframeProps) {
  return (
    <div
      className="relative overflow-hidden border border-brand-ink/20 bg-brand-ink"
      style={{ width: width * scale, height: height * scale }}
    >
      <iframe
        title={title}
        src={src}
        width={width}
        height={height}
        className="origin-top-left border-0"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
}

interface CropStillProps {
  src: string;
  alt: string;
  label: string;
}

function CropStill({ src, alt, label }: CropStillProps) {
  return (
    <figure className="border border-brand-ink/20">
      <div className="relative h-56 overflow-hidden bg-brand-ink sm:h-72 lg:h-[22rem]">
        {/* eslint-disable-next-line @next/next/no-img-element -- composited stills; avoid next/image re-encode */}
        <img
          src={src}
          alt={alt}
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
      <figcaption className="type-docket border-t border-brand-ink/15 px-3 py-2 text-xs text-brand-steel">
        {label}
      </figcaption>
    </figure>
  );
}

export function ImsCompare() {
  const phoneScreens = imsBuildIds.flatMap((build) =>
    (["day", "dusk"] as const).map((paint) => ({
      title: `${imsFieldBuilds[build].trade}, ${imsCopy.paints[paint].label.toLowerCase()}`,
      href: imsHref.phone(build, paint),
      width: IMS_PHONE.width,
      height: IMS_PHONE.height,
      scale: 0.52,
    })),
  );

  const htmlScreens = [
    ...phoneScreens,
    {
      title: "Board, office light",
      href: imsHref.desk("day"),
      width: IMS_DESK.width,
      height: IMS_DESK.height,
      scale: 0.28,
    },
    {
      title: "Board, cab dark",
      href: imsHref.desk("dusk"),
      width: IMS_DESK.width,
      height: IMS_DESK.height,
      scale: 0.28,
    },
  ];

  return (
    <div className="space-y-14">
      <section>
        <h2 className="type-title mb-3 text-2xl">HTML screens</h2>
        <p className="type-body mb-8 text-brand-steel">
          Review at device size on the linked routes. Capture frames are {IMS_PHONE.width} by{" "}
          {IMS_PHONE.height} and {IMS_DESK.width} by {IMS_DESK.height}. The hero hand still keys
          the concreter field app into photographed glass. The cab still is a baked
          photograph of the ute, in that field-app language, not a CSS phone drop.
          The desk still warps the generic board in CSS.
        </p>
        <div className="grid gap-8 lg:grid-cols-2">
          {htmlScreens.map((screen) => (
            <article key={screen.href}>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h3 className="font-semibold tracking-tight">{screen.title}</h3>
                <Link href={screen.href} className="btn-text text-sm">
                  Open
                </Link>
              </div>
              <ImsIframe
                title={screen.title}
                src={`${screen.href}?capture=1`}
                width={screen.width}
                height={screen.height}
                scale={screen.scale}
              />
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="type-title mb-3 text-2xl">Composited stills</h2>
        <p className="type-body mb-8 text-brand-steel">
          The live homepage stills. The hand still is keyed by{" "}
          <code className="type-data text-[0.85rem]">npm run stills</code>. The cab still
          is a baked photograph of the ute; the field app is native in the glass. The desk
          still is the board warped in CSS. Open a plate to inspect the file that ships.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {stillSlugs.map((slug) => {
            const plate = stillPlates[slug];
            return (
              <article key={slug}>
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold tracking-tight">{plate.output}</h3>
                  <Link href={`/lab/composite/${slug}`} className="btn-text text-sm">
                    Open
                  </Link>
                </div>
                <CropStill
                  src={`/images/${plate.output}`}
                  alt={plate.alt}
                  label={plate.note}
                />
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
