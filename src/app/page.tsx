"use client";

import { ArrowUpRightIcon, BadgeCheckIcon, SparkleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { MomentCard } from "@/shared/components/moment-card";
import { LongerTag } from "@/shared/components/longer-tag";
import { GoodsCard } from "@/shared/components/goods-card";
import { FanCard } from "@/shared/components/fan-card";
import { Button } from "@/shared/components/button";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";

import CircularText from "@/assets/icons/circular-text.png";

import { moments } from "@/mocks/moments";
import { goods } from "@/mocks/goods";
import { fans } from "@/mocks/fans";

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] h-[calc(100dvh_-_80px)] m-[0_auto] flex justify-center items-center">
                <div className="relative w-[350px] translate-y-[100px]">
                    <div className="flex flex-col items-center gap-[16px]">
                        <div className="flex flex-col items-center gap-[24px]">
                            <LongerTag
                                icon={
                                    <ArrowUpRightIcon
                                        size={14}
                                        className="stroke-stone-700"
                                    />
                                }
                                text="굿즈를 바로 확인할 수 있는 기능이 추가되었어요"
                                onClick={() => router.push("/patch")}
                            />

                            <span className="font-p-semibold text-[72px] text-stone-900 leading-[76px] text-center">
                                덕질은
                                <br />
                                덕덕쿵
                            </span>
                        </div>

                        <Button
                            type="md"
                            variants="outline"
                            icons={[
                                {
                                    component: (
                                        <SparkleIcon
                                            key="start"
                                            size={16}
                                            className="stroke-stone-900"
                                        />
                                    ),
                                    float: "left",
                                },
                            ]}
                            onClick={() => router.push("/register")}
                        >
                            시작하기
                        </Button>
                    </div>

                    <Image
                        src={CircularText}
                        width={350}
                        height={350}
                        alt="circulartext"
                        className="size-[350px] -translate-y-[280px] opacity-[.2] pointer-events-none"
                    />
                </div>
            </div>

            <div className="max-w-[1280px] m-[0_auto] flex flex-col">
                <section className="p-[48px] h-dvh flex justify-center items-center">
                    <div className="flex flex-col gap-[64px]">
                        <div className="flex flex-col items-center gap-[24px]">
                            <LongerTag
                                icon={
                                    <BadgeCheckIcon
                                        size={14}
                                        className="stroke-stone-700"
                                    />
                                }
                                text="힘들고 지쳤던 하루를 녹일 땐"
                            />

                            <span className="font-p-semibold text-[48px] leading-[52px]">
                                최애 구경하기
                            </span>
                        </div>

                        <div className="grid grid-cols-6 gap-[32px]">
                            {fans.slice(0, 12).map((fan) => (
                                <FanCard
                                    variants="onlyname"
                                    key={fan.id}
                                    data={fan}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="p-[48px] h-dvh flex justify-center items-center">
                    <div className="flex flex-col gap-[64px]">
                        <div className="flex flex-col items-center gap-[24px]">
                            <LongerTag
                                icon={
                                    <BadgeCheckIcon
                                        size={14}
                                        className="stroke-stone-700"
                                    />
                                }
                                text="원하는 굿즈만 빠르게 찾아보려면"
                            />

                            <span className="font-p-semibold text-[48px] leading-[52px]">
                                굿즈 구매하기
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-[32px]">
                            {goods.map((goods) => (
                                <GoodsCard key={goods.id} data={goods} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="p-[48px] h-dvh flex justify-center items-center">
                    <div className="flex flex-col gap-[64px]">
                        <div className="flex flex-col items-center gap-[24px]">
                            <LongerTag
                                icon={
                                    <BadgeCheckIcon
                                        size={14}
                                        className="stroke-stone-700"
                                    />
                                }
                                text="바쁜 일상에, 최애 근황 한 숟가락"
                            />

                            <span className="font-p-semibold text-[48px] leading-[52px]">
                                최신 모먼트
                            </span>
                        </div>

                        <div className="grid grid-cols-5 gap-[32px]">
                            {moments.map((moment) => (
                                <MomentCard key={moment.id} data={moment} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
