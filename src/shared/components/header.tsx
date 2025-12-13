"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import { GlobalHeaderInteractions } from "./global-header-interactions";
import { WideSearch } from "./wide-search";

import Logo from "@/assets/icons/logo.png";

export const Header = () => {
    const router = useRouter();

    const [search, setSearch] = useState<string>("");

    return (
        <div className="xl:px-0 px-[32px] max-w-[1280px] h-[80px] m-[0_auto] flex justify-between items-center">
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

            <GlobalHeaderInteractions />
        </div>
    );
};
