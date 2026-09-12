import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImsRoute } from "@/components/lab/ims/ImsRoute";
import {
  imsBuildIds,
  imsCopy,
  imsFieldBuilds,
  type ImsBuildId,
  type ImsFieldTabId,
  type ImsPaintId,
} from "@/content/ims";

const paintIds = ["day", "dusk"] as const;
const tabIds = ["job", "capture", "hours", "more"] as const;

export function generateStaticParams() {
  return imsBuildIds.flatMap((build) => paintIds.map((paint) => ({ build, paint })));
}

function isBuild(value: string): value is ImsBuildId {
  return (imsBuildIds as readonly string[]).includes(value);
}

function isPaint(value: string): value is ImsPaintId {
  return (paintIds as readonly string[]).includes(value);
}

function isTab(value: string | undefined): value is ImsFieldTabId {
  return Boolean(value && (tabIds as readonly string[]).includes(value));
}

type PhoneParams = { params: Promise<{ build: string; paint: string }> };

export async function generateMetadata({ params }: PhoneParams): Promise<Metadata> {
  const { build, paint } = await params;
  if (!isBuild(build) || !isPaint(paint)) return { robots: { index: false, follow: false } };

  const trade = imsFieldBuilds[build].trade;
  return {
    title: `IMS phone · ${build} · ${paint}`,
    description: `Theoretical field IMS, ${trade.toLowerCase()}, ${imsCopy.paints[paint].label.toLowerCase()}. Lab only.`,
    robots: { index: false, follow: false },
  };
}

export default async function PhoneBuildPage({
  params,
  searchParams,
}: PhoneParams & {
  searchParams: Promise<{ capture?: string | string[]; view?: string | string[]; frame?: string | string[] }>;
}) {
  const { build, paint } = await params;
  if (!isBuild(build) || !isPaint(paint)) notFound();

  const query = await searchParams;
  const capture = (Array.isArray(query.capture) ? query.capture[0] : query.capture) === "1";
  const viewRaw = Array.isArray(query.view) ? query.view[0] : query.view;
  const tab = isTab(viewRaw) ? viewRaw : undefined;
  const frameRaw = Array.isArray(query.frame) ? query.frame[0] : query.frame;
  const frame = frameRaw === "device" ? "device" : undefined;

  return <ImsRoute device="phone" build={build} paint={paint} capture={capture} tab={tab} frame={frame} />;
}
