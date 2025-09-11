"use client";

import { useRouter } from "next/navigation";
import { SparkleIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { WideSearch } from "./wide-search";
import { Button } from "./button";

import Logo from "@/assets/icons/logo.png";

export const Header = () => {
    const router = useRouter();

    const [search, setSearch] = useState<string>("");

    return (
        <div className="max-w-[1280px] h-[80px] m-[0_auto] flex justify-between items-center">
            <div className="flex items-center gap-[16px]">
                <Image
                    src={Logo}
                    alt="logo"
                    width={36}
                    height={36}
                    className="cursor-pointer"
                    onClick={() => router.push("/")}
                />

                <WideSearch value={search} onChange={setSearch} />
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
                onClick={() => router.push("/register")}
            >
                시작하기
            </Button>
        </div>
    );
};
