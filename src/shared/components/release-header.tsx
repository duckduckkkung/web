"use client";

import { ArrowLeftIcon, BugIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { GlobalHeaderInteractions } from "./global-header-interactions";

export const ReleaseHeader = () => {
    const router = useRouter();

    return (
        <div className="max-w-[1280px] h-[80px] m-[0_auto] flex justify-between items-center">
            <div className="flex items-center gap-[16px]">
                <div className="flex items-center gap-[4px]">
                    <div
                        className="p-[8px] flex items-center gap-[8px] hover:bg-gray-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]"
                        onClick={() => router.push("/release")}
                    >
                        <ArrowLeftIcon size={16} className="stroke-gray-900" />
                    </div>

                    <div
                        className="p-[6px_12px] flex items-center gap-[8px] hover:bg-gray-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]"
                        onClick={() => router.push("/release")}
                    >
                        <BugIcon size={16} className="stroke-gray-900" />

                        <span className="font-p-semibold text-[18px] text-gray-900">
                            패치노트
                        </span>
                    </div>
                </div>
            </div>

            <GlobalHeaderInteractions />
        </div>
    );
};
