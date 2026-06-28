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
icons: {
    icon: [
      { url: "favicon/favicon.ico" },
      { url: "favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "favicon/apple-touch-icon.png",
  },
  manifest:"favicon/site.webmanifest",
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
