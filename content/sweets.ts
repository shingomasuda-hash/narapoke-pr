import { images } from "@/lib/images";
import type { MenuItem } from "./types";

/**
 * スイーツページのテキスト・メニューデータ
 * ------------------------------------------------------------
 * 文章はすべてこのファイルで編集できます。
 */

/**
 * ■ スイーツ / ドリンクメニュー
 * 正式な商品名・価格が未確定のため、現在は空にしています。
 * 下の記入例をコピーして埋めるだけでページに反映されます。
 *
 * 記入例：
 *   {
 *     name: "クレームブリュレ",
 *     price: "¥580",
 *     description: "表面はぱりっと、中はなめらかに。",
 *     image: images.sweets.menu[0],
 *     recommended: true,
 *     badge: "人気No.1",
 *   },
 */
export const sweetsMenu: MenuItem[] = [
  {
    name: "芋ブリュレ",
    price: "¥980",
    description:
      "まるごとのさつまいもを香ばしく焦がしたブリュレ。中でバニラアイスがとろけ、マシュマロとオレオを添えて。",
    image: images.sweets.menu[0],
    recommended: true,
    badge: "人気",
  },
  {
    name: "プリン",
    price: "",
    description: "銀の皿にのせた、昔ながらのかたさ。ほろ苦いカラメルをまとって。",
    image: images.sweets.menu[3],
  },
  {
    name: "チーズケーキ",
    price: "",
    description: "表面を香ばしく焼き上げて。コーヒーと一緒に、ゆっくりと。",
    image: images.sweets.menu[4],
  },
  {
    name: "スムージー",
    price: "",
    description: "果実をそのまま。テイクアウトもできます。",
    image: images.sweets.menu[1],
  },
  {
    name: "アサイーボウル",
    price: "",
    description: "グラノーラとフルーツを重ねて。朝にも、おやつにも。",
    image: images.sweets.menu[2],
  },
];

export const sweetsPage = {
  hero: {
    en: "SWEETS",
    title: ["甘いものは、", "別の日和。"],
    lead: "食後にも、散歩のとちゅうにも。",
    image: images.sweets.hero,
    imageSp: images.sweets.heroSp,
  },

  concept: {
    en: "SWEET TIME",
    title: ["ひとくちの、", "ごほうび。"],
    paragraphs: [
      "香ばしく焦がしたブリュレ、なめらかなプリン、チーズケーキ、果実のドリンク。\n食事のあとにも、ちょっと立ち寄るだけでも。",
      "テイクアウトもできるので、そのまま奈良の散歩へ。\n甘いものの時間は、いつだって自由です。",
    ],
    image: images.sweets.concept,
  },

  menu: {
    en: "SWEETS MENU",
    title: "甘いもののおしながき",
    /** メニューが未登録のときに表示される案内文 */
    emptyNote:
      "スイーツ・ドリンクメニューは現在準備中です。\n最新のメニューはInstagramで公開しています。",
  },

  gallery: {
    en: "CLOSE UP",
    title: "甘いものの、いちばん近く。",
    images: images.sweets.gallery,
  },

  cta: {
    en: "SWEET BREAK",
    title: ["ひと息つきに、", "ならポケへ。"],
    lead: "奈良県橿原市・葛本町。テイクアウトもできます。",
    image: images.sweets.cta,
  },
} as const;
