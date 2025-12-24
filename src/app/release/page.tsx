"use client";

import { useRouter } from "next/navigation";

import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";

export default function Release() {
    const router = useRouter();

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] m-[0_auto] py-[96px] flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[8px]">
                    <span className="font-p-semibold text-[24px] text-gray-900">
                        패치노트
                    </span>

                    <span className="font-p-medium text-[16px] text-gray-900">
                        최신 릴리즈 · v1
                    </span>
                </div>

                <div className="py-[24px] grid grid-cols-4 gap-[16px]">
                    {Array(24)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="border border-gray-200 rounded-[8px] flex flex-col cursor-pointer"
                                onClick={() => router.push(`/release/${i}`)}
                            >
                                <div className="p-[12px_16px]">
                                    <div className="flex flex-col gap-[6px]">
                                        <span className="font-p-semibold text-[14px] text-gray-900">
                                            v{24 - i}
                                        </span>

                                        <div className="flex flex-col gap-[2px]">
                                            <span className="font-p-medium text-[16px] text-gray-900 truncate">
                                                이번주 업데이트 안내
                                            </span>

                                            <span className="font-p-medium text-[14px] text-gray-500 truncate">
                                                안녕하세요. GM ICe1 입니다.
                                                이번주 금요일에 아래 항목
                                                업데이트를 진행할 계획입니다.
                                                감사합니다.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-gray-200" />

                                <div className="p-[12px_16px]">
                                    <div className="flex justify-between items-center gap-[6px]">
                                        <span className="font-p-medium text-[12px] text-gray-400">
                                            {i + 1}개월 전
                                        </span>

                                        <span className="font-p-medium text-[12px] text-gray-700">
                                            ICe1
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
