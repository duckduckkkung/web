"use client";

import {
    ArrowUpRightIcon,
    ImageUpIcon,
    LoaderCircleIcon,
    MessageCircleWarningIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, useMemo } from "react";

import { ToastMessage } from "@/shared/components/toast-message";
import { Checkbox } from "@/shared/components/checkbox";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Button } from "@/shared/components/button";
import { Verify } from "@/shared/components/verify";
import { Input } from "@/shared/components/input";

import { useShortInfo } from "@/features/user/hooks";
import { register } from "@/features/oauth2/api";

import { REGEX } from "@/shared/utils/regex";

export default function Register() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");

    const [name, setName] = useState<string>("고서온");
    const nameVerify = useMemo(
        () => ({
            one: /^[a-zA-Zㄱ-ㅎ가-힣 ]+$/.test(name.trim()),
            two: /^[\s\S]{3,20}$/.test(name.trim()),
        }),
        [name]
    );

    const [bio, setBio] = useState<string>("");
    const bioVerify = useMemo(
        () => ({
            one: REGEX.INTRODUCTION.test(bio.trim()),
        }),
        [bio]
    );

    const [profileImage, setProfileImage] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [agrees, setAgrees] = useState<boolean[]>([
        false,
        false,
        false,
        false,
    ]);

    const [isError, setIsError] = useState<boolean>(false);

    const shortInfo = useShortInfo();

    useEffect(() => {
        if (!shortInfo) return;

        setName(shortInfo.data?.username || "");
        setEmail(shortInfo.data?.email || "");
    }, [shortInfo]);

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

    const submit = async () => {
        if (isCreating) return;

        if (!REGEX.NICKNAME.test(name.trim())) {
            return;
        }

        if (!REGEX.INTRODUCTION.test(bio.trim())) {
            return;
        }

        setIsError(false);
        setIsCreating(true);

        let profileImage: File;
        if (
            fileInputRef.current?.files &&
            (fileInputRef.current?.files?.length || 0) > 0
        ) {
            profileImage = fileInputRef.current.files[0];
        } else {
            const url = searchParams.get("image") as string;
            const blob = await (
                await fetch(url, { mode: "no-cors", credentials: "omit" })
            ).blob();
            profileImage = new File([blob], "image.png");
        }

        try {
            await register({
                username: name,
                introduction: bio,
                provider_name: searchParams.get("provider") as string,
                token: searchParams.get("token") as string,
                file: profileImage,
            });

            router.push("/fans");
        } catch {
            setIsError(true);
            setIsCreating(false);
        }
    };

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] h-[calc(100dvh_-_80px)] m-[0_auto] flex justify-center items-center">
                <div className="w-[380px] flex flex-col gap-[48px]">
                    <div className="flex flex-col gap-[32px]">
                        <div className="flex justify-center">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />

                            <div
                                className="relative size-[120px] rounded-[8px] bg-gray-100 cursor-pointer flex justify-center items-center"
                                onClick={() => fileInputRef.current?.click()}
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

                        <div className="flex flex-col gap-[24px]">
                            <div className="flex flex-col gap-[6px]">
                                <span className="font-p-medium text-[14px] text-gray-600">
                                    이메일
                                </span>

                                <Input
                                    type="md"
                                    variants="outline"
                                    value={email}
                                    onChange={() => {}}
                                    disabled
                                />
                            </div>

                            <div className="flex flex-col gap-[6px]">
                                <div className="flex items-center gap-[4px]">
                                    <span className="font-p-semibold text-[14px] text-c-primary cursor-pointer">
                                        *
                                    </span>

                                    <span className="font-p-medium text-[14px] text-gray-600">
                                        닉네임
                                    </span>
                                </div>

                                <Input
                                    type="md"
                                    variants="outline"
                                    value={name}
                                    onChange={setName}
                                    placeholder="닉네임을 입력해 주세요."
                                />

                                <div className="flex flex-wrap gap-[12px]">
                                    <Verify
                                        label="한영 대소문자 (띄어쓰기 가능)"
                                        checked={nameVerify.one}
                                    />
                                    <Verify
                                        label="3-20자"
                                        checked={nameVerify.two}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-[6px]">
                                <div className="flex items-center gap-[4px]">
                                    <span className="font-p-semibold text-[14px] text-gray-400 cursor-pointer">
                                        (선택)
                                    </span>

                                    <span className="font-p-medium text-[14px] text-gray-600">
                                        자기소개
                                    </span>
                                </div>

                                <Input
                                    type="md"
                                    variants="outline"
                                    value={bio}
                                    onChange={setBio}
                                    placeholder="간단한 자기소개를 입력해 주세요."
                                />

                                <div className="flex flex-wrap gap-[12px]">
                                    <Verify
                                        label="0-40자"
                                        checked={bioVerify.one}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[20px]">
                        <div className="flex flex-col gap-[10px]">
                            <Checkbox
                                type="lg"
                                variants="primary"
                                label="전체 선택"
                                checked={agrees.every((e) => e)}
                                onChange={() =>
                                    setAgrees(
                                        agrees.every((e) => e)
                                            ? [false, false, false, false]
                                            : [true, true, true, true]
                                    )
                                }
                            />

                            <Checkbox
                                type="lg"
                                variants="primary"
                                label="이용약관에 동의합니다."
                                checked={agrees[0]}
                                onChange={(e) =>
                                    setAgrees(([a, b, c, d]) => {
                                        a = e;
                                        return [a, b, c, d];
                                    })
                                }
                                required
                                shortcut="1"
                            />

                            <Checkbox
                                type="lg"
                                variants="primary"
                                label="개인정보 수집 및 이용에 동의합니다."
                                checked={agrees[1]}
                                onChange={(e) =>
                                    setAgrees(([a, b, c, d]) => {
                                        b = e;
                                        return [a, b, c, d];
                                    })
                                }
                                required
                                shortcut="2"
                            />

                            <Checkbox
                                type="lg"
                                variants="primary"
                                label="개인정보 처리 위탁에 동의합니다."
                                checked={agrees[2]}
                                onChange={(e) =>
                                    setAgrees(([a, b, c, d]) => {
                                        c = e;
                                        return [a, b, c, d];
                                    })
                                }
                                required
                                shortcut="3"
                            />

                            <Checkbox
                                type="lg"
                                variants="primary"
                                label="마케팅 수신에 동의합니다."
                                checked={agrees[3]}
                                onChange={(e) =>
                                    setAgrees(([a, b, c, d]) => {
                                        d = e;
                                        return [a, b, c, d];
                                    })
                                }
                                shortcut="4"
                            />
                        </div>

                        <ToastMessage
                            variants="error"
                            message={
                                <div className="flex items-center gap-[6px]">
                                    <MessageCircleWarningIcon
                                        size={14}
                                        className="stroke-white"
                                        strokeWidth={3}
                                    />

                                    <span className="font-p-medium text-[14px] text-white">
                                        오류가 발생하였습니다.
                                    </span>
                                </div>
                            }
                            isOpen={isError}
                        >
                            <Button
                                type="lg"
                                variants="primary"
                                icons={[
                                    {
                                        component: isCreating ? (
                                            <LoaderCircleIcon
                                                key="loader-cirlce"
                                                size={16}
                                                className={`animate-spin ${
                                                    isCreating ||
                                                    !REGEX.NICKNAME.test(
                                                        name.trim()
                                                    ) ||
                                                    !REGEX.INTRODUCTION.test(
                                                        bio.trim()
                                                    )
                                                        ? "stroke-gray-400"
                                                        : "stroke-white"
                                                }`}
                                            />
                                        ) : (
                                            <ArrowUpRightIcon
                                                key="register"
                                                size={16}
                                                className={`${
                                                    isCreating ||
                                                    !REGEX.NICKNAME.test(
                                                        name.trim()
                                                    ) ||
                                                    !REGEX.INTRODUCTION.test(
                                                        bio.trim()
                                                    )
                                                        ? "stroke-gray-400"
                                                        : "stroke-white"
                                                }`}
                                            />
                                        ),
                                        float: "left",
                                    },
                                ]}
                                onClick={submit}
                                disabled={
                                    isCreating ||
                                    !REGEX.NICKNAME.test(name.trim()) ||
                                    !REGEX.INTRODUCTION.test(bio.trim())
                                }
                            >
                                덕질 시작하기
                            </Button>
                        </ToastMessage>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
