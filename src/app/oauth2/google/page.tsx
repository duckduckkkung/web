"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { signWithGoogle, Storage } from "@ice1/api-client";

export default function Oauth2Google() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const code = searchParams.get("code") as string;

            if (code) {
                try {
                    const response = await signWithGoogle({ code });

                    if (response.data.type === "register")
                        router.push(
                            `/register?token=${encodeURIComponent(
                                response.data.token
                            )}&provider=google`
                        );
                    else {
                        Storage.setAccessToken(response.data.access_token);
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
