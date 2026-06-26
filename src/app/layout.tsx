import type { Metadata } from "next";
import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import ClientLayout from "@/client-layout";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter"
});

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope"
});

export const metadata: Metadata = {
  title: "CraftHive — Framing, Crafts & Art Studio",
  description:
    "CraftHive is Accra's home for bespoke Shadow Boxes, Custom Picture Framing, Laser Engraving, Personalised Gifts & Memory Boxes, Signs, and artisanal decor. Rooted in Ghanaian heritage. Crafted with intention.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="grain" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
