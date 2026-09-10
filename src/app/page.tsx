import { CustomBuild } from "@/components/overview/CustomBuild";
import { DocketSlice } from "@/components/overview/DocketSlice";
import { HeroOpen } from "@/components/overview/HeroOpen";
import { ProductBand } from "@/components/overview/ProductBand";
import { SystemMap } from "@/components/overview/SystemMap";
import { TuesdayTwice } from "@/components/overview/TuesdayTwice";
import { VisitClose } from "@/components/overview/VisitClose";
import { VisitOffer } from "@/components/overview/VisitOffer";

export default function HomePage() {
  return (
    <>
      <HeroOpen />
      <TuesdayTwice />
      <ProductBand />
      <SystemMap />
      <CustomBuild />
      <DocketSlice />
      <VisitOffer />
      <VisitClose />
    </>
  );
}
