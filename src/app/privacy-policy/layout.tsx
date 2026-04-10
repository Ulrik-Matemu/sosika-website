import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Sosika Delivery Co.",
    description: "Privacy Policy for Sosika Delivery Co. Learn how we collect, use, and protect your personal information when you use our food delivery services.",
    openGraph: {
        title: "Privacy Policy | Sosika Food Delivery",
        description: "Privacy Policy for Sosika Delivery Co. Learn how we collect, use, and protect your personal information when you use our food delivery services.",
        url: "https://sosika.com/privacy-policy",
        siteName: "Sosika",
    },
}

export default function PrivacyPolicyLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}
        </main>
    );
};