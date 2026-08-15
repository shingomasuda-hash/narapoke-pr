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
  title: "なら和ポケ日和｜奈良・橿原のポケ・ランチ・モーニング",
  description:
    "奈良県橿原市のポケ専門店「なら和ポケ日和」。奈良の食材と和の感性を掛け合わせたポケボウルを、朝はモーニング、昼はランチで。共用駐車場約30台、橿原でのご飯・カフェ利用に。",
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
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <CtaLink href="/morning" variant="solidLight" className="sm:min-w-[12.5rem]">
            モーニングを見る
          </CtaLink>
          <CtaLink href="/lunch" variant="outlineLight" className="sm:min-w-[12.5rem]">
            ランチを見る
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

      {/* ---------- 03 モーニング / ランチ 分岐 ---------- */}
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
