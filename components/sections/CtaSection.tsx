import Image from "next/image";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { CtaLink } from "@/components/ui/CtaLink";

type Link = {
  label: string;
  href: string;
  external?: boolean;
  /** 主要CTAは1つに絞る */
  primary?: boolean;
};

/**
 * ページ下部の最終CTA。
 * 写真の上にコピーを重ね、Google Map / Instagram / メニューへ誘導する。
 */
export function CtaSection({
  en,
  title,
  lead,
  image,
  links,
  scrim = 0.6,
  className = "",
}: {
  en: string;
  title: readonly string[];
  lead?: string;
  image: string;
  links: readonly Link[];
  scrim?: number;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden bg-sumi ${className}`}>
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(20,17,14,${scrim * 0.8}) 0%, rgba(20,17,14,${scrim}) 100%)`,
        }}
      />

      <div className="container-x relative py-24 text-center md:py-32 lg:py-40">
        <Reveal y={10}>
          <p className="eyebrow text-ivory/70">{en}</p>
        </Reveal>

        <h2 className="mt-6 text-balance text-[1.75rem] leading-[1.55] tracking-ja-wide text-ivory text-ja sm:text-[2rem] md:text-[2.5rem] lg:text-[2.75rem]">
          <RevealLines lines={title} />
        </h2>

        {lead && (
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-readable text-balance text-[0.875rem] leading-[2] text-ivory/75 text-ja md:text-[0.9375rem]">
              {lead}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:mt-12">
            {links.map((link) => (
              <CtaLink
                key={link.href + link.label}
                href={link.href}
                external={link.external}
                variant={link.primary ? "solidLight" : "outlineLight"}
                className="sm:min-w-[13rem]"
              >
                {link.label}
              </CtaLink>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
