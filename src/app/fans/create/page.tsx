"use client";

import {
    ArrowUpRightIcon,
    ArrowUpToLineIcon,
    LoaderCircleIcon,
    BookPlusIcon,
    XIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { josa } from "es-hangul";

import { LongerTag } from "@/shared/components/longer-tag";
import { Header } from "@/shared/components/header";
import { Button } from "@/shared/components/button";
import { Footer } from "@/shared/components/footer";
import { Input } from "@/shared/components/input";

export default function CreateFan() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [tagName, setTagName] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const nameParam = urlParams.get("name");
        if (nameParam) setName(nameParam);
    }, []);

    const processFiles = (files: FileList) => {
        Array.from(files).forEach((file) => {
            if (!["image/png", "image/jpeg", "image/webp"].includes(file.type))
                return;
            if (uploadedImages.length >= 4) return;

            const reader = new FileReader();

            reader.onload = (e) => {
                const result = e.target?.result as string;
                setUploadedImages((prev) => {
                    if (prev.length >= 4) return prev;
                    return [...prev, result];
                });
            };

            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        processFiles(files);
        event.target.value = "";
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files) {
            processFiles(files);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleImageRemove = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCreateFan = async () => {
        if (!name.trim() || !description.trim()) return;

        setIsCreating(true);
        await new Promise((res) => setTimeout(res, 3000));
        router.push(`/fans/${name}`);
    };

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] m-[0_auto] py-[96px] flex flex-col gap-[96px]">
                <div className="flex flex-col gap-[8px]">
                    <LongerTag
                        icon={
                            <ArrowUpRightIcon
                                size={14}
                                className="stroke-gray-700"
                            />
                        }
                        text="꼭! 이것만 읽어주세요"
                    />

                    <span className="font-p-semibold text-[24px] text-gray-900">
                        새로운 관심사가 생기셨군요.
                    </span>
                </div>

                <div className="flex flex-col gap-[96px]">
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex gap-[6px]">
                            <div className="size-[4px] bg-red-600 rounded-full" />

                            <span className="font-p-semibold text-[18px] text-gray-900">
                                관심사가 무엇인가요?
                            </span>
                        </div>

                        <Input
                            type="lg"
                            variants="underline"
                            value={name}
                            onChange={(e) => {
                                if (e.length > 40) return;
                                setName(e);
                            }}
                            placeholder="관심사 입력하기"
                            disabled={isCreating}
                        />
                    </div>

                    <div className="flex flex-col gap-[16px]">
                        <div className="flex gap-[6px]">
                            <div className="size-[4px] bg-red-600 rounded-full" />

                            <span className="font-p-semibold text-[18px] text-gray-900">
                                &lsquo;{name.trim() || "-"}&lsquo; 에 대해 짧게
                                소개해 주세요.
                            </span>
                        </div>

                        <Input
                            type="lg"
                            variants="underline"
                            value={description}
                            onChange={(e) => {
                                if (e.length > 100) return;
                                setDescription(e);
                            }}
                            placeholder="설명 입력하기"
                            disabled={isCreating}
                        />
                    </div>

                    <div className="flex flex-col gap-[16px]">
                        <span className="font-p-semibold text-[18px] text-gray-900">
                            <span className="font-p-medium text-[18px] text-gray-400">
                                (최대 5개)
                            </span>{" "}
                            &lsquo;{name.trim() || "-"}&lsquo; 의 특징을 나열해
                            주세요.
                        </span>

                        <div className="flex flex-col gap-[14px]">
                            <Input
                                type="lg"
                                variants="underline"
                                value={tagName}
                                onChange={(e) => {
                                    if (e.length > 20) return;
                                    setTagName(e);
                                }}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        if (tags.length > 4) return;

                                        setTags((prev) => [
                                            ...prev,
                                            tagName.trim(),
                                        ]);
                                        setTagName("");
                                    }
                                }}
                                placeholder="태그 입력하기"
                                disabled={isCreating}
                            />

                            <div className="flex flex-wrap gap-[6px]">
                                {tags.map((tag, index) => (
                                    <div
                                        key={tag}
                                        className="p-[4px_8px] rounded-[4px] cursor-pointer flex items-center gap-[4px] bg-white border border-gray-200 hover:bg-gray-50"
                                        onClick={() => {
                                            setTags((prev) =>
                                                prev.filter(
                                                    (_, i) => i !== index
                                                )
                                            );
                                        }}
                                    >
                                        <span className="font-p-regular text-[12px] text-gray-600">
                                            {tag}
                                        </span>

                                        <XIcon
                                            size={12}
                                            className="stroke-gray-600"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[16px]">
                        <span className="font-p-semibold text-[18px] text-gray-900">
                            <span className="font-p-medium text-[18px] text-gray-400">
                                (최대 4장)
                            </span>{" "}
                            &lsquo;{name.trim() || "-"}&lsquo;{" "}
                            {josa(name.trim(), "을/를").substring(
                                name.trim().length
                            )}{" "}
                            상징하는 사진을 올려주세요.
                        </span>

                        <div className="flex flex-col gap-[14px]">
                            <div className="w-fit">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />

                                <Button
                                    type="md"
                                    variants="outline"
                                    icons={[
                                        {
                                            component: (
                                                <ArrowUpToLineIcon
                                                    key="upload-image"
                                                    size={14}
                                                    className="stroke-gray-900"
                                                />
                                            ),
                                            float: "left",
                                        },
                                    ]}
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={isCreating}
                                >
                                    사진 업로드
                                </Button>
                            </div>

                            <div className="grid grid-cols-8 gap-[14px]">
                                <div
                                    className={`aspect-square rounded-[8px] overflow-hidden border border-dashed flex justify-center items-center cursor-pointer transition-colors ${
                                        isDragOver
                                            ? "border-gray-500 bg-gray-50"
                                            : "border-gray-300 hover:border-gray-400"
                                    }`}
                                    onClick={() => {
                                        if (isCreating) return;
                                        fileInputRef.current?.click();
                                    }}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                >
                                    <ArrowUpToLineIcon
                                        size={24}
                                        className="stroke-gray-500"
                                    />
                                </div>

                                {uploadedImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square rounded-[8px] overflow-hidden group"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={image}
                                            alt={`upload_${index + 1}`}
                                            className="size-full object-cover"
                                        />

                                        <div
                                            className="absolute top-0 left-0 size-full group-hover:opacity-100 opacity-0 bg-gray-900/60 flex justify-center items-center cursor-pointer transition-all duration-[.1s]"
                                            onClick={() => {
                                                if (isCreating) return;
                                                handleImageRemove(index);
                                            }}
                                        >
                                            <XIcon
                                                size={24}
                                                className="stroke-white"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {name.trim().length > 0 && description.trim().length > 0 && (
                    <div className="w-fit">
                        <Button
                            type="md"
                            variants="outline"
                            icons={[
                                {
                                    float: "left",
                                    component: isCreating ? (
                                        <LoaderCircleIcon
                                            key="loader-cirlce"
                                            size={14}
                                            className={`animate-spin transition-all duration-[.1s] ${
                                                isCreating
                                                    ? "stroke-gray-400"
                                                    : "stroke-gray-900"
                                            }`}
                                        />
                                    ) : (
                                        <BookPlusIcon
                                            key="create-fan"
                                            size={16}
                                            className={`transition-all duration-[.1s] ${
                                                isCreating
                                                    ? "stroke-gray-400"
                                                    : "stroke-gray-900"
                                            }`}
                                        />
                                    ),
                                },
                            ]}
                            onClick={() => {
                                if (isCreating) return;
                                handleCreateFan();
                            }}
                            disabled={isCreating}
                        >
                            덕질 생성하기
                        </Button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
