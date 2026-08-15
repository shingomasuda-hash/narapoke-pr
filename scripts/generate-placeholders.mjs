/**
 * 仮画像ジェネレーター
 * ------------------------------------------------------------
 * public/images/ に、実際のサイトで使用するファイル名そのままの
 * 仮画像（.jpg）を書き出します。
 *
 * 本番写真への差し替え方法：
 *   同じファイル名の .jpg を public/images/ に上書きするだけ。
 *   コードの修正は一切不要です（推奨の縦横比は下の manifest を参照）。
 *
 * 実行： npm run images
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "images"
);

/* 仮画像のトーン。実写に差し替わるまでの「面」の色味を決める。 */
const TONES = {
  base: { bg: "#E7DFD1", glow: "#F6F1E7", ink: "#8C7B64" }, // 生成り
  light: { bg: "#F1EDE4", glow: "#FFFFFF", ink: "#A29A85" }, // 朝の光
  wood: { bg: "#CBB49A", glow: "#E4D6C1", ink: "#6E5540" }, // 木
  warm: { bg: "#B98A5E", glow: "#D8B287", ink: "#5A3D26" }, // 昼・食欲
  moss: { bg: "#5C6B52", glow: "#7E8C6E", ink: "#E8E4D8" }, // 深緑
  dark: { bg: "#312C26", glow: "#4A423A", ink: "#CFC6B6" }, // 墨
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg({ w, h, tone, label, index }) {
  const t = TONES[tone] ?? TONES.base;
  const short = Math.min(w, h);
  const r = short * 0.11;
  const labelSize = Math.max(11, short * 0.028);
  const indexSize = Math.max(9, short * 0.019);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="g" cx="38%" cy="30%" r="78%">
      <stop offset="0%" stop-color="${t.glow}" stop-opacity="0.95"/>
      <stop offset="62%" stop-color="${t.bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${t.bg}" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="v" cx="50%" cy="50%" r="72%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.16"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${
        (index ?? 1) * 7
      }"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#v)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.09"/>

  <g fill="none" stroke="${t.ink}" stroke-opacity="0.45">
    <circle cx="${w / 2}" cy="${h / 2 - short * 0.045}" r="${r}" stroke-width="${
    short * 0.0035
  }"/>
    <path d="M${w / 2 - r * 0.42} ${h / 2 - short * 0.045} h${r * 0.84}"
          stroke-width="${short * 0.0035}"/>
  </g>

  <text x="${w / 2}" y="${h / 2 + short * 0.105}"
        text-anchor="middle" fill="${t.ink}" fill-opacity="0.72"
        font-family="Liberation Serif, DejaVu Serif, serif"
        font-size="${labelSize}" letter-spacing="${labelSize * 0.28}">${esc(
    label
  )}</text>

  <text x="${w / 2}" y="${h / 2 + short * 0.155}"
        text-anchor="middle" fill="${t.ink}" fill-opacity="0.45"
        font-family="Liberation Sans, DejaVu Sans, sans-serif"
        font-size="${indexSize}" letter-spacing="${indexSize * 0.22}">PHOTO ${String(
    index ?? 1
  ).padStart(2, "0")} / ${w}×${h}</text>
</svg>`;
}

/**
 * 画像マニフェスト
 * file … public/images/ 配下のファイル名（lib/images.ts と対応）
 * w,h  … 推奨サイズ。差し替え時もこの縦横比を守ると崩れません。
 */
const manifest = [
  /* ---------------- 共通 / TOP ---------------- */
  { file: "hero-top.jpg", w: 2000, h: 1250, tone: "wood", label: "HERO" },
  { file: "hero-top-sp.jpg", w: 1200, h: 1600, tone: "wood", label: "HERO SP" },
  { file: "concept.jpg", w: 1200, h: 1500, tone: "base", label: "CONCEPT" },
  { file: "gate-morning.jpg", w: 1200, h: 1500, tone: "light", label: "MORNING" },
  { file: "gate-lunch.jpg", w: 1200, h: 1500, tone: "warm", label: "LUNCH" },
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

  /* ---------------- OGP / メニュー未設定時のフォールバック ---------------- */
  { file: "ogp.jpg", w: 1200, h: 630, tone: "wood", label: "NARA WA POKE BIYORI" },
  { file: "menu-placeholder.jpg", w: 1200, h: 900, tone: "base", label: "COMING SOON" },
];

await mkdir(OUT_DIR, { recursive: true });

let i = 0;
for (const item of manifest) {
  i += 1;
  const markup = svg({ ...item, index: i });
  const buffer = await sharp(Buffer.from(markup))
    .jpeg({ quality: 82, chromaSubsampling: "4:4:4" })
    .toBuffer();
  await writeFile(path.join(OUT_DIR, item.file), buffer);
}

await writeFile(
  path.join(OUT_DIR, "README.md"),
  `# public/images

このディレクトリの画像はすべて **仮画像** です。

## 差し替え方法

同じファイル名の \`.jpg\` を上書きしてください。コードの変更は不要です。
（パスは \`lib/images.ts\` で一元管理しています）

## 推奨サイズ一覧

| ファイル名 | 推奨サイズ | 縦横比 |
| --- | --- | --- |
${manifest
  .map((m) => {
    const g = (a, b) => (b ? g(b, a % b) : a);
    const d = g(m.w, m.h);
    return `| ${m.file} | ${m.w}×${m.h} | ${m.w / d}:${m.h / d} |`;
  })
  .join("\n")}

## 再生成

\`\`\`bash
npm run images
\`\`\`
`
);

console.log(`generated ${manifest.length} placeholder images -> public/images/`);
