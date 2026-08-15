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
import { manifest } from "./image-manifest.mjs";

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
