import { images } from "@/lib/images";

/**
 * トップページのテキストデータ
 * ------------------------------------------------------------
 * 文章はすべてこのファイルで編集できます。
 */
export const topPage = {
  hero: {
    en: "NARA WA POKE BIYORI",
    /** 改行位置を意図的に制御するため配列にしています */
    title: ["奈良で、", "ちょっといい日和。"],
    lead: [
      "奈良の食材と、ポケという新しい食文化。",
      "朝からお昼まで、それぞれの「日和」を。",
    ],
    image: images.top.hero,
    imageSp: images.top.heroSp,
  },

  concept: {
    en: "CONCEPT",
    heading: "奈良 × 和 × POKE",
    title: ["ポケに、", "奈良の感性を。"],
    paragraphs: [
      "「なら和ポケ日和」は、ポケという自由な食文化に、奈良らしい和の感性を掛け合わせたお店。",
      "新鮮な魚や野菜、素材を活かした味付けとともに、日常の中の“ちょっといい時間”を届けます。",
    ],
    image: images.top.concept,
  },

  /** モーニング / ランチ / ディナー / スイーツへの分岐導線 */
  gates: [
    {
      en: "MORNING",
      title: "朝のならポケ。",
      copy: ["ゆっくり始める朝も、", "一日を頑張る朝も。"],
      href: "/morning",
      linkLabel: "Morningを見る",
      image: images.top.gateMorning,
      theme: "light" as const,
    },
    {
      en: "LUNCH",
      title: "昼のならポケ。",
      copy: ["今日のランチを、", "ちょっといい時間に。"],
      href: "/lunch",
      linkLabel: "Lunchを見る",
      image: images.top.gateLunch,
      theme: "dark" as const,
    },
    {
      en: "DINNER",
      title: "夜のならポケ。",
      copy: ["一日の終わりに、", "ゆっくりと一皿を。"],
      href: "/dinner",
      linkLabel: "Dinnerを見る",
      image: images.top.gateDinner,
      theme: "dark" as const,
    },
    {
      en: "SWEETS",
      title: "甘いものも。",
      copy: ["食後にも、", "散歩のとちゅうにも。"],
      href: "/sweets",
      linkLabel: "Sweetsを見る",
      image: images.top.gateSweets,
      theme: "dark" as const,
    },
  ],

  gallery: {
    en: "FOOD & PLACE",
    title: "ならポケの、日々。",
    lead: "季節の食材と、店のいまを。",
    images: images.top.gallery,
  },

  instagram: {
    en: "FIND US ON INSTAGRAM",
    title: "ならポケの日々。",
    lead: "新しいメニューや営業のお知らせは、Instagramでお届けしています。",
  },

  access: {
    en: "ACCESS",
    title: "お店のこと。",
  },
} as const;
