"use client";

import {
    EllipsisIcon,
    HashIcon,
    ImageUpIcon,
    KeySquareIcon,
    LogOutIcon,
    PencilLineIcon,
    Trash2Icon,
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
import { Popover } from "@/shared/components/popover";

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
                        <span className="font-p-semibold text-[18px] text-gray-900">
                            정말 탈퇴하시겠어요?
                        </span>

                        <span className="font-p-medium text-[16px] text-gray-600">
                            탈퇴하면 다시 복구할 수 없어요.
                        </span>
                    </div>

                    <div className="w-full h-[1px] bg-gray-200" />

                    <div className="p-[24px] grid grid-cols-2 gap-[16px]">
                        <Button
                            type="lg"
                            variants="warning"
                            icons={[
                                {
                                    float: "left",
                                    component: (
                                        <LogOutIcon
                                            key="delete-account"
                                            size={16}
                                            className="stroke-red-700"
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
                                            className="stroke-gray-900"
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

                <div className="relative">
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
                                <div className="py-[48px] flex flex-col gap-[24px]">
                                    <div className="flex flex-col gap-[8px]">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />

                                        <span className="font-p-medium text-[14px] text-gray-600">
                                            프로필 사진
                                        </span>

                                        <div
                                            className="relative size-[120px] rounded-[8px] bg-gray-100 cursor-pointer flex justify-center items-center"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                        >
                                            {profileImage ? (
                                                <div className="size-full rounded-[8px] overflow-hidden">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={profileImage}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <ImageUpIcon
                                                    size={48}
                                                    className="stroke-gray-300"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-[6px]">
                                        <span className="font-p-medium text-[14px] text-gray-600">
                                            닉네임
                                        </span>

                                        <Input
                                            type="md"
                                            variants="outline"
                                            value=""
                                            onChange={() => {}}
                                            placeholder="닉네임을 입력해 주세요."
                                        />
                                    </div>

                                    <div className="flex flex-col gap-[6px]">
                                        <span className="font-p-medium text-[14px] text-gray-600">
                                            자기소개
                                        </span>

                                        <Input
                                            type="md"
                                            variants="outline"
                                            value=""
                                            onChange={() => {}}
                                            placeholder="간단한 자기소개를 입력해 주세요."
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
                                <div className="py-[48px] flex flex-col gap-[48px]">
                                    <div className="flex flex-col gap-[16px]">
                                        <div className="flex flex-col gap-[6px]">
                                            <span className="font-p-medium text-[16px] text-gray-900">
                                                소셜 연동
                                            </span>

                                            <span className="font-p-medium text-[14px] text-gray-500">
                                                덕덕쿵은 2개의 소셜 연동을
                                                지원해요.
                                                <br />
                                                원하는 소셜을 선택해서, 손쉽게
                                                계정을 연동해 보세요.
                                            </span>
                                        </div>

                                        <div className="w-fit flex gap-[8px]">
                                            <Button
                                                type="md"
                                                variants="black"
                                                icons={[
                                                    {
                                                        float: "left",
                                                        component: (
                                                            <HashIcon
                                                                key="kakao"
                                                                size={16}
                                                                className="stroke-white"
                                                            />
                                                        ),
                                                    },
                                                ]}
                                            >
                                                카카오
                                            </Button>

                                            <Button
                                                type="md"
                                                variants="outline"
                                                icons={[
                                                    {
                                                        float: "left",
                                                        component: (
                                                            <HashIcon
                                                                key="google"
                                                                size={16}
                                                                className="stroke-gray-400"
                                                            />
                                                        ),
                                                    },
                                                ]}
                                                disabled
                                            >
                                                구글
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === "청구" && (
                                <div className="py-[48px] flex flex-col gap-[24px]">
                                    <div className="grid grid-cols-2 gap-[24px]">
                                        <div className="border border-gray-200 rounded-[8px] p-[24px]">
                                            <div className="flex flex-col gap-[16px]">
                                                <div className="flex flex-col gap-[2px]">
                                                    <span className="font-p-medium text-[14px] text-gray-600">
                                                        다음 결제
                                                    </span>

                                                    <span className="font-p-gmsb text-[24px] text-gray-900">
                                                        1,400원
                                                    </span>
                                                </div>

                                                <div className="flex flex-col gap-[4px]">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-p-medium text-[14px] text-gray-900">
                                                            다음 결제일
                                                        </span>

                                                        <span className="font-p-medium text-[14px] text-gray-600">
                                                            2025년 11월 4일
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <span className="font-p-medium text-[14px] text-gray-900">
                                                            최근 결제일
                                                        </span>

                                                        <span className="font-p-medium text-[14px] text-gray-600">
                                                            2025년 10월 4일
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-[8px] p-[24px]">
                                            <div className="flex flex-col gap-[16px]">
                                                <div className="flex flex-col gap-[2px]">
                                                    <span className="font-p-medium text-[14px] text-gray-600">
                                                        결제 수단
                                                    </span>

                                                    <span className="font-p-gmsb text-[24px] text-gray-900">
                                                        KEB하나카드
                                                    </span>
                                                </div>

                                                <div className="flex flex-col gap-[4px]">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-p-medium text-[14px] text-gray-900">
                                                            카드 번호
                                                        </span>

                                                        <span className="font-p-medium text-[14px] text-gray-600">
                                                            5327-XXXX-XXXX-568X
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <span className="font-p-medium text-[14px] text-gray-900">
                                                            설정
                                                        </span>

                                                        <Popover
                                                            overlay={
                                                                <div className="min-w-full w-max max-h-60 overflow-y-auto">
                                                                    <div className="px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-[6px]">
                                                                        <Trash2Icon
                                                                            size={
                                                                                14
                                                                            }
                                                                            className="stroke-gray-900"
                                                                        />

                                                                        <span className="font-p-medium text-[14px] text-gray-900">
                                                                            삭제하기
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            }
                                                        >
                                                            <div className="p-[4px] flex items-center gap-[8px] hover:bg-gray-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                                                                <EllipsisIcon
                                                                    size={14}
                                                                    className="stroke-gray-600"
                                                                />
                                                            </div>
                                                        </Popover>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-[8px] p-[24px]">
                                        <div className="flex flex-col gap-[16px]">
                                            <span className="font-p-medium text-[14px] text-gray-600">
                                                결제 내역
                                            </span>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-[12px]">
                                                    <span className="font-p-medium text-[16px] text-c-primary">
                                                        완료
                                                    </span>

                                                    <span className="font-p-medium text-[16px] text-gray-400">
                                                        구독 갱신
                                                    </span>

                                                    <span className="font-p-medium text-[16px] text-gray-900">
                                                        2025년 10월 6일
                                                    </span>
                                                </div>

                                                <span className="font-p-gmsm text-[16px] text-gray-900">
                                                    1,400원
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-[12px]">
                                                    <span className="font-p-medium text-[16px] text-red-700">
                                                        실패
                                                    </span>

                                                    <span className="font-p-medium text-[16px] text-gray-400">
                                                        구독 갱신
                                                    </span>

                                                    <span className="font-p-medium text-[16px] text-gray-900">
                                                        2025년 10월 5일
                                                    </span>
                                                </div>

                                                <span className="font-p-gmsm text-[16px] text-gray-900">
                                                    1,400원
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-[12px]">
                                                    <span className="font-p-medium text-[16px] text-red-700">
                                                        실패
                                                    </span>

                                                    <span className="font-p-medium text-[16px] text-gray-400">
                                                        구독 갱신
                                                    </span>

                                                    <span className="font-p-medium text-[16px] text-gray-900">
                                                        2025년 10월 4일
                                                    </span>
                                                </div>

                                                <span className="font-p-gmsm text-[16px] text-gray-900">
                                                    1,400원
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === "기타" && (
                                <div className="py-[48px]">
                                    <div className="flex flex-col gap-[16px]">
                                        <div className="flex flex-col gap-[6px]">
                                            <span className="font-p-medium text-[16px] text-gray-900">
                                                탈퇴
                                            </span>

                                            <span className="font-p-medium text-[14px] text-gray-500">
                                                모든 정보를 지우고 덕덕쿵에서
                                                탈퇴합니다.
                                            </span>
                                        </div>

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
