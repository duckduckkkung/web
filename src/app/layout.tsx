import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "덕덕쿵",
    description: "덕질을 만들고, 굿즈를 사고, 대화하세요.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
