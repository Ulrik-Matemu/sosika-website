import Image from "next/image"

export default function OurTeamSection() {
    return (
        <section className="px-8 py-10 md:p-24">
            <div className="text-center">
                <h2 className="text-5xl font-black tracking-tight text-[#FFFFF0] mb-6">
                    Our Team
                </h2>
                <p className="text-xl mb-12 text-slate-300 ">
                    At Sosika, we are a passionate team of innovators, food enthusiasts, and tech experts dedicated to transforming the food delivery experience in Tanzania. Our diverse backgrounds and shared commitment to excellence drive us to create a platform that not only connects customers with their favorite meals but also empowers local vendors and riders. Together, we are building a community where everyone can enjoy delicious food with unparalleled convenience and reliability.
                </p>
            </div>
            <div className="flex justify-center">
                <Image
                    src='/asset-images/sosika-team-2.jpeg'
                    alt='Sosika Team at Affroinnovate Challenge Tanzania 2025'
                    width={640}
                    height={480}
                    priority
                    className="object-cover rounded-3xl shadow-lg"
                />
            </div>
        </section>
    )
}