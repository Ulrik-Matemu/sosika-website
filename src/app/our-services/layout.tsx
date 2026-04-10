import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Our Services | Sosika Delivery Co.",
    description: "Explore the range of services offered by Sosika Delivery Co. From food delivery to catering, discover how we can serve you better.",
    openGraph: {
        title: "Our Services | Sosika Food Delivery",
        description: "Explore the range of services offered by Sosika Delivery Co. From food delivery to catering, discover how we can serve you better.",
        url: "https://sosika.com/our-services",
        siteName: "Sosika",
    },
}

export default function OurServicesLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <main>
            {children}
        </main>
    )
}