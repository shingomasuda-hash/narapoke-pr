"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Gate = {
  en: string;
  title: string;
  copy: readonly string[];
  href: string;
  linkLabel: string;
  image: string;
  theme: "light" | "dark";
};

/**
 * TOPページの最重要導線。
 * 画面を大きく割り、モーニング・ランチ・ディナー・スイーツへ分岐させる。
 * PCは2列、スマホは縦積み。どちらも写真を大きく見せる。
 */
/**
 * 朝は「明るい写真＋墨の文字」、昼は「深い写真＋生成りの文字」。
 * 明るいモーニング写真の上に白文字を置くと読みづらくなるため、
 * テーマごとに文字色とスクリムの向きを反転させている。
 */
const THEME = {
  light: {
    scrim:
      "linear-gradient(to top, rgba(251,249,245,0.94) 0%, rgba(251,249,245,0.72) 34%, rgba(251,249,245,0.12) 72%, rgba(251,249,245,0) 100%)",
    text: "text-sumi",
    sub: "text-sumi-soft",
    rule: "bg-sumi",
  },
  dark: {
    scrim:
      "linear-gradient(to top, rgba(20,17,14,0.82) 0%, rgba(20,17,14,0.42) 42%, rgba(20,17,14,0.12) 100%)",
    text: "text-ivory",
    sub: "text-ivory/80",
    rule: "bg-ivory",
  },
} as const;

export function GateSection({ gates }: { gates: readonly Gate[] }) {
  const reduce = useReducedMotion();

  /*
   * 2枠のときは1枠ずつを大きく見せる。
   * 3枠以上（モーニング/ランチ/ディナー/スイーツ）では2段組みになるため、
   * 縦に長くなりすぎないよう、スマホもPCも1枠の高さを抑える。
   */
  const few = gates.length <= 2;
  const frame = few
    ? "aspect-[4/5] sm:aspect-[16/10] md:aspect-auto md:h-[38rem] lg:h-[44rem]"
    : "aspect-[16/11] sm:aspect-[16/9] md:aspect-auto md:h-[28rem] lg:h-[32rem]";

  return (
    <section className="grid md:grid-cols-2">
      {gates.map((gate, i) => (
        <motion.div
          key={gate.href}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduce ? 0.01 : 1,
            delay: reduce ? 0 : i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href={gate.href}
            className={`group relative flex w-full items-end overflow-hidden bg-sumi ${frame}`}
          >
            <Image
              src={gate.image}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-[1.04]"
            />

            {/* 文字の可読性を確保するスクリム */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: THEME[gate.theme].scrim }}
            />

            <div className="relative w-full p-8 pb-10 md:p-10 md:pb-12 lg:p-14 lg:pb-16">
              <p
                className={`font-en-serif text-[2.5rem] leading-none tracking-[0.14em] md:text-[3rem] lg:text-[3.5rem] ${THEME[gate.theme].text}`}
              >
                {gate.en}
              </p>

              <h3
                className={`mt-4 font-mincho text-xl tracking-ja-wide md:text-[1.5rem] ${THEME[gate.theme].text}`}
              >
                {gate.title}
              </h3>

              <p
                className={`mt-4 text-[0.875rem] leading-[2] tracking-ja-wide text-ja md:text-[0.9375rem] ${THEME[gate.theme].sub}`}
              >
                {gate.copy.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>

              <span
                className={`mt-7 inline-flex items-center gap-3 text-[0.8125rem] tracking-ja-wide md:mt-8 ${THEME[gate.theme].text}`}
              >
                {gate.linkLabel}
                <span
                  aria-hidden
                  className={`inline-block h-px w-8 transition-transform duration-500 ease-soft group-hover:translate-x-1.5 ${THEME[gate.theme].rule}`}
                />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
