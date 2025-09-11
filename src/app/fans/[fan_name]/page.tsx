"use client";

import {
    ArrowUpRightIcon,
    BotMessageSquareIcon,
    HardDriveDownloadIcon,
    PinIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import { MomentCard } from "@/shared/components/moment-card";
import { FanHeader } from "@/shared/components/fan-header";
import { GoodsCard } from "@/shared/components/goods-card";
import { Button } from "@/shared/components/button";
import { Footer } from "@/shared/components/footer";
import { Tab } from "@/shared/components/tab";

import { TypeFan } from "@/shared/types/types";

import { moments } from "@/mocks/moments";
import { goods } from "@/mocks/goods";

export default function Fan() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [tab, setTab] = useState<string>("커뮤니티");
    const [direction, setDirection] = useState<number>(0);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragStartX, setDragStartX] = useState<number>(0);
    const [dragOffset, setDragOffset] = useState<number>(0);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const query = searchParams.get("tabs") as string;

        if (query === "goods") setTab("굿즈");
    }, [searchParams]);

    const handleTabChange = (newTab: string, direction: number) => {
        setDirection(direction);
        setTab(newTab);
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

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragOffset(0);
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const offset = e.clientX - dragStartX;
        setDragOffset(offset);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 100;
        if (Math.abs(dragOffset) > threshold) {
            if (dragOffset > 0 && currentImageIndex > 0) {
                setCurrentImageIndex((prev) => prev - 1);
            } else if (
                dragOffset < 0 &&
                currentImageIndex < fan.imageUrl.length - 1
            ) {
                setCurrentImageIndex((prev) => prev + 1);
            }
        }
        setDragOffset(0);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp();
        }
    };

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
            <FanHeader fan={fan} />

            <div className="max-w-[1280px] min-h-[100dvh] m-[0_auto] py-[48px]">
                <div className="flex gap-[48px]">
                    <div className="shrink-0 w-[300px] flex flex-col gap-[24px]">
                        <div className="w-[300px] flex flex-col gap-[48px]">
                            <div className="flex flex-col gap-[24px]">
                                <div className="flex justify-between items-center">
                                    <span className="font-p-semibold text-[20px] text-stone-900">
                                        🖼️ 사진첩
                                    </span>

                                    <div className="p-[8px] flex items-center gap-[8px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                                        <HardDriveDownloadIcon
                                            size={18}
                                            className="stroke-stone-900"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-[16px]">
                                    <div
                                        ref={imageContainerRef}
                                        className="relative size-[300px] overflow-hidden rounded-[8px] cursor-grab select-none"
                                        onMouseDown={handleMouseDown}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            cursor: isDragging
                                                ? "grabbing"
                                                : "grab",
                                        }}
                                    >
                                        <div
                                            className="flex transition-transform duration-300 ease-out h-full"
                                            style={{
                                                transform: `translateX(${
                                                    -currentImageIndex * 300 +
                                                    dragOffset
                                                }px)`,
                                                transitionDuration: isDragging
                                                    ? "0ms"
                                                    : "300ms",
                                            }}
                                        >
                                            {fan.imageUrl.map((url, index) => (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    key={index}
                                                    src={url}
                                                    alt={`fan_image_${
                                                        index + 1
                                                    }`}
                                                    className="size-[300px] object-cover shrink-0"
                                                    draggable={false}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-[16px]">
                                        {fan.imageUrl.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-full h-[4px] rounded-[8px] ${
                                                    index === currentImageIndex
                                                        ? "bg-stone-900"
                                                        : "bg-stone-200"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-[16px]">
                                <div className="flex flex-col gap-[6px]">
                                    <div className="flex justify-between items-center">
                                        <span className="font-p-medium text-[16px] text-stone-900">
                                            본명
                                        </span>

                                        <span className="font-p-regular text-[14px] text-stone-900">
                                            송하영
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-p-medium text-[16px] text-stone-900">
                                            나이
                                        </span>

                                        <span className="font-p-regular text-[14px] text-stone-900">
                                            27살
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-p-medium text-[16px] text-stone-900">
                                            생일
                                        </span>

                                        <span className="font-p-regular text-[14px] text-stone-900">
                                            09. 29.
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-p-medium text-[16px] text-stone-900">
                                            그룹
                                        </span>

                                        <div
                                            className="p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]"
                                            onClick={() => router.push("/fans")}
                                        >
                                            <span className="font-p-regular text-[14px] text-stone-900">
                                                프로미스나인
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
                                        type="md"
                                        variants="outline"
                                        icons={[
                                            {
                                                float: "left",
                                                component: (
                                                    <BotMessageSquareIcon
                                                        size={16}
                                                        className="stroke-stone-900"
                                                    />
                                                ),
                                            },
                                        ]}
                                    >
                                        정보 업데이트 요청하기
                                    </Button>

                                    <span className="font-p-regular text-[12px] text-stone-600">
                                        마지막 요청: 2025. 8. 11. 18:03:47
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-[24px]">
                            <div className="flex flex-wrap gap-[6px]">
                                {fan.tags.map((tag) => (
                                    <div
                                        key={tag}
                                        className="p-[2px_8px] rounded-[4px] cursor-pointer bg-white border border-stone-200 hover:bg-stone-50"
                                        onClick={() =>
                                            router.push(`/fans?tag=${tag}`)
                                        }
                                    >
                                        <span className="font-p-regular text-[12px] text-stone-600">
                                            #{tag}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Tab
                                options={["커뮤니티", "모먼트", "굿즈"]}
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
                                    {tab === "커뮤니티" && (
                                        <div className="relative">
                                            <div className="z-[10] absolute top-0 left-0 w-full h-full cursor-default flex justify-center">
                                                <div className="w-full h-[600px] flex justify-center items-center bg-radial from-white/80 to-transparent from-30% to-100%">
                                                    <div className="flex flex-col gap-[24px] items-center">
                                                        <div className="flex flex-col gap-[4px] items-center">
                                                            <span className="font-p-medium text-[16px] text-stone-900">
                                                                커뮤니티를
                                                                보려면 가입이
                                                                필요해요!
                                                            </span>

                                                            <span className="font-p-regular text-[14px] text-stone-900">
                                                                아래 버튼을 눌러
                                                                가입해 주세요.
                                                            </span>
                                                        </div>

                                                        <Button
                                                            type="md"
                                                            variants="black"
                                                            icons={[
                                                                {
                                                                    float: "left",
                                                                    component: (
                                                                        <ArrowUpRightIcon
                                                                            size={
                                                                                16
                                                                            }
                                                                            className="stroke-white"
                                                                        />
                                                                    ),
                                                                },
                                                            ]}
                                                        >
                                                            덕질 가입하기
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-[24px] pr-[32px] grid grid-cols-3 gap-[16px] blur-[12px]">
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
                                                                        {i %
                                                                            2 ===
                                                                        0 ? (
                                                                            <span className="font-p-semibold text-[14px] text-blue-800">
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
                                                                            <PinIcon
                                                                                size={
                                                                                    16
                                                                                }
                                                                                className="stroke-stone-300 rotate-[45deg]"
                                                                            />
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
                                        </div>
                                    )}

                                    {tab === "모먼트" && (
                                        <div className="py-[24px] pr-[32px] grid grid-cols-4 gap-[32px]">
                                            {moments
                                                .slice(0, 4)
                                                .map((moment) => (
                                                    <MomentCard
                                                        key={moment.id}
                                                        data={moment}
                                                    />
                                                ))}
                                        </div>
                                    )}

                                    {tab === "굿즈" && (
                                        <div className="py-[24px] pr-[32px] grid grid-cols-2 gap-[32px]">
                                            {goods.map((goods) => (
                                                <GoodsCard
                                                    key={goods.id}
                                                    data={goods}
                                                />
                                            ))}
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
