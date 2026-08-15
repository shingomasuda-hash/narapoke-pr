import Link from "next/link";
import { shop } from "@/content/shop";
import { BrandSymbol } from "./Icons";

type Props = {
  /** 英字サブネームを出すか */
  withEn?: boolean;
  className?: string;
  /** ロゴ全体の文字色クラス */
  tone?: string;
};

/**
 * ロゴ（ワードマーク）。
 * 画像ロゴが用意できたら、この中身を next/image に差し替えてください。
 */
export function BrandMark({
  withEn = true,
  className = "",
  tone = "text-sumi",
}: Props) {
  return (
    <Link
      href="/"
      aria-label={`${shop.name} トップページ`}
      className={`inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-70 ${tone} ${className}`}
    >
      <BrandSymbol className="h-[1.35rem] w-[1.35rem] shrink-0 opacity-80" />
      <span className="flex flex-col leading-none">
        <span className="font-mincho text-[1.0625rem] tracking-[0.14em] md:text-lg">
          {shop.name}
        </span>
        {withEn && (
          <span className="mt-1 font-en-sans text-[9.5px] uppercase tracking-[0.26em] opacity-60">
            {shop.nameEn}
          </span>
        )}
      </span>
    </Link>
  );
}
