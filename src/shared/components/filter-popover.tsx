"use client";

import { XIcon } from "lucide-react";
import { useState } from "react";

export interface FilterState {
    selectedTags: string[];
    hasGoods: boolean | null;
}

interface FilterPopoverProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
}

const AVAILABLE_TAGS = ["태그하나", "태그둘", "태그셋", "태그넷", "태그다섯"];

export function FilterPopover({
    filters,
    onFiltersChange,
}: FilterPopoverProps) {
    const [activeMenu, setActiveMenu] = useState<"tags" | "goods">("tags");

    const handleTagToggle = (tag: string) => {
        const newSelectedTags = filters.selectedTags.includes(tag)
            ? filters.selectedTags.filter((t) => t !== tag)
            : [...filters.selectedTags, tag];

        onFiltersChange({
            ...filters,
            selectedTags: newSelectedTags,
        });
    };

    const handleGoodsToggle = (hasGoods: boolean) => {
        onFiltersChange({
            ...filters,
            hasGoods: filters.hasGoods === hasGoods ? null : hasGoods,
        });
    };

    return (
        <div className="flex">
            <div className="w-[100px] flex flex-col border-r border-stone-200">
                <div
                    className={`p-[6px_10px] hover:bg-stone-50 transition-all duration-[.1s] cursor-pointer ${
                        activeMenu === "tags" ? "bg-stone-50" : "bg-white"
                    }`}
                    onClick={() => setActiveMenu("tags")}
                >
                    <span
                        className={`${
                            activeMenu === "tags"
                                ? "font-p-medium text-stone-900"
                                : "font-p-regular text-stone-700"
                        } text-[14px]`}
                    >
                        태그
                    </span>
                </div>

                <div className="w-full h-[1px] bg-stone-200" />

                <div
                    className={`p-[6px_10px] hover:bg-stone-50 transition-all duration-[.1s] cursor-pointer ${
                        activeMenu === "goods" ? "bg-stone-50" : "bg-white"
                    }`}
                    onClick={() => setActiveMenu("goods")}
                >
                    <span
                        className={`${
                            activeMenu === "goods"
                                ? "font-p-medium text-stone-900"
                                : "font-p-regular text-stone-700"
                        } text-[14px]`}
                    >
                        굿즈 판매
                    </span>
                </div>
            </div>

            <div className="w-[300px]">
                {activeMenu === "tags" && (
                    <div className="flex flex-col gap-[8px] p-[14px]">
                        <span className="font-p-semibold text-[16px] text-stone-900">
                            태그
                        </span>

                        <div className="flex flex-wrap gap-[8px]">
                            {AVAILABLE_TAGS.map((tag) => {
                                const isSelected =
                                    filters.selectedTags.includes(tag);

                                return (
                                    <div
                                        key={tag}
                                        className={`p-[4px_8px] rounded-[4px] cursor-pointer flex items-center gap-[4px] ${
                                            isSelected
                                                ? "bg-stone-900"
                                                : "bg-white border border-stone-200 hover:bg-stone-50"
                                        }`}
                                        onClick={() => handleTagToggle(tag)}
                                    >
                                        <span
                                            className={`font-p-regular text-[12px] ${
                                                isSelected
                                                    ? "text-white"
                                                    : "text-stone-600"
                                            }`}
                                        >
                                            {tag}
                                        </span>

                                        {isSelected && (
                                            <XIcon
                                                size={12}
                                                className="stroke-white"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeMenu === "goods" && (
                    <div className="flex flex-col gap-[8px] p-[14px]">
                        <span className="font-p-semibold text-[16px] text-stone-900">
                            굿즈 판매
                        </span>

                        <div className="flex flex-wrap gap-[8px]">
                            <div className="overflow-hidden rounded-[4px] bg-white border border-stone-200 cursor-pointer flex items-center">
                                <div
                                    className={`p-[4px_12px] transition-all duration-[.1s] ${
                                        filters.hasGoods === true
                                            ? "bg-stone-900"
                                            : "bg-white hover:bg-stone-50"
                                    }`}
                                    onClick={() => handleGoodsToggle(true)}
                                >
                                    <span
                                        className={`font-p-regular text-[12px] ${
                                            filters.hasGoods === true
                                                ? "text-white"
                                                : "text-stone-600"
                                        }`}
                                    >
                                        있음
                                    </span>
                                </div>

                                <div className="w-[1px] h-full bg-stone-200" />

                                <div
                                    className={`p-[4px_12px] transition-all duration-[.1s] ${
                                        filters.hasGoods === false
                                            ? "bg-stone-900"
                                            : "bg-white hover:bg-stone-50"
                                    }`}
                                    onClick={() => handleGoodsToggle(false)}
                                >
                                    <span
                                        className={`font-p-regular text-[12px] ${
                                            filters.hasGoods === false
                                                ? "text-white"
                                                : "text-stone-600"
                                        }`}
                                    >
                                        없음
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
