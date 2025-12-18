import { ChevronRightIcon, CheckIcon } from "lucide-react";

export enum CheckboxTypes {
    default = "flex items-center justify-center cursor-pointer transition-all duration-[.1s] border-2 rounded-[4px]",

    sm = `${CheckboxTypes.default} w-[14px] h-[14px]`,
    md = `${CheckboxTypes.default} w-[16px] h-[16px]`,
    lg = `${CheckboxTypes.default} w-[18px] h-[18px]`,
}

export enum CheckboxVariants {
    primary = "bg-white border-gray-200 group-hover:border-gray-300 data-[checked=true]:bg-c-primary data-[checked=true]:border-c-primary",
}

interface CheckboxProps {
    type: keyof typeof CheckboxTypes;
    variants: keyof typeof CheckboxVariants;

    checked?: boolean;
    onChange?: (checked: boolean) => void;

    disabled?: boolean;
    label?: string;
    id?: string;

    required?: boolean;
    shortcut?: string;
}

export const Checkbox = ({
    type,
    variants,
    checked = false,
    onChange,
    disabled = false,
    label,
    id,
    required,
    shortcut,
}: CheckboxProps) => {
    const handleChange = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    return (
        <div
            className={`group flex items-center gap-[8px] ${
                disabled ? "!cursor-not-allowed opacity-50" : ""
            }`}
        >
            <div
                className={`${CheckboxTypes[type]} ${
                    CheckboxVariants[variants]
                } ${disabled ? "" : "active:scale-95"} shrink-0`}
                data-checked={checked}
                onClick={handleChange}
            >
                {checked && <CheckIcon size={12} className="stroke-white" />}
            </div>
            {label && (
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-[4px]">
                        {required && (
                            <span
                                className="font-p-semibold text-[14px] text-c-primary cursor-pointer"
                                onClick={handleChange}
                            >
                                (필수)
                            </span>
                        )}

                        <label
                            htmlFor={id}
                            className={`font-p-medium text-[14px] group-hover:text-gray-600 text-gray-500 ${
                                checked ? "text-gray-600" : ""
                            } ${disabled ? "opacity-50" : "cursor-pointer"}`}
                            onClick={handleChange}
                        >
                            {label}
                        </label>
                    </div>

                    {shortcut && (
                        <ChevronRightIcon
                            size={16}
                            className="stroke-gray-400 cursor-pointer"
                            onClick={() => window.open(shortcut)}
                        />
                    )}
                </div>
            )}
            {id && (
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={() => handleChange()}
                    disabled={disabled}
                    className="sr-only"
                />
            )}
        </div>
    );
};
