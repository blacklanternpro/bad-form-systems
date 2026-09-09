import type { Metadata } from "next";
import { ImsRoute, captureFromSearchParams } from "@/components/lab/ims/ImsRoute";

export const metadata: Metadata = {
  title: "IMS desk · daylight",
  description: "Theoretical office IMS, daylight paint. Lab only.",
  robots: { index: false, follow: false },
};

export default async function DeskDayPage({
  searchParams,
}: {
  searchParams: Promise<{ capture?: string | string[] }>;
}) {
  const capture = await captureFromSearchParams(searchParams);
  return <ImsRoute paint="day" device="desk" capture={capture} />;
}
