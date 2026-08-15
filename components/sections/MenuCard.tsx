import { Media } from "@/components/ui/Media";
import { images } from "@/lib/images";
import type { MenuItem } from "@/content/types";

type Props = {
  item: MenuItem;
  /** おすすめ商品を大きく見せるレイアウト */
  featured?: boolean;
  /** 暗い背景の上に置くとき */
  tone?: "light" | "dark";
  priority?: boolean;
};

/**
 * メニュー1品の表示。
 * 「写真 → 商品名 → 簡単な説明 → 金額」だけの構成。
 * カードで囲わず、写真と余白で見せる。
 */
export function MenuCard({
  item,
  featured = false,
  tone = "light",
  priority = false,
}: Props) {
  const onLight = tone === "light";
  const src = item.image || images.menuFallback;

  return (
    <article className={featured ? "md:grid md:grid-cols-2 md:items-center md:gap-10 lg:gap-14" : ""}>
      <Media
        src={src}
        alt={item.name}
        ratio={featured ? "4 / 3" : "4 / 3"}
        priority={priority}
        sizes={
          featured
            ? "(max-width: 767px) 100vw, 50vw"
            : "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        }
      />

      <div className={featured ? "mt-6 md:mt-0" : "mt-5"}>
        {item.recommended && (
          <p className="mb-3 flex items-center gap-2.5">
            <span
              className={`font-en-sans text-[10px] uppercase tracking-en-wide ${
                onLight ? "text-kaki" : "text-kaki"
              }`}
            >
              Recommended
            </span>
            {item.badge && (
              <span
                className={`px-2.5 py-1 text-[11px] tracking-ja-wide ${
                  onLight ? "bg-kaki text-ivory" : "bg-kaki text-ivory"
                }`}
              >
                {item.badge}
              </span>
            )}
          </p>
        )}

        <div className="flex items-baseline justify-between gap-5">
          <h3
            className={`font-mincho tracking-ja-wide text-ja ${
              featured ? "text-[1.375rem] md:text-[1.75rem]" : "text-[1.1875rem] md:text-xl"
            } ${onLight ? "text-sumi" : "text-ivory"}`}
          >
            {item.name}
          </h3>
          {item.price && (
            <p
              className={`shrink-0 font-en-serif text-[1.0625rem] tracking-[0.06em] md:text-lg ${
                onLight ? "text-sumi-soft" : "text-ivory/75"
              }`}
            >
              {item.price}
            </p>
          )}
        </div>

        {item.description && (
          <p
            className={`mt-3 text-[0.875rem] leading-[1.95] text-ja md:text-[0.9375rem] ${
              onLight ? "text-sumi-soft" : "text-ivory/70"
            } ${featured ? "max-w-readable" : ""}`}
          >
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}
