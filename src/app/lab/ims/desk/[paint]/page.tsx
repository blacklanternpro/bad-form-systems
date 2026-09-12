import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImsRoute, captureFromSearchParams } from "@/components/lab/ims/ImsRoute";
import { imsCopy, type ImsPaintId } from "@/content/ims";

const paintIds = ["day", "dusk"] as const;

export function generateStaticParams() {
  return paintIds.map((paint) => ({ paint }));
}

function isPaint(value: string): value is ImsPaintId {
  return (paintIds as readonly string[]).includes(value);
}

type DeskParams = { params: Promise<{ paint: string }> };

export async function generateMetadata({ params }: DeskParams): Promise<Metadata> {
  const { paint } = await params;
  if (!isPaint(paint)) return { robots: { index: false, follow: false } };

  return {
    title: `IMS board · ${paint}`,
    description: `Theoretical office IMS, ${imsCopy.paints[paint].label.toLowerCase()}. Lab only.`,
    robots: { index: false, follow: false },
  };
}

export default async function DeskPaintPage({
  params,
  searchParams,
}: DeskParams & { searchParams: Promise<{ capture?: string | string[] }> }) {
  const { paint } = await params;
  if (!isPaint(paint)) notFound();

  const capture = await captureFromSearchParams(searchParams);
  return <ImsRoute device="desk" paint={paint} capture={capture} />;
}
