"use client";

import {
    KeySquareIcon,
    LogOutIcon,
    PencilLineIcon,
    UploadIcon,
    XIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Modal } from "@/shared/components/modal";
import { Tab } from "@/shared/components/tab";

export default function Settings() {
    const [tab, setTab] = useState<string>("프로필");
    const [direction, setDirection] = useState<number>(0);

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

    const [profileImage, setProfileImage] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <Header />

            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="bg-white rounded-[16px] flex flex-col">
                    <div className="p-[36px] flex flex-col items-center gap-[8px]">
                        <span className="font-p-semibold text-[18px] text-stone-900">
                            정말 탈퇴하시겠어요?
                        </span>

                        <span className="font-p-medium text-[16px] text-stone-600">
                            탈퇴하면 다시 복구할 수 없어요.
                        </span>
                    </div>

                    <div className="w-full h-[1px] bg-stone-200" />

                    <div className="p-[24px] grid grid-cols-2 gap-[16px]">
                        <Button
                            type="lg"
                            variants="black"
                            icons={[
                                {
                                    float: "left",
                                    component: (
                                        <LogOutIcon
                                            key="delete-account"
                                            size={16}
                                            className="stroke-white"
                                        />
                                    ),
                                },
                            ]}
                        >
                            탈퇴
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
                                            key="delete-account-cancel"
                                            size={16}
                                            className="stroke-stone-900"
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

            <div className="max-w-[640px] min-h-[100dvh] m-[0_auto] py-[48px]">
                <Tab
                    options={["프로필", "보안", "청구", "기타"]}
                    tab={tab}
                    onChange={handleTabChange}
                />

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
                            {tab === "프로필" && (
                                <div className="py-[48px] flex flex-col gap-[48px]">
                                    <div className="flex flex-col gap-[8px]">
                                        <span className="font-p-semibold text-[16px] text-stone-900">
                                            프로필 사진
                                        </span>

                                        <div className="relative size-[140px] rounded-[8px] bg-stone-100">
                                            {profileImage && (
                                                <div className="size-full rounded-[8px] overflow-hidden">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={profileImage}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}

                                            <div
                                                className="absolute size-[32px] rounded-full bg-white border border-stone-300 top-full left-full -translate-x-[75%] -translate-y-[75%] flex justify-center items-center cursor-pointer"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                            >
                                                <UploadIcon
                                                    size={16}
                                                    className="stroke-stone-900"
                                                />
                                            </div>

                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-[8px]">
                                        <span className="font-p-semibold text-[16px] text-stone-900">
                                            닉네임
                                        </span>

                                        <Input
                                            type="lg"
                                            variants="underline"
                                            value=""
                                            onChange={() => {}}
                                            placeholder="16글자 이내"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-[8px]">
                                        <span className="font-p-semibold text-[16px] text-stone-900">
                                            자기소개
                                        </span>

                                        <Input
                                            type="lg"
                                            variants="underline"
                                            value=""
                                            onChange={() => {}}
                                            placeholder="30글자 이내"
                                        />
                                    </div>

                                    <div className="w-fit">
                                        <Button
                                            type="md"
                                            variants="black"
                                            icons={[
                                                {
                                                    float: "left",
                                                    component: (
                                                        <PencilLineIcon
                                                            key="modify-profile"
                                                            size={16}
                                                            className="stroke-white"
                                                        />
                                                    ),
                                                },
                                            ]}
                                        >
                                            프로필 수정
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {tab === "보안" && (
                                <div className="py-[48px]">
                                    <div className="flex flex-col gap-[16px]">
                                        <div className="flex flex-col gap-[6px]">
                                            <span className="font-p-medium text-[16px] text-stone-900">
                                                2차 인증 등록
                                            </span>

                                            <span className="font-p-medium text-[14px] text-stone-500">
                                                아직 2차 인증이 설정되어 있지
                                                않아요.
                                                <br />
                                                버튼을 클릭해서 계정의 보안을
                                                강화해 주세요.
                                            </span>
                                        </div>

                                        <div className="w-fit">
                                            <Button
                                                type="md"
                                                variants="outline"
                                                icons={[
                                                    {
                                                        float: "left",
                                                        component: (
                                                            <KeySquareIcon
                                                                key="two-factor"
                                                                size={16}
                                                                className="stroke-stone-900"
                                                            />
                                                        ),
                                                    },
                                                ]}
                                            >
                                                Two-Factor 설정
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === "청구" && (
                                <div className="py-[48px]">
                                    <div className="flex flex-col gap-[24px]">
                                        <div className="flex flex-col gap-[12px]">
                                            <div className="flex items-center gap-[6px]">
                                                <span className="w-[140px] font-p-medium text-[16px] text-stone-900">
                                                    현재 플랜
                                                </span>

                                                <span className="font-p-medium text-[14px] text-stone-500">
                                                    덕질
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-[6px]">
                                                <span className="w-[140px] font-p-medium text-[16px] text-stone-900">
                                                    다음 청구 날짜
                                                </span>

                                                <span className="font-p-medium text-[14px] text-stone-500">
                                                    2025. 10. 10.
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-[6px]">
                                                <span className="w-[140px] font-p-medium text-[16px] text-stone-900">
                                                    청구 금액
                                                </span>

                                                <span className="font-p-medium text-[14px] text-red-600">
                                                    ₩1,400
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-[140px] flex flex-col">
                                            <Button
                                                type="md"
                                                variants="warning"
                                                icons={[
                                                    {
                                                        float: "left",
                                                        component: (
                                                            <LogOutIcon
                                                                key="billing"
                                                                size={16}
                                                                className="stroke-red-700"
                                                            />
                                                        ),
                                                    },
                                                ]}
                                            >
                                                구독 해지
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === "기타" && (
                                <div className="py-[48px]">
                                    <div className="flex flex-col gap-[16px]">
                                        <span className="font-p-medium text-[16px] text-stone-900">
                                            탈퇴
                                        </span>

                                        <div className="w-fit">
                                            <Button
                                                type="md"
                                                variants="warning"
                                                icons={[
                                                    {
                                                        float: "left",
                                                        component: (
                                                            <LogOutIcon
                                                                key="secession"
                                                                size={16}
                                                                className="stroke-red-700"
                                                            />
                                                        ),
                                                    },
                                                ]}
                                                onClick={() => setIsOpen(true)}
                                            >
                                                계정 탈퇴
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <Footer />
        </div>
    );
}
