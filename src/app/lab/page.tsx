import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame, PageIntro } from "@/components/chrome/PageFrame";
import { DocketLab } from "@/components/lab/DocketLab";
import { labCopy } from "@/content/lab";

export const metadata: Metadata = {
  title: labCopy.metaTitle,
  description: labCopy.metaDescription,
};

export default function LabPage() {
  return (
    <PageFrame>
      <PageIntro compact title={labCopy.title} body={labCopy.body} />
      <p className="type-docket mb-10 text-sm text-brand-steel">
        Theoretical IMS screens for the stills:{" "}
        <Link href="/lab/ims" className="btn-text text-sm">
          Phone and desk paints
        </Link>
        . Parking-lot hero stills (draft, not live):{" "}
        <Link href="/lab/mocks" className="btn-text text-sm">
          Yard stamp and passenger seat
        </Link>
      </p>
      <DocketLab />
    </PageFrame>
  );
}
