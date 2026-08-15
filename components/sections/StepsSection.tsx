import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Step } from "@/content/types";

/**
 * ポケの選び方（01 PICK / 02 TOPPING / 03 SAUCE / 04 ENJOY）。
 *
 * 表示・非表示は content/lunch.ts の customize.enabled で切り替えます。
 * description が空のステップは説明文の行を出しません。
 */
export function StepsSection({
  en,
  title,
  lead,
  steps,
  className = "",
}: {
  en: string;
  title: string;
  lead?: string;
  steps: readonly Step[];
  className?: string;
}) {
  return (
    <section className={`section-y bg-ivory ${className}`}>
      <div className="container-x">
        <SectionTitle en={en} title={title} lead={lead || undefined} align="center" />

        <ol className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:mt-16 md:grid-cols-4 md:gap-x-8">
          {steps.map((step, i) => (
            <li key={step.en}>
              <Reveal delay={(i % 4) * 0.08}>
                <Media
                  src={step.image}
                  alt={step.title}
                  ratio="1 / 1"
                  sizes="(max-width: 767px) 50vw, 25vw"
                />
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-en-serif text-[1.375rem] leading-none text-kaki">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-en-sans text-[10px] uppercase tracking-en-wide text-sumi-soft">
                    {step.en}
                  </span>
                </div>
                <h3 className="mt-3 text-balance font-mincho text-base tracking-ja-wide text-sumi sm:text-[1.0625rem] md:text-lg">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="mt-2 text-balance text-[0.8125rem] leading-[1.9] text-sumi-soft text-ja md:text-[0.875rem]">
                    {step.description}
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
