import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImsRoute, captureFromSearchParams } from "@/components/lab/ims/ImsRoute";
import {
  imsBuildIds,
  imsCopy,
  imsFieldBuilds,
  type ImsBuildId,
  type ImsPaintId,
} from "@/content/ims";

const paintIds = ["day", "dusk"] as const;

export function generateStaticParams() {
  return imsBuildIds.flatMap((build) => paintIds.map((paint) => ({ build, paint })));
}

function isBuild(value: string): value is ImsBuildId {
  return (imsBuildIds as readonly string[]).includes(value);
}

function isPaint(value: string): value is ImsPaintId {
  return (paintIds as readonly string[]).includes(value);
}

type PhoneParams = { params: Promise<{ build: string; paint: string }> };

export async function generateMetadata({ params }: PhoneParams): Promise<Metadata> {
  const { build, paint } = await params;
  if (!isBuild(build) || !isPaint(paint)) return { robots: { index: false, follow: false } };

  const trade = imsFieldBuilds[build].trade;
  return {
    title: `IMS phone · ${build} · ${paint}`,
    description: `Theoretical field IMS for a ${trade.toLowerCase()} yard, ${imsCopy.paints[paint].label.toLowerCase()}. Lab only.`,
    robots: { index: false, follow: false },
  };
}

export default async function PhoneBuildPage({
  params,
  searchParams,
}: PhoneParams & { searchParams: Promise<{ capture?: string | string[] }> }) {
  const { build, paint } = await params;
  if (!isBuild(build) || !isPaint(paint)) notFound();

  const capture = await captureFromSearchParams(searchParams);
  return <ImsRoute device="phone" build={build} paint={paint} capture={capture} />;
}
