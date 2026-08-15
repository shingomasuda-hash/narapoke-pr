"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** 表示開始までの遅延（秒） */
  delay?: number;
  /** 立ち上がりの移動量（px） */
  y?: number;
  className?: string;
};

/**
 * スクロールで一度だけふわりと現れる共通ラッパー。
 * 「動かすために動かす」を避けるため、動きは Fade + わずかな Slide のみ。
 * OS側で「視差効果を減らす」が有効な場合は動きを止めます。
 */
export function Reveal({ children, delay = 0, y = 18, className }: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.01 : 0.9,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 見出しを1行ずつ下からせり上がらせる text reveal。
 *
 * 重要：各行は overflow-hidden で切り取った枠の外（下）から出てくるため、
 * 動く要素そのものを IntersectionObserver で監視すると
 * 「クリップされていて0%しか見えない → 発火しない → ずっと隠れたまま」
 * という膠着状態になる。
 * そのため監視対象は「切り取られていない外側の要素」にし、
 * 中の各行は variants の伝播で動かしている。
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: reduce ? 0.01 : 1,
                  delay: reduce ? 0 : delay + i * 0.11,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
