/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      /*
       * ディナーはランチと同一メニューのため /lunch に統合した。
       * 公開済みの /dinner へのリンクや検索結果が切れないよう恒久リダイレクトする。
       */
      { source: "/dinner", destination: "/lunch", permanent: true },
    ];
  },
};

export default nextConfig;
