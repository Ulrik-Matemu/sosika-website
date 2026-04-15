import Image from "next/image";

type MissionSectionProps = {
  title?: string;
  description1?: string;
  description2?: string;
  illustrationSrc?: string;
};

export default function MissionSection({
  title = "Our mission is to save your time",
  description1 = "At Sosika, we are focused on making food delivery simpler, faster, and more dependable. We help people order from trusted nearby vendors without wasting time moving around or waiting too long.",
  description2 = "By connecting customers, vendors, and riders in one smooth experience, we make everyday ordering more convenient while helping local businesses grow.",
  illustrationSrc = "/illustrations/undraw_on-the-way_zwi3.svg",
}: MissionSectionProps) {
  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Illustration */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[620px]">
              <Image
                src={illustrationSrc}
                alt="Shopping and delivery illustration"
                width={620}
                height={420}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="max-w-[520px] lg:ml-auto">
            <h2 className="text-4xl font-black leading-[1.1] tracking-[-0.03em] text-[#FFFFF0] sm:text-5xl lg:text-[4rem]">
              {title}
            </h2>

            <p className="mt-8 text-lg leading-9 text-slate-300">
              {description1}
            </p>

            <p className="mt-8 text-lg leading-9 text-slate-300">
              {description2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}