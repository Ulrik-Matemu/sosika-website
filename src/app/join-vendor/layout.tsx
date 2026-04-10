import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Join as a Vendor | Sosika Delivery Co.",
    description: "Partner with Sosika as a vendor and reach more customers. Join our platform to grow your business and increase sales.",
    openGraph: {
        title: "Join as a Vendor | Sosika Food Delivery",
        description: "Partner with Sosika as a vendor and reach more customers. Join our platform to grow your business and increase sales.",
        url: "https://sosika.com/join-vendor",
        siteName: "Sosika",
    },
}


export default function JoinVendorLayout({ children}: { children: React.ReactNode }) {
    return (
        <main>
            {children}
        </main>
    )
}   