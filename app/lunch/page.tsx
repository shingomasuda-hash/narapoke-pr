import { Hero } from "@/components/sections/Hero";
import { TextImageSection } from "@/components/sections/TextImageSection";
import { MenuList } from "@/components/sections/MenuList";
import { StepsSection } from "@/components/sections/StepsSection";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CtaLink } from "@/components/ui/CtaLink";
import { lunchMenu, lunchPage } from "@/content/lunch";
import { shop } from "@/content/shop";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ランチ｜なら和ポケ日和｜奈良・橿原",
  description:
    "奈良県橿原市「なら和ポケ日和」のランチ。魚・野菜・ご飯・タレを一つのボウルで楽しむポケ丼を、和の味わいで。橿原でのおしゃれなランチに、共用駐車場約30台。",
  path: "/lunch",
  image: images.lunch.hero,
});

const breadcrumb = breadcrumbJsonLd([
  { name: "TOP", path: "/" },
  { name: "ランチ", path: "/lunch" },
]);

export default function LunchPage() {
  return (
    <>
      {/* ---------- ファーストビュー ---------- */}
      <Hero
        en={lunchPage.hero.en}
        title={lunchPage.hero.title}
        lead={lunchPage.hero.lead}
        image={lunchPage.hero.image}
        imageSp={lunchPage.hero.imageSp}
        alt={`${shop.name}のポケ丼`}
        /* 昼は食欲を出すため、写真を深く見せる */
        scrim={0.44}
      >
        <CtaLink href="#menu" variant="solidLight" className="w-full sm:w-auto sm:min-w-[13rem]">
          ランチメニュー
        </CtaLink>
      </Hero>

      {/* ---------- ポケのコンセプト ---------- */}
      <TextImageSection
        en={lunchPage.concept.en}
        title={lunchPage.concept.title}
        paragraphs={lunchPage.concept.paragraphs}
        image={lunchPage.concept.image}
        alt="彩り豊かなポケ丼"
        tone="dark"
        ratio="4 / 3"
      />

      {/* ---------- メニュー ---------- */}
      <MenuList
        id="menu"
        en={lunchPage.menu.en}
        title={lunchPage.menu.title}
        items={lunchMenu}
        emptyNote={lunchPage.menu.emptyNote}
        emptyImages={images.lunch.menu}
      />

      {/* ---------- 選び方（content/lunch.ts の customize.enabled で表示切替） ---------- */}
      {lunchPage.customize.enabled && (
        <StepsSection
          en={lunchPage.customize.en}
          title={lunchPage.customize.title}
          lead={lunchPage.customize.lead}
          steps={lunchPage.customize.steps}
        />
      )}

      {/* ---------- クローズアップ ギャラリー ---------- */}
      <section className="section-y bg-sumi">
        <div className="container-x">
          <SectionTitle
            en={lunchPage.gallery.en}
            title={lunchPage.gallery.title}
            tone="light"
          />
          <ImageGallery
            images={lunchPage.gallery.images}
            className="mt-12 md:mt-16"
          />
        </div>
      </section>

      {/* ---------- 最終CTA ---------- */}
      <CtaSection
        en={lunchPage.cta.en}
        title={lunchPage.cta.title}
        lead={lunchPage.cta.lead}
        image={lunchPage.cta.image}
        scrim={0.62}
        links={[
          { label: "Google Mapで見る", href: shop.mapUrl, external: true, primary: true },
          { label: "Instagram", href: shop.instagram.url, external: true },
          { label: "モーニングを見る", href: "/morning" },
        ]}
      />

      <script {...jsonLdProps(breadcrumb)} />
    </>
  );
}
