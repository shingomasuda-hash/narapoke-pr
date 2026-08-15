import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Scene } from "@/content/types";

/**
 * 利用シーンの一覧。
 * 説明しすぎず、写真と短いコピーだけで世界観を伝える。
 * 段違いに配置してリズムをつくる。
 */
export function SceneGrid({
  en,
  title,
  items,
  className = "",
}: {
  en: string;
  title: string;
  items: readonly Scene[];
  className?: string;
}) {
  return (
    <section className={`section-y bg-ivory ${className}`}>
      <div className="container-x">
        <SectionTitle en={en} title={title} />

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:mt-16 md:grid-cols-4 md:gap-x-6">
          {items.map((scene, i) => (
            <Reveal
              key={scene.en}
              delay={(i % 2) * 0.08}
              /* 偶数番目を少し下げて段違いにする */
              className={i % 2 === 1 ? "mt-8 md:mt-14" : ""}
            >
              <Media
                src={scene.image}
                alt={scene.title}
                ratio="3 / 4"
                sizes="(max-width: 767px) 50vw, 25vw"
                parallax={0.05}
              />
              <p className="mt-4 font-en-sans text-[10px] uppercase tracking-en-wide text-wood">
                {scene.en}
              </p>
              <h3 className="mt-2 text-balance font-mincho text-base tracking-ja-wide text-sumi sm:text-[1.0625rem] md:text-lg">
                {scene.title}
              </h3>
              <p className="mt-2 text-balance text-[0.8125rem] leading-[1.9] text-sumi-soft text-ja md:text-[0.875rem]">
                {scene.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
