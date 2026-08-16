import { images } from "@/lib/images";
import type { MenuItem } from "./types";

/**
 * ディナーページのテキスト・メニューデータ
 * ------------------------------------------------------------
 * 文章はすべてこのファイルで編集できます。
 */

/**
 * ■ ディナーメニュー
 * 正式な商品名・価格が未確定のため、現在は空にしています。
 * 下の記入例をコピーして埋めるだけでページに反映されます。
 *
 * 記入例：
 *   {
 *     name: "夜のポケボウル",
 *     price: "¥1,480",
 *     description: "お酒にも合う、少し濃いめの味つけで。",
 *     image: images.dinner.menu[0],
 *     recommended: true,
 *     badge: "夜限定",
 *   },
 */
export const dinnerMenu: MenuItem[] = [
  {
    name: "ポケ丼（プランA〜D）",
    price: "¥1,320 〜 ¥1,780",
    description:
      "夜も同じく、メイン2〜3種とサブ3〜4種から。組み合わせは約100通り。",
    image: images.dinner.menu[0],
    recommended: true,
    badge: "約100通り",
  },
  {
    name: "テイクアウト",
    price: "",
    description: "お持ち帰りもできます。仕事帰りに、そのまま持って。",
    image: images.dinner.menu[1],
  },
  {
    name: "〆の鯛だし",
    price: "",
    description: "食べ進めたら鯛だしをかけて。一日の終わりに、さっぱりと。",
    image: images.dinner.menu[2],
  },
];

export const dinnerPage = {
  hero: {
    en: "DINNER",
    title: ["一日の終わりに、", "ゆっくりと。"],
    lead: "灯りを落とした店内で、夜のならポケを。",
    image: images.dinner.hero,
    imageSp: images.dinner.heroSp,
  },

  concept: {
    en: "NIGHT POKE",
    title: ["夜は、", "少し深い味わいに。"],
    paragraphs: [
      "同じポケでも、夜は少しだけ表情が変わります。\n味つけを深く、盛りつけを静かに。一日の終わりに寄り添う一杯を。",
      "仕事帰りにひとりで。誰かと軽く一杯を添えて。\n奈良の夜に、肩の力を抜ける場所を。",
    ],
    image: images.dinner.concept,
  },

  menu: {
    en: "DINNER MENU",
    title: "夜のおしながき",
    /** メニューが未登録のときに表示される案内文 */
    emptyNote:
      "ディナーメニューは現在準備中です。\n最新のメニューはInstagramで公開しています。",
  },

  gallery: {
    en: "AT NIGHT",
    title: "夜の、ならポケ。",
    images: images.dinner.gallery,
  },

  cta: {
    en: "TONIGHT",
    title: ["今夜は、", "ならポケ日和。"],
    lead: "奈良県橿原市・葛本町。約30台の共用駐車場から、そのまま夜の一皿へ。",
    image: images.dinner.cta,
  },
} as const;
