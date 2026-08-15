import { Reveal, RevealLines } from "./Reveal";

type Props = {
  /** 装飾的に使う英字ラベル */
  en: string;
  /** 日本語見出し。配列にすると改行位置を固定できる */
  title?: string | readonly string[];
  /** 見出しの下に添えるリード文 */
  lead?: string;
  align?: "left" | "center";
  /** 暗い背景の上に置くとき */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * 「英字ラベル ＋ 和文見出し」の共通見出し。
 * 全ページでこの組みを使うことでブランドの一貫性を保つ。
 */
export function SectionTitle({
  en,
  title,
  lead,
  align = "left",
  tone = "dark",
  className = "",
}: Props) {
  const lines = title
    ? Array.isArray(title)
      ? (title as readonly string[])
      : [title as string]
    : [];

  const isCenter = align === "center";
  const onLight = tone === "dark"; // 明るい背景に濃い文字

  return (
    <div
      className={`${isCenter ? "text-center" : "text-left"} ${className}`}
    >
      <Reveal y={10}>
        <p
          className={`eyebrow flex items-center gap-3 ${
            isCenter ? "justify-center" : ""
          } ${onLight ? "text-wood" : "text-kinari/70"}`}
        >
          <span
            aria-hidden
            className={`h-px w-6 ${onLight ? "bg-wood/50" : "bg-kinari/40"}`}
          />
          {en}
        </p>
      </Reveal>

      {/* スマホで1行が折り返して1〜2文字だけ残らないサイズに調整している */}
      {lines.length > 0 && (
        <h2
          className={`mt-5 text-balance text-[1.625rem] leading-[1.6] tracking-ja-wide text-ja sm:text-[1.875rem] md:mt-6 md:text-[2.25rem] lg:text-[2.5rem] ${
            onLight ? "text-sumi" : "text-ivory"
          }`}
        >
          <RevealLines lines={lines} />
        </h2>
      )}

      {lead && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 text-[0.9375rem] leading-[2] text-ja md:text-base ${
              onLight ? "text-sumi-soft" : "text-kinari/75"
            } ${isCenter ? "mx-auto max-w-readable" : "max-w-readable"}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
