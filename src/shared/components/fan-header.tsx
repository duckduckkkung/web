"use client";

import { SparkleIcon, VideotapeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { WideSearch } from "./wide-search";
import { Button } from "./button";

import { TypeFan } from "../types/types";

interface FanHeaderProps {
    fan: TypeFan;
}

export const FanHeader = ({ fan }: FanHeaderProps) => {
    const router = useRouter();

    const [search, setSearch] = useState<string>("");

    return (
        <div className="max-w-[1280px] h-[80px] m-[0_auto] flex justify-between items-center">
            <div className="flex items-center gap-[16px]">
                <div
                    className="p-[6px_12px] flex items-center gap-[8px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]"
                    onClick={() => router.push("/fans")}
                >
                    <VideotapeIcon size={16} className="stroke-stone-900" />

                    <span className="font-p-semibold text-[18px] text-stone-900">
                        {fan.name}
                    </span>
                </div>

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
