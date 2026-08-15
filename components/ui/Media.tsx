"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type MediaProps = {
  src: string;
  alt: string;
  /** CSS の aspect-ratio 値 例: "4 / 5" "16 / 9" "1 / 1" */
  ratio?: string;
  /** next/image の sizes。レスポンシブで正しい解像度を配信するために必ず指定する */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** パララックスの強さ（0 で無効）。0.08 前後が上品。 */
  parallax?: number;
  /** 画像の表示位置 例: "center" "top" */
  position?: string;
};

/**
 * サイト共通の画像表示。
 * ・枠は overflow-hidden、画像は object-cover でトリミング
 * ・スクロールインで軽く image reveal（拡大 → 等倍）
 * ・parallax を渡すとスクロールに合わせてゆっくり縦に流れる
 */
export function Media({
  src,
  alt,
  ratio = "4 / 5",
  sizes = "100vw",
  priority = false,
  className = "",
  parallax = 0,
  position = "center",
}: MediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const shift = parallax * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, `${shift}%`]);

  const active = parallax > 0 && !reduce;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-beige/60 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <motion.div
        className="absolute inset-0"
        style={
          active
            ? { y, height: `${100 + shift * 2}%`, top: `-${shift}%` }
            : undefined
        }
        initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reduce ? 0.01 : 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
    </div>
  );
}
