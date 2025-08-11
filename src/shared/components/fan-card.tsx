"use client";

import { SmileIcon, WarehouseIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { TypeFan } from "../types/types";

export interface FanCardProps {
    data: TypeFan;
}

export const FanCard = ({ data }: FanCardProps) => {
    const router = useRouter();

    return (
        <div
            className="relative aspect-square rounded-[8px] overflow-hidden cursor-pointer group"
            onClick={() => router.push(`/${data.id}`)}
        >
            <Image
                src={data.imageUrl[0]}
                alt={data.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
            />

            <div className="absolute z-[1] top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-[.2s] backdrop-blur-[4px]" />

            <div className="absolute z-[2] top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-[.2s] bg-linear-to-b from-transparent to-stone-900 flex items-end p-[24px]">
                <div className="w-full flex flex-col gap-[16px] group-hover:translate-y-0 translate-y-[10px] transition-all duration-[.2s]">
                    <div className="flex flex-col gap-[4px]">
                        <span className="font-p-medium text-[18px] text-white">
                            {data.name}
                        </span>

                        <span className="w-full font-p-regular text-[16px] text-white truncate">
                            {data.description}
                        </span>
                    </div>

                    <div className="flex justify-end items-center gap-[16px]">
                        <div className="flex items-center gap-[4px]">
                            <WarehouseIcon
                                size={16}
                                className="shrink-0 fill-white"
                            />

                            <span className="w-full font-p-regular text-[14px] text-white truncate">
                                {data.communityCount}
                            </span>
                        </div>

                        <div className="flex items-center gap-[4px]">
                            <SmileIcon
                                size={16}
                                className="shrink-0 fill-white"
                            />

                            <span className="w-full font-p-regular text-[14px] text-white truncate">
                                굿즈 사이트{" "}
                                {data.isGoodsSiteExists ? "있음" : "없음"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
