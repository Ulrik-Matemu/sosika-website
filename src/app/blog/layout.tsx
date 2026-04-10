import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Sosika Delivery Co.",
    description: "Explore latest articles from Sosika to get valuable insights.",
    openGraph: {
        title: "Blog | Sosika Food Delivery",
        description: "Explore latest articles from Sosika to get valuable insights",
        url: "https://sosika.com/blog",
        siteName: "Sosika",
    },
}


export default function BlogLayout( { children }: { children: React.ReactNode; } ) {
    return (
        <div>
            {children}
        </div>
    )
}