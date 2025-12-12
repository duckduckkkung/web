"use client";

import { useRouter } from "next/navigation";

import { TypeGoods } from "../types/types";

export interface GoodsCardProps {
    data: TypeGoods;
}

export const GoodsCard = ({ data }: GoodsCardProps) => {
    const router = useRouter();

    return (
        <div
            className="sm:aspect-3/1 aspect-auto rounded-[8px] overflow-hidden cursor-pointer flex group sm:flex-row flex-col"
            onClick={() => router.push(`/fans/${data.fanName}?tabs=goods`)}
        >
            <div className="aspect-square shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={data.imageUrl}
                    alt="goods_image"
                    className="w-full h-full object-cover rounded-[8px] overflow-hidden"
                />
            </div>

            <div className="flex-1 lg:p-[32px] md:p-[16px] sm:p-[32px] p-[8px] min-w-0 flex flex-col justify-between sm:gap-0 gap-[16px]">
                <div className="flex flex-col gap-[4px]">
                    <span className="font-p-bold text-[16px] text-gray-900 block truncate group-hover:underline">
                        {data.name}
                    </span>

                    <span className="font-p-medium text-[16px] text-gray-400 block truncate">
                        {data.description}
                    </span>
                </div>

                <span className="font-p-gmsb text-[18px] text-gray-900 text-right">
                    {data.price.toLocaleString()}원
                </span>
            </div>
        </div>
    );
};
