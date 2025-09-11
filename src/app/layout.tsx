import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "덕덕쿵",
    description: "힘들고 지칠 때, 덕덕쿵이 있어요.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}
