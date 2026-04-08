import React from "react";
import { Bolt, Star, Handshake } from "lucide-react";

const reasons = [
    {
        icon: Bolt,
        title: "Extremely Fast Delivery",
        description:
            "Sosika is built to deliver in less than 30 minutes by connecting customers with nearby vendors and efficient riders with hyper-local delivery networks.",
    },
    {
        icon: Star,
        title: "More Value for What You Pay For",
        description:
            "Ratings and reviews help customers quickly spot the best vendors, so they spend on quality they can trust.",
    },
    {
        icon: Handshake,
        title: "Fair for Couriers & Merchants",
        description:
            "Sosika is designed to grow with its partners, creating a better experience for vendors, riders, and customers alike.",
    },
];

const WhySosikaWorksBetter = () => {
    return (
        <section className="relative overflow-hidden bg-white py-10 md:px-16 md:py-24">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.10),_transparent_35%)]" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">


                    <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                        Why Sosika Works Better
                    </h2>

                    <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                        Built for speed, trust, and fairness — so customers get a better
                        delivery experience while vendors and riders grow with the platform.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;

                        return (
                            <div
                                key={index}
                                className="group relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl"
                            >
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white transition-transform duration-300 group-hover:scale-105">
                                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                                </div>

                                <h3 className="text-xl font-semibold text-slate-900">
                                    {reason.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                                    {reason.description}
                                </p>

                                <div className="mt-6 h-1.5 w-16 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 group-hover:w-24" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhySosikaWorksBetter;