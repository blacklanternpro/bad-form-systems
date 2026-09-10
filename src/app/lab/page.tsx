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
        The field app and the jobs board that appear in the homepage stills:{" "}
        <Link href="/lab/ims" className="btn-text text-sm">
          Screens and composites
        </Link>
      </p>
      <DocketLab />
    </PageFrame>
  );
}
