"use client";

import {
    ChevronDownIcon,
    HashIcon,
    Settings2Icon,
    SparkleIcon,
    UserRoundIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Popover } from "./popover";
import { Button } from "./button";

export const GlobalHeaderInteractions = () => {
    const router = useRouter();

    const redirectKakao = () => {
        const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
        const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

        location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    };

    const redirectGoogle = () => {
        const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

        location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email+profile`;
    };

    const options = (
        <div className="min-w-full w-max max-h-60 overflow-y-auto">
            <div
                className="px-3 py-2 cursor-pointer hover:bg-gray-50 border-b border-b-gray-200 flex items-center gap-[6px]"
                onClick={redirectKakao}
            >
                <HashIcon size={14} className="stroke-gray-900" />

                <span className="font-p-medium text-[14px] text-gray-900">
                    카카오
                </span>
            </div>

            <div
                className="px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-[6px]"
                onClick={redirectGoogle}
            >
                <HashIcon size={14} className="stroke-gray-900" />

                <span className="font-p-medium text-[14px] text-gray-900">
                    구글
                </span>
            </div>
        </div>
    );

    const options2 = (
        <div className="min-w-full w-max max-h-60 overflow-y-auto">
            <div
                className="px-3 py-2 cursor-pointer hover:bg-gray-50 border-b border-b-gray-200 flex items-center gap-[6px]"
                onClick={() => router.push("/고서온")}
            >
                <UserRoundIcon size={14} className="stroke-gray-900" />

                <span className="font-p-medium text-[14px] text-gray-900">
                    내 프로필
                </span>
            </div>

            <div
                className="px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-[6px]"
                onClick={() => router.push("/settings")}
            >
                <Settings2Icon size={14} className="stroke-gray-900" />

                <span className="font-p-medium text-[14px] text-gray-900">
                    설정
                </span>
            </div>
        </div>
    );

    return (
        <div className="flex items-center gap-[16px]">
            <Popover overlay={options}>
                <Button
                    type="sm"
                    variants="outline"
                    icons={[
                        {
                            component: (
                                <SparkleIcon
                                    key="header-start"
                                    size={12}
                                    className="stroke-gray-900"
                                />
                            ),
                            float: "left",
                        },
                    ]}
                >
                    시작하기
                </Button>
            </Popover>

            <Popover overlay={options2}>
                <div className="flex items-center gap-[6px] cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://avatars.githubusercontent.com/u/98827759?v=4"
                        alt="profile"
                        className="size-[32px] object-cover rounded-[4px]"
                        draggable={false}
                    />

                    <ChevronDownIcon size={14} className="stroke-gray-900" />
                </div>
            </Popover>
        </div>
    );
};
