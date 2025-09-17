"use client";

import { ArrowUpRightIcon, EyeIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { BoardSidebar } from "@/shared/components/board-sidebar";
import { FanHeader } from "@/shared/components/fan-header";
import { Footer } from "@/shared/components/footer";

import { TypeFan } from "@/shared/types/types";

export default function BoardMain() {
    const router = useRouter();

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
            <FanHeader href={`/fan/${fan.name}`} fan={fan} />

            <div className="max-w-[1280px] min-h-[100dvh] m-[0_auto] py-[64px] flex gap-[98px]">
                <BoardSidebar type="boards" fan={fan} />

                <div className="flex-1 shrink-0 flex flex-col gap-[96px]">
                    <div className="flex flex-col gap-[16px] cursor-pointer">
                        <div className="flex justify-between items-center">
                            <span className="font-p-semibold text-[16px] text-stone-900">
                                덕질 규칙
                            </span>

                            <ArrowUpRightIcon
                                size={16}
                                className="stroke-stone-900"
                            />
                        </div>

                        <span className="font-p-mj text-[18px] text-stone-900">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed cursus, nisl vitae sagittis mollis, magna
                            urna posuere ipsum, non aliquet massa nisl nec dui.
                            Curabitur vitae nunc molestie, vehicula odio sed,
                            gravida lacus. Donec ac urna libero. Suspendisse sit
                            amet sapien et mi commodo elementum. Phasellus vitae
                            mauris vitae ex faucibus hendrerit in vitae ipsum.
                            Ut malesuada lectus ut erat iaculis, et pellentesque
                            nibh molestie. Vestibulum porttitor eros tellus. Nam
                            volutpat magna erat, quis iaculis massa sagittis sit
                            amet. Pellentesque habitant morbi tristique senectus
                            et netus et malesuada fames ac turpis egestas.
                            Pellentesque vestibulum diam lacinia ultrices
                            egestas. Orci varius natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Ut
                            maximus ipsum vel mauris congue scelerisque a quis
                            dolor. Duis molestie, metus sit amet convallis
                            sodales, ante tellus suscipit nulla, vitae aliquet
                            purus metus non risus. Vivamus viverra urna libero,
                            sed maximus nunc tristique vitae.
                        </span>
                    </div>

                    <div className="flex flex-col gap-[16px]">
                        <span className="font-p-semibold text-[16px] text-stone-900">
                            최신
                        </span>

                        <div className="flex flex-col">
                            {Array(8)
                                .fill(0)
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        className="py-[8px] flex justify-between items-center cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/fans/${fan.name}/board/${i}`
                                            )
                                        }
                                    >
                                        <div className="flex items-center gap-[24px]">
                                            <span className="font-p-semibold text-[16px] text-stone-900">
                                                💩 똥글
                                            </span>

                                            <span className="font-p-medium text-[16px] text-stone-900">
                                                송하영 존나 귀여움
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex items-center gap-[24px]">
                                                <div className="flex items-center gap-[6px]">
                                                    <HeartIcon
                                                        size={14}
                                                        className="stroke-stone-900"
                                                    />

                                                    <span className="font-p-medium text-[12px] text-stone-900">
                                                        8
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-[6px]">
                                                    <EyeIcon
                                                        size={14}
                                                        className="stroke-stone-900"
                                                    />

                                                    <span className="font-p-medium text-[12px] text-stone-900">
                                                        14
                                                    </span>
                                                </div>
                                            </div>

                                            <ArrowUpRightIcon
                                                size={16}
                                                className="stroke-stone-900"
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[16px]">
                        <span className="font-p-semibold text-[16px] text-stone-900">
                            핫한 게시글
                        </span>

                        <div className="flex flex-col">
                            {Array(8)
                                .fill(0)
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        className="py-[8px] flex justify-between items-center cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/fans/${fan.name}/board/${i}`
                                            )
                                        }
                                    >
                                        <div className="flex items-center gap-[24px]">
                                            <span className="font-p-semibold text-[16px] text-stone-900">
                                                💩 똥글
                                            </span>

                                            <span className="font-p-medium text-[16px] text-stone-900">
                                                송하영 존나 귀여움
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex items-center gap-[24px]">
                                                <div className="flex items-center gap-[6px]">
                                                    <HeartIcon
                                                        size={14}
                                                        className="stroke-stone-900"
                                                    />

                                                    <span className="font-p-medium text-[12px] text-stone-900">
                                                        8
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-[6px]">
                                                    <EyeIcon
                                                        size={14}
                                                        className="stroke-stone-900"
                                                    />

                                                    <span className="font-p-medium text-[12px] text-stone-900">
                                                        14
                                                    </span>
                                                </div>
                                            </div>

                                            <ArrowUpRightIcon
                                                size={16}
                                                className="stroke-stone-900"
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
