/** メニュー1品のデータ構造 */
export type MenuItem = {
  /** 商品名（必須。空の商品は表示されません） */
  name: string;
  /** 価格。表記はそのまま表示されます 例: "¥1,200" / "1,200円（税込）" */
  price: string;
  /** 一言説明。長すぎない方がきれいに収まります */
  description: string;
  /** 画像パス。空の場合は代替画像が表示されます */
  image: string;
  /** true にすると大きく表示され、ラベルが付きます */
  recommended?: boolean;
  /** おすすめ時のラベル 例: "人気No.1" / "季節限定"（未指定なら "RECOMMENDED" のみ） */
  badge?: string;
};

/** カスタマイズ手順（01 PICK / 02 TOPPING …）1ステップ */
export type Step = {
  /** 英字ラベル 例: "PICK" */
  en: string;
  /** 日本語見出し */
  title: string;
  /** 説明文 */
  description: string;
  image: string;
};

/** 利用シーン1件 */
export type Scene = {
  en: string;
  title: string;
  description: string;
  image: string;
};
