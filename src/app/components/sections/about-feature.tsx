import Image from "next/image"

export default function AboutFeatures() {
    return (
        <>
            <div className="md:flex gap-6 px-6 py-10 md:px-24 md:py-10">
                <div className="md:w-1/4 p-8 rounded-3xl hover:bg-[#29d9d5]  hover:text-white transition-colors duration-300">
                    <Image
                        src='/icons/service-icon-1.svg'
                        alt='Service Icon'
                        width={60}
                        height={60}
                    />
                    <h3 className="font-black text-3xl md:text-5xl leading-[50px] tracking-wide py-4 md:py-8">Quality Service</h3>
                    <p className="text-xl">Cras fermentum odio eu feugiat pretium nibh ipsum. Ut faucibus pulvinar elementum consequat integer enim neque volutpat.</p>
                </div>
                <div className="md:w-1/4 p-8 rounded-3xl shadow-2xl hover:bg-[#29d9d5] hover:text-white transition-colors duration-300">
                    <Image
                        src='/icons/service-icon-4.svg'
                        alt='Service Icon'
                        width={60}
                        height={60}
                    />
                    <h3 className="font-black text-3xl md:text-5xl leading-[50px] tracking-wide py-4 md:py-8">Save Your Time</h3>
                    <p className="text-xl">Cras fermentum odio eu feugiat pretium nibh ipsum. Ut faucibus pulvinar elementum consequat integer enim neque volutpat.</p>
                </div>
                <div className="md:w-1/4 p-8 rounded-3xl hover:bg-[#29d9d5] hover:text-white transition-colors duration-300">
                    <Image
                        src='/icons/service-icon-6.svg'
                        alt='Service Icon'
                        width={60}
                        height={60}
                    />
                    <h3 className="font-black text-3xl md:text-5xl leading-[50px] tracking-wide py-4 md:py-8">Regular Discounts</h3>
                    <p className="text-xl">Cras fermentum odio eu feugiat pretium nibh ipsum. Ut faucibus pulvinar elementum consequat integer enim neque volutpat.</p>
                </div>
                <div className="md:w-1/4 p-8 rounded-3xl shadow-2xl hover:bg-[#29d9d5] hover:text-white transition-colors duration-300">
                    <Image
                        src='/icons/service-icon-8.svg'
                        alt='Service Icon'
                        width={60}
                        height={60}
                    />
                    <h3 className="font-black text-3xl md:text-5xl leading-[50px] tracking-wide py-4 md:py-8">Variety Food</h3>
                    <p className="text-xl">Cras fermentum odio eu feugiat pretium nibh ipsum. Ut faucibus pulvinar elementum consequat integer enim neque volutpat.</p>
                </div>
            </div>
        </>
    )
}