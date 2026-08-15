import { Hero } from "@/components/sections/Hero";
import { TextImageSection } from "@/components/sections/TextImageSection";
import { MenuList } from "@/components/sections/MenuList";
import { SceneGrid } from "@/components/sections/SceneGrid";
import { CtaSection } from "@/components/sections/CtaSection";
import { CtaLink } from "@/components/ui/CtaLink";
import { morningMenu, morningPage } from "@/content/morning";
import { shop } from "@/content/shop";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "モーニング｜なら和ポケ日和｜奈良・橿原",
  description:
    "奈良県橿原市「なら和ポケ日和」のモーニング。朝の光が入る店内で、一日の始まりにちゃんと美味しい一皿を。共用駐車場約30台、奈良観光のスタートにも。",
  path: "/morning",
  image: images.morning.hero,
});

const breadcrumb = breadcrumbJsonLd([
  { name: "TOP", path: "/" },
  { name: "モーニング", path: "/morning" },
]);

export default function MorningPage() {
  return (
    <>
      {/* ---------- ファーストビュー ---------- */}
      <Hero
        en={morningPage.hero.en}
        title={morningPage.hero.title}
        lead={morningPage.hero.lead}
        image={morningPage.hero.image}
        imageSp={morningPage.hero.imageSp}
        alt={`${shop.name}のモーニング`}
        /*
         * 朝は「明るい写真 × 墨の文字」。
         * 白文字にすると朝の写真の上で読めなくなるため、TOP・ランチとは逆にしている。
         */
        tone="dark"
        scrim={0.34}
      >
        <CtaLink href="#menu" variant="solid" className="w-full sm:w-auto sm:min-w-[13rem]">
          モーニングメニュー
        </CtaLink>
      </Hero>

      {/* ---------- ブランドストーリー ---------- */}
      <TextImageSection
        en={morningPage.story.en}
        title={morningPage.story.title}
        paragraphs={morningPage.story.paragraphs}
        image={morningPage.story.image}
        alt="朝のならポケ日和の一皿"
        reverse
        ratio="4 / 5"
        className="!bg-ivory"
      />

      {/* ---------- メニュー ---------- */}
      <MenuList
        id="menu"
        en={morningPage.menu.en}
        title={morningPage.menu.title}
        items={morningMenu}
        emptyNote={morningPage.menu.emptyNote}
        emptyImages={images.morning.menu}
      />

      {/* ---------- 利用シーン ---------- */}
      <SceneGrid
        en={morningPage.scenes.en}
        title={morningPage.scenes.title}
        items={morningPage.scenes.items}
      />

      {/* ---------- 最終CTA ---------- */}
      <CtaSection
        en={morningPage.cta.en}
        title={morningPage.cta.title}
        lead={morningPage.cta.lead}
        image={morningPage.cta.image}
        scrim={0.58}
        links={[
          { label: "Google Mapで見る", href: shop.mapUrl, external: true, primary: true },
          { label: "Instagram", href: shop.instagram.url, external: true },
          { label: "ランチを見る", href: "/lunch" },
        ]}
      />

      <script {...jsonLdProps(breadcrumb)} />
    </>
  );
}
