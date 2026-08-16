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
  {
    name: "ポケ丼（プランA〜D）",
    price: "¥1,320 〜 ¥1,780",
    description:
      "メインを2〜3種、サブを3〜4種。選び方によって、組み合わせは約100通り。",
    image: images.lunch.menu[0],
    recommended: true,
    badge: "約100通り",
  },
  {
    name: "〆の鯛だし",
    price: "",
    description: "食べ進めたら鯛だしをかけて。最後までさっぱりと。",
    image: images.lunch.menu[1],
  },
  {
    name: "テイクアウト",
    price: "",
    description: "お持ち帰りもできます。ピクニックにも、お家ごはんにも。",
    image: images.lunch.menu[2],
  },
];

export const lunchPage = {
  hero: {
    en: "LUNCH & DINNER",
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
      "食べ応えはあるのに、重たすぎない。\nそんな一皿を、昼も夜も。",
    ],
    image: images.lunch.concept,
  },

  menu: {
    en: "LUNCH & DINNER MENU",
    title: "昼と夜のおしながき",
    /** 見出しの下に添える一文。空にすると非表示になります。 */
    note: "ランチとディナーは同じメニューです。",
    emptyNote:
      "メニューは現在準備中です。\n最新のメニューはInstagramで公開しています。",
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
    enabled: true,
    en: "HOW TO ENJOY",
    title: "選んで、つくる。",
    lead: "プランを決めて、好きな具材を選ぶだけ。組み合わせは約100通りあります。",
    steps: [
      {
        en: "PLAN",
        title: "プランを選ぶ",
        description: "AからDの4プラン。選べる具材の数が変わります。",
        image: images.lunch.steps[0],
      },
      {
        en: "MAIN",
        title: "メインを選ぶ",
        description: "サーモン、マグロ、タコ、ネギトロなどから2〜3種。",
        image: images.lunch.steps[1],
      },
      {
        en: "SIDE",
        title: "サブを選ぶ",
        description: "トマト、枝豆、レタス、パプリカ、コーンなど14種類から3〜4種。",
        image: images.lunch.steps[2],
      },
      {
        en: "FINISH",
        title: "鯛だしで締める",
        description: "食べ進めたら鯛だしをかけて。最後までさっぱりと。",
        image: images.lunch.steps[3],
      },
    ] satisfies Step[],
  },

  /**
   * ■ 夜の顔
   * ディナーはランチと同じメニューのため、専用ページは設けず
   * このページの後半で夜の世界観を見せている。
   * 写真は lib/images.ts の dinner.* を流用。
   */
  night: {
    en: "AT NIGHT",
    title: ["夜は、", "灯りを落として。"],
    paragraphs: [
      "メニューは昼と同じ。\n変わるのは、店内の灯りと、時間の流れだけ。",
      "仕事帰りにひとりで。誰かと囲んで。\n奈良の夜に、肩の力を抜ける場所を。",
    ],
    /* ポケ丼が続かないよう、夜は料理ではなく店内の灯りを見せる */
    image: images.dinner.gallery[1],
  },

  gallery: {
    en: "CLOSE UP",
    title: "素材と、店の空気と。",
    /*
     * 料理の寄りだけを並べると単調になるため、
     * 店内・手元・ロゴ・テイクアウトを織り交ぜている。
     * 入れ替えたいときはこの配列の順番を変えるだけで反映される。
     */
    images: [
      images.lunch.gallery[0], // 卵黄とタレの寄り
      images.top.gallery[4], // 店内のカウンターと提灯
      images.lunch.gallery[2], // 器を手に持つ
      images.top.gallery[5], // 壁のロゴ
      images.lunch.gallery[4], // 盛りつけ
      images.dinner.gallery[3], // テイクアウト
    ],
  },

  cta: {
    en: "TODAY'S POKE",
    title: ["今日は、", "ならポケ日和。"],
    lead: "奈良県橿原市・葛本町。約30台の共用駐車場から、すぐ一皿へ。",
    image: images.lunch.cta,
  },
} as const;
