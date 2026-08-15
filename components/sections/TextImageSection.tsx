import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ReactNode } from "react";

type Props = {
  en: string;
  /** 見出しの上に置く大きめのキーワード 例: 奈良 × 和 × POKE */
  heading?: string;
  title: readonly string[];
  paragraphs: readonly string[];
  image: string;
  alt: string;
  /** 写真を左に置く */
  reverse?: boolean;
  tone?: "light" | "dark";
  /** 画像の縦横比 */
  ratio?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * 「写真 ＋ 短い文章」の共通セクション。
 * TOPのConcept、MorningのStory、LunchのConceptで再利用する。
 */
export function TextImageSection({
  en,
  heading,
  title,
  paragraphs,
  image,
  alt,
  reverse = false,
  tone = "light",
  ratio = "4 / 5",
  className = "",
  children,
}: Props) {
  const onLight = tone === "light";

  return (
    <section
      className={`section-y ${onLight ? "bg-kinari" : "bg-sumi"} ${className}`}
    >
      <div className="container-x">
        {/*
          タブレット幅で2カラムにすると1行の文字数が減りすぎて読みにくいため、
          lg（1024px）以上でのみ横並びにしている。
        */}
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* ---------- テキスト ---------- */}
          <div className={reverse ? "lg:pl-10" : "lg:pr-10"}>
            {heading && (
              <Reveal y={10}>
                <p
                  className={`mb-6 font-mincho text-[1.375rem] tracking-[0.16em] md:text-2xl ${
                    onLight ? "text-moss" : "text-matcha"
                  }`}
                >
                  {heading}
                </p>
              </Reveal>
            )}

            <SectionTitle en={en} title={title} tone={onLight ? "dark" : "light"} />

            <div className="mt-8 space-y-5 md:mt-9">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p
                    className={`max-w-readable whitespace-pre-line text-[0.9375rem] leading-[2.15] tracking-ja-wide text-ja md:text-base ${
                      onLight ? "text-sumi-soft" : "text-ivory/75"
                    }`}
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {children && <div className="mt-10">{children}</div>}
          </div>

          {/* ---------- 写真 ---------- */}
          <Media
            src={image}
            alt={alt}
            ratio={ratio}
            parallax={0.06}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
