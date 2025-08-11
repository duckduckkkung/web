"use client";

import { useRouter } from "next/navigation";
import { LogInIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { WideSearch } from "./wide-search";

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
                    width={48}
                    height={48}
                    className="cursor-pointer"
                    onClick={() => router.push("/")}
                />

                <WideSearch value={search} onChange={setSearch} />
            </div>

            <LogInIcon
                size={24}
                className="shrink-0 cursor-pointer stroke-stone-900"
            />
        </div>
    );
};
