import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Affroinnovate Youth Competition 2025 | Sosika Delivery Co.",
    description: "Discover the Affroinnovate Youth Competition 2025, when Sosika Delivery Co. won 3rd place for our impact in empowering young innovators in Africa.",
    openGraph: {
        title: "Affroinnovate Youth Competition 2025 | Sosika Food Delivery",
        description: "Discover the Affroinnovate Youth Competition 2025, an initiative by Sosika Delivery Co. to empower young innovators in Africa.",
        url: "https://sosika.com/affroinnovate-youth-competition-2025",
        siteName: "Sosika",
    },
}

export default function AffroinnovateYouthCompetition2025Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}
        </main>
    );
}