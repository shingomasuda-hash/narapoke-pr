/**
 * 画像マニフェスト（サイト全体で使う画像の一覧と推奨サイズ）
 * ------------------------------------------------------------
 * このファイルが画像サイズの唯一の定義元です。
 *   - scripts/generate-placeholders.mjs … 仮画像の生成
 *   - scripts/import-photos.mjs         … 本番写真の取り込み・リサイズ
 *
 * file … public/images/ 配下のファイル名（lib/images.ts と対応）
 * w,h  … 推奨サイズ。この縦横比で中央基準にトリミングされます。
 * tone / label … 仮画像の見た目にのみ使用（本番写真には無関係）
 */

export const manifest = [
  /* ---------------- 共通 / TOP ---------------- */
  { file: "hero-top.jpg", w: 2000, h: 1250, tone: "wood", label: "HERO" },
  { file: "hero-top-sp.jpg", w: 1200, h: 1600, tone: "wood", label: "HERO SP" },
  { file: "concept.jpg", w: 1200, h: 1500, tone: "base", label: "CONCEPT" },
  { file: "gate-morning.jpg", w: 1200, h: 1500, tone: "light", label: "MORNING" },
  { file: "gate-lunch.jpg", w: 1200, h: 1500, tone: "warm", label: "LUNCH" },
  { file: "gate-dinner.jpg", w: 1200, h: 1500, tone: "dark", label: "DINNER" },
  { file: "gate-sweets.jpg", w: 1200, h: 1500, tone: "warm", label: "SWEETS" },
  { file: "shop-exterior.jpg", w: 1600, h: 1000, tone: "base", label: "SHOP" },
  { file: "shop-interior.jpg", w: 1200, h: 1500, tone: "wood", label: "INTERIOR" },

  /* ---------------- TOP ギャラリー ---------------- */
  { file: "gallery-01.jpg", w: 1400, h: 1000, tone: "warm", label: "POKE BOWL" },
  { file: "gallery-02.jpg", w: 900, h: 1200, tone: "light", label: "MORNING SET" },
  { file: "gallery-03.jpg", w: 1000, h: 1000, tone: "moss", label: "VEGETABLE" },
  { file: "gallery-04.jpg", w: 900, h: 1200, tone: "wood", label: "TABLE" },
  { file: "gallery-05.jpg", w: 1400, h: 900, tone: "base", label: "INTERIOR" },
  { file: "gallery-06.jpg", w: 1000, h: 1000, tone: "warm", label: "DETAIL" },

  /* ---------------- Instagram ---------------- */
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    file: `instagram-0${n}.jpg`,
    w: 900,
    h: 900,
    tone: ["warm", "light", "base", "moss", "wood", "warm"][n - 1],
    label: "INSTAGRAM",
  })),

  /* ---------------- Morning ---------------- */
  { file: "morning-hero.jpg", w: 2000, h: 1250, tone: "light", label: "MORNING" },
  { file: "morning-hero-sp.jpg", w: 1200, h: 1600, tone: "light", label: "MORNING" },
  { file: "morning-story.jpg", w: 1200, h: 1500, tone: "light", label: "STORY" },
  { file: "morning-cta.jpg", w: 2000, h: 1100, tone: "wood", label: "GOOD MORNING" },
  ...[1, 2, 3].map((n) => ({
    file: `morning-menu-0${n}.jpg`,
    w: 1200,
    h: 900,
    tone: n === 1 ? "light" : "base",
    label: "MORNING MENU",
  })),
  ...[1, 2, 3, 4].map((n) => ({
    file: `morning-scene-0${n}.jpg`,
    w: n % 2 === 0 ? 900 : 1200,
    h: n % 2 === 0 ? 1200 : 900,
    tone: ["light", "base", "wood", "light"][n - 1],
    label: "SCENE",
  })),

  /* ---------------- Lunch ---------------- */
  { file: "lunch-hero.jpg", w: 2000, h: 1250, tone: "warm", label: "LUNCH" },
  { file: "lunch-hero-sp.jpg", w: 1200, h: 1600, tone: "warm", label: "LUNCH" },
  { file: "lunch-concept.jpg", w: 1400, h: 1000, tone: "warm", label: "POKE" },
  { file: "lunch-cta.jpg", w: 2000, h: 1100, tone: "dark", label: "TODAY'S LUNCH" },
  ...[1, 2, 3, 4].map((n) => ({
    file: `lunch-menu-0${n}.jpg`,
    w: 1200,
    h: 900,
    tone: ["warm", "base", "moss", "wood"][n - 1],
    label: "LUNCH MENU",
  })),
  ...[1, 2, 3, 4].map((n) => ({
    file: `lunch-step-0${n}.jpg`,
    w: 900,
    h: 900,
    tone: ["base", "moss", "warm", "wood"][n - 1],
    label: ["PICK", "TOPPING", "SAUCE", "ENJOY"][n - 1],
  })),
  { file: "lunch-gallery-01.jpg", w: 1000, h: 1000, tone: "warm", label: "EGG YOLK" },
  { file: "lunch-gallery-02.jpg", w: 900, h: 1200, tone: "moss", label: "GREENS" },
  { file: "lunch-gallery-03.jpg", w: 1400, h: 900, tone: "warm", label: "SASHIMI" },
  { file: "lunch-gallery-04.jpg", w: 900, h: 1200, tone: "wood", label: "SAUCE" },
  { file: "lunch-gallery-05.jpg", w: 1000, h: 1000, tone: "base", label: "RICE" },
  { file: "lunch-gallery-06.jpg", w: 1400, h: 900, tone: "warm", label: "BOWL" },

  /* ---------------- Dinner ---------------- */
  { file: "dinner-hero.jpg", w: 2000, h: 1250, tone: "dark", label: "DINNER" },
  { file: "dinner-hero-sp.jpg", w: 1200, h: 1600, tone: "dark", label: "DINNER" },
  { file: "dinner-concept.jpg", w: 1400, h: 1000, tone: "dark", label: "DINNER POKE" },
  { file: "dinner-cta.jpg", w: 2000, h: 1100, tone: "dark", label: "TONIGHT" },
  ...[1, 2, 3].map((n) => ({
    file: `dinner-menu-0${n}.jpg`,
    w: 1200,
    h: 900,
    tone: "dark",
    label: "DINNER MENU",
  })),
  { file: "dinner-gallery-01.jpg", w: 1000, h: 1000, tone: "dark", label: "NIGHT" },
  { file: "dinner-gallery-02.jpg", w: 900, h: 1200, tone: "wood", label: "TABLE" },
  { file: "dinner-gallery-03.jpg", w: 1400, h: 900, tone: "dark", label: "BOWL" },
  { file: "dinner-gallery-04.jpg", w: 900, h: 1200, tone: "warm", label: "TAKEOUT" },

  /* ---------------- Sweets ---------------- */
  { file: "sweets-hero.jpg", w: 2000, h: 1250, tone: "warm", label: "SWEETS" },
  { file: "sweets-hero-sp.jpg", w: 1200, h: 1600, tone: "warm", label: "SWEETS" },
  { file: "sweets-concept.jpg", w: 960, h: 1200, tone: "warm", label: "DESSERT" },
  { file: "sweets-cta.jpg", w: 2000, h: 1100, tone: "wood", label: "SWEET TIME" },
  ...[1, 2, 3, 4, 5].map((n) => ({
    file: `sweets-menu-0${n}.jpg`,
    w: 1200,
    h: 900,
    tone: "warm",
    label: "SWEETS MENU",
  })),
  { file: "sweets-gallery-01.jpg", w: 1000, h: 1000, tone: "warm", label: "DRINK" },
  { file: "sweets-gallery-02.jpg", w: 900, h: 1200, tone: "warm", label: "DRINK" },
  { file: "sweets-gallery-03.jpg", w: 1400, h: 900, tone: "wood", label: "BRULEE" },
  { file: "sweets-gallery-04.jpg", w: 900, h: 1200, tone: "light", label: "ACAI" },

  /* ---------------- OGP / メニュー未設定時のフォールバック ---------------- */
  { file: "ogp.jpg", w: 1200, h: 630, tone: "wood", label: "NARA WA POKE BIYORI" },
  { file: "menu-placeholder.jpg", w: 1200, h: 900, tone: "base", label: "COMING SOON" },
];
