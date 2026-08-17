import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
      {/*
        Google タグマネージャー本体。
        next/script が <head> の早い位置に読み込ませてくれるため、
        タグの貼り付け位置を自分で管理する必要はない。
        content/shop.ts の gtmId を空にすると、まるごと出力されない。
      */}
      {shop.gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${shop.gtmId}');`}
        </Script>
      )}

      <body>
        {/* JavaScript が無効な環境向けのタグマネージャー。body の直後に置く必要がある */}
        {shop.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${shop.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}

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
