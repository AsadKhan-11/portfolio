import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalPage from "@/components/legal/LegalDoc";
import { LEGAL } from "@/lib/legal";
import { pageJsonLd } from "@/lib/pageJsonLd";
import { pageMetadata } from "@/lib/seo";

const doc = LEGAL.find((d) => d.slug === "privacy")!;

export const metadata = pageMetadata({
  title: doc.metaTitle,
  description: doc.description,
  path: "/privacy",
});

export default function UprivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLd({
            path: "/privacy",
            title: doc.metaTitle,
            description: doc.description,
            crumbs: [{ name: "Home", path: "/" }, { name: doc.title }],
          }),
        }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <LegalPage doc={doc} />
      </main>
      <Footer />
    </>
  );
}
