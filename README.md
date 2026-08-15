# なら和ポケ日和 公式サイト

奈良県橿原市の「なら和ポケ日和」公式Webサイト。
TOP・モーニング・ランチの3ページを中心に、Instagram / Google検索 / Googleマップからの
**スマートフォン流入**を前提に設計しています。

Next.js (App Router) / TypeScript / Tailwind CSS / Motion

---

## 起動

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 本番ビルド
npm run images  # 仮画像の再生成
```

---

## ページ構成

| URL | 内容 |
| --- | --- |
| `/` | ブランド全体。Hero → Concept → モーニング/ランチ分岐 → ギャラリー → Instagram → 店舗情報 |
| `/morning` | モーニング専用。Hero → ストーリー → メニュー → 利用シーン → 最終CTA |
| `/lunch` | ランチ専用。Hero → ポケのコンセプト → メニュー → 選び方 → クローズアップ → 最終CTA |
| `/access` | 店舗情報・アクセス（Googleマップからの着地用） |

---

## 編集する場所

文章・メニュー・店舗情報は **`content/` の中だけ** で完結します。
コンポーネントを触る必要はありません。

| ファイル | 内容 |
| --- | --- |
| `content/shop.ts` | 店名・住所・駐車場・営業時間・定休日・電話・Instagram・地図URL |
| `content/top.ts` | TOPページの文章 |
| `content/morning.ts` | モーニングの文章と **モーニングメニュー** |
| `content/lunch.ts` | ランチの文章と **ランチメニュー**・選び方 |
| `lib/images.ts` | 画像パスの一元管理 |

### 営業時間などを入れる

`content/shop.ts` の該当項目を埋めるだけです。

```ts
hours: [
  { label: "モーニング", time: "8:00 - 11:00" },
  { label: "ランチ",     time: "11:00 - 15:00" },
],
closed: "水曜日",
tel: "0744-00-0000",
```

> 空文字 `""` のままの項目はサイト上に表示されません。
> 未確定の情報が公開されたり、構造化データに誤って出力されることはありません。
> 営業時間が未入力の間は「最新の情報はInstagramでご確認ください」という案内に切り替わります。

### メニューを追加する

`content/morning.ts` / `content/lunch.ts` の配列に追加します。
**正式な商品名・価格が未確定のため、現在は意図的に空**にしてあります
（空の間は「準備中」表示になり、Instagramへ誘導されます）。

```ts
export const lunchMenu: MenuItem[] = [
  {
    name: "ならポケボウル",
    price: "¥1,280",
    description: "彩り野菜と旬の魚を、特製ダレで。",
    image: images.lunch.menu[0],
    recommended: true,   // 大きく表示され RECOMMENDED ラベルが付く
    badge: "人気No.1",    // 省略可
  },
];
```

### 「選び方」セクション（01 PICK → 04 ENJOY）

`content/lunch.ts` の `customize.enabled` を `true` にすると表示されます。
各ステップの `description` は空のままだと説明文の行が出ません。

---

## 写真の差し替え

`public/images/` の画像はすべて仮画像です。差し替え方は2通りあります。

### A. 撮影データからまとめて取り込む（推奨）

Googleドライブなどからダウンロードした高解像度の写真（1枚10〜20MB）を、
**サイトが使うファイル名・サイズ・軽さに一括変換**します。
トリミング・リサイズ・圧縮は自動です。元の写真は変更しません。

```bash
# 1) 割り当て表の雛形をつくる（写真フォルダを指定）
npm run photos:plan -- ~/Downloads/なら和ポケ日和

# 2) photo-mapping.json を編集して、どの写真をどこに使うか決める
#    {
#      "hero-top.jpg":   "なら和ポケ日和-12.jpg",
#      "lunch-hero.jpg": "なら和ポケ日和-43.jpg"
#    }
#    空欄のままの枠は仮画像が残ります

# 3) 取り込む
npm run photos -- ~/Downloads/なら和ポケ日和
```

トリミング位置を変えたいときは、値をオブジェクトにします。

```json
{ "hero-top.jpg": { "src": "なら和ポケ日和-12.jpg", "position": "top" } }
```

`position` は `center`（既定）/ `top` / `bottom` / `left` / `right`。
拡張子や大文字小文字の違いは自動で吸収します。

### B. 1枚ずつ手で置き換える

**同じファイル名の `.jpg` を上書きするだけ**でも差し替わります。コード変更は不要です。
推奨サイズは `public/images/README.md` に一覧があります。
この場合はリサイズ・圧縮が行われないので、事前に長辺2000px程度へ縮小してください。

別名で置きたい場合は `lib/images.ts` のパスだけを書き換えてください。
画像パスはコンポーネントに直書きしていません。

> 画像サイズの定義元は `scripts/image-manifest.mjs` の1か所だけです。
> 仮画像の生成（`npm run images`）と写真の取り込み（`npm run photos`）が
> 同じ定義を参照しているので、サイズがずれることはありません。

主な写真：

| ファイル | 用途 |
| --- | --- |
| `hero-top.jpg` / `hero-top-sp.jpg` | TOPのファーストビュー（PC横長 / スマホ縦長） |
| `morning-hero.jpg` / `morning-hero-sp.jpg` | モーニングのファーストビュー |
| `lunch-hero.jpg` / `lunch-hero-sp.jpg` | ランチのファーストビュー |
| `gallery-01〜06.jpg` | TOPのフードギャラリー |
| `lunch-gallery-01〜06.jpg` | ランチのクローズアップ（卵黄・魚・野菜・タレ等） |
| `instagram-01〜06.jpg` | Instagramセクション |
| `ogp.jpg` | SNSシェア画像（1200×630） |

> ファーストビューはスマホとPCで写真を出し分けています（`<picture>` によるアートディレクション）。
> スマホ用は縦長、PC用は横長で用意すると、被写体が切れません。

---

## デザインの決まりごと

- **写真・余白・文字**で成立させる。情報をカードで囲まない。
- 色は8色まで。生成り／アイボリー／墨／木＋アクセント（深緑・抹茶・柿）。
- 見出しは明朝、本文はゴシック、英字は装飾として使う。
- 動きは Fade / Slide / Parallax / Image reveal / Text reveal のみ。
- ページごとに色温度を変える（TOP＝生成り、Morning＝白と光、Lunch＝墨と柿）が、
  ヘッダー・フッター・タイポグラフィで1つのブランドに束ねる。

### モーニングだけ文字色が反転している理由

朝の写真は明るいため、白文字を重ねると読めなくなります。
`/morning` のヒーローは `tone="dark"`（墨の文字＋明るいスクリム）にしています。
`components/sections/Hero.tsx` の `tone` と
`components/layout/Header.tsx` の `OVERLAY_ROUTES` は必ず揃えてください。

---

## 公開設定

本番ドメインが決まったら、環境変数を設定してください。
canonical / OGP / sitemap.xml / 構造化データに反映されます。

```
NEXT_PUBLIC_SITE_URL=https://example.com
```

未設定時は `content/shop.ts` の `siteUrl` が使われます。

### SEO

- ページごとに title / description / canonical / OGP を設定済み
- 構造化データ：`Restaurant`（TOP）＋ `BreadcrumbList`（下層）
- `sitemap.xml` / `robots.txt` / favicon 対応済み

> Googleマップの正式なプレイスURL（`https://maps.app.goo.gl/...`）が分かり次第、
> `content/shop.ts` の `mapUrl` を差し替えてください。
> 現在は「店名＋住所」で検索するURLを使用しています。
