"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { signWithGoogle } from "@/features/oauth2/api";
import axios from "axios";

export default function Oauth2Google() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const code = searchParams.get("code") as string;

            if (code) {
                try {
                    const response = await signWithGoogle({ code });
                    const kakaoResponse = await axios.get(
                        "https://kapi.kakao.com/v2/user/me",
                        {
                            headers: {
                                Authorization: `Bearer ${response.access_token}`,
                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=utf-8",
                            },
                        }
                    );
                    router.push(`/register?id=${kakaoResponse.data.id}`);

                    return;
                } catch {
                    router.push("/");
                }
            }
        })();
    }, [searchParams, router]);

    return <div className=""></div>;
}
