import { ShopInfo } from "@/components/sections/ShopInfo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CtaLink } from "@/components/ui/CtaLink";
import { Media } from "@/components/ui/Media";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "店舗情報・アクセス｜なら和ポケ日和｜奈良・橿原",
  description:
    "なら和ポケ日和の店舗情報とアクセス。奈良県橿原市葛本町841-1、共用駐車場約30台。Google Mapから経路をご確認いただけます。",
  path: "/access",
});

const breadcrumb = breadcrumbJsonLd([
  { name: "TOP", path: "/" },
  { name: "店舗情報・アクセス", path: "/access" },
]);

export default function AccessPage() {
  return (
    <>
      {/* 固定ヘッダー分の余白を確保 */}
      <section className="bg-kinari pt-28 md:pt-36">
        <div className="container-x">
          <SectionTitle
            en="ACCESS & INFORMATION"
            title={["奈良・橿原、", "葛本町から。"]}
            lead="共用駐車場は約30台。お車でもお立ち寄りいただけます。"
          />
          <Media
            src={images.shopInterior}
            alt="なら和ポケ日和の店内"
            ratio="16 / 9"
            sizes="100vw"
            parallax={0.05}
            className="mt-12 md:mt-16"
          />
        </div>
      </section>

      <ShopInfo en="SHOP INFORMATION" title="お店のこと。" />

      {/* 各ページへの回遊 */}
      <section className="bg-kinari pb-24 md:pb-28">
        <div className="container-x flex flex-col gap-3 sm:flex-row sm:justify-center">
          <CtaLink href="/morning" variant="outline" className="sm:min-w-[13rem]">
            モーニングを見る
          </CtaLink>
          <CtaLink href="/lunch" variant="outline" className="sm:min-w-[13rem]">
            ランチを見る
          </CtaLink>
        </div>
      </section>

      <script {...jsonLdProps(breadcrumb)} />
    </>
  );
}
