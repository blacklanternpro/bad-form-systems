import type { Metadata } from "next";
import { MockHero, MockSwitcher } from "@/components/lab/ParkingLotMocks";

export const metadata: Metadata = {
  title: "Hero mocks",
  description: "Draft parking-lot hero stills. Not the live homepage.",
  robots: { index: false, follow: false },
};

export default function HeroMocksPage() {
  return (
    <>
      <MockSwitcher current="both" />
      <MockHero
        label="Yard · type as stamp"
        imageSrc="/images/mock-yard-bleed.webp"
        imageAlt="Dirty hand holding a phone open on Kemerton pad, in a sunlit civil yard."
        objectPosition="object-[70%_center]"
        tone="dust"
      />
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
