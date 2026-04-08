import Image from "next/image"

export default function ContactUsPage() {
    return (
        <>
            <section className="bg-">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 px-8 md:px-20 py-20 lg:py-24">

                    {/* LEFT — text + info cards */}
                    <div className="flex-1 min-w-0 w-full">
                        <h1 className="text-5xl lg:text-[56px] font-black leading-tight  mb-5">
                            Contact <em className="text-[#888]">Us</em>
                        </h1>
                        <p className="text-base lg:text-[17px] leading-relaxed text-[#666] font-light max-w-md mb-10">
                            Have a question, partnership idea, or just want to say hello? We'd love
                            to hear from you. Our team is always ready to help.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Address */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex-1 hover:bg-black hover:text-white transition-colors duration-200">
                                <p className="text-[11px] tracking-[0.12em] uppercase text-[#29d9d5] font-medium mb-3">
                                    Our Location
                                </p>
                                <p className="text-sm font-medium leading-snug">
                                    IAA, Arusha
                                </p>
                                <p className="text-[13px] text-[#888] font-light mt-0.5">
                                    Tanzania, East Africa
                                </p>
                            </div>

                            {/* Email */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex-1 hover:bg-black hover:text-white transition-colors duration-200">
                                <p className="text-[11px] tracking-[0.12em] uppercase text-[#29d9d5] font-medium mb-3">
                                    Email us
                                </p>
                                <p className="text-sm font-medium text-[#29d9d5]">sosika.app@gmail.com</p>
                                <p className="text-[13px] text-[#888] font-light mt-0.5">General enquiries</p>
                                <div className="border-t border-gray-100 mt-3 pt-3">
                                    <p className="text-sm font-medium text-[#29d9d5]">ulrikjosephat@gmail.com</p>
                                    <p className="text-[13px] text-[#888] font-light mt-0.5">Director</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex-1 hover:bg-black hover:text-white transition-colors duration-200">
                                <p className="text-[11px] tracking-[0.12em] uppercase text-[#29d9d5] font-medium mb-3">
                                    Call us
                                </p>
                                <p className="text-sm font-medium ">+255 688 123 103</p>
                                <p className="text-[13px] text-[#888] font-light mt-0.5">Mon – Fri, 8am – 6pm</p>
                                <div className="border-t border-gray-100 mt-3 pt-3">
                                    <p className="text-sm font-medium ">+255 768 903 468</p>
                                    <p className="text-[13px] text-[#888] font-light mt-0.5">Weekend support line</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — blob with image */}
                    <div className="flex-shrink-0 w-[300px] lg:w-[500px]">
                        <div
                            className="w-full aspect-[4/5] bg-[#f0fefe] flex items-end justify-center "
                            style={{ borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%' }}
                        >
                            <div className="w-full h-full flex items-center justify-center">
                                <Image
                                    src="/illustrations/contacts-1.png"
                                    alt="Sosika support team"
                                    width={800}
                                    height={800}
                                    className="relative object-cover object-top"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}