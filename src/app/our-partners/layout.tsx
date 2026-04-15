import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
    title: "Our Partners | Sosika Delivery Co.",
    description: "Discover our trusted partners who help us deliver delicious meals to your doorstep. From local restaurants to logistics providers, meet the team behind Sosika's success.",
    openGraph: {
        title: "Our Partners | Sosika Food Delivery",
        description: "Discover our trusted partners who help us deliver delicious meals to your doorstep. From local restaurants to logistics providers, meet the team behind Sosika's success.",
        url: "https://sosika.com/our-partners",
        siteName: "Sosika",
    },
}


export default  function OurPartners({ children}: { children: React.ReactNode }) {
    return (
        <main>
             <Image
                        src="/asset-images/burger.png"
                        alt=""
                        width={500}
                        height={500}
                        className="pointer-events-none select-none absolute top-20 md:top-[-150px] left-0 [transform:rotateY(180deg)] opacity-30 md:opacity-100"
                        priority
                      />
            {children}
        </main>
    )
}