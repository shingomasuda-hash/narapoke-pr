import { images } from "@/lib/images";
import type { MenuItem, Scene } from "./types";

/**
 * モーニングページのテキスト・メニューデータ
 * ------------------------------------------------------------
 * 文章はすべてこのファイルで編集できます。
 * 配列の要素を増減させれば、そのままページに反映されます。
 */

/**
 * ■ モーニングメニュー
 * 正式な商品名・価格が未確定のため、現在は空にしています。
 * 下の記入例をコピーして name / price / description / image を埋めるだけで、
 * ページにメニューセクションが表示されます（空の間は「準備中」表示になります）。
 *
 * 記入例：
 *   {
 *     name: "モーニングポケボウル",
 *     price: "¥880",
 *     description: "朝でも食べやすい、やさしい味つけのポケボウル。",
 *     image: images.morning.menu[0],
 *     recommended: true,
 *     badge: "人気No.1",
 *   },
 *
 * 画像は public/images/ に morning-menu-01.jpg 〜 を上書きするか、
 * lib/images.ts にパスを追加してください。
 */
export const morningMenu: MenuItem[] = [
  // ここに商品を追加してください
];

export const morningPage = {
  hero: {
    en: "MORNING",
    /** 改行位置を意図的に制御するため配列にしています */
    title: ["奈良の朝を、", "ちょっといい朝に。"],
    /** 配列にすると、その位置で必ず改行されます */
    lead: ["一日のはじまりに、", "ちゃんと美味しいものを。"],
    image: images.morning.hero,
    imageSp: images.morning.heroSp,
  },

  story: {
    en: "OUR MORNING",
    title: ["朝から、", "ちゃんと美味しいものを。"],
    paragraphs: [
      "忙しい日も、ゆっくりできる日も。\n一日の始まりに、ちゃんと美味しいものを食べてほしい。",
      "そんな想いから、ならポケの朝が始まりました。\n奈良の朝の光と、やわらかい時間のなかで。",
    ],
    image: images.morning.story,
  },

  menu: {
    en: "MORNING MENU",
    title: "朝のおしながき",
    /** メニューが未登録のときに表示される案内文 */
    emptyNote:
      "モーニングメニューは現在準備中です。\n最新のメニューはInstagramで公開しています。",
  },

  scenes: {
    en: "MORNING SCENE",
    title: "朝の、それぞれの日和。",
    items: [
      {
        en: "BEFORE WORK",
        title: "出勤前に。",
        description: "少し早起きした日の、静かな時間。",
        image: images.morning.scenes[0],
      },
      {
        en: "HOLIDAY",
        title: "休日の朝に。",
        description: "予定のない朝を、ゆっくり贅沢に。",
        image: images.morning.scenes[1],
      },
      {
        en: "WITH FRIENDS",
        title: "誰かと囲む朝に。",
        description: "友人と、家族と。話が弾む朝ごはん。",
        image: images.morning.scenes[2],
      },
      {
        en: "TRAVEL",
        title: "奈良めぐりの朝に。",
        description: "出かける前に、しっかり一皿。",
        image: images.morning.scenes[3],
      },
    ] satisfies Scene[],
  },

  cta: {
    en: "SEE YOU TOMORROW",
    title: ["明日の朝は、", "ならポケへ。"],
    lead: "奈良県橿原市・葛本町。駐車場からそのまま、朝の一皿へ。",
    image: images.morning.cta,
  },
} as const;
