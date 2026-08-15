import { Cormorant_Garamond, Jost, Noto_Sans_JP, Zen_Old_Mincho } from "next/font/google";

/**
 * タイポグラフィ
 * ------------------------------------------------------------
 * 大見出し：明朝（Zen Old Mincho）
 * 本文・UI：ゴシック（Noto Sans JP）
 * 英字見出し：モダンな Serif（Cormorant Garamond）
 * 英字ラベル：Sans（Jost）
 */

export const mincho = Zen_Old_Mincho({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-mincho",
  fallback: [
    "Hiragino Mincho ProN",
    "Yu Mincho",
    "YuMincho",
    "Noto Serif JP",
    "serif",
  ],
});

export const gothic = Noto_Sans_JP({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-gothic",
  fallback: [
    "Hiragino Sans",
    "Hiragino Kaku Gothic ProN",
    "Yu Gothic",
    "Meiryo",
    "sans-serif",
  ],
});

export const enSerif = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-en-serif",
});

export const enSans = Jost({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-en-sans",
});

export const fontVariables = [
  mincho.variable,
  gothic.variable,
  enSerif.variable,
  enSans.variable,
].join(" ");
