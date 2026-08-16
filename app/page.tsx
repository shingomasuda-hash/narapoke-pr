import { Hero } from "@/components/sections/Hero";
import { GateSection } from "@/components/sections/GateSection";
import { TextImageSection } from "@/components/sections/TextImageSection";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { ShopInfo } from "@/components/sections/ShopInfo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CtaLink } from "@/components/ui/CtaLink";
import { topPage } from "@/content/top";
import { shop } from "@/content/shop";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "なら和ポケ日和｜奈良・橿原のポケ｜モーニング・ランチ・ディナー",
  description:
    "奈良県橿原市のポケ専門店「なら和ポケ日和」。奈良の食材と和の感性を掛け合わせたポケボウルを、モーニング・ランチ・ディナーで。スイーツとドリンクのテイクアウトも。共用駐車場約30台。",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ---------- 01 ファーストビュー ---------- */}
      <Hero
        en={topPage.hero.en}
        title={topPage.hero.title}
        lead={topPage.hero.lead}
        image={topPage.hero.image}
        imageSp={topPage.hero.imageSp}
        alt={`${shop.name}の料理`}
        scrim={0.4}
      >
        {/*
          4つの時間帯すべてへ導線を出す。
          スマホは2列×2段、タブレット以上は横1列に並べる。
        */}
        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:flex-wrap">
          <CtaLink href="/morning" variant="solidLight" compact className="sm:min-w-[9.5rem]">
            モーニング
          </CtaLink>
          <CtaLink href="/lunch" variant="outlineLight" compact className="sm:min-w-[9.5rem]">
            ランチ
          </CtaLink>
          <CtaLink href="/dinner" variant="outlineLight" compact className="sm:min-w-[9.5rem]">
            ディナー
          </CtaLink>
          <CtaLink href="/sweets" variant="outlineLight" compact className="sm:min-w-[9.5rem]">
            スイーツ
          </CtaLink>
        </div>
      </Hero>

      {/* ---------- 02 コンセプト ---------- */}
      <TextImageSection
        en={topPage.concept.en}
        heading={topPage.concept.heading}
        title={topPage.concept.title}
        paragraphs={topPage.concept.paragraphs}
        image={topPage.concept.image}
        alt="奈良の食材を使ったポケボウル"
        ratio="4 / 5"
      />

      {/* ---------- 03 モーニング / ランチ / ディナー / スイーツ 分岐 ---------- */}
      <GateSection gates={topPage.gates} />

      {/* ---------- 04 フードギャラリー ---------- */}
      <section className="section-y bg-kinari">
        <div className="container-x">
          <SectionTitle
            en={topPage.gallery.en}
            title={topPage.gallery.title}
            lead={topPage.gallery.lead}
          />
          <ImageGallery images={topPage.gallery.images} className="mt-12 md:mt-16" />
        </div>
      </section>

      {/* ---------- 05 Instagram ---------- */}
      <InstagramSection
        en={topPage.instagram.en}
        title={topPage.instagram.title}
        lead={topPage.instagram.lead}
      />

      {/* ---------- 06 店舗情報 ---------- */}
      <ShopInfo en={topPage.access.en} title={topPage.access.title} />
    </>
  );
}
