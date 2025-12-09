import {
    ArrowUpRightIcon,
    PencilIcon,
    PlusIcon,
    Trash2Icon,
    XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "./button";
import { Modal } from "./modal";

import { TypeFan } from "../types/types";

interface BoardSidebarProps {
    type: "boards" | "board";
    fan: TypeFan;
}

export const BoardSidebar = ({ type, fan }: BoardSidebarProps) => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="bg-white rounded-[16px] flex flex-col">
                    <div className="p-[36px] flex flex-col items-center gap-[8px]">
                        <span className="font-p-semibold text-[18px] text-gray-900">
                            정말 게시글을 삭제하시겠어요?
                        </span>

                        <span className="font-p-medium text-[16px] text-gray-600">
                            삭제하면 다시 복구할 수 없어요.
                        </span>
                    </div>

                    <div className="w-full h-[1px] bg-gray-200" />

                    <div className="p-[24px] grid grid-cols-2 gap-[16px]">
                        <Button
                            type="lg"
                            variants="black"
                            onClick={() => {
                                setIsOpen(false);
                                router.push(`/fans/${fan.name}/board`);
                            }}
                            icons={[
                                {
                                    float: "left",
                                    component: (
                                        <Trash2Icon
                                            key="delete-post"
                                            size={16}
                                            className="stroke-white"
                                        />
                                    ),
                                },
                            ]}
                        >
                            삭제
                        </Button>

                        <Button
                            type="lg"
                            variants="outline"
                            onClick={() => setIsOpen(false)}
                            icons={[
                                {
                                    float: "left",
                                    component: (
                                        <XIcon
                                            key="delete-post-cancel"
                                            size={16}
                                            className="stroke-gray-900"
                                        />
                                    ),
                                },
                            ]}
                        >
                            취소
                        </Button>
                    </div>
                </div>
            </Modal>

            <div className="shrink-0 w-[240px] flex flex-col gap-[96px]">
                <div className="flex flex-col gap-[24px]">
                    {type === "board" ? (
                        <>
                            <div className="flex flex-col gap-[12px]">
                                <div className="flex justify-between items-center h-[32px]">
                                    <span className="font-p-semibold text-[16px] text-gray-900">
                                        작성자
                                    </span>

                                    <div
                                        className="w-fit p-[4px_10px] flex items-center gap-[4px] hover:bg-gray-100 rounded-[6px] cursor-pointer transition-all duration-[.1s]"
                                        onClick={() => router.push("/엄준식")}
                                    >
                                        <span className="font-p-medium text-[16px] text-gray-900">
                                            엄준식
                                        </span>

                                        <ArrowUpRightIcon
                                            size={14}
                                            className="stroke-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center h-[32px]">
                                    <span className="font-p-semibold text-[16px] text-gray-900">
                                        작성일
                                    </span>

                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        2025. 09. 11.
                                    </span>
                                </div>

                                <div className="flex justify-between items-center h-[32px]">
                                    <span className="font-p-semibold text-[16px] text-gray-900">
                                        유형
                                    </span>

                                    <div
                                        className="w-fit p-[4px_10px] flex items-center gap-[4px] hover:bg-gray-100 rounded-[6px] cursor-pointer transition-all duration-[.1s]"
                                        onClick={() =>
                                            router.push(
                                                `/fans/${fan.name}/board?q=notice`
                                            )
                                        }
                                    >
                                        <span className="font-p-medium text-[16px] text-gray-900">
                                            공지사항
                                        </span>

                                        <ArrowUpRightIcon
                                            size={14}
                                            className="stroke-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center h-[32px]">
                                    <span className="font-p-semibold text-[16px] text-gray-900">
                                        글머리
                                    </span>

                                    <div
                                        className="w-fit p-[4px_10px] flex items-center gap-[4px] hover:bg-gray-100 rounded-[6px] cursor-pointer transition-all duration-[.1s]"
                                        onClick={() =>
                                            router.push(
                                                `/fans/${fan.name}/board?q=필독`
                                            )
                                        }
                                    >
                                        <span className="font-p-medium text-[16px] text-gray-900">
                                            필독
                                        </span>

                                        <ArrowUpRightIcon
                                            size={14}
                                            className="stroke-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center h-[32px]">
                                    <span className="font-p-semibold text-[16px] text-gray-900">
                                        조회수
                                    </span>

                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        24
                                    </span>
                                </div>

                                <div className="flex justify-between items-center h-[32px]">
                                    <span className="font-p-semibold text-[16px] text-gray-900">
                                        좋아요
                                    </span>

                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        7
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-[12px]">
                                <Button
                                    type="lg"
                                    variants="outline"
                                    icons={[
                                        {
                                            float: "left",
                                            component: (
                                                <PencilIcon
                                                    key="modify-post"
                                                    size={16}
                                                    className="stroke-gray-900"
                                                />
                                            ),
                                        },
                                    ]}
                                    onClick={() =>
                                        router.push(
                                            `/fans/${fan.name}/board/1/modify`
                                        )
                                    }
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
                                                    key="delete-post"
                                                    size={16}
                                                    className="stroke-white"
                                                />
                                            ),
                                        },
                                    ]}
                                    onClick={() => setIsOpen(true)}
                                >
                                    삭제하기
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-[12px]">
                                <div className="flex justify-between items-center">
                                    <span className="font-p-semibold text-[16px] text-gray-900">
                                        관리자
                                    </span>

                                    <div
                                        className="w-fit p-[4px_10px] flex items-center gap-[4px] hover:bg-gray-100 rounded-[6px] cursor-pointer transition-all duration-[.1s]"
                                        onClick={() => router.push("/고서온")}
                                    >
                                        <span className="font-p-medium text-[16px] text-gray-900">
                                            고서온
                                        </span>

                                        <ArrowUpRightIcon
                                            size={14}
                                            className="stroke-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="font-p-semibold text-[16px] text-gray-900">
                                        게시글 수
                                    </span>

                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        32,874,315
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="lg"
                                variants="black"
                                icons={[
                                    {
                                        float: "left",
                                        component: (
                                            <PlusIcon
                                                key="create-post"
                                                size={16}
                                                className="stroke-white"
                                            />
                                        ),
                                    },
                                ]}
                                onClick={() =>
                                    router.push(
                                        `/fans/${fan.name}/board/create`
                                    )
                                }
                            >
                                새 게시글
                            </Button>
                        </>
                    )}
                </div>

                <div className="flex flex-col gap-[14px]">
                    <div className="flex justify-between items-center gap-[6px] cursor-pointer">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            💫 자유게시판
                        </span>

                        <ArrowUpRightIcon
                            size={16}
                            className="stroke-gray-900"
                        />
                    </div>

                    <div className="flex justify-between items-center gap-[6px] cursor-pointer">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            💩 똥글
                        </span>

                        <ArrowUpRightIcon
                            size={16}
                            className="stroke-gray-900"
                        />
                    </div>

                    <div className="flex justify-between items-center gap-[6px] cursor-pointer">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            ✨ 팬아트
                        </span>

                        <ArrowUpRightIcon
                            size={16}
                            className="stroke-gray-900"
                        />
                    </div>

                    <div className="flex justify-between items-center gap-[6px] cursor-pointer">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            📊 개망한 주식 대회
                        </span>

                        <ArrowUpRightIcon
                            size={16}
                            className="stroke-gray-900"
                        />
                    </div>

                    <div className="flex justify-between items-center gap-[6px] cursor-pointer">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            🤖 AI 코딩 대회
                        </span>

                        <ArrowUpRightIcon
                            size={16}
                            className="stroke-gray-900"
                        />
                    </div>

                    <div className="flex justify-between items-center gap-[6px] cursor-pointer">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            ⭐ 시발
                        </span>

                        <ArrowUpRightIcon
                            size={16}
                            className="stroke-gray-900"
                        />
                    </div>

                    <div className="flex justify-between items-center gap-[6px] cursor-pointer">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            🌍 월드에는
                        </span>

                        <ArrowUpRightIcon
                            size={16}
                            className="stroke-gray-900"
                        />
                    </div>

                    <div className="flex justify-between items-center gap-[6px] cursor-pointer">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            📞 김인직이 콜센타
                        </span>

                        <ArrowUpRightIcon
                            size={16}
                            className="stroke-gray-900"
                        />
                    </div>

                    <div className="flex justify-between items-center gap-[6px] cursor-pointer">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            💼 회사원들
                        </span>

                        <ArrowUpRightIcon
                            size={16}
                            className="stroke-gray-900"
                        />
                    </div>

                    <div className="flex justify-between items-center gap-[6px] cursor-pointer">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            🔑 보안 잡담
                        </span>

                        <ArrowUpRightIcon
                            size={16}
                            className="stroke-gray-900"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
