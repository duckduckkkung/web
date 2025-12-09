"use client";

import {
    ArrowUpRightIcon,
    PlusIcon,
    RefreshCcwIcon,
    SearchIcon,
    SlidersHorizontalIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

import { FilterPopover, FilterState } from "@/shared/components/filter-popover";
import { IconButton } from "@/shared/components/icon-button";
import { LongerTag } from "@/shared/components/longer-tag";
import { FanCard } from "@/shared/components/fan-card";
import { Popover } from "@/shared/components/popover";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Input } from "@/shared/components/input";

import { fans } from "@/mocks/fans";

export default function Fans() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const query = searchParams.get("q") as string;
        if (query?.trim?.()?.length > 0) setSearch(query);
    }, [searchParams]);

    useEffect(() => {
        const query = searchParams.get("tag") as string | string[];

        if (typeof query === "string" && query?.trim?.()?.length > 0)
            setFilters((prev) => ({ ...prev, selectedTags: [query] }));
        else if (query?.length > 0)
            setFilters((prev) => ({ ...prev, selectedTags: [...query] }));
    }, [searchParams]);

    const [search, setSearch] = useState<string>("");
    const [filters, setFilters] = useState<FilterState>({
        selectedTags: [],
        hasGoods: null,
    });

    const filteredFans = useMemo(() => {
        return fans.filter((fan) => {
            if (
                search &&
                !fan.name.toLowerCase().includes(search.toLowerCase())
            ) {
                return false;
            }

            if (filters.selectedTags.length > 0) {
                const hasMatchingTag = filters.selectedTags.some((tag) =>
                    fan.tags?.includes(tag)
                );
                if (!hasMatchingTag) return false;
            }

            if (filters.hasGoods !== null) {
                if (fan.isGoodsSiteExists !== filters.hasGoods) {
                    return false;
                }
            }

            return true;
        });
    }, [search, filters]);

    const handleResetFilters = () => {
        setSearch("");
        setFilters({
            selectedTags: [],
            hasGoods: null,
        });
    };

    const activeFiltersCount =
        filters.selectedTags.length + (filters.hasGoods !== null ? 1 : 0);

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] m-[0_auto] py-[96px] flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[8px]">
                    <LongerTag
                        icon={
                            <ArrowUpRightIcon
                                size={14}
                                className="stroke-gray-700"
                            />
                        }
                        text="굿즈를 바로 확인할 수 있는 기능이 추가되었어요"
                        onClick={() => router.push("/release")}
                    />

                    <span className="font-p-semibold text-[24px] text-gray-900">
                        덕질하기 좋은 아침이네요, 고서온님.
                    </span>
                </div>

                <div className="flex flex-col gap-[64px]">
                    <div className="flex items-center gap-[8px]">
                        <IconButton
                            type="md"
                            variants="outline"
                            icon={
                                <PlusIcon
                                    size={15}
                                    className="stroke-gray-900"
                                />
                            }
                            onClick={() => router.push("/fans/create")}
                        />

                        <Popover
                            overlay={
                                <FilterPopover
                                    filters={filters}
                                    onFiltersChange={setFilters}
                                />
                            }
                        >
                            <div className="relative">
                                <IconButton
                                    type="md"
                                    variants="outline"
                                    icon={
                                        <SlidersHorizontalIcon
                                            size={15}
                                            className="stroke-gray-900"
                                        />
                                    }
                                />

                                {activeFiltersCount > 0 && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-[10px] font-p-bold">
                                            {activeFiltersCount}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Popover>

                        <div className="w-[300px]">
                            <Input
                                type="md"
                                variants="outline"
                                placeholder="검색어를 입력해 주세요."
                                value={search}
                                onChange={setSearch}
                            />
                        </div>

                        <IconButton
                            type="md"
                            variants="bg"
                            icon={
                                <SearchIcon
                                    size={15}
                                    className="stroke-white"
                                />
                            }
                        />

                        <IconButton
                            type="md"
                            variants="outline"
                            icon={
                                <RefreshCcwIcon
                                    size={15}
                                    className="stroke-gray-900"
                                />
                            }
                            onClick={handleResetFilters}
                        />
                    </div>

                    <div className="flex flex-col gap-[16px]">
                        <div className="flex items-center justify-between">
                            <span className="font-p-regular text-[14px] text-gray-600">
                                총{" "}
                                <span className="font-p-medium">
                                    {filteredFans.length}
                                </span>
                                개
                            </span>

                            {(search || activeFiltersCount > 0) && (
                                <div className="flex items-center gap-[8px]">
                                    <span className="font-p-regular text-[12px] text-gray-500">
                                        필터 적용 중
                                    </span>

                                    <button
                                        onClick={handleResetFilters}
                                        className="font-p-medium text-[12px] text-gray-700 hover:text-gray-900 underline cursor-pointer"
                                    >
                                        초기화
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-[32px]">
                            {filteredFans.map((fan) => (
                                <FanCard key={fan.id} data={fan} />
                            ))}
                        </div>

                        {filteredFans.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-[80px] gap-[4px]">
                                <span className="font-p-medium text-[18px] text-gray-900">
                                    검색 결과가 없어요
                                </span>

                                <span className="font-p-regular text-[14px] text-gray-500">
                                    찾으시는 덕질이 없나요?{" "}
                                    <u
                                        className="text-gray-900 cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/fans/create?name=${search}`
                                            )
                                        }
                                    >
                                        등록하러 가기
                                    </u>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
