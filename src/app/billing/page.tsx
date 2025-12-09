"use client";

import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Button } from "@/shared/components/button";

export default function Home() {
    return (
        <div>
            <Header />

            <div className="max-w-[1280px] h-[calc(100dvh_-_80px)] m-[0_auto] flex justify-center items-center">
                <div className="flex flex-col gap-[48px]">
                    <span className="font-p-semibold text-[24px] text-gray-900 text-center">
                        덕질 플랜에 가입하면
                        <br />더 빠르게 소식을 접할 수 있어요.
                    </span>

                    <div className="flex gap-[24px]">
                        <div className="w-[300px] h-[360px] p-[24px] border border-gray-200 rounded-[12px] flex flex-col justify-between">
                            <div className="flex flex-col gap-[24px]">
                                <span className="font-p-semibold text-[18px] text-gray-900">
                                    무료
                                </span>

                                <div className="flex flex-col gap-[6px]">
                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        덕질 가입 또는 생성 (최대 3번)
                                    </span>

                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        모먼트 업로드
                                    </span>
                                </div>
                            </div>

                            <Button type="lg" variants="outline" disabled>
                                현재 무료 플랜 이용 중
                            </Button>
                        </div>

                        <div className="w-[300px] h-[360px] p-[24px] border border-gray-900 rounded-[12px] flex flex-col justify-between">
                            <div className="flex flex-col gap-[24px]">
                                <span className="font-p-semibold text-[18px] text-gray-900">
                                    덕질
                                </span>

                                <div className="flex flex-col gap-[6px]">
                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        무료 플랜 기능 포함
                                    </span>

                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        덕질 가입 또는 생성 (무한)
                                    </span>

                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        굿즈 열람
                                    </span>

                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        덕질 굿즈 알림
                                    </span>

                                    <span className="font-p-medium text-[16px] text-gray-900">
                                        덕질 상세 갱신
                                    </span>
                                </div>
                            </div>

                            <Button type="lg" variants="black">
                                ₩1,400 / 달
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
