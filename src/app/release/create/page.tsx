"use client";

import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ReleaseHeader } from "@/shared/components/release-header";
import { Footer } from "@/shared/components/footer";
import { Button } from "@/shared/components/button";

export default function Release() {
    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [version, setVersion] = useState<string>("");

    const [isPosting, setIsPosting] = useState<boolean>(false);

    return (
        <div>
            <ReleaseHeader />

            <div className="max-w-[1280px] m-[0_auto] py-[96px] flex flex-col gap-[64px]">
                <div className="flex flex-col gap-[8px]">
                    <span className="font-p-semibold text-[24px] text-gray-900">
                        새 릴리즈
                    </span>

                    <span className="font-p-medium text-[16px] text-gray-900">
                        패치노트를 작성해 주세요.
                    </span>
                </div>

                <div className="flex flex-col gap-[24px]">
                    <div className="flex gap-[24px]">
                        <input
                            className="w-[160px] shrink-0 pb-[4px] border-b border-b-gray-200 outline-none font-p-semibold text-[20px] text-gray-900"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            placeholder="버전"
                            disabled={isPosting}
                        />

                        <input
                            className="pb-[4px] border-b border-b-gray-200 outline-none w-full font-p-semibold text-[20px] text-gray-900"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목"
                            disabled={isPosting}
                        />
                    </div>

                    <textarea
                        className="outline-none pb-[4px] font-p-mj text-[18px] text-gray-900 min-h-[400px] focus:border-gray-900"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용 입력..."
                        disabled={isPosting}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="lg"
                            variants="black"
                            icons={[
                                {
                                    float: "left",
                                    component: isPosting ? (
                                        <LoaderCircleIcon
                                            key="loader-cirlce"
                                            size={14}
                                            className={`animate-spin transition-all duration-[.1s] ${
                                                isPosting
                                                    ? "stroke-gray-400"
                                                    : "stroke-white"
                                            }`}
                                        />
                                    ) : (
                                        <PlusIcon
                                            key="upload-post"
                                            size={16}
                                            className={`transition-all duration-[.1s] ${
                                                isPosting
                                                    ? "stroke-gray-400"
                                                    : "stroke-white"
                                            }`}
                                        />
                                    ),
                                },
                            ]}
                            onClick={() => {
                                if (isPosting) return;
                                setIsPosting(true);
                                setTimeout(
                                    () => router.push("/release/0"),
                                    1000
                                );
                            }}
                            disabled={isPosting}
                        >
                            게시
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
