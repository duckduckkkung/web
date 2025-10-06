"use client";

import {
    AmpersandIcon,
    BellIcon,
    ChevronDownIcon,
    FileOutputIcon,
    MessageCircleMoreIcon,
    PackageIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Button } from "./button";

interface NotificationsProps {}

export const Notifications = ({}: NotificationsProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const containerVariants = useMemo(
        () => ({
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: 0.3 } },
            exit: { opacity: 0, transition: { duration: 0.3 } },
        }),
        []
    );

    return (
        <div className="z-[100] fixed right-[36px] bottom-[36px]">
            <div
                className={`transition-all duration-300 ${
                    isOpen ? "w-[300px]" : "w-[80px]"
                } bg-white border border-stone-200 rounded-[8px] flex flex-col overflow-hidden`}
            >
                <div
                    className="flex justify-between items-center p-[16px] cursor-pointer hover:bg-stone-50 transition-all duration-[.1s]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={`notf-${isOpen ? "open" : "close"}`}
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {isOpen ? (
                                <span className="font-p-semibold text-[14px] text-stone-900">
                                    알림
                                </span>
                            ) : (
                                <BellIcon
                                    size={18}
                                    className="stroke-stone-900"
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <ChevronDownIcon
                        size={14}
                        className={`stroke-stone-900 transition-transform ${
                            !isOpen ? "rotate-180" : ""
                        }`}
                    />
                </div>

                <div
                    className={`overflow-y-scroll transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[300px]" : "max-h-0"
                    }`}
                >
                    <div className="flex flex-col">
                        <div className="p-[16px] cursor-pointer hover:bg-stone-50 flex items-center gap-[8px] transition-all duration-[.1s]">
                            <div className="shrink-0 size-[48px] flex justify-center items-center">
                                <PackageIcon
                                    size={24}
                                    className="stroke-stone-900"
                                />
                            </div>

                            <div className="flex flex-col gap-[4px]">
                                <span className="font-p-semibold text-[14px] text-stone-900">
                                    새 굿즈 2개
                                </span>

                                <div className="flex-1 flex flex-wrap gap-[8px] items-center">
                                    <span className="font-p-medium text-[12px] text-stone-400">
                                        프로미스나인
                                    </span>

                                    <span className="font-p-medium text-[12px] text-stone-400">
                                        4시간 전
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-stone-100" />

                        <div className="p-[16px] cursor-pointer hover:bg-stone-50 flex items-center gap-[8px] transition-all duration-[.1s]">
                            <div className="shrink-0 size-[48px] flex justify-center items-center">
                                <MessageCircleMoreIcon
                                    size={24}
                                    className="stroke-stone-900"
                                />
                            </div>

                            <div className="flex flex-col gap-[4px]">
                                <span className="font-p-semibold text-[14px] text-stone-900">
                                    새 코멘트 9개
                                </span>

                                <div className="flex-1 flex flex-wrap gap-[8px] items-center">
                                    <span className="font-p-medium text-[12px] text-stone-400">
                                        프로미스나인
                                    </span>

                                    <span className="font-p-medium text-[12px] text-stone-400 underline">
                                        이거 하는법좀
                                    </span>

                                    <span className="font-p-medium text-[12px] text-stone-400">
                                        4시간 전
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-stone-100" />

                        <div className="p-[16px] cursor-pointer hover:bg-stone-50 flex items-center gap-[8px] transition-all duration-[.1s]">
                            <div className="shrink-0 size-[48px] flex justify-center items-center">
                                <FileOutputIcon
                                    size={24}
                                    className="stroke-stone-900"
                                />
                            </div>

                            <div className="flex flex-col gap-[4px]">
                                <span className="font-p-semibold text-[14px] text-stone-900">
                                    정보 업데이트 결과
                                </span>

                                <div className="flex-1 flex flex-wrap gap-[8px] items-center">
                                    <span className="font-p-medium text-[12px] text-stone-400">
                                        릴파
                                    </span>

                                    <span className="font-p-medium text-[12px] text-stone-400">
                                        4시간 전
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-stone-100" />

                        <div className="p-[16px] cursor-pointer hover:bg-stone-50 flex items-center gap-[8px] transition-all duration-[.1s]">
                            <div className="shrink-0 size-[48px] flex justify-center items-center">
                                <AmpersandIcon
                                    size={24}
                                    className="stroke-stone-900"
                                />
                            </div>

                            <div className="flex flex-col gap-[4px]">
                                <span className="font-p-semibold text-[14px] text-stone-900">
                                    신규 유저 3명
                                </span>

                                <div className="flex-1 flex flex-wrap gap-[8px] items-center">
                                    <span className="font-p-medium text-[12px] text-stone-400">
                                        릴파
                                    </span>

                                    <span className="font-p-medium text-[12px] text-stone-400">
                                        4시간 전
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-stone-100" />

                        <div className="p-[16px] cursor-pointer hover:bg-stone-50 flex items-center gap-[8px] transition-all duration-[.1s]">
                            <div className="shrink-0 size-[48px] flex justify-center items-center">
                                <PackageIcon
                                    size={24}
                                    className="stroke-stone-900"
                                />
                            </div>

                            <div className="flex flex-col gap-[4px]">
                                <span className="font-p-semibold text-[14px] text-stone-900">
                                    새 굿즈 5개
                                </span>

                                <div className="flex-1 flex flex-wrap gap-[8px] items-center">
                                    <span className="font-p-medium text-[12px] text-stone-400">
                                        릴파
                                    </span>

                                    <span className="font-p-medium text-[12px] text-stone-400">
                                        4시간 전
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[100px]" : "max-h-0"
                    }`}
                >
                    <div className="p-[16px] flex flex-col">
                        <Button
                            type="lg"
                            variants="outline"
                            icons={[
                                {
                                    float: "left",
                                    component: (
                                        <BellIcon
                                            key="read-all"
                                            size={16}
                                            className="stroke-stone-900"
                                        />
                                    ),
                                },
                            ]}
                        >
                            모두 읽음 처리하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
