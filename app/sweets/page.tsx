import { Hero } from "@/components/sections/Hero";
import { TextImageSection } from "@/components/sections/TextImageSection";
import { MenuList } from "@/components/sections/MenuList";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CtaLink } from "@/components/ui/CtaLink";
import { sweetsMenu, sweetsPage } from "@/content/sweets";
import { hasReservation, shop } from "@/content/shop";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "スイーツ｜なら和ポケ日和｜奈良・橿原",
  description:
    "奈良県橿原市「なら和ポケ日和」のスイーツとドリンク。クレームブリュレやパフェ、果実のドリンクをテイクアウトでも。共用駐車場約30台。",
  path: "/sweets",
  image: images.sweets.hero,
});

const breadcrumb = breadcrumbJsonLd([
  { name: "TOP", path: "/" },
  { name: "スイーツ", path: "/sweets" },
]);

export default function SweetsPage() {
  return (
    <>
      {/* ---------- ファーストビュー ---------- */}
      <Hero
        en={sweetsPage.hero.en}
        title={sweetsPage.hero.title}
        lead={sweetsPage.hero.lead}
        image={sweetsPage.hero.image}
        imageSp={sweetsPage.hero.imageSp}
        alt={`${shop.name}のスイーツ`}
        scrim={0.44}
      >
        <CtaLink href="#menu" variant="solidLight" className="w-full sm:w-auto sm:min-w-[13rem]">
          スイーツメニュー
        </CtaLink>
      </Hero>

      {/* ---------- スイーツのコンセプト ---------- */}
      <TextImageSection
        en={sweetsPage.concept.en}
        title={sweetsPage.concept.title}
        paragraphs={sweetsPage.concept.paragraphs}
        image={sweetsPage.concept.image}
        alt="クレームブリュレとパフェ"
        ratio="4 / 3"
      />

      {/* ---------- メニュー ---------- */}
      <MenuList
        id="menu"
        en={sweetsPage.menu.en}
        title={sweetsPage.menu.title}
        items={sweetsMenu}
        emptyNote={sweetsPage.menu.emptyNote}
        emptyImages={images.sweets.menu}
      />

      {/* ---------- クローズアップ ギャラリー ---------- */}
      <section className="section-y bg-sumi">
        <div className="container-x">
          <SectionTitle
            en={sweetsPage.gallery.en}
            title={sweetsPage.gallery.title}
            tone="light"
          />
          <ImageGallery
            images={sweetsPage.gallery.images}
            className="mt-12 md:mt-16"
          />
        </div>
      </section>

      {/* ---------- 最終CTA ---------- */}
      <CtaSection
        en={sweetsPage.cta.en}
        title={sweetsPage.cta.title}
        lead={sweetsPage.cta.lead}
        image={sweetsPage.cta.image}
        scrim={0.6}
        links={[
          /* 予約URLが設定されていれば、それを主要CTAにする */
          ...(hasReservation
            ? [
                {
                  label: shop.reservation.label,
                  href: shop.reservation.url,
                  external: true,
                  primary: true,
                },
                { label: "Google Mapで見る", href: shop.mapUrl, external: true },
              ]
            : [
                {
                  label: "Google Mapで見る",
                  href: shop.mapUrl,
                  external: true,
                  primary: true,
                },
              ]),
          { label: "Instagram", href: shop.instagram.url, external: true },
          { label: "モーニングを見る", href: "/morning" },
        ]}
      />

      <script {...jsonLdProps(breadcrumb)} />
    </>
  );
}
