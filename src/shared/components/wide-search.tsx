"use client";

import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";
import { useRef } from "react";

export interface WideSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export const WideSearch = ({ value, onChange }: WideSearchProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    return (
        <div className="flex items-center gap-[8px]">
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="sm:inline-block w-[340px] hidden p-[4px_8px] outline-none font-p-medium text-[18px] text-gray-900 placeholder:text-gray-300"
                placeholder="덕질 검색"
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        router.push(`/fans?q=${value}`);
                    }
                }}
            />

            {value ? (
                <XIcon
                    size={18}
                    className="shrink-0 cursor-pointer stroke-gray-400"
                    onClick={() => {
                        onChange("");
                        inputRef.current?.focus();
                    }}
                />
            ) : (
                <div className="size-[18px]" />
            )}
        </div>
    );
};
