"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { signWithKakao } from "@/features/oauth2/api";
import { Storage } from "@/shared/services/storage";

export default function Oauth2Kakao() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const code = searchParams.get("code") as string;

            if (code) {
                try {
                    const response = await signWithKakao({ code });

                    if (response.type === "register")
                        router.push(
                            `/register?token=${response.token}&provider=kakao`
                        );
                    else {
                        Storage.setAccessToken(response.access_token);
                        router.push("/fans");
                    }

                    return;
                } catch {
                    router.push("/");
                }
            }
        })();
    }, [searchParams, router]);

    return <div className=""></div>;
}
