"use client";

import { ArrowUpRightIcon, PencilLineIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ContributionGraph } from "@/shared/components/contribution-graph";
import { MomentCard } from "@/shared/components/moment-card";
import { Header } from "@/shared/components/header";
import { Button } from "@/shared/components/button";
import { Footer } from "@/shared/components/footer";
import { Tab } from "@/shared/components/tab";

import { moments } from "@/mocks/moments";

export default function User() {
    const router = useRouter();

    const [tab, setTab] = useState<string>("활동");
    const [direction, setDirection] = useState<number>(0);

    const handleTabChange = (newTab: string, direction: number) => {
        setDirection(direction);
        setTab(newTab);
    };

    const [insideTab, setInsideTab] = useState<string>("게시글");
    const [inSideDirection, setInsideDirection] = useState<number>(0);

    const handleInsideTabChange = (newTab: string, direction: number) => {
        setInsideDirection(direction);
        setInsideTab(newTab);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "10%" : "-10%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? "-10%" : "10%",
            opacity: 0,
        }),
    };

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] min-h-[100dvh] m-[0_auto] py-[48px]">
                <div className="flex gap-[48px]">
                    <div className="shrink-0 w-[300px] flex flex-col gap-[24px]">
                        <div className="w-[300px] flex flex-col gap-[48px]">
                            <div className="flex flex-col gap-[24px]">
                                <span className="font-p-semibold text-[20px] text-stone-900">
                                    고서온
                                </span>

                                <div className="relative size-[300px] overflow-hidden rounded-[8px]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://avatars.githubusercontent.com/u/98827759?v=4"
                                        alt="profile"
                                        className="size-[300px] object-cover"
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-[16px]">
                                <div className="flex flex-col gap-[6px]">
                                    <div className="flex justify-between items-center h-[29px]">
                                        <span className="font-p-medium text-[16px] text-stone-900">
                                            닉네임
                                        </span>

                                        <span className="font-p-regular text-[14px] text-stone-900">
                                            고서온
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center h-[29px]">
                                        <span className="font-p-medium text-[16px] text-stone-900">
                                            자기소개
                                        </span>

                                        <span className="font-p-regular text-[14px] text-stone-900">
                                            송하영좋아하는애
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center h-[29px]">
                                        <span className="font-p-medium text-[16px] text-stone-900">
                                            이메일
                                        </span>

                                        <div
                                            className="p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]"
                                            onClick={() =>
                                                router.push(
                                                    "mailto:ice1github@gmail.com"
                                                )
                                            }
                                        >
                                            <span className="font-p-regular text-[14px] text-stone-900">
                                                ice1github@gmail.com
                                            </span>

                                            <ArrowUpRightIcon
                                                size={12}
                                                className="stroke-stone-900"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-[8px]">
                                    <Button
                                        type="lg"
                                        variants="outline"
                                        icons={[
                                            {
                                                float: "left",
                                                component: (
                                                    <PencilLineIcon
                                                        size={16}
                                                        className="stroke-stone-900"
                                                    />
                                                ),
                                            },
                                        ]}
                                    >
                                        프로필 수정하기
                                    </Button>

                                    <span className="font-p-regular text-[12px] text-stone-600">
                                        가입 날짜: 2025. 08. 11. 18:03:47
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-[24px]">
                            <div className="flex flex-wrap gap-[6px]">
                                <div
                                    className="p-[2px_8px] rounded-[4px] cursor-pointer bg-white border border-stone-200 hover:bg-stone-50"
                                    onClick={() => router.push(`/fans/송하영`)}
                                >
                                    <span className="font-p-regular text-[12px] text-stone-600">
                                        송하영
                                    </span>
                                </div>

                                <div
                                    className="p-[2px_8px] rounded-[4px] cursor-pointer bg-white border border-stone-200 hover:bg-stone-50"
                                    onClick={() => router.push(`/fans/릴파`)}
                                >
                                    <span className="font-p-regular text-[12px] text-stone-600">
                                        릴파
                                    </span>
                                </div>
                            </div>

                            <Tab
                                options={["활동", "게시글", "댓글", "최근 본"]}
                                tab={tab}
                                onChange={handleTabChange}
                            />
                        </div>

                        <div className="relative overflow-hidden">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={tab}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        type: "tween",
                                        duration: 0.15,
                                        ease: "easeInOut",
                                    }}
                                    className="w-full"
                                >
                                    {tab === "활동" && (
                                        <div className="flex flex-col gap-[24px]">
                                            <ContributionGraph />

                                            <div className="px-[32px] flex flex-col gap-[8px]">
                                                <span className="font-p-semibold text-[14px] text-stone-900">
                                                    최근 활동
                                                </span>

                                                <div className="px-[16px] flex flex-col gap-[24px]">
                                                    <div className="flex flex-col gap-[16px]">
                                                        <span className="font-p-semibold text-[20px]">
                                                            2개의 게시글을
                                                            작성함
                                                        </span>

                                                        <div className="px-[16px] flex flex-wrap gap-[16px]">
                                                            <div className="w-fit p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                                                                <span className="font-p-regular text-[14px] text-stone-900">
                                                                    어맛!!
                                                                </span>

                                                                <ArrowUpRightIcon
                                                                    size={12}
                                                                    className="stroke-stone-900"
                                                                />
                                                            </div>

                                                            <div className="w-fit p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                                                                <span className="font-p-regular text-[14px] text-stone-900">
                                                                    이거보세요~!!!
                                                                </span>

                                                                <ArrowUpRightIcon
                                                                    size={12}
                                                                    className="stroke-stone-900"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-[16px]">
                                                        <span className="font-p-semibold text-[20px]">
                                                            6개의 커멘트를
                                                            작성함
                                                        </span>

                                                        <div className="px-[16px] flex flex-wrap gap-[16px]">
                                                            <div className="w-fit p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                                                                <span className="font-p-regular text-[14px] text-stone-900">
                                                                    오랜만입니다.
                                                                </span>

                                                                <ArrowUpRightIcon
                                                                    size={12}
                                                                    className="stroke-stone-900"
                                                                />
                                                            </div>

                                                            <div className="w-fit p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                                                                <span className="font-p-regular text-[14px] text-stone-900">
                                                                    송하영_개귀여운짤.zzal
                                                                </span>

                                                                <ArrowUpRightIcon
                                                                    size={12}
                                                                    className="stroke-stone-900"
                                                                />
                                                            </div>

                                                            <div className="w-fit p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                                                                <span className="font-p-regular text-[14px] text-stone-900">
                                                                    폰 배경화면
                                                                    구합니다
                                                                </span>

                                                                <ArrowUpRightIcon
                                                                    size={12}
                                                                    className="stroke-stone-900"
                                                                />
                                                            </div>

                                                            <div className="w-fit p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                                                                <span className="font-p-regular text-[14px] text-stone-900">
                                                                    마루 찌낀
                                                                    버내나
                                                                </span>

                                                                <ArrowUpRightIcon
                                                                    size={12}
                                                                    className="stroke-stone-900"
                                                                />
                                                            </div>

                                                            <div className="w-fit p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                                                                <span className="font-p-regular text-[14px] text-stone-900">
                                                                    허걱
                                                                </span>

                                                                <ArrowUpRightIcon
                                                                    size={12}
                                                                    className="stroke-stone-900"
                                                                />
                                                            </div>

                                                            <div className="w-fit p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                                                                <span className="font-p-regular text-[14px] text-stone-900">
                                                                    송하영이랑
                                                                    결혼하는
                                                                    방법
                                                                </span>

                                                                <ArrowUpRightIcon
                                                                    size={12}
                                                                    className="stroke-stone-900"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {tab === "게시글" && (
                                        <div className="py-[24px] grid grid-cols-3 gap-[16px]">
                                            {Array(24)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="border border-stone-200 rounded-[8px] flex flex-col cursor-pointer"
                                                    >
                                                        <div className="p-[12px_16px]">
                                                            <div className="flex flex-col gap-[6px]">
                                                                <div className="flex justify-between items-center">
                                                                    {i % 2 ===
                                                                    0 ? (
                                                                        <span className="font-p-semibold text-[14px] text-stone-900">
                                                                            공지사항
                                                                        </span>
                                                                    ) : (
                                                                        <span className="font-p-semibold text-[14px] text-stone-400">
                                                                            일반
                                                                        </span>
                                                                    )}

                                                                    {i % 2 ===
                                                                        0 && (
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            viewBox="0 0 41 41"
                                                                            fill="none"
                                                                        >
                                                                            <g clip-path="url(#clip0_2_145)">
                                                                                <path
                                                                                    d="M10.5572 39.9072C10.2882 39.9072 10.0152 39.8382 9.76518 39.6932C9.00518 39.2552 8.74418 38.2842 9.18418 37.5242L16.6022 24.6752C17.0402 23.9162 18.0102 23.6542 18.7712 24.0942C19.5312 24.5322 19.7922 25.5032 19.3522 26.2632L11.9342 39.1122C11.6402 39.6222 11.1072 39.9072 10.5572 39.9072Z"
                                                                                    fill="#4B596A"
                                                                                />
                                                                                <path
                                                                                    d="M35.6252 10.1892L22.3872 2.54619C21.2652 1.89819 19.8632 2.70819 19.8632 4.00319V6.36019C19.8632 9.36619 18.2602 12.1432 15.6572 13.6462L5.91621 19.2702C4.79421 19.9182 4.79421 21.5372 5.91621 22.1842L26.8532 34.2722C27.9752 34.9202 29.3772 34.1102 29.3772 32.8152V21.5672C29.3772 18.5612 30.9802 15.7842 33.5832 14.2812L35.6252 13.1022C36.7472 12.4542 36.7472 10.8352 35.6252 10.1882V10.1892Z"
                                                                                    fill="#EF4452"
                                                                                />
                                                                            </g>
                                                                            <defs>
                                                                                <clipPath id="clip0_2_145">
                                                                                    <rect
                                                                                        width="40"
                                                                                        height="40"
                                                                                        fill="white"
                                                                                        transform="translate(0.770264 0.318237)"
                                                                                    />
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg>
                                                                    )}
                                                                </div>

                                                                <div className="flex flex-col gap-[2px]">
                                                                    <span className="font-p-medium text-[16px] text-stone-900 truncate">
                                                                        [필독]
                                                                        2025
                                                                        커뮤니티
                                                                        규칙
                                                                    </span>

                                                                    <span className="font-p-medium text-[14px] text-stone-500 truncate">
                                                                        제 1조.
                                                                        대화
                                                                        에티켓
                                                                        이를
                                                                        지키지
                                                                        못할 시
                                                                        밴 또는
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="w-full h-[1px] bg-stone-200" />

                                                        <div className="p-[12px_16px]">
                                                            <div className="flex justify-between items-center gap-[6px]">
                                                                <span className="font-p-medium text-[12px] text-stone-400">
                                                                    9개월 전
                                                                </span>

                                                                <span className="font-p-medium text-[12px] text-stone-700">
                                                                    극악무도한송하영사랑꾼
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}

                                    {tab === "댓글" && (
                                        <div className="py-[24px] grid grid-cols-3 gap-[16px]">
                                            {Array(24)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="border border-stone-200 rounded-[8px] flex flex-col cursor-pointer"
                                                    >
                                                        <div className="p-[12px_16px]">
                                                            <span className="font-p-medium text-[16px] text-stone-900 truncate">
                                                                그거 진짠데
                                                            </span>
                                                        </div>

                                                        <div className="w-full h-[1px] bg-stone-200" />

                                                        <div className="p-[12px_16px]">
                                                            <div className="flex justify-between items-center gap-[6px]">
                                                                <span className="font-p-medium text-[12px] text-stone-400">
                                                                    7시간 전
                                                                </span>

                                                                <span className="font-p-medium text-[12px] text-stone-700">
                                                                    9월의 송하영
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}

                                    {tab === "최근 본" && (
                                        <div className="pl-[32px] py-[24px]">
                                            <Tab
                                                options={["게시글", "모먼트"]}
                                                tab={insideTab}
                                                onChange={handleInsideTabChange}
                                            />

                                            <div className="relative overflow-hidden">
                                                <AnimatePresence
                                                    mode="wait"
                                                    custom={inSideDirection}
                                                >
                                                    <motion.div
                                                        key={insideTab}
                                                        custom={inSideDirection}
                                                        variants={slideVariants}
                                                        initial="enter"
                                                        animate="center"
                                                        exit="exit"
                                                        transition={{
                                                            type: "tween",
                                                            duration: 0.15,
                                                            ease: "easeInOut",
                                                        }}
                                                        className="w-full"
                                                    >
                                                        {insideTab ===
                                                            "게시글" && (
                                                            <div className="py-[24px] grid grid-cols-3 gap-[16px]">
                                                                {Array(24)
                                                                    .fill(0)
                                                                    .map(
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="border border-stone-200 rounded-[8px] flex flex-col cursor-pointer"
                                                                            >
                                                                                <div className="p-[12px_16px]">
                                                                                    <div className="flex flex-col gap-[6px]">
                                                                                        <div className="flex justify-between items-center">
                                                                                            {i %
                                                                                                2 ===
                                                                                            0 ? (
                                                                                                <span className="font-p-semibold text-[14px] text-stone-900">
                                                                                                    공지사항
                                                                                                </span>
                                                                                            ) : (
                                                                                                <span className="font-p-semibold text-[14px] text-stone-400">
                                                                                                    일반
                                                                                                </span>
                                                                                            )}

                                                                                            {i %
                                                                                                2 ===
                                                                                                0 && (
                                                                                                <svg
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                    width="16"
                                                                                                    height="16"
                                                                                                    viewBox="0 0 41 41"
                                                                                                    fill="none"
                                                                                                >
                                                                                                    <g clip-path="url(#clip0_2_145)">
                                                                                                        <path
                                                                                                            d="M10.5572 39.9072C10.2882 39.9072 10.0152 39.8382 9.76518 39.6932C9.00518 39.2552 8.74418 38.2842 9.18418 37.5242L16.6022 24.6752C17.0402 23.9162 18.0102 23.6542 18.7712 24.0942C19.5312 24.5322 19.7922 25.5032 19.3522 26.2632L11.9342 39.1122C11.6402 39.6222 11.1072 39.9072 10.5572 39.9072Z"
                                                                                                            fill="#4B596A"
                                                                                                        />
                                                                                                        <path
                                                                                                            d="M35.6252 10.1892L22.3872 2.54619C21.2652 1.89819 19.8632 2.70819 19.8632 4.00319V6.36019C19.8632 9.36619 18.2602 12.1432 15.6572 13.6462L5.91621 19.2702C4.79421 19.9182 4.79421 21.5372 5.91621 22.1842L26.8532 34.2722C27.9752 34.9202 29.3772 34.1102 29.3772 32.8152V21.5672C29.3772 18.5612 30.9802 15.7842 33.5832 14.2812L35.6252 13.1022C36.7472 12.4542 36.7472 10.8352 35.6252 10.1882V10.1892Z"
                                                                                                            fill="#EF4452"
                                                                                                        />
                                                                                                    </g>
                                                                                                    <defs>
                                                                                                        <clipPath id="clip0_2_145">
                                                                                                            <rect
                                                                                                                width="40"
                                                                                                                height="40"
                                                                                                                fill="white"
                                                                                                                transform="translate(0.770264 0.318237)"
                                                                                                            />
                                                                                                        </clipPath>
                                                                                                    </defs>
                                                                                                </svg>
                                                                                            )}
                                                                                        </div>

                                                                                        <div className="flex flex-col gap-[2px]">
                                                                                            <span className="font-p-medium text-[16px] text-stone-900 truncate">
                                                                                                [필독]
                                                                                                2025
                                                                                                커뮤니티
                                                                                                규칙
                                                                                            </span>

                                                                                            <span className="font-p-medium text-[14px] text-stone-500 truncate">
                                                                                                제
                                                                                                1조.
                                                                                                대화
                                                                                                에티켓
                                                                                                이를
                                                                                                지키지
                                                                                                못할
                                                                                                시
                                                                                                밴
                                                                                                또는
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="w-full h-[1px] bg-stone-200" />

                                                                                <div className="p-[12px_16px]">
                                                                                    <div className="flex justify-between items-center gap-[6px]">
                                                                                        <span className="font-p-medium text-[12px] text-stone-400">
                                                                                            9개월
                                                                                            전
                                                                                        </span>

                                                                                        <span className="font-p-medium text-[12px] text-stone-700">
                                                                                            극악무도한송하영사랑꾼
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                            </div>
                                                        )}

                                                        {insideTab ===
                                                            "모먼트" && (
                                                            <div className="py-[24px] grid grid-cols-4 gap-[32px]">
                                                                {moments
                                                                    .slice(0, 4)
                                                                    .map(
                                                                        (
                                                                            moment
                                                                        ) => (
                                                                            <MomentCard
                                                                                key={
                                                                                    moment.id
                                                                                }
                                                                                data={
                                                                                    moment
                                                                                }
                                                                            />
                                                                        )
                                                                    )}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
