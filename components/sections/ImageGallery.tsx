import { Media } from "@/components/ui/Media";

/**
 * 雑誌のような不揃いギャラリー。
 * 同サイズのグリッドにせず、大小・縦横を混ぜて視線に流れをつくる。
 * スクロールに合わせて写真がゆっくり動く（パララックス）。
 *
 * 画像は6枚を想定。枚数が少ない場合はその分だけ表示される。
 */

type Slot = {
  /** スマホ（6カラム）での配置 */
  sp: string;
  /** PC（12カラム）での配置 */
  pc: string;
  /** 表示上の縦横比 */
  ratio: string;
  /** パララックスの強さ */
  parallax: number;
  sizes: string;
};

const SLOTS: Slot[] = [
  {
    sp: "col-span-6",
    pc: "md:col-span-7 md:col-start-1",
    ratio: "7 / 5",
    parallax: 0.05,
    sizes: "(max-width: 767px) 100vw, 58vw",
  },
  {
    sp: "col-span-3",
    pc: "md:col-span-4 md:col-start-9 md:mt-24",
    ratio: "3 / 4",
    parallax: 0.09,
    sizes: "(max-width: 767px) 50vw, 33vw",
  },
  {
    sp: "col-span-3 mt-10",
    pc: "md:col-span-3 md:col-start-2 md:mt-4",
    ratio: "1 / 1",
    parallax: 0.07,
    sizes: "(max-width: 767px) 50vw, 25vw",
  },
  {
    sp: "col-span-6 mt-2",
    pc: "md:col-span-4 md:col-start-6 md:-mt-12",
    ratio: "3 / 4",
    parallax: 0.06,
    sizes: "(max-width: 767px) 100vw, 33vw",
  },
  {
    sp: "col-span-3",
    pc: "md:col-span-6 md:col-start-1 md:mt-8",
    ratio: "14 / 9",
    parallax: 0.05,
    sizes: "(max-width: 767px) 50vw, 50vw",
  },
  {
    sp: "col-span-3 mt-10",
    pc: "md:col-span-4 md:col-start-8 md:-mt-16",
    ratio: "1 / 1",
    parallax: 0.08,
    sizes: "(max-width: 767px) 50vw, 33vw",
  },
];

export function ImageGallery({
  images,
  alt = "",
  className = "",
}: {
  images: readonly string[];
  /** 装飾画像のため通常は空。内容のある写真に差し替えたら説明を入れてください。 */
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-6 gap-3 sm:gap-4 md:grid-cols-12 md:gap-5 lg:gap-6 ${className}`}
    >
      {images.slice(0, SLOTS.length).map((src, i) => {
        const slot = SLOTS[i];
        return (
          <div key={src} className={`${slot.sp} ${slot.pc}`}>
            <Media
              src={src}
              alt={alt}
              ratio={slot.ratio}
              sizes={slot.sizes}
              parallax={slot.parallax}
            />
          </div>
        );
      })}
    </div>
  );
}
