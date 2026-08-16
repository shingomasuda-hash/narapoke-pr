import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CtaLink } from "@/components/ui/CtaLink";
import { Media } from "@/components/ui/Media";
import { MenuCard } from "./MenuCard";
import { shop } from "@/content/shop";
import type { MenuItem } from "@/content/types";

type Props = {
  en: string;
  title: string;
  items: readonly MenuItem[];
  /** 見出しの下に常に添える一文（時間帯の補足など）。空なら非表示。 */
  note?: string;
  /** メニュー未登録時に表示する案内文 */
  emptyNote: string;
  /** 未登録時のプレビューに使う写真 */
  emptyImages: readonly string[];
  tone?: "light" | "dark";
  className?: string;
  id?: string;
};

/**
 * メニュー一覧。
 * 商品が1件も登録されていない間は「準備中」の案内に自動で切り替わり、
 * Instagram へ誘導する。
 * （正式な商品名・価格が未確定のため、仮の商品は一切表示しない）
 */
export function MenuList({
  en,
  title,
  items,
  note,
  emptyNote,
  emptyImages,
  tone = "light",
  className = "",
  id = "menu",
}: Props) {
  /* 商品名が入っているものだけを表示対象にする */
  const valid = items.filter((i) => i.name.trim() !== "");
  const featured = valid.filter((i) => i.recommended);
  const rest = valid.filter((i) => !i.recommended);
  const onLight = tone === "light";

  return (
    <section
      id={id}
      className={`section-y ${onLight ? "bg-kinari" : "bg-sumi"} ${className}`}
    >
      <div className="container-x">
        <SectionTitle
          en={en}
          title={title}
          lead={note || undefined}
          align="center"
          tone={onLight ? "dark" : "light"}
        />

        {valid.length === 0 ? (
          /* ---------- 準備中 ---------- */
          <div className="mt-14 md:mt-16">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {emptyImages.slice(0, 3).map((src, i) => (
                <Media
                  key={src}
                  src={src}
                  alt=""
                  ratio="1 / 1"
                  sizes="(max-width: 767px) 33vw, 30vw"
                  className={i === 1 ? "" : "opacity-70"}
                />
              ))}
            </div>

            <Reveal className="mt-10 text-center">
              <p
                className={`whitespace-pre-line text-[0.9375rem] leading-[2.1] text-ja ${
                  onLight ? "text-sumi-soft" : "text-ivory/75"
                }`}
              >
                {emptyNote}
              </p>
              <div className="mt-8 flex justify-center">
                <CtaLink
                  href={shop.instagram.url}
                  external
                  variant={onLight ? "outline" : "outlineLight"}
                >
                  Instagramで見る
                </CtaLink>
              </div>
            </Reveal>
          </div>
        ) : (
          /* ---------- メニュー ---------- */
          <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
            {featured.map((item, i) => (
              <Reveal key={item.name}>
                <MenuCard item={item} featured tone={tone} priority={i === 0} />
              </Reveal>
            ))}

            {rest.length > 0 && (
              <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
                {rest.map((item, i) => (
                  <Reveal key={item.name} delay={(i % 3) * 0.08}>
                    <MenuCard item={item} tone={tone} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
