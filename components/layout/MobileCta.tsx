"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { hasReservation, shop } from "@/content/shop";
import { InstagramIcon, MapPinIcon } from "@/components/ui/Icons";

/**
 * スマホ専用の固定CTA。
 * ファーストビューを邪魔しないよう、少しスクロールしてから静かに現れる。
 * 高さは 56px に抑え、常時大きく居座らないようにしている。
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }}
          transition={{ duration: reduce ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 pb-safe md:hidden"
        >
          {/*
            予約URLが設定されているときだけ3分割にし、予約を柿色で主役にする。
            未設定のときは従来どおり Instagram / Google Map の2分割。
          */}
          <div
            className={`grid border-t border-ivory/15 bg-sumi/95 backdrop-blur-md ${
              hasReservation ? "grid-cols-3" : "grid-cols-2"
            }`}
          >
            <a
              href={shop.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center gap-2 border-r border-ivory/15 text-[0.8125rem] tracking-ja-wide text-ivory"
            >
              <InstagramIcon className="h-[1.05rem] w-[1.05rem]" />
              Instagram
            </a>
            <a
              href={shop.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-14 items-center justify-center gap-2 text-[0.8125rem] tracking-ja-wide text-ivory ${
                hasReservation ? "border-r border-ivory/15" : ""
              }`}
            >
              <MapPinIcon className="h-[1.05rem] w-[1.05rem]" />
              <span className={hasReservation ? "sr-only" : ""}>Google Map</span>
              {hasReservation && <span aria-hidden>Map</span>}
            </a>
            {hasReservation && (
              <a
                href={shop.reservation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center bg-kaki text-[0.8125rem] tracking-ja-wide text-ivory"
              >
                {shop.reservation.label}
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
