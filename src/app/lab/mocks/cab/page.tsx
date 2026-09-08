import type { Metadata } from "next";
import { MockHero, MockSwitcher } from "@/components/lab/ParkingLotMocks";

export const metadata: Metadata = {
  title: "Mock · passenger seat",
  description: "Draft overhead ute-cab hero. Not the live homepage.",
  robots: { index: false, follow: false },
};

export default function CabMockPage() {
  return (
    <>
      <MockSwitcher current="cab" />
      <MockHero
        label="Cab · paper and glass"
        imageSrc="/images/mock-cab-overhead.webp"
        imageAlt="Overhead ute cab: phone on the knee showing Kemerton pad, paper docket on the other thigh."
        objectPosition="object-center"
        tone="cab"
      />
    </>
  );
}
