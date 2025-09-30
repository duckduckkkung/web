"use client";

import {
    ChevronDownIcon,
    Settings2Icon,
    SparkleIcon,
    UserRoundIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Popover } from "./popover";
import { Button } from "./button";

export const GlobalHeaderInteractions = () => {
    const router = useRouter();

    const options = (
        <div className="min-w-full w-max max-h-60 overflow-y-auto">
            <div
                className="px-3 py-2 cursor-pointer hover:bg-stone-50 border-b border-b-stone-200 flex items-center gap-[6px]"
                onClick={() => router.push("/고서온")}
            >
                <UserRoundIcon size={14} className="stroke-stone-900" />

                <span className="font-p-medium text-[14px] text-stone-900">
                    내 프로필
                </span>
            </div>

            <div
                className="px-3 py-2 cursor-pointer hover:bg-stone-50 flex items-center gap-[6px]"
                onClick={() => router.push("/settings")}
            >
                <Settings2Icon size={14} className="stroke-stone-900" />

                <span className="font-p-medium text-[14px] text-stone-900">
                    설정
                </span>
            </div>
        </div>
    );

    return (
        <div className="flex items-center gap-[16px]">
            <Button
                type="sm"
                variants="outline"
                icons={[
                    {
                        component: (
                            <SparkleIcon
                                key="header-start"
                                size={12}
                                className="stroke-stone-900"
                            />
                        ),
                        float: "left",
                    },
                ]}
                onClick={() => router.push("/register")}
            >
                시작하기
            </Button>

            <Popover overlay={options}>
                <div className="flex items-center gap-[6px] cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://avatars.githubusercontent.com/u/98827759?v=4"
                        alt="profile"
                        className="size-[32px] object-cover"
                        draggable={false}
                    />

                    <ChevronDownIcon size={14} className="stroke-stone-900" />
                </div>
            </Popover>
        </div>
    );
};
