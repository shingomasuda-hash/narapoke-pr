import type { Metadata } from "next";
import { hasReservation, shop } from "@/content/shop";
import { images } from "@/lib/images";

const siteUrl = shop.siteUrl;

/**
 * ページ共通のメタデータ生成。
 * タイトル・説明文はページごとに個別に設定しています。
 */
export function buildMetadata({
  title,
  description,
  path,
  image = images.ogp,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;

  /* 既定のOGP画像だけが 1200×630。個別画像は寸法を宣言しない。 */
  const ogImage =
    image === images.ogp
      ? { url: image, width: 1200, height: 630, alt: shop.name }
      : { url: image, alt: shop.name };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: shop.name,
      locale: "ja_JP",
      title,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * 構造化データ（Restaurant / LocalBusiness）。
 * 未確定の項目（電話番号・営業時間・価格帯）は出力しないため、
 * 誤った情報が検索結果に出ることはありません。
 * content/shop.ts を埋めれば自動的に反映されます。
 */
export function restaurantJsonLd() {
  /*
   * 営業時間は schema.org の OpeningHoursSpecification で出力する。
   * 「ランチ 11:00 - 16:00」のような表示用の文字列をそのまま入れると
   * 検索エンジンが読めないため、content/shop.ts の openingHoursSpec を使う。
   */
  const openingHoursSpecification = shop.openingHoursSpec.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
    opens: h.opens,
    closes: h.closes,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: shop.name,
    alternateName: shop.nameEn,
    url: siteUrl,
    image: `${siteUrl}${images.ogp}`,
    description:
      "奈良県橿原市のポケ専門店。奈良の食材と和の感性を掛け合わせたポケボウルを、モーニング・ランチ・ディナーでお届けします。スイーツとドリンクのテイクアウトも。",
    servesCuisine: ["ポケ", "ポケ丼", "カフェ"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "JP",
      addressRegion: shop.address.prefecture,
      addressLocality: shop.address.city,
      streetAddress: shop.address.street,
      ...(shop.address.postalCode ? { postalCode: shop.address.postalCode } : {}),
    },
    hasMap: shop.mapUrl,
    sameAs: [shop.instagram.url],
    ...(shop.tel ? { telephone: shop.tel } : {}),
    ...(openingHoursSpecification.length ? { openingHoursSpecification } : {}),
    /* 予約URLが設定されているときだけ、予約可であることと予約導線を出力する */
    ...(hasReservation
      ? {
          acceptsReservations: true,
          potentialAction: {
            "@type": "ReserveAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: shop.reservation.url,
              inLanguage: "ja",
              actionPlatform: [
                "https://schema.org/DesktopWebPlatform",
                "https://schema.org/MobileWebPlatform",
              ],
            },
            result: { "@type": "Reservation", name: "座席の予約" },
          },
        }
      : {}),
    amenityFeature: {
      "@type": "LocationFeatureSpecification",
      name: "駐車場",
      value: shop.parking,
    },
  };
}

/** パンくず（下層ページ用） */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/** JSON-LD を <script> として埋め込むためのヘルパー */
export function jsonLdProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  } as const;
}
