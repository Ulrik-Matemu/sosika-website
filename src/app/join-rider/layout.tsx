import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Join as a Rider | Sosika Delivery Co.",
    description: "Become a Sosika rider and earn money by delivering food to customers. Join our team today!",
    openGraph: {
        title: "Join as a Rider | Sosika Food Delivery",
        description: "Become a Sosika rider and earn money by delivering food to customers. Join our team today!",
        url: "https://sosika.com/join-rider",
        siteName: "Sosika",
    },
}

export default function JoinRiderLayout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <main>
            {children}
        </main>
    )
}