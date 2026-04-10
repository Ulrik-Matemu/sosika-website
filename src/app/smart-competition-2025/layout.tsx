import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Smart Competition 2025 | Sosika Delivery Co.",
    description: "Discover the Smart Competition 2025, when Sosika Delivery Co. won the Silver Prize for our innovative approach to food delivery in Tanzania. ",
    openGraph: {
        title: "Smart Competition 2025 | Sosika Food Delivery",
        description: "Discover the Smart Competition 2025, an initiative by Sosika Delivery Co. to foster innovation and support startups in the food delivery industry.",
        url: "https://sosika.com/smart-competition-2025",
        siteName: "Sosika",
    },
}

export default function SmartCompetition2025Layout({
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