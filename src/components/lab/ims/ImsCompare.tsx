import Link from "next/link";
import { overview } from "@/content/overview";
import { IMS_DESK, IMS_PHONE, imsCopy } from "@/content/ims";

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
  objectPositionClass: string;
  label: string;
}

function CropStill({ src, alt, objectPositionClass, label }: CropStillProps) {
  return (
    <figure className="border border-brand-ink/20">
      <div className="relative h-56 overflow-hidden bg-brand-ink sm:h-72 lg:h-[22rem]">
        {/* eslint-disable-next-line @next/next/no-img-element -- still plates; avoid next/image re-encode */}
        <img
          src={src}
          alt={alt}
          width={1536}
          height={1024}
          className={`absolute inset-0 h-full w-full object-cover ${objectPositionClass}`}
        />
      </div>
      <figcaption className="type-docket border-t border-brand-ink/15 px-3 py-2 text-xs text-brand-steel">
        {label}
      </figcaption>
    </figure>
  );
}

export function ImsCompare() {
  const htmlScreens = [
    {
      title: "Phone · daylight",
      href: imsCopy.paints.day.href.phone,
      capture: `${imsCopy.paints.day.href.phone}?capture=1`,
      width: IMS_PHONE.width,
      height: IMS_PHONE.height,
      scale: 0.52,
    },
    {
      title: "Phone · dusk",
      href: imsCopy.paints.dusk.href.phone,
      capture: `${imsCopy.paints.dusk.href.phone}?capture=1`,
      width: IMS_PHONE.width,
      height: IMS_PHONE.height,
      scale: 0.52,
    },
    {
      title: "Desk · daylight",
      href: imsCopy.paints.day.href.desk,
      capture: `${imsCopy.paints.day.href.desk}?capture=1`,
      width: IMS_DESK.width,
      height: IMS_DESK.height,
      scale: 0.28,
    },
    {
      title: "Desk · dusk",
      href: imsCopy.paints.dusk.href.desk,
      capture: `${imsCopy.paints.dusk.href.desk}?capture=1`,
      width: IMS_DESK.width,
      height: IMS_DESK.height,
      scale: 0.28,
    },
  ];

  const stills = [
    {
      src: imsCopy.stills.cabDay,
      label: "Cab · daylight native still",
      objectPositionClass: imsCopy.stills.cabObjectPositionClass,
      alt: "Native cab still with daylight IMS in the phone glass.",
    },
    {
      src: imsCopy.stills.cabDusk,
      label: "Cab · dusk native still",
      objectPositionClass: imsCopy.stills.cabObjectPositionClass,
      alt: "Native cab still with dusk IMS in the phone glass.",
    },
    {
      src: imsCopy.stills.officeDay,
      label: "Office · daylight native still",
      objectPositionClass: imsCopy.stills.officeObjectPositionClass,
      alt: "Native office still with daylight IMS in the laptop glass.",
    },
    {
      src: imsCopy.stills.officeDusk,
      label: "Office · dusk native still",
      objectPositionClass: imsCopy.stills.officeObjectPositionClass,
      alt: "Native office still with dusk IMS in the laptop glass.",
    },
  ];

  return (
    <div className="space-y-14">
      <section>
        <h2 className="type-title mb-3 text-2xl">HTML screens</h2>
        <p className="type-body mb-8 text-brand-steel">
          Review at device size on the linked routes. Capture frames are 390×844 and 1440×900.
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
                src={screen.capture}
                width={screen.width}
                height={screen.height}
                scale={screen.scale}
              />
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="type-title mb-3 text-2xl">Native stills</h2>
        <p className="type-body mb-8 text-brand-steel">
          Whole-frame reshoots, not a warp onto the old overlay plates. Large type in the glass,
          cropped for the homepage still frame. Live homepage files stay on rollback until a pair is
          chosen. Default look after review: dusk in the cab, daylight in the office.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {stills.map((still) => (
            <CropStill key={still.src} {...still} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="type-title mb-3 text-2xl">Rollback plates</h2>
        <p className="type-body mb-8 text-brand-steel">
          Current homepage plates, copied before the native reshoot. Homepage still points at these
          pixels.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <CropStill
            src={imsCopy.stills.cabRollback}
            alt={overview.cabStill.alt}
            objectPositionClass={overview.cabStill.objectPositionClass}
            label="Cab rollback"
          />
          <CropStill
            src={imsCopy.stills.officeRollback}
            alt={overview.officeStill.alt}
            objectPositionClass={overview.officeStill.objectPositionClass}
            label="Office rollback"
          />
        </div>
      </section>
    </div>
  );
}
