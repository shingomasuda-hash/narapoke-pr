/**
 * 画像パス一元管理
 * ------------------------------------------------------------
 * サイト内で使う画像はすべてここを経由します。
 * コンポーネント側に画像パスを直書きしないでください。
 *
 * 【写真の差し替え方】
 *  A. 同じファイル名の写真を public/images/ に上書きする（コード変更不要・推奨）
 *  B. 別名で置いた場合は、このファイルのパス文字列だけを書き換える
 *
 * 推奨サイズは public/images/README.md を参照してください。
 */

const dir = "/images";

export const images = {
  /* ---------------- 共通 ---------------- */
  ogp: `${dir}/ogp.jpg`,
  /** メニューに画像が未設定のときに使われる代替画像 */
  menuFallback: `${dir}/menu-placeholder.jpg`,
  shopExterior: `${dir}/shop-exterior.jpg`,
  shopInterior: `${dir}/shop-interior.jpg`,

  /* ---------------- TOP ---------------- */
  top: {
    /** PC・タブレット用のヒーロー（横長） */
    hero: `${dir}/hero-top.jpg`,
    /** スマートフォン用のヒーロー（縦長トリミング） */
    heroSp: `${dir}/hero-top-sp.jpg`,
    concept: `${dir}/concept.jpg`,
    gateMorning: `${dir}/gate-morning.jpg`,
    gateLunch: `${dir}/gate-lunch.jpg`,
    /** ディナーを /lunch に統合したため現在は未使用。夜の写真として再利用可。 */
    gateDinner: `${dir}/gate-dinner.jpg`,
    gateSweets: `${dir}/gate-sweets.jpg`,
    gallery: [
      `${dir}/gallery-01.jpg`,
      `${dir}/gallery-02.jpg`,
      `${dir}/gallery-03.jpg`,
      `${dir}/gallery-04.jpg`,
      `${dir}/gallery-05.jpg`,
      `${dir}/gallery-06.jpg`,
    ],
  },

  /* ---------------- Instagram ---------------- */
  instagram: [
    `${dir}/instagram-01.jpg`,
    `${dir}/instagram-02.jpg`,
    `${dir}/instagram-03.jpg`,
    `${dir}/instagram-04.jpg`,
    `${dir}/instagram-05.jpg`,
    `${dir}/instagram-06.jpg`,
  ],

  /* ---------------- Morning ---------------- */
  morning: {
    hero: `${dir}/morning-hero.jpg`,
    heroSp: `${dir}/morning-hero-sp.jpg`,
    story: `${dir}/morning-story.jpg`,
    cta: `${dir}/morning-cta.jpg`,
    menu: [
      `${dir}/morning-menu-01.jpg`,
      `${dir}/morning-menu-02.jpg`,
      `${dir}/morning-menu-03.jpg`,
    ],
    scenes: [
      `${dir}/morning-scene-01.jpg`,
      `${dir}/morning-scene-02.jpg`,
      `${dir}/morning-scene-03.jpg`,
      `${dir}/morning-scene-04.jpg`,
    ],
  },

  /* ---------------- Lunch ---------------- */
  lunch: {
    hero: `${dir}/lunch-hero.jpg`,
    heroSp: `${dir}/lunch-hero-sp.jpg`,
    concept: `${dir}/lunch-concept.jpg`,
    cta: `${dir}/lunch-cta.jpg`,
    menu: [
      `${dir}/lunch-menu-01.jpg`,
      `${dir}/lunch-menu-02.jpg`,
      `${dir}/lunch-menu-03.jpg`,
      `${dir}/lunch-menu-04.jpg`,
    ],
    steps: [
      `${dir}/lunch-step-01.jpg`,
      `${dir}/lunch-step-02.jpg`,
      `${dir}/lunch-step-03.jpg`,
      `${dir}/lunch-step-04.jpg`,
    ],
    gallery: [
      `${dir}/lunch-gallery-01.jpg`,
      `${dir}/lunch-gallery-02.jpg`,
      `${dir}/lunch-gallery-03.jpg`,
      `${dir}/lunch-gallery-04.jpg`,
      `${dir}/lunch-gallery-05.jpg`,
      `${dir}/lunch-gallery-06.jpg`,
    ],
  },

  /* ---------------- Dinner ---------------- */
  dinner: {
    hero: `${dir}/dinner-hero.jpg`,
    heroSp: `${dir}/dinner-hero-sp.jpg`,
    concept: `${dir}/dinner-concept.jpg`,
    cta: `${dir}/dinner-cta.jpg`,
    menu: [
      `${dir}/dinner-menu-01.jpg`,
      `${dir}/dinner-menu-02.jpg`,
      `${dir}/dinner-menu-03.jpg`,
    ],
    gallery: [
      `${dir}/dinner-gallery-01.jpg`,
      `${dir}/dinner-gallery-02.jpg`,
      `${dir}/dinner-gallery-03.jpg`,
      `${dir}/dinner-gallery-04.jpg`,
    ],
  },

  /* ---------------- Sweets ---------------- */
  sweets: {
    hero: `${dir}/sweets-hero.jpg`,
    heroSp: `${dir}/sweets-hero-sp.jpg`,
    concept: `${dir}/sweets-concept.jpg`,
    cta: `${dir}/sweets-cta.jpg`,
    menu: [
      `${dir}/sweets-menu-01.jpg`,
      `${dir}/sweets-menu-02.jpg`,
      `${dir}/sweets-menu-03.jpg`,
    ],
    gallery: [
      `${dir}/sweets-gallery-01.jpg`,
      `${dir}/sweets-gallery-02.jpg`,
      `${dir}/sweets-gallery-03.jpg`,
      `${dir}/sweets-gallery-04.jpg`,
    ],
  },
} as const;
