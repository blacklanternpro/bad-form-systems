import type { Metadata } from "next";
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
      <DocketLab />
    </PageFrame>
  );
}
