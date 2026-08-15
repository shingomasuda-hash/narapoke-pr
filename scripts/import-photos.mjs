/**
 * 本番写真の取り込み
 * ------------------------------------------------------------
 * Googleドライブなどからダウンロードした高解像度の写真を、
 * サイトが使うファイル名・サイズ・軽さに一括変換して
 * public/images/ に書き出します。
 *
 * 元の写真（10〜20MBなど）はそのままでは重すぎるため、
 * 中央基準でトリミング → リサイズ → 圧縮まで自動で行います。
 *
 * ------------------------------------------------------------
 * 使い方
 *
 * 1) 割り当て表をつくる（写真フォルダを指定するだけ）
 *      npm run photos:plan -- ~/Downloads/なら和ポケ日和
 *
 *    → photo-mapping.json が生成されます。
 *      "写真のファイル名" を書き込むだけの雛形です。
 *
 * 2) photo-mapping.json を編集して、どの写真をどこに使うか決める
 *
 *      {
 *        "hero-top.jpg":      "なら和ポケ日和-12.jpg",
 *        "lunch-hero.jpg":    "なら和ポケ日和-43.jpg",
 *        "gallery-01.jpg":    "0310追加撮影-5.jpg"
 *      }
 *
 *    空欄（""）のままにした項目は、仮画像のまま残ります。
 *
 * 3) 取り込む
 *      npm run photos -- ~/Downloads/なら和ポケ日和
 *
 * ------------------------------------------------------------
 * 補足
 * ・元の写真は一切変更しません（読み込むだけ）。
 * ・トリミング位置を変えたい場合は photo-mapping.json で
 *     "hero-top.jpg": { "src": "写真.jpg", "position": "top" }
 *   のように書けます（top / bottom / left / right / center）。
 */
import { mkdir, readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { manifest } from "./image-manifest.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images");
const MAPPING_PATH = path.join(ROOT, "photo-mapping.json");

const PLAN_ONLY = process.argv.includes("--plan");
const srcDir = process.argv.slice(2).find((a) => !a.startsWith("--"));

if (!srcDir) {
  console.error(
    "使い方: npm run photos -- <写真フォルダのパス>\n" +
      "      : npm run photos:plan -- <写真フォルダのパス>   （割り当て表の雛形を作る）"
  );
  process.exit(1);
}

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".heic"]);

/** フォルダ内の画像を再帰的に集める */
async function collect(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await collect(full)));
    else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) found.push(full);
  }
  return found;
}

const sources = await collect(srcDir);
if (sources.length === 0) {
  console.error(`画像が見つかりませんでした: ${srcDir}`);
  process.exit(1);
}

/* 日本語のファイル名を含むため、数値を意識した自然順で並べる */
const collator = new Intl.Collator("ja", { numeric: true, sensitivity: "base" });
sources.sort((a, b) => collator.compare(path.basename(a), path.basename(b)));

/* ---------------- 割り当て表の雛形を出力する ---------------- */
if (PLAN_ONLY) {
  const template = {};
  for (const item of manifest) template[item.file] = "";

  await writeFile(
    MAPPING_PATH,
    JSON.stringify(template, null, 2) + "\n"
  );

  console.log(`割り当て表を作成しました: ${path.relative(ROOT, MAPPING_PATH)}\n`);
  console.log("■ 埋めるべき枠（左）と推奨サイズ");
  for (const item of manifest) {
    console.log(`   ${item.file.padEnd(26)} ${item.w}×${item.h}`);
  }
  console.log(`\n■ ${srcDir} で見つかった写真 ${sources.length}枚`);
  for (const s of sources) console.log(`   ${path.basename(s)}`);
  console.log(
    "\nphoto-mapping.json の右側に写真のファイル名を書いてから、" +
      "\n  npm run photos -- <写真フォルダ>\nを実行してください。"
  );
  process.exit(0);
}

/* ---------------- 実際に取り込む ---------------- */
let mapping;
try {
  mapping = JSON.parse(await readFile(MAPPING_PATH, "utf8"));
} catch {
  console.error(
    `${path.relative(ROOT, MAPPING_PATH)} がありません。\n` +
      `先に  npm run photos:plan -- ${srcDir}  を実行してください。`
  );
  process.exit(1);
}

/** ファイル名（大文字小文字・拡張子ゆれを許容）で元写真を引く */
const byName = new Map();
for (const s of sources) {
  const base = path.basename(s);
  byName.set(base.toLowerCase(), s);
  byName.set(path.parse(base).name.toLowerCase(), s);
}

await mkdir(OUT_DIR, { recursive: true });

const done = [];
const skipped = [];
const missing = [];

for (const item of manifest) {
  const raw = mapping[item.file];
  const src = typeof raw === "string" ? raw : raw?.src;
  const position = (typeof raw === "object" && raw?.position) || "center";

  if (!src) {
    skipped.push(item.file);
    continue;
  }

  const resolved = byName.get(src.toLowerCase()) ?? byName.get(path.parse(src).name.toLowerCase());
  if (!resolved) {
    missing.push(`${item.file} ← ${src}（写真が見つかりません）`);
    continue;
  }

  const out = path.join(OUT_DIR, item.file);
  const before = (await stat(resolved)).size;

  await sharp(resolved)
    .rotate() // EXIF の向きを反映
    .resize(item.w, item.h, { fit: "cover", position })
    .jpeg({ quality: 78, progressive: true, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toFile(out);

  const after = (await stat(out)).size;
  done.push(
    `${item.file.padEnd(26)} ← ${path.basename(resolved).padEnd(28)} ` +
      `${(before / 1048576).toFixed(1)}MB → ${Math.round(after / 1024)}KB`
  );
}

console.log(`■ 取り込み完了 ${done.length}枚`);
for (const line of done) console.log(`   ${line}`);

if (missing.length) {
  console.log(`\n■ 見つからなかった指定 ${missing.length}件`);
  for (const line of missing) console.log(`   ${line}`);
}

if (skipped.length) {
  console.log(
    `\n■ 未割り当て ${skipped.length}枠（仮画像のままです）\n   ${skipped.join(", ")}`
  );
}
