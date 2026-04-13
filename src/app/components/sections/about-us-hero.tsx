import Image from "next/image";

type AboutUsHeroProps = {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function AboutUsHero({
  title = "",
  description = "Sosika connects students and nearby vendors through a delivery experience designed for convenience, speed, and trust. We help customers get what they need quickly while giving vendors more visibility and more orders.",
  imageSrc = "/asset-images/sosika-team.jpeg",
  imageAlt = "Happy customers using Sosika",
}: AboutUsHeroProps) {
  return (
    <section className="relative overflow-hidden mt-6 md:mt-14 bg-transparent">
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(128,170,255,0.18),rgba(255,255,255,0)_65%)]" />
        <div className="absolute right-[10%] top-[18%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,180,180,0.18),rgba(255,255,255,0)_70%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[85vh] max-w-7xl items-center gap-14 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:px-16 lg:py-20">
        {/* Left content */}
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-4xl font-black text-center md:text-left leading-[1.05] tracking-[-0.03em] text-[#FFFFF0]  lg:text-6xl">
            Nothing to worry about with <span className="text-[#29d9d5]">Sosika</span>
          </h1>

          <p className="mt-6 max-w-xl text-justify md:text-left text-base leading-8 text-slate-300 sm:text-lg">
            {description}
          </p>
        </div>

        {/* Right image */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[680px]">
            {/* decorative frame */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-[6px] border-white/70" />

            {/* image card */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes=""
                priority
                className="object-cover"
              />
            </div>

            {/* soft floating accent */}
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute -right-4 bottom-8 h-28 w-28 rounded-full bg-[#dbe7ff]/50 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}