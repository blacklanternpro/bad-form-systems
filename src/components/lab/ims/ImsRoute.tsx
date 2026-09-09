import Link from "next/link";
import { DeskIms } from "@/components/lab/ims/DeskIms";
import { PhoneIms } from "@/components/lab/ims/PhoneIms";
import { imsCopy, type ImsPaintId } from "@/content/ims";

interface ImsRouteProps {
  paint: ImsPaintId;
  device: "phone" | "desk";
  capture: boolean;
}

export function ImsRoute({ paint, device, capture }: ImsRouteProps) {
  const screen = device === "phone" ? <PhoneIms paint={paint} /> : <DeskIms paint={paint} />;
  const paintLabel = imsCopy.paints[paint].label;
  const peerHref =
    device === "phone" ? imsCopy.paints[paint].href.desk : imsCopy.paints[paint].href.phone;
  const peerLabel = device === "phone" ? "Desk" : "Phone";
  const otherPaint: ImsPaintId = paint === "day" ? "dusk" : "day";
  const otherHref =
    device === "phone"
      ? imsCopy.paints[otherPaint].href.phone
      : imsCopy.paints[otherPaint].href.desk;

  if (capture) {
    return (
      <div data-ims-capture-page="" className="ims-capture-page">
        {screen}
      </div>
    );
  }

  return (
    <section className="ims-lab-frame bg-brand-black">
      <div className="mx-auto max-w-6xl px-4">
        <p className="type-docket text-sm text-brand-steel">
          Lab only · {paintLabel} · {device === "phone" ? "390×844" : "1440×900"}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/lab/ims" className="btn-text text-sm">
            All IMS screens
          </Link>
          <Link href={peerHref} className="btn-text text-sm">
            {peerLabel} {paintLabel.toLowerCase()}
          </Link>
          <Link href={otherHref} className="btn-text text-sm">
            {device} {imsCopy.paints[otherPaint].label.toLowerCase()}
          </Link>
          <Link href="?capture=1" className="btn-text text-sm">
            Capture frame
          </Link>
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
