"use client";

import { XIcon } from "lucide-react";
import { useRef } from "react";

export interface WideSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export const WideSearch = ({ value, onChange }: WideSearchProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex items-center gap-[8px]">
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-[340px] p-[4px_8px] outline-none font-p-medium text-[18px] text-stone-900 placeholder:text-stone-300"
                placeholder="덕질 · 커뮤니티 · 글 검색"
            />

            {value ? (
                <XIcon
                    size={18}
                    className="shrink-0 cursor-pointer stroke-stone-400"
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
