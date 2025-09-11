"use client";

import { EyeIcon, HeartIcon, MessageCircleMoreIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import { MomentCard } from "@/shared/components/moment-card";
import { GoodsCard } from "@/shared/components/goods-card";
import { Header } from "@/shared/components/header";
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
            <Header />

            <div className="max-w-[1280px] m-[0_auto] py-[48px] pb-[96px] flex gap-[48px]">
                <div className="shrink-0 w-[300px] flex flex-col gap-[24px]">
                    <div className="w-[300px] flex flex-col gap-[16px]">
                        <div
                            ref={imageContainerRef}
                            className="relative size-[300px] overflow-hidden rounded-[8px] cursor-grab select-none"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            style={{ cursor: isDragging ? "grabbing" : "grab" }}
                        >
                            <div
                                className="flex transition-transform duration-300 ease-out h-full"
                                style={{
                                    transform: `translateX(${
                                        -currentImageIndex * 300 + dragOffset
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
                                        alt={`fan_image_${index + 1}`}
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

                        <div className="flex flex-col gap-[8px]">
                            <span className="font-p-bold text-[24px] text-stone-900 break-all">
                                {fan.name}
                            </span>

                            <span className="font-p-regular text-[16px] text-stone-700 break-all">
                                {fan.description}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <Tab
                        options={["커뮤니티", "모먼트", "굿즈"]}
                        tab={tab}
                        onChange={handleTabChange}
                    />

                    <div className="relative overflow-hidden h-full overflow-y-auto">
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
                                className="absolute w-full"
                            >
                                {tab === "커뮤니티" && (
                                    <div className="py-[32px] pr-[32px] flex flex-col gap-[24px]">
                                        <div className="flex justify-between items-center gap-[24px]">
                                            <div className="w-full flex items-center gap-[8px]">
                                                <div className="shrink-0 p-[2px_8px] rounded-[4px] cursor-pointer bg-white border border-stone-200 hover:bg-stone-50">
                                                    <span className="font-p-medium text-[12px] text-stone-900">
                                                        공지사항
                                                    </span>
                                                </div>

                                                <span className="block w-full font-p-medium text-[16px] text-stone-900 truncate cursor-pointer hover:underline">
                                                    이거 한번만 읽고 활동
                                                    부탁드립니다!
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-[16px]">
                                                <div className="flex items-center gap-[4px]">
                                                    <EyeIcon
                                                        size={14}
                                                        className="stroke-stone-900"
                                                    />

                                                    <span className="font-p-medium text-[12px] text-stone-900">
                                                        {Math.floor(
                                                            Math.random() * 100
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-[4px]">
                                                    <MessageCircleMoreIcon
                                                        size={14}
                                                        className="stroke-stone-900"
                                                    />

                                                    <span className="font-p-medium text-[12px] text-stone-900">
                                                        {Math.floor(
                                                            Math.random() * 100
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-[4px]">
                                                    <HeartIcon
                                                        size={14}
                                                        className="stroke-stone-900"
                                                    />

                                                    <span className="font-p-medium text-[12px] text-stone-900">
                                                        {Math.floor(
                                                            Math.random() * 100
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {[
                                            "송하영 존나 귀엽다고 생각하면 들어오셈",
                                            "아 진짜 이건 아니다...",
                                            "으흐흐",
                                            "오늘 본방 뭐시기 한다는데",
                                            "송하영 짤.jpg",
                                            "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
                                            "마루 귀엽다",
                                            "배경화면 구합니다",
                                        ].map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between items-center gap-[24px]"
                                            >
                                                <span className="block w-full font-p-medium text-[16px] text-stone-900 truncate cursor-pointer hover:underline">
                                                    {_}
                                                </span>

                                                <div className="flex items-center gap-[16px]">
                                                    <div className="flex items-center gap-[4px]">
                                                        <EyeIcon
                                                            size={14}
                                                            className="stroke-stone-900"
                                                        />

                                                        <span className="font-p-medium text-[12px] text-stone-900">
                                                            {Math.floor(
                                                                Math.random() *
                                                                    100
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-[4px]">
                                                        <MessageCircleMoreIcon
                                                            size={14}
                                                            className="stroke-stone-900"
                                                        />

                                                        <span className="font-p-medium text-[12px] text-stone-900">
                                                            {Math.floor(
                                                                Math.random() *
                                                                    100
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-[4px]">
                                                        <HeartIcon
                                                            size={14}
                                                            className="stroke-stone-900"
                                                        />

                                                        <span className="font-p-medium text-[12px] text-stone-900">
                                                            {Math.floor(
                                                                Math.random() *
                                                                    100
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {tab === "모먼트" && (
                                    <div className="py-[32px] pr-[32px] grid grid-cols-4 gap-[32px]">
                                        {moments.slice(0, 4).map((moment) => (
                                            <MomentCard
                                                key={moment.id}
                                                data={moment}
                                            />
                                        ))}
                                    </div>
                                )}

                                {tab === "굿즈" && (
                                    <div className="py-[32px] pr-[32px] grid grid-cols-2 gap-[32px]">
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

            <Footer />
        </div>
    );
}
