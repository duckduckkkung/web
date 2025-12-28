"use client";

import {
    ArrowUpRightIcon,
    ImageUpIcon,
    KeyRoundIcon,
    LoaderCircleIcon,
    MessageCircleWarningIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ToastMessage } from "@/shared/components/toast-message";
import { Checkbox } from "@/shared/components/checkbox";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Button } from "@/shared/components/button";
import { Verify } from "@/shared/components/verify";
import { Input } from "@/shared/components/input";

import { register, sendOtp, verifyOtp } from "@ice1/api-client";
import { useGuestInfo } from "@/shared/hooks/oauth2";

import { REGEX } from "@/shared/utils/regex";

export default function Register() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = decodeURIComponent(searchParams.get("token") as string);
    const provider = searchParams.get("provider") as string;

    const [email, setEmail] = useState<string>("");
    const emailVerify = useMemo(
        () => ({
            one: REGEX.EMAIL.test(email.trim()),
        }),
        [email]
    );

    const [name, setName] = useState<string>("");
    const [isNameError, setIsNameError] = useState<boolean>(false);
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

    const [agrees, setAgrees] = useState<boolean[]>([
        false,
        false,
        false,
        false,
    ]);

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [action, setAction] = useState<"main" | "otp">("main");
    const [isMainError, setIsMainError] = useState<boolean>(false);
    const [isRegisterError, setIsRegisterError] = useState<boolean>(false);

    const [otp, setOtp] = useState<string>("");
    const [isOtpError, setIsOtpError] = useState<boolean>(false);
    const otpVerify = useMemo(
        () => ({
            one: /^[0-9]+$/.test(otp.trim()),
            two: /^.{6}$/.test(otp.trim()),
        }),
        [otp]
    );

    const { data: guestInfo, isFetching: isGuestInfoFetching } = useGuestInfo({
        provider,
        token,
    });
    const [setupFlag, setSetupFlag] = useState<boolean>(false);

    useEffect(() => {
        if (setupFlag || isGuestInfoFetching) return;

        if (!guestInfo) {
            router.push("/");
            return;
        }

        setSetupFlag(true);
        setEmail(guestInfo?.email || "");
        setName(guestInfo?.username || "");
        setProfileImage(guestInfo?.profile_image_src || "");
    }, [setupFlag, guestInfo, isGuestInfoFetching, router]);

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

    const isNextStepImpossible = useMemo(
        () =>
            isCreating ||
            !REGEX.NICKNAME.test(name.trim()) ||
            !REGEX.EMAIL.test(email.trim()) ||
            !REGEX.INTRODUCTION.test(bio.trim()) ||
            !(agrees[0] && agrees[1] && agrees[2]),
        [isCreating, name, email, bio, agrees]
    );
    const isRegisterImpossible = useMemo(
        () => isCreating || !REGEX.OTP.test(otp.trim()),
        [isCreating, otp]
    );

    const submit = async () => {
        setIsCreating(true);
        setIsMainError(false);

        try {
            await sendOtp({
                token,
                email,
            });

            setAction("otp");
            setIsCreating(false);
        } catch {
            setIsCreating(false);
            setIsMainError(true);
        }
    };

    const otpSubmit = async () => {
        if (isCreating) return;

        if (!(agrees[0] && agrees[1] && agrees[2])) {
            return;
        }

        if (!REGEX.OTP.test(otp.trim())) {
            return;
        }

        if (!REGEX.EMAIL.test(email.trim())) {
            return;
        }

        if (!REGEX.NICKNAME.test(name.trim())) {
            return;
        }

        if (!REGEX.INTRODUCTION.test(bio.trim())) {
            return;
        }

        setIsMainError(false);
        setIsRegisterError(false);
        setIsOtpError(false);
        setIsNameError(false);
        setIsCreating(true);

        const otpResponse = await verifyOtp({
            token,
            email,
            code: otp,
        });

        if (!otpResponse.result) {
            setIsCreating(false);
            setIsOtpError(true);
            setOtp("");

            return;
        }

        let profileImage: File | undefined;
        if (
            fileInputRef.current?.files &&
            (fileInputRef.current?.files?.length || 0) > 0
        ) {
            profileImage = fileInputRef.current.files[0];
        } else if (guestInfo?.profile_image_src) {
            const url = guestInfo.profile_image_src;
            const blob = await (
                await fetch(url, { mode: "no-cors", credentials: "omit" })
            ).blob();
            profileImage = new File([blob], "image.png");
        }

        try {
            await register({
                username: name,
                email: email,
                introduction: bio,
                provider_name: provider,
                token,
                file: profileImage,
            });

            router.push("/fans");
        } catch {
            setIsCreating(false);
            setIsRegisterError(true);
            setIsNameError(true);
            setAction("main");
            setOtp("");

            return;
        }
    };

    const containerVariants = useMemo(
        () => ({
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: 0.1 } },
            exit: { opacity: 0, transition: { duration: 0.1 } },
        }),
        []
    );

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] min-h-[800px] h-[calc(100dvh_-_80px)] m-[0_auto] flex justify-center items-center">
                <div className="w-[380px]">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={action}
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="relative flex flex-col gap-[48px]"
                        >
                            {action === "main" && (
                                <>
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

                                        <div className="flex flex-col gap-[24px]">
                                            <div className="flex flex-col gap-[6px]">
                                                <span className="font-p-medium text-[14px] text-gray-600">
                                                    이메일
                                                </span>

                                                <Input
                                                    type="md"
                                                    variants="outline"
                                                    value={email}
                                                    onChange={setEmail}
                                                    placeholder="이메일을 입력해 주세요."
                                                    disabled={isCreating}
                                                />

                                                <div className="flex flex-wrap gap-[12px]">
                                                    <Verify
                                                        label="유효한 이메일"
                                                        checked={
                                                            emailVerify.one
                                                        }
                                                    />
                                                </div>
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
                                                                중복된 이름이
                                                                존재합니다.
                                                            </span>
                                                        </div>
                                                    }
                                                    isOpen={isNameError}
                                                >
                                                    <Input
                                                        type="md"
                                                        variants="outline"
                                                        value={name}
                                                        onChange={setName}
                                                        placeholder="닉네임을 입력해 주세요."
                                                        disabled={isCreating}
                                                    />
                                                </ToastMessage>

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
                                                    disabled={isCreating}
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
                                                            ? [
                                                                  false,
                                                                  false,
                                                                  false,
                                                                  false,
                                                              ]
                                                            : [
                                                                  true,
                                                                  true,
                                                                  true,
                                                                  true,
                                                              ]
                                                    )
                                                }
                                                disabled={isCreating}
                                            />

                                            <Checkbox
                                                type="lg"
                                                variants="primary"
                                                label="이용약관에 동의합니다."
                                                checked={agrees[0]}
                                                onChange={(e) =>
                                                    setAgrees(
                                                        ([a, b, c, d]) => {
                                                            a = e;
                                                            return [a, b, c, d];
                                                        }
                                                    )
                                                }
                                                required
                                                shortcut="1"
                                                disabled={isCreating}
                                            />

                                            <Checkbox
                                                type="lg"
                                                variants="primary"
                                                label="개인정보 수집 및 이용에 동의합니다."
                                                checked={agrees[1]}
                                                onChange={(e) =>
                                                    setAgrees(
                                                        ([a, b, c, d]) => {
                                                            b = e;
                                                            return [a, b, c, d];
                                                        }
                                                    )
                                                }
                                                required
                                                shortcut="2"
                                                disabled={isCreating}
                                            />

                                            <Checkbox
                                                type="lg"
                                                variants="primary"
                                                label="개인정보 처리 위탁에 동의합니다."
                                                checked={agrees[2]}
                                                onChange={(e) =>
                                                    setAgrees(
                                                        ([a, b, c, d]) => {
                                                            c = e;
                                                            return [a, b, c, d];
                                                        }
                                                    )
                                                }
                                                required
                                                shortcut="3"
                                                disabled={isCreating}
                                            />

                                            <Checkbox
                                                type="lg"
                                                variants="primary"
                                                label="마케팅 수신에 동의합니다."
                                                checked={agrees[3]}
                                                onChange={(e) =>
                                                    setAgrees(
                                                        ([a, b, c, d]) => {
                                                            d = e;
                                                            return [a, b, c, d];
                                                        }
                                                    )
                                                }
                                                shortcut="4"
                                                disabled={isCreating}
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
                                            isOpen={isMainError}
                                        >
                                            <Button
                                                type="lg"
                                                variants="primary"
                                                icons={[
                                                    {
                                                        component: (
                                                            <KeyRoundIcon
                                                                key="otp"
                                                                size={16}
                                                                className={`transition-all duration-[.1s] ${
                                                                    isNextStepImpossible
                                                                        ? "stroke-gray-400"
                                                                        : "stroke-white"
                                                                }`}
                                                            />
                                                        ),
                                                        float: "left",
                                                    },
                                                ]}
                                                onClick={submit}
                                                disabled={isNextStepImpossible}
                                            >
                                                2차 인증하기
                                            </Button>
                                        </ToastMessage>
                                    </div>
                                </>
                            )}

                            {action === "otp" && (
                                <>
                                    <span className="font-p-medium text-[18px] text-gray-900 text-center">
                                        <b className="font-p-bold">
                                            &lsquo;{email}&rsquo;
                                        </b>{" "}
                                        으로
                                        <br />
                                        6자리 인증번호를 전송하였습니다.
                                    </span>

                                    <div className="flex flex-col gap-[6px]">
                                        <div className="flex items-center gap-[4px]">
                                            <span className="font-p-semibold text-[14px] text-c-primary cursor-pointer">
                                                *
                                            </span>

                                            <span className="font-p-medium text-[14px] text-gray-600">
                                                인증번호
                                            </span>
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
                                                        인증번호가 일치하지
                                                        않습니다.
                                                    </span>
                                                </div>
                                            }
                                            isOpen={isOtpError}
                                        >
                                            <Input
                                                type="md"
                                                variants="outline"
                                                value={otp}
                                                onChange={setOtp}
                                                placeholder="6자리 인증번호를 입력해 주세요."
                                                disabled={isCreating}
                                                className="!font-p-gmsm placeholder:!font-p-medium"
                                            />
                                        </ToastMessage>

                                        <div className="flex flex-wrap gap-[12px]">
                                            <Verify
                                                label="숫자만"
                                                checked={otpVerify.one}
                                            />
                                            <Verify
                                                label="6자"
                                                checked={otpVerify.two}
                                            />
                                        </div>
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
                                        isOpen={isRegisterError}
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
                                                            className={`animate-spin transition-all duration-[.1s] ${
                                                                isRegisterImpossible
                                                                    ? "stroke-gray-400"
                                                                    : "stroke-white"
                                                            }`}
                                                        />
                                                    ) : (
                                                        <ArrowUpRightIcon
                                                            key="register"
                                                            size={16}
                                                            className={`transition-all duration-[.1s] ${
                                                                isRegisterImpossible
                                                                    ? "stroke-gray-400"
                                                                    : "stroke-white"
                                                            }`}
                                                        />
                                                    ),
                                                    float: "left",
                                                },
                                            ]}
                                            onClick={otpSubmit}
                                            disabled={isRegisterImpossible}
                                        >
                                            덕질 시작하기
                                        </Button>
                                    </ToastMessage>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <Footer />
        </div>
    );
}
