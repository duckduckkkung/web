"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { signWithGoogle } from "@/features/oauth2/api";
import { Storage } from "@/shared/services/storage";

export default function Oauth2Google() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const code = searchParams.get("code") as string;

            if (code) {
                try {
                    const response = await signWithGoogle({ code });

                    if (response.type === "register")
                        router.push(
                            `/register?id=${response.kakaoId}&provider=google&image=${response.profileImage}&email=${response.email}`
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
