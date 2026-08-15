"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  /** 装飾的な英字（MORNING / LUNCH など） */
  en: string;
  /** 和文コピー。配列の各要素が1行になる */
  title: readonly string[];
  /** サブコピー */
  lead?: string | readonly string[];
  /** 横長画像（タブレット・PC用） */
  image: string;
  /** 縦長画像（スマホ用）。未指定なら横長画像を使用 */
  imageSp?: string;
  alt: string;
  /** スクリムの濃さ。写真の明るさに合わせて調整（0〜1） */
  scrim?: number;
  /**
   * 文字色。
   * light … 生成りの文字＋暗いスクリム（TOP・ランチ向き）
   * dark  … 墨の文字＋明るいスクリム（朝の明るい写真向き）
   */
  tone?: "light" | "dark";
  /** 高さ。full = 画面いっぱい、tall = やや低め */
  height?: "full" | "tall";
  /** CTAボタンなど */
  children?: ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** 明るい写真に白文字を置くと読めなくなるため、トーンごとに反転させる */
const TONES = {
  light: {
    base: "20,17,14",
    title: "text-ivory",
    eyebrow: "text-ivory/85",
    rule: "bg-ivory/50",
    lead: "text-ivory/85",
    scrollText: "text-ivory/60",
    scrollTrack: "bg-ivory/20",
    scrollBar: "bg-ivory/80",
  },
  dark: {
    base: "251,249,245",
    title: "text-sumi",
    eyebrow: "text-wood",
    rule: "bg-wood/50",
    lead: "text-sumi-soft",
    scrollText: "text-sumi-soft",
    scrollTrack: "bg-sumi/15",
    scrollBar: "bg-sumi/60",
  },
} as const;

/**
 * 各ページのファーストビュー。
 * 写真を主役にするため、文字は下寄せ・最小限にとどめている。
 *
 * ヒーロー画像だけは <picture> による出し分け（アートディレクション）を
 * 行うため、next/image ではなく素の <img> を使用している。
 * スマホは縦長、PCは横長のトリミングで、被写体が切れないようにするため。
 */
export function Hero({
  en,
  title,
  lead,
  image,
  imageSp,
  alt,
  scrim = 0.42,
  tone = "light",
  height = "full",
  children,
}: Props) {
  const reduce = useReducedMotion();
  const leadLines = lead ? (Array.isArray(lead) ? lead : [lead as string]) : [];
  const t = TONES[tone];

  return (
    <section
      className={`relative w-full overflow-hidden bg-sumi ${
        height === "full"
          ? "min-h-[34rem] h-screen-safe max-h-[60rem]"
          : "min-h-[28rem] h-[85svh] max-h-[46rem]"
      }`}
    >
      {/* ---------- 背景写真 ---------- */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduce ? 1 : 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0.01 : 1.6, ease }}
      >
        <picture>
          {imageSp && <source media="(max-width: 767px)" srcSet={imageSp} />}
          <img
            src={image}
            alt={alt}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </motion.div>

      {/* ---------- 可読性のためのスクリム（下から上へ） ---------- */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(${t.base},${Math.min(scrim + 0.34, 0.95)}) 0%, rgba(${t.base},${scrim * 0.55}) 42%, rgba(${t.base},${scrim * 0.22}) 100%)`,
        }}
      />

      {/* ---------- ヘッダーのロゴ・メニューを読ませるための上部スクリム ---------- */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 md:h-36"
        style={{
          background: `linear-gradient(to bottom, rgba(${t.base},0.42) 0%, rgba(${t.base},0.16) 55%, rgba(${t.base},0) 100%)`,
        }}
      />

      {/* ---------- コピー ---------- */}
      <div className="container-x relative flex h-full flex-col justify-end pb-16 pt-24 md:pb-20 lg:pb-24">
        <motion.p
          className={`eyebrow flex items-center gap-3 ${t.eyebrow}`}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.9, delay: 0.3, ease }}
        >
          <span aria-hidden className={`h-px w-8 ${t.rule}`} />
          {en}
        </motion.p>

        {/*
          文字サイズは「作り手が指定した改行位置が崩れない」ことを優先。
          375px 幅でも1行9文字前後が収まるサイズにしている。
        */}
        <h1 className={`mt-5 md:mt-6 ${t.title}`}>
          {title.map((line, i) => (
            <span key={line + i} className="block overflow-hidden">
              <motion.span
                className="block text-[1.875rem] leading-[1.55] tracking-ja-wide text-ja sm:text-[2.375rem] md:text-[3.25rem] lg:text-[3.75rem]"
                initial={{ y: reduce ? 0 : "108%", opacity: reduce ? 0 : 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: reduce ? 0.01 : 1.1,
                  delay: reduce ? 0 : 0.42 + i * 0.12,
                  ease,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {leadLines.length > 0 && (
          <motion.p
            className={`mt-6 max-w-readable text-[0.9375rem] leading-[2] tracking-ja-wide text-ja md:text-base ${t.lead}`}
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 1, delay: 0.72, ease }}
          >
            {leadLines.map((line, i) => (
              <span key={line + i} className="block">
                {line}
              </span>
            ))}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="mt-9 md:mt-10"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 1, delay: 0.88, ease }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* ---------- スクロールの合図（PCのみ） ---------- */}
      <div
        aria-hidden
        className="absolute bottom-0 right-8 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className={`font-en-sans text-[10px] uppercase tracking-en-wide ${t.scrollText}`}>
          Scroll
        </span>
        <span className={`relative block h-16 w-px overflow-hidden ${t.scrollTrack}`}>
          <motion.span
            className={`absolute inset-x-0 top-0 block h-1/2 ${t.scrollBar}`}
            animate={reduce ? {} : { y: ["-100%", "200%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
