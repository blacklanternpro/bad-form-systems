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
        Homepage stills: the hero hand is a keyed field app; the cab is the
        original photograph with a whole generic Capture phone in the hand;
        the office board is the generic system.{" "}
        <Link href="/lab" className="btn-text text-sm">
          Docket lab
        </Link>
      </p>
      <ImsCompare />
    </PageFrame>
  );
}
