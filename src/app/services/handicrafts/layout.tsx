import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handicrafts & Laser Engraving",
  description:
    "From personalized wooden gifts and cutting boards to custom shop signs. We offer precision laser engraving and bespoke woodcraft services right here in Weija.",
};

export default function HandicraftsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://crafthivegh.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://crafthivegh.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Handicrafts & Engraving",
        "item": "https://crafthivegh.com/services/handicrafts"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
