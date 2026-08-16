import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { shop } from "@/content/shop";
import { jsonLdProps, restaurantJsonLd } from "@/lib/seo";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  metadataBase: new URL(shop.siteUrl),
  title: {
    default: "なら和ポケ日和｜奈良・橿原のポケ｜モーニング・ランチ・ディナー",
    template: "%s",
  },
  description:
    "奈良県橿原市のポケ専門店「なら和ポケ日和」。奈良の食材と和の感性を掛け合わせたポケボウルを、モーニング・ランチ・ディナーで。共用駐車場約30台。",
  applicationName: shop.name,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: shop.name,
    images: [{ url: images.ogp, width: 1200, height: 630, alt: shop.name }],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F4F0E8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={fontVariables}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-sumi focus:px-5 focus:py-3 focus:text-ivory"
        >
          本文へスキップ
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />

        <script {...jsonLdProps(restaurantJsonLd())} />
      </body>
    </html>
  );
}
