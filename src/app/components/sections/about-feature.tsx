import Image from "next/image"

export default function AboutFeatures() {
    return (
        <>
            <div className="md:flex gap-6 px-6 py-10 md:px-24 md:py-10">
                {/* Feature 1: Local Expertise */}
                <div className="md:w-1/4 p-8 rounded-3xl hover:bg-[#29d9d5]  hover:text-white transition-colors duration-300">
                    <Image
                        src='/icons/service-icon-1.svg'
                        alt='Quality Service'
                        width={60}
                        height={60}
                    />
                    <h3 className="font-black text-3xl md:text-5xl leading-[50px] tracking-wide py-4 md:py-8">Quality Service</h3>
                    <p className="text-xl">
                        Our riders know Arusha’s shortcuts from Njiro to Sakina, ensuring your orders arrive fresh and exactly when expected.
                    </p>
                </div>

                {/* Feature 2: Time Saving */}
                <div className="md:w-1/4 p-8 rounded-3xl shadow-2xl hover:bg-[#29d9d5] hover:text-white transition-colors duration-300">
                    <Image
                        src='/icons/service-icon-4.svg'
                        alt='Save Time'
                        width={60}
                        height={60}
                    />
                    <h3 className="font-black text-3xl md:text-5xl leading-[50px] tracking-wide py-4 md:py-8">Save Your Time</h3>
                    <p className="text-xl">
                        Skip the Clock Tower traffic and the lunch hour rush. We handle the pickup so you can focus on your day.
                    </p>
                </div>

                {/* Feature 3: Local Deals */}
                <div className="md:w-1/4 p-8 rounded-3xl hover:bg-[#29d9d5] hover:text-white transition-colors duration-300">
                    <Image
                        src='/icons/service-icon-6.svg'
                        alt='Discounts'
                        width={60}
                        height={60}
                    />
                    <h3 className="font-black text-3xl md:text-5xl leading-[50px] tracking-wide py-4 md:py-8">Exclusive Offers</h3>
                    <p className="text-xl">
                        Enjoy weekly "Arusha Specials" and loyalty rewards from your favorite local cafes, pharmacies, and vendors.
                    </p>
                </div>

                {/* Feature 4: Selection */}
                <div className="md:w-1/4 p-8 rounded-3xl shadow-2xl hover:bg-[#29d9d5] hover:text-white transition-colors duration-300">
                    <Image
                        src='/icons/service-icon-8.svg'
                        alt='Variety'
                        width={60}
                        height={60}
                    />
                    <h3 className="font-black text-3xl md:text-5xl leading-[50px] tracking-wide py-4 md:py-8">Infinite Variety</h3>
                    <p className="text-xl">
                        From the best Nyama Choma in town to essential groceries and meds—if it’s in Arusha, it’s on Sosika.
                    </p>
                </div>
            </div>
        </>
    )
}