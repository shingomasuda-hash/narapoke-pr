import { Hero } from "@/components/sections/Hero";
import { TextImageSection } from "@/components/sections/TextImageSection";
import { MenuList } from "@/components/sections/MenuList";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CtaLink } from "@/components/ui/CtaLink";
import { dinnerMenu, dinnerPage } from "@/content/dinner";
import { hasReservation, shop } from "@/content/shop";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ディナー｜なら和ポケ日和｜奈良・橿原",
  description:
    "奈良県橿原市「なら和ポケ日和」のディナー。灯りを落とした店内で、夜は少し深い味わいのポケボウルを。共用駐車場約30台、仕事帰りにも。",
  path: "/dinner",
  image: images.dinner.hero,
});

const breadcrumb = breadcrumbJsonLd([
  { name: "TOP", path: "/" },
  { name: "ディナー", path: "/dinner" },
]);

export default function DinnerPage() {
  return (
    <>
      {/* ---------- ファーストビュー ---------- */}
      <Hero
        en={dinnerPage.hero.en}
        title={dinnerPage.hero.title}
        lead={dinnerPage.hero.lead}
        image={dinnerPage.hero.image}
        imageSp={dinnerPage.hero.imageSp}
        alt={`${shop.name}の夜のポケ丼`}
        /* 夜は写真自体が暗いため、スクリムは控えめでよい */
        scrim={0.38}
      >
        <CtaLink href="#menu" variant="solidLight" className="w-full sm:w-auto sm:min-w-[13rem]">
          ディナーメニュー
        </CtaLink>
      </Hero>

      {/* ---------- 夜のコンセプト ---------- */}
      <TextImageSection
        en={dinnerPage.concept.en}
        title={dinnerPage.concept.title}
        paragraphs={dinnerPage.concept.paragraphs}
        image={dinnerPage.concept.image}
        alt="夜のポケ丼"
        tone="dark"
        ratio="4 / 3"
      />

      {/* ---------- メニュー ---------- */}
      <MenuList
        id="menu"
        en={dinnerPage.menu.en}
        title={dinnerPage.menu.title}
        items={dinnerMenu}
        emptyNote={dinnerPage.menu.emptyNote}
        emptyImages={images.dinner.menu}
      />

      {/* ---------- 夜のギャラリー ---------- */}
      <section className="section-y bg-sumi">
        <div className="container-x">
          <SectionTitle
            en={dinnerPage.gallery.en}
            title={dinnerPage.gallery.title}
            tone="light"
          />
          <ImageGallery
            images={dinnerPage.gallery.images}
            className="mt-12 md:mt-16"
          />
        </div>
      </section>

      {/* ---------- 最終CTA ---------- */}
      <CtaSection
        en={dinnerPage.cta.en}
        title={dinnerPage.cta.title}
        lead={dinnerPage.cta.lead}
        image={dinnerPage.cta.image}
        scrim={0.62}
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
          { label: "スイーツを見る", href: "/sweets" },
        ]}
      />

      <script {...jsonLdProps(breadcrumb)} />
    </>
  );
}
