import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Sosika Delivery Co.",
    description: "Terms of Service for Sosika Delivery Co. Read our policies and guidelines for using our food delivery services, including user responsibilities and limitations.",
    openGraph: {
        title: "Terms of Service | Sosika Food Delivery",
        description: "Terms of Service for Sosika Delivery Co. Read our policies and guidelines for using our food delivery services, including user responsibilities and limitations.",
        url: "https://sosika.com/terms-of-service",
        siteName: "Sosika",
    },
}

export default function TermsOfServiceLayout({
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