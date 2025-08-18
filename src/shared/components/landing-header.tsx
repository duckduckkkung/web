"use client";

import { useRouter } from "next/navigation";
import { SparkleIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "./button";

import Logo from "@/assets/icons/logo.png";

export const LandingHeader = () => {
    const router = useRouter();

    return (
        <div className="max-w-[1280px] h-[80px] m-[0_auto] flex justify-between items-center">
            <div className="flex items-center gap-[16px]">
                <Image
                    src={Logo}
                    alt="logo"
                    width={48}
                    height={48}
                    className="cursor-pointer"
                    onClick={() => router.push("/")}
                />
            </div>

            <Button
                type="sm"
                variants="outline"
                icons={[
                    {
                        component: (
                            <SparkleIcon
                                key="start"
                                size={12}
                                className="stroke-stone-900"
                            />
                        ),
                        float: "left",
                    },
                ]}
                onClick={() => router.push("/auth/login")}
            >
                시작하기
            </Button>
        </div>
    );
};
