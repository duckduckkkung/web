import type { Metadata } from "next";
import { Suspense } from "react";

import { Provider } from "./provider";

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
            <body>
                <Suspense>
                    <Provider>{children}</Provider>
                </Suspense>
            </body>
        </html>
    );
}
