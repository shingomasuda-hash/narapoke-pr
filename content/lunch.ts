import { images } from "@/lib/images";
import type { MenuItem, Step } from "./types";

/**
 * ランチページのテキスト・メニューデータ
 * ------------------------------------------------------------
 * 文章はすべてこのファイルで編集できます。
 */

/**
 * ■ ランチメニュー
 * 正式な商品名・価格が未確定のため、現在は空にしています。
 * 下の記入例をコピーして埋めるだけでページに反映されます。
 *
 * 記入例：
 *   {
 *     name: "ならポケボウル",
 *     price: "¥1,280",
 *     description: "彩り野菜と旬の魚を、特製ダレで。",
 *     image: images.lunch.menu[0],
 *     recommended: true,
 *     badge: "人気No.1",   // 省略すると "RECOMMENDED" のみ表示
 *   },
 *
 * recommended: true の商品は、一覧の中で大きく（2カラム分）表示されます。
 */
export const lunchMenu: MenuItem[] = [
  // ここに商品を追加してください
];

export const lunchPage = {
  hero: {
    en: "LUNCH",
    title: ["今日のごほうびに、", "ならポケ。"],
    lead: "混ぜて、美味しい。選んで、楽しい。",
    image: images.lunch.hero,
    imageSp: images.lunch.heroSp,
  },

  concept: {
    en: "WHAT'S POKE",
    title: ["ひとつのボウルに、", "好きなものを。"],
    paragraphs: [
      "魚・野菜・ご飯・タレ。\n好きなものを一つのボウルで楽しめるポケに、日本らしい味と奈良らしい感性を。",
      "食べ応えはあるのに、重たすぎない。\nそんなランチを届けます。",
    ],
    image: images.lunch.concept,
  },

  menu: {
    en: "LUNCH MENU",
    title: "昼のおしながき",
    emptyNote:
      "ランチメニューは現在準備中です。\n最新のメニューはInstagramで公開しています。",
  },

  /**
   * ■ カスタマイズ / 選び方セクション
   * enabled を true にすると、ランチページに表示されます。
   * description は空のままだと非表示になります。
   *
   * 記入例：
   *   description: "ベースになるご飯と、その日の魚を選びます。"
   */
  customize: {
    enabled: false,
    en: "HOW TO ENJOY",
    title: "選んで、つくる。",
    lead: "",
    steps: [
      {
        en: "PICK",
        title: "選ぶ",
        description: "",
        image: images.lunch.steps[0],
      },
      {
        en: "TOPPING",
        title: "のせる",
        description: "",
        image: images.lunch.steps[1],
      },
      {
        en: "SAUCE",
        title: "かける",
        description: "",
        image: images.lunch.steps[2],
      },
      {
        en: "ENJOY",
        title: "味わう",
        description: "",
        image: images.lunch.steps[3],
      },
    ] satisfies Step[],
  },

  gallery: {
    en: "CLOSE UP",
    title: "素材の、いちばん近く。",
    images: images.lunch.gallery,
  },

  cta: {
    en: "TODAY'S POKE",
    title: ["今日は、", "ならポケ日和。"],
    lead: "奈良県橿原市・葛本町。約30台の共用駐車場から、すぐ一皿へ。",
    image: images.lunch.cta,
  },
} as const;
