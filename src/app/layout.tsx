import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Courier_Prime } from "next/font/google";
import { HashRedirect } from "@/components/chrome/HashRedirect";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { HASH_TO_PATH } from "@/content/nav";
import { overview } from "@/content/overview";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: overview.metaTitle,
    template: "%s | BAD FORM Systems",
  },
  description: overview.metaDescription,
  metadataBase: new URL("https://bad-form.pro"),
  openGraph: {
    siteName: "BAD FORM Systems",
    title: overview.metaTitle,
    description: overview.metaDescription,
    type: "website",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Overhead in a dusty ute: a work-worn hand holding a phone open to a dusk field app, with a paper docket on the other thigh.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: overview.metaTitle,
    description: overview.metaDescription,
    images: ["/images/og.jpg"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${courierPrime.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-[100dvh] flex-col bg-brand-black text-brand-ink">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=${JSON.stringify(HASH_TO_PATH)};var h=location.hash.replace('#','');if(m[h]&&m[h]!==location.pathname)location.replace(m[h]);})();`,
          }}
        />
        <HashRedirect />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-grow">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
