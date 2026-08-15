/**
 * 店舗情報 / サイト共通設定
 * ------------------------------------------------------------
 * ここを書き換えるだけで、ヘッダー・フッター・アクセス・構造化データ・
 * SNS導線まで全ページに反映されます。
 *
 * ※ 未確定の項目は空文字 "" のままにしてください。
 *   空の項目はサイト上に自動で表示されない（またはお問い合わせ案内に切り替わる）
 *   ようになっているため、誤った情報が公開されることはありません。
 */

export const shop = {
  /* ---------------- 基本情報 ---------------- */
  name: "なら和ポケ日和",
  nameEn: "NARA WA POKE BIYORI",
  /** 検索結果やSNSでの読み違いを防ぐためのふりがな */
  nameKana: "ならわポケびより",

  /** 住所 */
  address: {
    postalCode: "", // 例: "634-0007"（未確認のため空）
    prefecture: "奈良県",
    city: "橿原市",
    street: "葛本町841-1",
    /** 表示用のフル住所 */
    get full() {
      return `${this.prefecture}${this.city}${this.street}`;
    },
  },

  /** 駐車場 */
  parking: "共用駐車場 約30台",

  /**
   * 営業時間
   * time が空の項目は「準備中」としてサイト上に表示されます。
   * 例: { label: "モーニング", time: "8:00 - 11:00" }
   */
  hours: [
    { label: "モーニング", time: "" },
    { label: "ランチ", time: "" },
  ] as { label: string; time: string; note?: string }[],

  /** 定休日（空の場合は非表示） */
  closed: "",

  /** 電話番号（空の場合は電話CTAを非表示） */
  tel: "",

  /* ---------------- 外部リンク ---------------- */
  instagram: {
    id: "@nara.poke1101",
    url: "https://www.instagram.com/nara.poke1101/",
  },

  /**
   * Google マップ
   * 店名＋住所で検索する公式フォーマットのURL。
   * 正式なプレイスURL（https://maps.app.goo.gl/xxxx）が分かり次第、
   * 下の mapUrl を差し替えてください。
   */
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("なら和ポケ日和 奈良県橿原市葛本町841-1"),

  /** 地図の埋め込み（住所検索ベース。プレイス確定後に差し替え可） */
  mapEmbedUrl:
    "https://maps.google.com/maps?output=embed&hl=ja&z=16&q=" +
    encodeURIComponent("奈良県橿原市葛本町841-1"),

  /* ---------------- サイト設定 ---------------- */
  /** 公開ドメイン。Vercel等では環境変数 NEXT_PUBLIC_SITE_URL に本番URLを設定してください。 */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://nara-poke-biyori.jp",
};

/** 営業時間が1件でも入力されているか */
export const hasHours = shop.hours.some((h) => h.time.trim() !== "");

/** ヘッダー / フッター共通のナビゲーション */
export const navigation = [
  { label: "TOP", labelJa: "トップ", href: "/" },
  { label: "MORNING", labelJa: "モーニング", href: "/morning" },
  { label: "LUNCH", labelJa: "ランチ", href: "/lunch" },
  { label: "ACCESS", labelJa: "アクセス", href: "/access" },
] as const;
