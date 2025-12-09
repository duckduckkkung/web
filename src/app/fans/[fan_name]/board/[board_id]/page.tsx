"use client";

import { useRouter } from "next/navigation";
import { HeartIcon } from "lucide-react";

import { BoardSidebar } from "@/shared/components/board-sidebar";
import { FanHeader } from "@/shared/components/fan-header";
import { Button } from "@/shared/components/button";
import { Footer } from "@/shared/components/footer";

import { TypeFan } from "@/shared/types/types";

export default function Board() {
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
            <FanHeader href={`/fans/${fan.name}/board`} fan={fan} />

            <div className="max-w-[1280px] min-h-[100dvh] m-[0_auto] py-[64px] flex gap-[98px]">
                <BoardSidebar type="board" fan={fan} />

                <div className="flex-1 shrink-0 flex flex-col gap-[128px]">
                    <div className="flex flex-col gap-[48px]">
                        <div className="flex flex-col gap-[16px]">
                            <div className="flex justify-between items-center gap-[8px]">
                                <span className="font-p-bold text-[24px] text-gray-900 truncate">
                                    2025 커뮤니티 규칙
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
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
                            </div>

                            <div className="w-full h-[1px] bg-gray-200" />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <span className="font-p-mj text-[18px] text-gray-900">
                                안녕하세요! <u>2025년 새해</u>가 밝았네요.
                            </span>

                            <span className="font-p-mj text-[18px] text-gray-900">
                                송하영 커뮤니티를 방문해 주신 분들에게 정말
                                감사하다는 말씀 드리고 싶습니다.
                            </span>

                            <br />

                            <span className="font-p-mj text-[18px] text-gray-900">
                                📌 규칙
                            </span>

                            <span className="font-p-mj text-[18px] text-gray-900">
                                - 타 인물 언급하지 않기
                            </span>

                            <span className="font-p-mj text-[18px] text-gray-900">
                                - 기본 대화 에티켓 지키기
                            </span>

                            <span className="font-p-mj text-[18px] text-gray-900">
                                - 오프라인 만남 자제하기
                            </span>

                            <span className="font-p-mj text-[18px] text-gray-900">
                                - 송하영 사랑하기
                            </span>

                            <br />

                            <span className="font-p-mj text-[18px] text-gray-900">
                                읽어주셔서 감사합니다! 활기찬 새해 되세요 ;)
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-[48px]">
                        <div className="flex-1 h-[1px] bg-gray-200" />

                        <Button
                            type="md"
                            variants="outline"
                            icons={[
                                {
                                    float: "left",
                                    component: (
                                        <HeartIcon
                                            key="heart"
                                            size={14}
                                            className="stroke-gray-900"
                                        />
                                    ),
                                },
                            ]}
                        >
                            좋아요
                        </Button>
                    </div>

                    <div className="flex flex-col gap-[24px]">
                        <div className="flex items-center gap-[12px]">
                            <span className="font-p-semibold text-[20px] text-gray-900">
                                코멘트
                            </span>

                            <span className="font-p-semibold text-[18px] text-gray-400">
                                8
                            </span>
                        </div>

                        <div className="w-full flex flex-col gap-[16px]">
                            <textarea
                                className="outline-none p-[16px_20px] border border-gray-200 rounded-[16px] font-p-mj text-[18px] text-gray-900 min-h-[140px] focus:border-gray-900"
                                placeholder="코멘트 입력..."
                            />

                            <div className="flex justify-end">
                                <Button type="lg" variants="black">
                                    작성하기
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[64px]">
                            {Array(8)
                                .fill(0)
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col gap-[24px]"
                                    >
                                        <div className="flex items-center gap-[8px]">
                                            <div
                                                className="p-[2px_8px] hover:bg-gray-100 rounded-[6px] cursor-pointer transition-all duration-[.1s]"
                                                onClick={() =>
                                                    router.push("/엄준식")
                                                }
                                            >
                                                <span className="font-p-semibold text-[13px] text-gray-900">
                                                    엄준식
                                                </span>
                                            </div>

                                            <span className="font-p-medium text-[12px] text-gray-400">
                                                12시간 전
                                            </span>
                                        </div>

                                        <div className="px-[8px]">
                                            <span className="font-p-mj text-[18px] text-gray-900">
                                                이건 좀;
                                            </span>
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
