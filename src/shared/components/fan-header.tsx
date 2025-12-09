"use client";

import { ArrowLeftIcon, VideotapeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { GlobalHeaderInteractions } from "./global-header-interactions";
import { WideSearch } from "./wide-search";

import { TypeFan } from "../types/types";

interface FanHeaderProps {
    href: string;
    fan: TypeFan;
}

export const FanHeader = ({ href, fan }: FanHeaderProps) => {
    const router = useRouter();

    const [search, setSearch] = useState<string>("");

    return (
        <div className="max-w-[1280px] h-[80px] m-[0_auto] flex justify-between items-center">
            <div className="flex items-center gap-[16px]">
                <div className="flex items-center gap-[4px]">
                    <div
                        className="p-[8px] flex items-center gap-[8px] hover:bg-gray-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]"
                        onClick={() => router.push(href)}
                    >
                        <ArrowLeftIcon size={16} className="stroke-gray-900" />
                    </div>

                    <div
                        className="p-[6px_12px] flex items-center gap-[8px] hover:bg-gray-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]"
                        onClick={() => router.push(`/fans/${fan.name}`)}
                    >
                        <VideotapeIcon size={16} className="stroke-gray-900" />

                        <span className="font-p-semibold text-[18px] text-gray-900">
                            {fan.name}
                        </span>
                    </div>
                </div>

                <WideSearch value={search} onChange={setSearch} />
            </div>

            <GlobalHeaderInteractions />
        </div>
    );
};
