import type { Metadata } from "next";
import { ImsRoute, captureFromSearchParams } from "@/components/lab/ims/ImsRoute";

export const metadata: Metadata = {
  title: "IMS desk · dusk",
  description: "Theoretical office IMS, yard dusk paint. Lab only.",
  robots: { index: false, follow: false },
};

export default async function DeskDuskPage({
  searchParams,
}: {
  searchParams: Promise<{ capture?: string | string[] }>;
}) {
  const capture = await captureFromSearchParams(searchParams);
  return <ImsRoute paint="dusk" device="desk" capture={capture} />;
}
