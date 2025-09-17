"use client";

import { useState } from "react";
import { Popover } from "./popover";
import { ChevronDownIcon } from "lucide-react";

interface SelectOption {
    value: string;
    label: string;
}

export enum SelectTypes {
    default = "w-full outline-none font-p-medium transition-all duration-[.1s] flex justify-between items-center cursor-pointer",

    sm = `${SelectTypes.default} p-[4px_8px] text-[12px] gap-[4px]`,
    md = `${SelectTypes.default} p-[8px_12px] text-[14px] gap-[6px]`,
    lg = `${SelectTypes.default} p-[12px_16px] text-[16px] gap-[8px]`,

    sm_free = `${SelectTypes.default} p-0 text-[16px] gap-[4px]`,
    md_free = `${SelectTypes.default} p-0 text-[18px] gap-[6px]`,
    lg_free = `${SelectTypes.default} p-0 text-[20px] gap-[8px]`,
}

export enum SelectVariants {
    free = "bg-white text-stone-900 placeholder:text-stone-400 text-stone-900",
    outline = "rounded-[6px] bg-white text-stone-900 placeholder:text-stone-400 border border-stone-200 text-stone-900 hover:border-stone-300",
}

interface SelectProps {
    type: keyof typeof SelectTypes;
    variants: keyof typeof SelectVariants;
    options: SelectOption[];
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export const Select = ({
    type,
    variants,
    options,
    placeholder,
    value,
    onChange,
    disabled = false,
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find((option) => option.value === value);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    if (disabled) {
        return (
            <div
                className={`${SelectTypes[type]} ${SelectVariants[variants]} opacity-50 cursor-not-allowed`}
            >
                <span
                    className={
                        selectedOption ? "text-stone-900" : "text-stone-400"
                    }
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>

                <ChevronDownIcon size={14} className="stroke-stone-400" />
            </div>
        );
    }

    const selectTrigger = (
        <div className={`${SelectTypes[type]} ${SelectVariants[variants]}`}>
            <span
                className={selectedOption ? "text-stone-900" : "text-stone-400"}
            >
                {selectedOption ? selectedOption.label : placeholder}
            </span>

            <ChevronDownIcon
                size={14}
                className={`stroke-stone-400 ${isOpen ? "rotate-180" : ""}`}
            />
        </div>
    );

    const selectOptions = (
        <div className="min-w-full w-max max-h-60 overflow-y-auto">
            {options.map((option, index) => (
                <div
                    key={option.value}
                    className={`px-4 py-3 cursor-pointer hover:bg-stone-50 transition-colors font-p-medium text-[14px] ${
                        option.value === value
                            ? "bg-stone-100 text-stone-900"
                            : "text-stone-700"
                    } ${
                        index === options.length - 1
                            ? ""
                            : "border-b border-b-stone-200"
                    }`}
                    onClick={() => handleSelect(option.value)}
                >
                    {option.label}
                </div>
            ))}
        </div>
    );

    return <Popover overlay={selectOptions}>{selectTrigger}</Popover>;
};
