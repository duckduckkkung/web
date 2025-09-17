"use client";

import { PlusIcon, LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { BoardSidebar } from "@/shared/components/board-sidebar";
import { FanHeader } from "@/shared/components/fan-header";
import { Button } from "@/shared/components/button";
import { Footer } from "@/shared/components/footer";
import { Select } from "@/shared/components/select";

import { TypeFan } from "@/shared/types/types";
import { Checkbox } from "@/shared/components/checkbox";

export default function CreateBoard() {
    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const [isPined, setIsPined] = useState<boolean>(false);
    const [isNotice, setIsNotice] = useState<boolean>(false);

    const [isPosting, setIsPosting] = useState<boolean>(false);

    const handlePostCreate = async () => {
        if (!title.trim() || !content.trim() || !selectedCategory) return;

        setIsPosting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push(`/fans/${fan.name}/board/1`);
    };

    const fan: TypeFan = {
        id: "1",
        name: "송하영",
        description:
            "작고귀엽고사랑스럽고노래도너무잘부르고춤도잘추는레전드송하영사랑꾼들의모임",
        imageUrl: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk1q1Fk5medS__SP2mw9fwJLICbzwo5_UpsA&s",
            "https://i.namu.wiki/i/6462Vd7qUEjNaMB5IyKHrWysXrOTDW1RGjERq6TdnjXk7f7JhB3WUnM0Gps6RD7yAk4LbqRuqzrSbDUzHTxvLQ.webp",
            "https://i.namu.wiki/i/uOHdUtiQwJU_aiqAc-avrNgkvTKCN9DS6i9W3JYkRi5EZjMui4BOeFkD2MUATIPxsGgCpE5lzU1qyxATBl8FvQ.webp",
            "https://biz.chosun.com/resizer/v2/34YB2KY35L2WWQUGAT6RWHRBXA.jpg?auth=9c5179d3b87d2ac933f60be115318f6fa21e2ff995af3d39e261e8ef64a3ce3c&width=530&height=696&smart=true",
        ],
        isGoodsSiteExists: false,
        tags: ["귀여움", "맏언니", "송하영", "개이뻐쪽쪽"],
    };

    return (
        <div>
            <FanHeader href={`/fans/${fan.name}/board`} fan={fan} />

            <div className="max-w-[1280px] min-h-[100dvh] m-[0_auto] py-[64px] flex gap-[98px]">
                <BoardSidebar type="boards" fan={fan} />

                <div className="flex-1 shrink-0 flex flex-col gap-[64px]">
                    <div className="flex flex-col gap-[24px]">
                        <div className="flex justify-end items-center gap-[24px]">
                            <Checkbox
                                type="md"
                                variants="primary"
                                label="공지사항"
                                checked={isNotice}
                                onChange={setIsNotice}
                            />

                            <Checkbox
                                type="md"
                                variants="primary"
                                label="고정"
                                checked={isPined}
                                onChange={setIsPined}
                            />
                        </div>

                        <div className="flex gap-[24px]">
                            <div className="shrink-0 w-fit">
                                <Select
                                    type="lg_free"
                                    variants="free"
                                    options={[
                                        { label: "🖼️ 자유게시판", value: "1" },
                                        { label: "💩 똥글", value: "2" },
                                    ]}
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                    placeholder="말머리"
                                    disabled={isPosting}
                                />
                            </div>

                            <input
                                className="pb-[4px] border-b border-b-stone-200 outline-none w-full font-p-semibold text-[20px] text-stone-900"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목"
                                disabled={isPosting}
                            />
                        </div>

                        <textarea
                            className="outline-none pb-[4px] font-p-mj text-[18px] text-stone-900 min-h-[400px] focus:border-stone-900"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용 입력..."
                            disabled={isPosting}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="lg"
                            variants="black"
                            icons={[
                                {
                                    float: "left",
                                    component: isPosting ? (
                                        <LoaderCircleIcon
                                            size={16}
                                            className="stroke-white animate-spin"
                                        />
                                    ) : (
                                        <PlusIcon
                                            size={16}
                                            className="stroke-white"
                                        />
                                    ),
                                },
                            ]}
                            onClick={() => {
                                if (isPosting) return;
                                handlePostCreate();
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
