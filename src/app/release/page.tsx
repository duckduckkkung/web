"use client";

import { useRouter } from "next/navigation";

import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] h-[calc(100dvh_-_80px)] m-[0_auto] flex justify-center items-center"></div>

            <Footer />
        </div>
    );
}
