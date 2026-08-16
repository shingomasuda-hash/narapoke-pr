import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "solidLight" | "outline" | "outlineLight" | "text";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** 外部リンク（別タブで開く） */
  external?: boolean;
  /** 幅いっぱいに広げる。スマホのCTAで使用。 */
  full?: boolean;
  /**
   * 左右の余白を詰める。
   * ボタンを横に3つ以上並べるときなど、標準の px-8 では入りきらない場合に使う。
   */
  compact?: boolean;
  className?: string;
  ariaLabel?: string;
};

/*
 * 高さ 52px 以上を確保し、スマホでの押しやすさを担保する。
 * 余白（gap / px）は compact で切り替えるため base には含めない。
 * className 側で px-* を指定しても Tailwind の出力順で打ち消せないため。
 */
const base =
  "group inline-flex min-h-[3.25rem] items-center justify-center text-[0.8125rem] font-en-sans uppercase tracking-en-wide transition-colors duration-500 ease-soft";

const variants: Record<Variant, string> = {
  solid: "bg-sumi text-ivory hover:bg-wood-dark",
  solidLight: "bg-ivory text-sumi hover:bg-beige",
  outline: "border border-sumi/25 text-sumi hover:border-sumi hover:bg-sumi hover:text-ivory",
  outlineLight:
    "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-sumi",
  text: "min-h-[2.75rem] px-0 text-sumi hover:text-kaki",
};

/** 右向きの細い矢印。ホバーで少しだけ前に出る。 */
function Arrow() {
  return (
    <span
      aria-hidden
      className="inline-block h-px w-6 bg-current transition-transform duration-500 ease-soft group-hover:translate-x-1"
    />
  );
}

export function CtaLink({
  href,
  children,
  variant = "solid",
  external = false,
  full = false,
  compact = false,
  className = "",
  ariaLabel,
}: Props) {
  const spacing = compact ? "gap-2 px-4" : "gap-3 px-8";
  const cls = `${base} ${spacing} ${variants[variant]} ${full ? "w-full" : ""} ${className}`;

  const content = (
    <>
      <span className="font-gothic text-sm normal-case tracking-ja-wide">
        {children}
      </span>
      <Arrow />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
