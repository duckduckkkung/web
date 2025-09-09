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
            className="aspect-3/1 rounded-[8px] overflow-hidden cursor-pointer flex group"
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

            <div className="flex-1 p-[32px] min-w-0 flex flex-col justify-between">
                <div className="flex flex-col gap-[4px]">
                    <span className="font-p-bold text-[16px] text-stone-900 block truncate group-hover:underline">
                        {data.name}
                    </span>

                    <span className="font-p-medium text-[16px] text-stone-400 block truncate">
                        {data.description}
                    </span>
                </div>

                <span className="font-p-semibold text-[18px] text-stone-900 text-right">
                    {data.price.toLocaleString()}원
                </span>
            </div>
        </div>
    );
};
