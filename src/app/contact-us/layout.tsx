import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us | Sosika Delivery Co.",
    description: "Have questions or feedback? Get in touch with the Sosika team. We're here to help and would love to hear from you.",
    openGraph: {
        title: "Contact Sosika",
        description: "Reach out to the Sosika team with your questions, feedback, or partnership inquiries. We're here to help!",
        url: "https://sosika.com/contact-us",
        siteName: "Sosika",
    },
}

export default function ContactUsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen">
            {children}
        </main>
    )
}