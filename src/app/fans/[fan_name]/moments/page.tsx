"use client";

import {
    ArrowDownRightIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    HeartIcon,
    MessageCircleMoreIcon,
    MessageCircleWarningIcon,
    XIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { FanHeader } from "@/shared/components/fan-header";

import { TypeFan } from "@/shared/types/types";

export default function Moments() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const searchParams = useSearchParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter();

    const [isOpenCommentWindow, setIsOpenCommentWindow] = useState(false);

    const fan: TypeFan = {
        id: "1",
        name: "송하영",
        description:
            "작고귀엽고사랑스럽고노래도너무잘부르고춤도잘추는레전드송하영사랑꾼들의모임",
        imageUrl: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk1q1Fk5medS__SP2mw9fwJLICbzwo5_UpsA&s",
            "https://i.namu.wiki/i/6462Vd7qUEjNaMB5IyKHrWysXrOTDW1RGjERq6TdnjXk7f7JhB3WUnM0Gps6RD7yAk4LbqRuqzrSbDUzHTxvLQ.webp",
            "https://i.namu.wiki/i/uOHdUtiQwJU_aiqAc-avrNgkvTKCN9DS6i9W3JYkRi5EZjMui4BOeFkD2MUATIPxsGgCpE5lzU1qyxATBl8FvQ.webp",
            "https://biz.chosun.com/resizer/v2/34YB2KY35L2WWQUGAT6RWHRBXA.jpg?auth=9c5179d3b87d2ac933f60be115318f6fa21e2ff995af3d39e261e8ef64a3ce3c&width=530&height=696&smart=true",
        ],
        isGoodsSiteExists: false,
        tags: ["귀여움", "맏언니", "송하영", "개이뻐쪽쪽"],
    };

    return (
        <div>
            <FanHeader href="/fans" fan={fan} />

            <div className="max-w-[1280px] h-[calc(100dvh_-_80px)] m-[0_auto] flex justify-center items-center">
                <div className="max-h-[800px] flex gap-[16px]">
                    <div className="relative min-w-[480px] aspect-9/15">
                        <div className="size-full bg-gray-900 rounded-[16px]" />

                        <div className="absolute inset-0 size-full p-[24px] flex items-end">
                            <div className="flex flex-col gap-[16px]">
                                <div className="flex items-center gap-[8px] cursor-pointer w-fit">
                                    <div className="bg-white rounded-[6px] size-[24px]" />

                                    <span className="font-p-medium text-[16px] text-white text-shadow-lg text-shadow-gray-900/60">
                                        고서온
                                    </span>
                                </div>

                                <div className="flex flex-col gap-[4px]">
                                    <span className="font-p-medium text-[18px] text-white text-shadow-lg text-shadow-gray-900/60">
                                        송하영 레전드 애교 발생
                                    </span>

                                    <span className="font-p-medium text-[16px] text-white/80 text-shadow-lg text-shadow-gray-900/40">
                                        진짜 너무 귀엽다 하영이.. ❤️❤️
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-[48px]">
                        <div className="flex flex-col gap-[16px]">
                            <div className="group size-[48px] rounded-[6px] bg-red-50 cursor-pointer flex justify-center items-center">
                                <HeartIcon
                                    size={24}
                                    className="stroke-red-400 group-hover:stroke-red-500 transition-all duration-[.1s] group-active:fill-red-500 group-active:stroke-red-50"
                                />
                            </div>

                            <div
                                className="group size-[48px] rounded-[6px] bg-gray-100 cursor-pointer flex justify-center items-center"
                                onClick={() =>
                                    setIsOpenCommentWindow((p) => !p)
                                }
                            >
                                <MessageCircleMoreIcon
                                    size={24}
                                    className="stroke-gray-500 group-hover:stroke-gray-600 transition-all duration-[.1s] group-active:fill-gray-600 group-active:stroke-gray-100"
                                />
                            </div>
                        </div>

                        <div className="group size-[48px] rounded-[6px] bg-red-50 cursor-pointer flex justify-center items-center">
                            <MessageCircleWarningIcon
                                size={24}
                                className="stroke-red-400 group-hover:stroke-red-500 transition-all duration-[.1s] group-active:fill-red-500 group-active:stroke-red-50"
                            />
                        </div>
                    </div>

                    <div
                        className={`transition-all duration-300 overflow-hidden ${
                            isOpenCommentWindow
                                ? "w-[480px] opacity-100"
                                : "w-0 opacity-0"
                        }`}
                    >
                        <div className="w-[480px] h-full rounded-[16px] border border-gray-200 flex flex-col gap-[48px]">
                            <div className="flex justify-between items-center p-[24px] pb-0">
                                <span className="font-p-semibold text-[18px] text-gray-900">
                                    댓글
                                </span>

                                <div
                                    className="p-[8px] flex items-center gap-[8px] hover:bg-gray-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]"
                                    onClick={() =>
                                        setIsOpenCommentWindow(false)
                                    }
                                >
                                    <XIcon
                                        size={16}
                                        className="stroke-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="h-full overflow-y-scroll flex flex-col gap-[24px] p-[24px] pt-0">
                                <div className="flex flex-col gap-[16px]">
                                    <div className="flex flex-col gap-[12px]">
                                        <div className="flex items-center gap-[8px] cursor-pointer w-fit">
                                            <div className="bg-gray-100 rounded-[6px] size-[24px]" />

                                            <span className="font-p-medium text-[14px] text-gray-900">
                                                고서온
                                            </span>
                                        </div>

                                        <span className="font-p-medium text-[14px] text-gray-900">
                                            송하영 너무 귀여워서 죽을 것 같ㅇ
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-p-medium text-[12px] text-gray-300 cursor-pointer">
                                            4시간 전
                                        </span>

                                        <HeartIcon
                                            size={14}
                                            className="stroke-red-400 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="flex-1 h-[1px] bg-gray-200" />

                                    <div className="shrink-0 p-[1px_12px] pb-[2px] border border-gray-200 rounded-full cursor-pointer flex items-center gap-[4px]">
                                        <ChevronUpIcon
                                            size={12}
                                            className="stroke-gray-500"
                                        />

                                        <span className="font-p-medium text-[12px] text-gray-500">
                                            접기
                                        </span>
                                    </div>

                                    <div className="flex-1 h-[1px] bg-gray-200" />
                                </div>

                                <div className="flex items-start gap-[24px]">
                                    <ArrowDownRightIcon
                                        size={24}
                                        className="stroke-gray-400 shrink-0"
                                    />

                                    <div className="flex-1 flex flex-col gap-[16px]">
                                        <div className="flex flex-col gap-[12px]">
                                            <div className="flex items-center gap-[8px] cursor-pointer w-fit">
                                                <div className="bg-gray-100 rounded-[6px] size-[24px]" />

                                                <span className="font-p-medium text-[14px] text-gray-900">
                                                    극악무도한하영사랑꾼
                                                </span>
                                            </div>

                                            <span className="font-p-medium text-[14px] text-gray-900">
                                                이분 돌아가셨습니다.
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="font-p-medium text-[12px] text-gray-300 cursor-pointer">
                                                3시간 전
                                            </span>

                                            <HeartIcon
                                                size={14}
                                                className="stroke-red-400 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-gray-200" />

                                <div className="flex flex-col gap-[16px]">
                                    <div className="flex flex-col gap-[12px]">
                                        <div className="flex items-center gap-[8px] cursor-pointer w-fit">
                                            <div className="bg-gray-100 rounded-[6px] size-[24px]" />

                                            <span className="font-p-medium text-[14px] text-gray-900">
                                                송송난하영
                                            </span>
                                        </div>

                                        <span className="font-p-medium text-[14px] text-gray-900">
                                            이거 라이브 어디서보나요?
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-p-medium text-[12px] text-gray-300 cursor-pointer">
                                            10분 전
                                        </span>

                                        <HeartIcon
                                            size={14}
                                            className="stroke-red-400 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="flex-1 h-[1px] bg-gray-200" />

                                    <div className="shrink-0 p-[1px_12px] pb-[2px] border border-gray-200 rounded-full cursor-pointer flex items-center gap-[4px]">
                                        <ChevronDownIcon
                                            size={12}
                                            className="stroke-gray-500"
                                        />

                                        <span className="font-p-medium text-[12px] text-gray-500">
                                            펼치기
                                        </span>
                                    </div>

                                    <div className="flex-1 h-[1px] bg-gray-200" />
                                </div>

                                <div className="flex flex-col gap-[16px]">
                                    <div className="flex flex-col gap-[12px]">
                                        <div className="flex items-center gap-[8px] cursor-pointer w-fit">
                                            <div className="bg-gray-100 rounded-[6px] size-[24px]" />

                                            <span className="font-p-medium text-[14px] text-gray-900">
                                                고길동
                                            </span>
                                        </div>

                                        <span className="font-p-medium text-[14px] text-gray-900">
                                            와시
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-p-medium text-[12px] text-gray-300 cursor-pointer">
                                            1분 전
                                        </span>

                                        <HeartIcon
                                            size={14}
                                            className="stroke-red-400 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
