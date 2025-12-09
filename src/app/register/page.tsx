"use client";

import {
    UploadIcon,
    PencilIcon,
    CheckIcon,
    ArrowRightIcon,
    ArrowUpRightIcon,
    LoaderCircleIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import { FanCard } from "@/shared/components/fan-card";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Button } from "@/shared/components/button";

import { register } from "@/features/oauth2/api";

import { fans } from "@/mocks/fans";

export default function Register() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");

    const [name, setName] = useState<string>("고서온");
    const [isNameEditing, setIsNameEditing] = useState<boolean>(false);

    const [isBioEditing, setIsBioEditing] = useState<boolean>(false);
    const [bio, setBio] = useState<string>("");

    const [profileImage, setProfileImage] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [currentCard, setCurrentCard] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);

    const [isCreating, setIsCreating] = useState<boolean>(false);

    useEffect(() => {
        const url = searchParams.get("image") as string;
        setProfileImage(url || "");

        const name = searchParams.get("name") as string;
        setName(name || "");

        const email = searchParams.get("email") as string;
        setEmail(email || "");
    }, [searchParams]);

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

    const handleNameSubmit = () => {
        setName((prev) => prev.trim());
        setIsNameEditing(false);
    };

    const handleBioSubmit = () => {
        setBio((prev) => prev.trim());
        setIsBioEditing(false);
    };

    const handleKeyPress = (
        e: React.KeyboardEvent,
        submitHandler: () => void
    ) => {
        if (e.key === "Enter") {
            submitHandler();
        }
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

    const handleCardChange = (newCard: number) => {
        const newDirection = newCard > currentCard ? 1 : -1;
        setDirection(newDirection);
        setCurrentCard(newCard);
    };

    const cards = [
        {
            step: 1,
            title: (
                <>
                    덕덕쿵에 방문해 주셔서
                    <br />
                    감사합니다.
                </>
            ),
            subtitle: (
                <>
                    가입을 완료하기 전에,
                    <br />
                    필요한 정보들을 입력해 주세요.
                </>
            ),
            content: null,
        },
        {
            step: 2,
            title: (
                <>
                    필요한 정보들을
                    <br />
                    입력해 주세요.
                </>
            ),
            subtitle: null,
            content: (
                <div className="flex items-center gap-[36px]">
                    <div className="relative size-[140px] rounded-[8px] bg-gray-100">
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
                            className="absolute size-[32px] rounded-full bg-white border border-gray-300 top-full left-full -translate-x-[75%] -translate-y-[75%] flex justify-center items-center cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UploadIcon size={16} className="stroke-gray-900" />
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-[8px]">
                        <div className="w-fit relative flex justify-center items-center gap-[6px]">
                            {isNameEditing ? (
                                <>
                                    <div className="w-[120px]">
                                        <input
                                            className="border-b border-b-gray-900 outline-none w-full font-p-semibold text-[20px] text-gray-900"
                                            value={name}
                                            onChange={(e) => {
                                                const text = e.target.value;
                                                if (text.length > 16) return;
                                                setName(text);
                                            }}
                                            onKeyUp={(e) =>
                                                handleKeyPress(
                                                    e,
                                                    handleNameSubmit
                                                )
                                            }
                                        />
                                    </div>

                                    <CheckIcon
                                        size={16}
                                        className="absolute stroke-gray-900 cursor-pointer -right-[24px]"
                                        onClick={handleNameSubmit}
                                    />
                                </>
                            ) : (
                                <>
                                    <span className="font-p-semibold text-[20px] text-gray-900">
                                        {name.trim() === ""
                                            ? "이름 입력"
                                            : name.trim()}
                                    </span>

                                    <PencilIcon
                                        size={16}
                                        className="absolute stroke-gray-400 cursor-pointer -right-[24px]"
                                        onClick={() => setIsNameEditing(true)}
                                    />
                                </>
                            )}
                        </div>

                        <div className="w-fit relative flex justify-center items-center gap-[6px]">
                            {isBioEditing ? (
                                <>
                                    <div className="w-[200px]">
                                        <input
                                            className="border-b border-b-gray-900 outline-none font-p-regular text-[16px] text-gray-800"
                                            value={bio}
                                            onChange={(e) => {
                                                const text = e.target.value;
                                                if (text.length > 30) return;
                                                setBio(text);
                                            }}
                                            onKeyUp={(e) =>
                                                handleKeyPress(
                                                    e,
                                                    handleBioSubmit
                                                )
                                            }
                                        />
                                    </div>

                                    <CheckIcon
                                        size={16}
                                        className="absolute stroke-gray-900 cursor-pointer -right-[24px]"
                                        onClick={handleBioSubmit}
                                    />
                                </>
                            ) : (
                                <>
                                    <span className="font-p-regular text-[16px] text-gray-800">
                                        {bio.trim() || "(자기소개 없음)"}
                                    </span>

                                    <PencilIcon
                                        size={16}
                                        className="absolute stroke-gray-400 cursor-pointer -right-[24px]"
                                        onClick={() => setIsBioEditing(true)}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            step: 3,
            title: (
                <>
                    최애 덕질을
                    <br />
                    마음껏 즐겨주세요.
                </>
            ),
            subtitle: null,
            content: (
                <div className="grid grid-cols-3 gap-[32px]">
                    {fans.slice(0, 3).map((fan) => (
                        <FanCard
                            key={fan.id}
                            variants="onlyname"
                            data={fan}
                            onClick={() => {}}
                            className="!cursor-default"
                        />
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] h-[calc(100dvh_-_80px)] m-[0_auto] flex justify-center items-center gap-[48px]">
                <div className="w-[600px] h-[500px] p-[48px] bg-white rounded-[16px]">
                    <div className="size-full flex flex-col justify-between">
                        <div className="flex flex-col gap-[32px]">
                            <div className="w-[160px] grid grid-cols-3 gap-[8px]">
                                {[1, 2, 3].map((step) => (
                                    <div
                                        key={step}
                                        className={`w-full h-[4px] rounded-[8px] transition-colors duration-300 cursor-pointer ${
                                            cards[currentCard]?.step === step
                                                ? "bg-gray-900"
                                                : "bg-gray-200"
                                        }`}
                                        onClick={() => {
                                            if (isCreating) return;
                                            setCurrentCard(step - 1);
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="h-[300px] relative overflow-hidden">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={currentCard}
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
                                        <div
                                            className={`flex flex-col ${
                                                cards[currentCard]?.step === 1
                                                    ? "gap-[16px]"
                                                    : "gap-[36px]"
                                            }`}
                                        >
                                            <span
                                                className={`font-p-semibold text-gray-900 leading-tight ${
                                                    cards[currentCard]?.step ===
                                                    1
                                                        ? "text-[32px] leading-[40px]"
                                                        : "text-[24px] leading-[32px]"
                                                }`}
                                            >
                                                {cards[currentCard]?.title}
                                            </span>

                                            {cards[currentCard]?.subtitle && (
                                                <span className="font-p-regular text-[18px] text-gray-900">
                                                    {
                                                        cards[currentCard]
                                                            .subtitle
                                                    }
                                                </span>
                                            )}

                                            {cards[currentCard]?.content}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentCard}
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
                                >
                                    {currentCard === 2 ? (
                                        <Button
                                            type="lg"
                                            variants="outline"
                                            icons={[
                                                {
                                                    component: isCreating ? (
                                                        <LoaderCircleIcon
                                                            key="loader-cirlce"
                                                            size={16}
                                                            className="stroke-gray-900 animate-spin"
                                                        />
                                                    ) : (
                                                        <ArrowUpRightIcon
                                                            key="register"
                                                            size={16}
                                                            className="stroke-gray-900"
                                                        />
                                                    ),
                                                    float: "left",
                                                },
                                            ]}
                                            onClick={async () => {
                                                if (isCreating) return;

                                                let profileImage: File;
                                                if (
                                                    fileInputRef.current?.files
                                                ) {
                                                    profileImage =
                                                        fileInputRef.current
                                                            .files[0];
                                                } else {
                                                    const url =
                                                        searchParams.get(
                                                            "image"
                                                        ) as string;
                                                    const blob = await (
                                                        await fetch(url)
                                                    ).blob();
                                                    profileImage = new File(
                                                        [blob],
                                                        "image.png"
                                                    );
                                                }

                                                setIsCreating(true);
                                                await register({
                                                    username: name,
                                                    email,
                                                    introduction: bio,
                                                    provider_name:
                                                        searchParams.get(
                                                            "provider"
                                                        ) as string,
                                                    oauth2_user_id:
                                                        searchParams.get(
                                                            "id"
                                                        ) as string,
                                                    profileImage,
                                                });
                                                router.push("/fans");
                                            }}
                                        >
                                            덕질 시작하기
                                        </Button>
                                    ) : (
                                        <ArrowRightIcon
                                            size={24}
                                            className="stroke-gray-900 cursor-pointer"
                                            onClick={() => {
                                                if (
                                                    currentCard <
                                                    cards.length - 1
                                                ) {
                                                    handleCardChange(
                                                        currentCard + 1
                                                    );
                                                }
                                            }}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
