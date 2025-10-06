"use client";

import { HeartIcon, MessageCircleMoreIcon, PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { TypeMoment } from "../types/types";

interface MomentCardProps {
    data: TypeMoment;
}

export const MomentCard = ({ data }: MomentCardProps) => {
    const router = useRouter();

    return (
        <div
            className="relative aspect-9/19 rounded-[8px] overflow-hidden cursor-pointer flex flex-col group"
            onClick={() => router.push(`/fans/asdf/moments?q=${data.id}`)}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={data.thumbnailUrl}
                alt="thumbnail"
                className="aspect-9/15 object-cover rounded-[8px]"
            />

            <div className="group-hover:opacity-100 opacity-0 transition-all duration-[.2s] absolute z-[1] top-0 left-0 w-full h-fit bg-linear-to-b from-stone-900 to-transparent flex justify-end items-center p-[16px]">
                <div className="flex items-center gap-[6px]">
                    <PlayIcon size={14} className="stroke-white" />

                    <span className="font-p-medium text-[14px] text-white">
                        {data.watchCount.toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="h-full flex flex-col gap-[8px] p-[16px_8px]">
                <span className="font-p-semibold text-[16px] text-stone-900 truncate">
                    {data.title}
                </span>

                <div className="flex justify-end items-center gap-[8px]">
                    <div className="flex items-center gap-[4px]">
                        <HeartIcon size={12} className="stroke-stone-600" />

                        <span className="font-p-medium text-[12px] text-stone-600">
                            {data.likeCount.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-[4px]">
                        <MessageCircleMoreIcon
                            size={12}
                            className="stroke-stone-600"
                        />

                        <span className="font-p-medium text-[12px] text-stone-600">
                            {data.commentCount.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
