import { CheckIcon } from "lucide-react";

export enum CheckboxTypes {
    default = "flex items-center justify-center cursor-pointer transition-all duration-[.1s] border-2 rounded-[4px]",

    sm = `${CheckboxTypes.default} w-[14px] h-[14px]`,
    md = `${CheckboxTypes.default} w-[16px] h-[16px]`,
    lg = `${CheckboxTypes.default} w-[18px] h-[18px]`,
}

export enum CheckboxVariants {
    primary = "bg-white border-gray-300 hover:border-gray-400 data-[checked=true]:bg-c-primary data-[checked=true]:border-c-primary",
}

interface CheckboxProps {
    type: keyof typeof CheckboxTypes;
    variants: keyof typeof CheckboxVariants;

    checked?: boolean;
    onChange?: (checked: boolean) => void;

    disabled?: boolean;
    label?: string;
    id?: string;
}

export const Checkbox = ({
    type,
    variants,
    checked = false,
    onChange,
    disabled = false,
    label,
    id,
}: CheckboxProps) => {
    const handleChange = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    return (
        <div className="flex items-center gap-[8px]">
            <div
                className={`${CheckboxTypes[type]} ${
                    CheckboxVariants[variants]
                } ${
                    disabled
                        ? "!cursor-not-allowed opacity-50"
                        : "active:scale-95"
                }`}
                data-checked={checked}
                onClick={handleChange}
            >
                {checked && <CheckIcon size={12} className="stroke-white" />}
            </div>
            {label && (
                <label
                    htmlFor={id}
                    className={`font-p-medium text-[14px] text-gray-900 ${
                        disabled ? "opacity-50" : "cursor-pointer"
                    }`}
                    onClick={handleChange}
                >
                    {label}
                </label>
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
