import type { Metadata } from "next";
import { MockHero, MockSwitcher } from "@/components/lab/ParkingLotMocks";

export const metadata: Metadata = {
  title: "Mock · yard stamp",
  description: "Draft full-bleed yard hero with stamped type. Not the live homepage.",
  robots: { index: false, follow: false },
};

export default function YardMockPage() {
  return (
    <>
      <MockSwitcher current="yard" />
      <MockHero
        label="Yard · type as stamp"
        imageSrc="/images/mock-yard-bleed.webp"
        imageAlt="Dirty hand holding a phone open on Kemerton pad, in a sunlit civil yard."
        objectPosition="object-[70%_center]"
        tone="dust"
      />
    </>
  );
}
