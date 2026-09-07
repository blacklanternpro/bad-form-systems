import type { Metadata } from "next";
import { PageFrame, PageIntro } from "@/components/chrome/PageFrame";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactCopy } from "@/content/contact";

export const metadata: Metadata = {
  title: contactCopy.metaTitle,
  description: contactCopy.metaDescription,
};

export default function ContactPage() {
  return (
    <PageFrame>
      <div className="mx-auto max-w-3xl">
        <PageIntro title={contactCopy.title} body={contactCopy.body} />
        <ContactForm />
      </div>
    </PageFrame>
  );
}
