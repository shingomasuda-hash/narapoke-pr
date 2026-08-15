import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CtaLink } from "@/components/ui/CtaLink";
import { images } from "@/lib/images";
import { shop } from "@/content/shop";

/**
 * Instagram 導線。
 *
 * 現在はアカウントのトップへリンクしています。
 * 個別の投稿へ飛ばしたい場合は、下の posts 配列に
 * { image, url } の形で投稿URLを追加してください。
 */
const posts = images.instagram.map((image) => ({
  image,
  url: shop.instagram.url,
}));

export function InstagramSection({
  en,
  title,
  lead,
  className = "",
}: {
  en: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <section className={`section-y bg-kinari ${className}`}>
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionTitle en={en} title={title} lead={lead} />
          <div className="hidden shrink-0 md:block">
            <CtaLink href={shop.instagram.url} external variant="outline">
              {shop.instagram.id}
            </CtaLink>
          </div>
        </div>
      </div>

      {/* 写真は画面幅いっぱいに。スマホでも大きく見せる。 */}
      <Reveal className="mt-12 md:mt-14">
        <ul className="grid grid-cols-3 gap-1.5 px-1.5 md:grid-cols-6 md:gap-2 md:px-2">
          {posts.map((post, i) => (
            <li key={post.image}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${shop.instagram.id} の投稿を見る`}
                className="group relative block aspect-square overflow-hidden bg-beige/60"
              >
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 33vw, 17vw"
                  className="object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-sumi/0 transition-colors duration-500 group-hover:bg-sumi/15"
                />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* スマホでは写真の下にCTAを置く */}
      <div className="container-x mt-10 md:hidden">
        <CtaLink href={shop.instagram.url} external variant="outline" full>
          Instagramを見る
        </CtaLink>
      </div>
    </section>
  );
}
