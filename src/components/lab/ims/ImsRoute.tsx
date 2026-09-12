import Link from "next/link";
import { DeskIms } from "@/components/lab/ims/DeskIms";
import { PhoneIms } from "@/components/lab/ims/PhoneIms";
import {
  IMS_DESK,
  IMS_PHONE,
  imsBuildIds,
  imsCopy,
  imsFieldBuilds,
  imsHref,
  type ImsBuildId,
  type ImsFieldTabId,
  type ImsPaintId,
} from "@/content/ims";

/** Same split as LiveScreen: the board is the generic system. */
type ImsRouteProps =
  | {
      device: "phone";
      paint: ImsPaintId;
      build: ImsBuildId;
      capture: boolean;
      tab?: ImsFieldTabId;
      frame?: "device";
    }
  | { device: "desk"; paint: ImsPaintId; capture: boolean };

/** The board and the live phone are the unattributed system. */
const BOARD_BUILD: ImsBuildId = "generic";

type LabLink = { href: string; label: string };

export function ImsRoute(props: ImsRouteProps) {
  const { device, paint, capture } = props;
  const otherPaint: ImsPaintId = paint === "day" ? "dusk" : "day";
  const paintLabel = imsCopy.paints[paint].label;
  const otherPaintLabel = imsCopy.paints[otherPaint].label.toLowerCase();

  const screen =
    props.device === "phone" ? (
      <PhoneIms paint={paint} build={props.build} tab={props.tab} />
    ) : (
      <DeskIms paint={paint} />
    );

  if (capture) {
    const deviceFrame = props.device === "phone" && props.frame === "device";
    return (
      <div data-ims-capture-page="" className="ims-capture-page">
        {deviceFrame ? (
          <div className="ims-device" data-ims-device-frame="">
            <div className="ims-device-side ims-device-side-l" aria-hidden="true" />
            <div className="ims-device-side ims-device-side-r" aria-hidden="true" />
            <div className="ims-device-island" aria-hidden="true" />
            <div className="ims-device-glass">{screen}</div>
          </div>
        ) : (
          screen
        )}
      </div>
    );
  }

  const size = device === "phone" ? IMS_PHONE : IMS_DESK;
  const links: LabLink[] = [{ href: "/lab/ims", label: "All IMS screens" }];

  if (props.device === "phone") {
    const otherBuild = imsBuildIds[(imsBuildIds.indexOf(props.build) + 1) % imsBuildIds.length];
    links.push(
      { href: imsHref.desk(paint), label: `Board ${paintLabel.toLowerCase()}` },
      { href: imsHref.phone(props.build, otherPaint), label: `Phone ${otherPaintLabel}` },
      {
        href: imsHref.phone(otherBuild, paint),
        label: `${imsFieldBuilds[otherBuild].trade} build`,
      },
    );
  } else {
    links.push(
      { href: imsHref.phone(BOARD_BUILD, paint), label: `Phone ${paintLabel.toLowerCase()}` },
      { href: imsHref.desk(otherPaint), label: `Board ${otherPaintLabel}` },
    );
  }

  links.push({ href: "?capture=1", label: "Capture frame" });

  const trade = props.device === "phone" ? imsFieldBuilds[props.build].trade : "Office board";

  return (
    <section className="ims-lab-frame bg-brand-black">
      <div className="mx-auto max-w-6xl px-4">
        <p className="type-docket text-sm text-brand-steel">
          Lab only · {trade} · {paintLabel} · {size.width}×{size.height}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="btn-text text-sm">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="ims-lab-canvas">{screen}</div>
    </section>
  );
}

export async function captureFromSearchParams(
  searchParams: Promise<{ capture?: string | string[] }>,
): Promise<boolean> {
  const params = await searchParams;
  const value = Array.isArray(params.capture) ? params.capture[0] : params.capture;
  return value === "1";
}
