import Link from "next/link";
import { hasHours, navigation, shop } from "@/content/shop";
import { BrandSymbol, InstagramIcon, MapPinIcon } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="bg-sumi text-ivory">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          {/* ---------- 店名・住所 ---------- */}
          <div>
            <div className="flex items-center gap-3">
              <BrandSymbol className="h-6 w-6 opacity-70" />
              <p className="font-mincho text-xl tracking-[0.14em]">{shop.name}</p>
            </div>
            <p className="mt-1.5 font-en-sans text-[9px] uppercase tracking-[0.3em] text-ivory/45">
              {shop.nameEn}
            </p>

            <address className="mt-7 not-italic text-[0.9375rem] leading-[2] text-ivory/70">
              {shop.address.postalCode && <>〒{shop.address.postalCode}<br /></>}
              {shop.address.full}
              <br />
              {shop.parking}
            </address>

            {hasHours && (
              <dl className="mt-6 space-y-1.5 text-[0.9375rem] text-ivory/70">
                {shop.hours
                  .filter((h) => h.time)
                  .map((h) => (
                    <div key={h.label} className="flex gap-4">
                      <dt className="w-24 shrink-0 text-ivory/50">{h.label}</dt>
                      <dd>{h.time}</dd>
                    </div>
                  ))}
                {shop.closed && (
                  <div className="flex gap-4">
                    <dt className="w-24 shrink-0 text-ivory/50">定休日</dt>
                    <dd>{shop.closed}</dd>
                  </div>
                )}
              </dl>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={shop.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3rem] items-center gap-2 border border-ivory/30 px-6 text-[0.8125rem] tracking-ja-wide transition-colors duration-500 hover:bg-ivory hover:text-sumi"
              >
                <MapPinIcon className="h-4 w-4" />
                Google Mapで見る
              </a>
              <a
                href={shop.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3rem] items-center gap-2 border border-ivory/30 px-6 text-[0.8125rem] tracking-ja-wide transition-colors duration-500 hover:bg-ivory hover:text-sumi"
              >
                <InstagramIcon className="h-4 w-4" />
                {shop.instagram.id}
              </a>
            </div>
          </div>

          {/* ---------- ナビゲーション ---------- */}
          <nav aria-label="フッターメニュー" className="md:justify-self-end">
            <ul className="grid gap-0 border-t border-ivory/15 md:min-w-[15rem]">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-ivory/15">
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-4 py-4 transition-opacity duration-300 hover:opacity-60"
                  >
                    <span className="font-en-serif text-lg tracking-[0.14em]">
                      {item.label}
                    </span>
                    <span className="font-mincho text-[0.8125rem] tracking-ja-wide text-ivory/55">
                      {item.labelJa}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container-x flex flex-col gap-2 py-6 pb-24 text-[11px] tracking-ja-wide text-ivory/40 md:flex-row md:items-center md:justify-between md:pb-6">
          <p className="font-en-sans uppercase tracking-en-wide">
            © {new Date().getFullYear()} {shop.nameEn}
          </p>
          <p>奈良県橿原市のポケ・モーニング・ランチ</p>
        </div>
      </div>
    </footer>
  );
}
