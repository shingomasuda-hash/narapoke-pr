"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { hasReservation, navigation, shop } from "@/content/shop";
import { BrandMark } from "@/components/ui/BrandMark";
import { InstagramIcon, MapPinIcon } from "@/components/ui/Icons";

/**
 * ヒーロー画像に重ねて表示するページと、その上に置く文字色。
 * モーニングは明るい写真のため、ヘッダーも墨色にする。
 * （Hero コンポーネントの tone と必ず揃えること）
 */
const OVERLAY_ROUTES: Record<string, "light" | "dark"> = {
  "/": "light",
  "/morning": "dark",
  "/lunch": "light",
  "/sweets": "light",
};

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const overlayTone = OVERLAY_ROUTES[pathname];
  /** 背景が透明でヒーローに重なっている状態か */
  const onHero = Boolean(overlayTone) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ページ遷移でメニューを閉じる */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* メニュー展開中は背面のスクロールを止める */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const textTone =
    onHero && !open && overlayTone === "light" ? "text-ivory" : "text-sumi";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft ${
        scrolled && !open
          ? "bg-kinari/90 shadow-[0_1px_0_rgba(35,33,30,0.07)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <BrandMark
          tone={`${textTone} transition-colors duration-500`}
          className="relative z-10"
        />

        {/* ---------- PC ナビゲーション ---------- */}
        <nav
          aria-label="メインメニュー"
          className={`hidden items-center gap-9 transition-colors duration-500 md:flex ${textTone}`}
        >
          {navigation.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-2 font-en-sans text-[11px] uppercase tracking-en-wide"
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-500 ease-soft ${
                    active ? "w-full opacity-70" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-70"
                  }`}
                />
              </Link>
            );
          })}

          <a
            href={shop.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${shop.instagram.id}`}
            className="transition-opacity duration-300 hover:opacity-60"
          >
            <InstagramIcon className="h-[1.15rem] w-[1.15rem]" />
          </a>

          {/* 予約URLが未設定のときは表示しない */}
          {hasReservation && (
            <a
              href={shop.reservation.url}
              target="_blank"
              rel="noopener noreferrer"
              /* 枠線・文字とも currentColor。ヒーロー上の白文字でもそのまま馴染む */
              className="border border-current px-5 py-2.5 font-gothic text-xs tracking-ja-wide transition-opacity duration-300 hover:opacity-60"
            >
              {shop.reservation.label}
            </a>
          )}
        </nav>

        {/* ---------- スマホ ハンバーガー ---------- */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          className={`relative z-10 -mr-2 flex h-11 w-11 items-center justify-center transition-colors duration-500 md:hidden ${textTone}`}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ease-soft ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ease-soft ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* ---------- スマホ フルスクリーンメニュー ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-0 z-0 flex h-screen-safe flex-col bg-kinari md:hidden"
          >
            <nav
              aria-label="メインメニュー"
              className="container-x flex flex-1 flex-col justify-center gap-1 pt-16"
            >
              {navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduce ? 0.01 : 0.6,
                    delay: reduce ? 0 : 0.06 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-4 border-b border-sumi/10 py-5"
                  >
                    <span className="font-en-serif text-2xl tracking-[0.14em] text-sumi">
                      {item.label}
                    </span>
                    <span className="font-mincho text-sm tracking-ja-wide text-sumi-soft">
                      {item.labelJa}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="container-x pb-10">
              {hasReservation && (
                <a
                  href={shop.reservation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-3 flex min-h-[3.25rem] items-center justify-center bg-kaki text-[0.8125rem] tracking-ja-wide text-ivory"
                >
                  {shop.reservation.label}
                </a>
              )}

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={shop.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[3.25rem] items-center justify-center gap-2 border border-sumi/25 text-[0.8125rem] tracking-ja-wide text-sumi"
                >
                  <MapPinIcon className="h-4 w-4" />
                  Google Map
                </a>
                <a
                  href={shop.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[3.25rem] items-center justify-center gap-2 bg-sumi text-[0.8125rem] tracking-ja-wide text-ivory"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
