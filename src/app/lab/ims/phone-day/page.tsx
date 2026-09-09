import type { Metadata } from "next";
import { ImsRoute, captureFromSearchParams } from "@/components/lab/ims/ImsRoute";

export const metadata: Metadata = {
  title: "IMS phone · daylight",
  description: "Theoretical field IMS, daylight paint. Lab only.",
  robots: { index: false, follow: false },
};

export default async function PhoneDayPage({
  searchParams,
}: {
  searchParams: Promise<{ capture?: string | string[] }>;
}) {
  const capture = await captureFromSearchParams(searchParams);
  return <ImsRoute paint="day" device="phone" capture={capture} />;
}
