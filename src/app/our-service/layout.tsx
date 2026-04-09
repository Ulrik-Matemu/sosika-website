import React from "react";

export default function OurServiveLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <main>
            {children}
        </main>
    )
}