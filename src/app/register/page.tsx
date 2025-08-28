"use client";

import { UploadIcon, PencilIcon, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";

export default function Register() {
    const router = useRouter();

    const [name, setName] = useState<string>("고서온");
    const [isNameEditing, setIsNameEditing] = useState<boolean>(false);

    const [isBioEditing, setIsBioEditing] = useState<boolean>(false);
    const [bio, setBio] = useState<string>("");

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

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] h-[calc(100dvh_-_80px)] m-[0_auto] flex justify-center items-center">
                <div className="flex flex-col items-center gap-[24px]">
                    <div className="relative size-[140px] rounded-[8px] bg-stone-100 overflow-hidden">
                        {profileImage && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        )}

                        <div
                            className="absolute size-[32px] rounded-full bg-white border border-stone-300 top-full left-full -translate-x-[75%] -translate-y-[75%] flex justify-center items-center cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
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

                    <div className="flex flex-col items-center gap-[8px]">
                        <div className="w-fit relative flex justify-center items-center gap-[6px]">
                            {isNameEditing ? (
                                <>
                                    <div className="w-[60px]">
                                        <Input
                                            type="md"
                                            variants="underline"
                                            value={name}
                                            onChange={(e) => {
                                                if (e.length > 16) return;
                                                setName(e);
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
                                        className="absolute stroke-stone-900 cursor-pointer -right-[24px]"
                                        onClick={handleNameSubmit}
                                    />
                                </>
                            ) : (
                                <>
                                    <span className="font-p-semibold text-[20px] text-stone-900">
                                        {name.trim() === ""
                                            ? "이름 입력"
                                            : name.trim()}
                                    </span>

                                    <PencilIcon
                                        size={16}
                                        className="absolute stroke-stone-400 cursor-pointer -right-[24px]"
                                        onClick={() => setIsNameEditing(true)}
                                    />
                                </>
                            )}
                        </div>

                        <div className="w-fit relative flex justify-center items-center gap-[6px]">
                            {isBioEditing ? (
                                <>
                                    <div className="w-[240px]">
                                        <Input
                                            type="md"
                                            variants="underline"
                                            value={bio}
                                            onChange={(e) => {
                                                if (e.length > 40) return;
                                                setBio(e);
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
                                        className="absolute stroke-stone-900 cursor-pointer -right-[24px]"
                                        onClick={handleBioSubmit}
                                    />
                                </>
                            ) : (
                                <>
                                    <span className="font-p-regular text-[16px] text-stone-800">
                                        {bio.trim() || "(자기소개 없음)"}
                                    </span>

                                    <PencilIcon
                                        size={16}
                                        className="absolute stroke-stone-400 cursor-pointer -right-[24px]"
                                        onClick={() => setIsBioEditing(true)}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    <Button
                        type="md"
                        variants="outline"
                        icons={[
                            {
                                component: (
                                    <CheckIcon
                                        size={14}
                                        className="stroke-stone-900"
                                    />
                                ),
                                float: "left",
                            },
                        ]}
                        onClick={() => router.push("/fans")}
                        disabled={isNameEditing || isBioEditing}
                    >
                        가입하기
                    </Button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
