import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CtaLink } from "@/components/ui/CtaLink";
import { images } from "@/lib/images";
import { hasReservation, shop } from "@/content/shop";

type Row = { label: string; value: string };

/**
 * 店舗情報・アクセス。
 *
 * 表示内容は content/shop.ts で編集できます。
 * 未入力の項目（営業時間・定休日・電話番号など）は自動的に非表示になり、
 * 代わりに Instagram での確認を案内します。
 */
export function ShopInfo({
  en = "ACCESS",
  title = "お店のこと。",
  className = "",
  /** 地図の埋め込みを表示するか */
  withMap = true,
}: {
  en?: string;
  title?: string;
  className?: string;
  withMap?: boolean;
}) {
  const rows: Row[] = [
    { label: "店名", value: shop.name },
    {
      label: "住所",
      value: shop.address.postalCode
        ? `〒${shop.address.postalCode} ${shop.address.full}`
        : shop.address.full,
    },
    { label: "駐車場", value: shop.parking },
    /*
     * 営業時間。time が未定でも note があればそちらを出す。
     * （例：モーニングだけ時間が未確定 → 行ごと消すと理由が伝わらないため）
     * time も note も空の項目だけを非表示にする。
     */
    ...shop.hours
      .filter((h) => h.time || h.note)
      .map((h) => ({ label: h.label, value: h.time || h.note || "" })),
    ...(shop.closed ? [{ label: "定休日", value: shop.closed }] : []),
    ...(shop.tel ? [{ label: "電話", value: shop.tel }] : []),
    { label: "Instagram", value: shop.instagram.id },
  ];

  return (
    <section id="access" className={`section-y bg-ivory ${className}`}>
      <div className="container-x">
        <SectionTitle en={en} title={title} />

        <div className="mt-12 grid gap-12 md:mt-14 md:grid-cols-2 md:gap-14 lg:gap-20">
          {/* ---------- 店舗情報 ---------- */}
          <div>
            <Reveal>
              <dl className="border-t border-sumi/10">
                {rows.map((row) => (
                  <div
                    key={row.label + row.value}
                    className="flex gap-5 border-b border-sumi/10 py-4 md:gap-8"
                  >
                    {/* 見出しは和文なので、英字用の小さな字送りは使わない */}
                    <dt className="w-[5.5rem] shrink-0 pt-0.5 text-[0.8125rem] leading-[1.9] tracking-ja-wide text-wood md:w-28 md:text-sm">
                      {row.label}
                    </dt>
                    <dd className="text-[0.9375rem] leading-[1.9] text-sumi text-ja">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* 準備中の時間帯があるため、案内は常に出しておく */}
              <p className="mt-6 text-[0.8125rem] leading-[1.9] text-sumi-soft text-ja">
                営業時間・定休日は変更になる場合があります。
                最新の情報はInstagramでご確認ください。
              </p>

              {/* 予約URLが設定されているときだけ、最優先のCTAとして先頭に出す */}
              {hasReservation && (
                <div className="mt-9">
                  <CtaLink href={shop.reservation.url} external variant="solid" full>
                    {shop.reservation.label}
                  </CtaLink>
                  {shop.reservation.provider && (
                    <p className="mt-2 text-center text-[0.75rem] tracking-ja-wide text-sumi-soft text-ja">
                      予約先：{shop.reservation.provider}
                    </p>
                  )}
                </div>
              )}

              <div
                className={`flex flex-col gap-3 sm:flex-row ${
                  hasReservation ? "mt-3" : "mt-9"
                }`}
              >
                <CtaLink
                  href={shop.mapUrl}
                  external
                  variant={hasReservation ? "outline" : "solid"}
                  className="sm:flex-1"
                >
                  Google Mapで見る
                </CtaLink>
                <CtaLink
                  href={shop.instagram.url}
                  external
                  variant="outline"
                  className="sm:flex-1"
                >
                  Instagram
                </CtaLink>
              </div>

              {shop.tel && (
                <a
                  href={`tel:${shop.tel.replace(/[^0-9+]/g, "")}`}
                  className="mt-3 flex min-h-[3.25rem] items-center justify-center border border-sumi/25 text-[0.8125rem] tracking-ja-wide text-sumi transition-colors duration-500 hover:bg-sumi hover:text-ivory sm:hidden"
                >
                  電話でお問い合わせ
                </a>
              )}
            </Reveal>
          </div>

          {/* ---------- 外観写真 ---------- */}
          <Media
            src={images.shopExterior}
            alt={`${shop.name}の外観`}
            ratio="4 / 3"
            sizes="(max-width: 767px) 100vw, 50vw"
            parallax={0.05}
          />
        </div>
      </div>

      {/* ---------- 地図 ---------- */}
      {withMap && (
        <Reveal className="mt-14 md:mt-16">
          <div className="h-[19rem] w-full bg-beige/60 md:h-[26rem]">
            <iframe
              src={shop.mapEmbedUrl}
              title={`${shop.name}の地図`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 grayscale-[0.25]"
            />
          </div>
        </Reveal>
      )}
    </section>
  );
}
