import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame, PageIntro } from "@/components/chrome/PageFrame";
import { ImsCompare } from "@/components/lab/ims/ImsCompare";
import { imsCopy } from "@/content/ims";

export const metadata: Metadata = {
  title: imsCopy.labTitle,
  description: imsCopy.labBody,
  robots: { index: false, follow: false },
};

export default function ImsLabIndexPage() {
  return (
    <PageFrame>
      <PageIntro compact title={imsCopy.labTitle} body={imsCopy.labBody} />
      <p className="type-docket mb-10 text-sm text-brand-steel">
        Homepage stills stay on the rollback plates.{" "}
        <Link href="/lab" className="btn-text text-sm">
          Docket lab
        </Link>
      </p>
      <ImsCompare />
    </PageFrame>
  );
}
