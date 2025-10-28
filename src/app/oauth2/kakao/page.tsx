"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { signWithKakao } from "@/features/oauth2/api";

export default function Oauth2Kakao() {
    const searchParams = useSearchParams();

    useEffect(() => {
        (async () => {
            const code = searchParams.get("code") as string;

            if (code) {
                const response = await signWithKakao({ code });
                console.log(response);

                return;
            }
        })();
    }, [searchParams]);

    return <div className=""></div>;
}
