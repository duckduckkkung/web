"use client";

import {
    ArrowUpRightIcon,
    ArrowUpToLineIcon,
    LoaderCircleIcon,
    UploadCloudIcon,
    XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

import { LongerTag } from "@/shared/components/longer-tag";
import { Header } from "@/shared/components/header";
import { Button } from "@/shared/components/button";
import { Footer } from "@/shared/components/footer";
import { Input } from "@/shared/components/input";

export default function UploadMoment() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        if (!file.type.startsWith("video/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setUploadedVideo(result);
        };

        reader.readAsDataURL(file);
        event.target.value = "";
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (!file.type.startsWith("video/")) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setUploadedVideo(result);
            };

            reader.readAsDataURL(file);
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

    const handleVideoRemove = () => {
        setUploadedVideo(null);
    };

    const handleCreateFan = async () => {
        if (!name.trim() || !description.trim()) return;

        setIsCreating(true);
        await new Promise((res) => setTimeout(res, 3000));
        router.push(`/fans/${name}/moments?q=${name}`);
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
                        사람들이 이걸보고 입덕할지도 몰라요!
                    </span>
                </div>

                <div className="flex flex-col gap-[96px]">
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex gap-[6px]">
                            <div className="size-[4px] bg-red-600 rounded-full" />

                            <span className="font-p-semibold text-[18px] text-gray-900">
                                제목을 입력해 주세요.
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
                                짧은 설명을 작성해 주세요.
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
                        <div className="flex gap-[6px]">
                            <div className="size-[4px] bg-red-600 rounded-full" />

                            <span className="font-p-semibold text-[18px] text-gray-900">
                                동영상을 업로드해 주세요.
                            </span>
                        </div>

                        <div className="flex flex-col gap-[14px]">
                            <div className="w-fit">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoUpload}
                                    className="hidden"
                                />

                                <Button
                                    type="md"
                                    variants="outline"
                                    icons={[
                                        {
                                            component: (
                                                <ArrowUpToLineIcon
                                                    key="upload-video"
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
                                    disabled={
                                        isCreating || uploadedVideo !== null
                                    }
                                >
                                    영상 업로드
                                </Button>
                            </div>

                            {!uploadedVideo ? (
                                <div
                                    className={`w-[480px] aspect-9/15 rounded-[8px] overflow-hidden border border-dashed flex justify-center items-center cursor-pointer transition-colors ${
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
                            ) : (
                                <div className="relative w-[480px] aspect-9/15 rounded-[8px] overflow-hidden group">
                                    <video
                                        src={uploadedVideo}
                                        className="size-full object-cover"
                                        controls
                                    />

                                    <div
                                        className="absolute top-[8px] right-[8px] p-[8px] bg-gray-900/60 rounded-[4px] group-hover:opacity-100 opacity-0 cursor-pointer transition-all duration-[.1s]"
                                        onClick={() => {
                                            if (isCreating) return;
                                            handleVideoRemove();
                                        }}
                                    >
                                        <XIcon
                                            size={20}
                                            className="stroke-white"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {name.trim().length > 0 &&
                    description.trim().length > 0 &&
                    uploadedVideo && (
                        <div className="w-fit">
                            <Button
                                type="md"
                                variants="outline"
                                icons={[
                                    {
                                        component: isCreating ? (
                                            <LoaderCircleIcon
                                                key="loader-cirlce"
                                                size={14}
                                                className="stroke-gray-900 animate-spin"
                                            />
                                        ) : (
                                            <UploadCloudIcon
                                                key="create-fan"
                                                size={14}
                                                className="stroke-gray-900"
                                            />
                                        ),
                                        float: "left",
                                    },
                                ]}
                                onClick={() => {
                                    if (isCreating) return;
                                    handleCreateFan();
                                }}
                                disabled={isCreating}
                            >
                                업로드
                            </Button>
                        </div>
                    )}
            </div>

            <Footer />
        </div>
    );
}
