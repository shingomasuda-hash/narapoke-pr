import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ---- ベースカラー（生成り・アイボリー・墨・木） ---- */
        kinari: "#F4F0E8", // 生成り：サイト全体の下地
        ivory: "#FBF9F5", // アイボリー：モーニングの明るい面
        beige: "#E4DCCC", // 淡いベージュ：区切り・面の変化
        sumi: "#23211E", // 墨色：本文とダークセクション
        "sumi-soft": "#4A453F", // やわらかい墨：補助テキスト
        wood: "#8A6A4F", // 木・ブラウン
        "wood-dark": "#5C4534",

        /* ---- アクセント（少量使用） ---- */
        moss: "#2C4436", // 深い緑
        matcha: "#7C8C5C", // 抹茶色
        kaki: "#C05F2C", // 柿色
        akacha: "#8E442A", // 赤茶
      },
      fontFamily: {
        mincho: ["var(--font-mincho)", "serif"],
        gothic: ["var(--font-gothic)", "sans-serif"],
        "en-serif": ["var(--font-en-serif)", "serif"],
        "en-sans": ["var(--font-en-sans)", "sans-serif"],
      },
      letterSpacing: {
        "ja-wide": "0.12em",
        "en-wide": "0.24em",
      },
      maxWidth: {
        content: "1240px",
        readable: "34rem",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
