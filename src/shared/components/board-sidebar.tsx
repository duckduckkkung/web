import { ArrowUpRightIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "./button";

import { TypeFan } from "../types/types";

interface BoardSidebarProps {
    fan?: TypeFan;
}

export const BoardSidebar = ({ fan }: BoardSidebarProps) => {
    const router = useRouter();

    return (
        <div className="shrink-0 w-[240px] flex flex-col gap-[96px]">
            <div className="flex flex-col gap-[24px]">
                {fan ? (
                    <div className="flex flex-col gap-[12px]">
                        <div className="flex justify-between items-center">
                            <span className="font-p-semibold text-[16px] text-stone-900">
                                작성자
                            </span>

                            <div
                                className="w-fit p-[4px_10px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[6px] cursor-pointer transition-all duration-[.1s]"
                                onClick={() => router.push("/엄준식")}
                            >
                                <span className="font-p-medium text-[16px] text-stone-900">
                                    엄준식
                                </span>

                                <ArrowUpRightIcon
                                    size={14}
                                    className="stroke-stone-900"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="font-p-semibold text-[16px] text-stone-900">
                                작성일
                            </span>

                            <span className="font-p-medium text-[16px] text-stone-900">
                                2025. 09. 11.
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="font-p-semibold text-[16px] text-stone-900">
                                유형
                            </span>

                            <div
                                className="w-fit p-[4px_10px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[6px] cursor-pointer transition-all duration-[.1s]"
                                onClick={() =>
                                    router.push(
                                        `/fans/${fan.name}/board?q=notice`
                                    )
                                }
                            >
                                <span className="font-p-medium text-[16px] text-stone-900">
                                    공지사항
                                </span>

                                <ArrowUpRightIcon
                                    size={14}
                                    className="stroke-stone-900"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="font-p-semibold text-[16px] text-stone-900">
                                글머리
                            </span>

                            <div
                                className="w-fit p-[4px_10px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[6px] cursor-pointer transition-all duration-[.1s]"
                                onClick={() =>
                                    router.push(
                                        `/fans/${fan.name}/board?q=필독`
                                    )
                                }
                            >
                                <span className="font-p-medium text-[16px] text-stone-900">
                                    필독
                                </span>

                                <ArrowUpRightIcon
                                    size={14}
                                    className="stroke-stone-900"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div />
                )}

                <div className="flex flex-col gap-[12px]">
                    <Button
                        type="lg"
                        variants="outline"
                        icons={[
                            {
                                float: "left",
                                component: (
                                    <PencilIcon
                                        size={16}
                                        className="stroke-stone-900"
                                    />
                                ),
                            },
                        ]}
                    >
                        수정하기
                    </Button>

                    <Button
                        type="lg"
                        variants="black"
                        icons={[
                            {
                                float: "left",
                                component: (
                                    <Trash2Icon
                                        size={16}
                                        className="stroke-white"
                                    />
                                ),
                            },
                        ]}
                    >
                        삭제하기
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-[14px]">
                <div className="border-b border-b-stone-400 flex justify-between items-center gap-[6px] cursor-pointer">
                    <span className="font-p-medium text-[16px] text-stone-900">
                        💫 자유게시판
                    </span>

                    <ArrowUpRightIcon size={16} className="stroke-stone-900" />
                </div>

                <div className="border-b border-b-stone-400 flex justify-between items-center gap-[6px] cursor-pointer">
                    <span className="font-p-medium text-[16px] text-stone-900">
                        💩 똥글
                    </span>

                    <ArrowUpRightIcon size={16} className="stroke-stone-900" />
                </div>

                <div className="border-b border-b-stone-400 flex justify-between items-center gap-[6px] cursor-pointer">
                    <span className="font-p-medium text-[16px] text-stone-900">
                        ✨ 팬아트
                    </span>

                    <ArrowUpRightIcon size={16} className="stroke-stone-900" />
                </div>

                <div className="border-b border-b-stone-400 flex justify-between items-center gap-[6px] cursor-pointer">
                    <span className="font-p-medium text-[16px] text-stone-900">
                        📊 개망한 주식 대회
                    </span>

                    <ArrowUpRightIcon size={16} className="stroke-stone-900" />
                </div>

                <div className="border-b border-b-stone-400 flex justify-between items-center gap-[6px] cursor-pointer">
                    <span className="font-p-medium text-[16px] text-stone-900">
                        🤖 AI 코딩 대회
                    </span>

                    <ArrowUpRightIcon size={16} className="stroke-stone-900" />
                </div>

                <div className="border-b border-b-stone-400 flex justify-between items-center gap-[6px] cursor-pointer">
                    <span className="font-p-medium text-[16px] text-stone-900">
                        ⭐ 시발
                    </span>

                    <ArrowUpRightIcon size={16} className="stroke-stone-900" />
                </div>

                <div className="border-b border-b-stone-400 flex justify-between items-center gap-[6px] cursor-pointer">
                    <span className="font-p-medium text-[16px] text-stone-900">
                        🌍 월드에는
                    </span>

                    <ArrowUpRightIcon size={16} className="stroke-stone-900" />
                </div>

                <div className="border-b border-b-stone-400 flex justify-between items-center gap-[6px] cursor-pointer">
                    <span className="font-p-medium text-[16px] text-stone-900">
                        📞 김인직이 콜센타
                    </span>

                    <ArrowUpRightIcon size={16} className="stroke-stone-900" />
                </div>

                <div className="border-b border-b-stone-400 flex justify-between items-center gap-[6px] cursor-pointer">
                    <span className="font-p-medium text-[16px] text-stone-900">
                        💼 회사원들
                    </span>

                    <ArrowUpRightIcon size={16} className="stroke-stone-900" />
                </div>

                <div className="border-b border-b-stone-400 flex justify-between items-center gap-[6px] cursor-pointer">
                    <span className="font-p-medium text-[16px] text-stone-900">
                        🔑 보안 잡담
                    </span>

                    <ArrowUpRightIcon size={16} className="stroke-stone-900" />
                </div>
            </div>
        </div>
    );
};
