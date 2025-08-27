export enum InputTypes {
    default = "w-full outline-none font-p-medium transition-all duration-[.1s]",

    sm = `${InputTypes.default} p-[4px_8px] text-[12px]`,
    md = `${InputTypes.default} p-[8px_12px] text-[14px]`,
    lg = `${InputTypes.default} p-[12px_16px] text-[16px]`,
}

export enum InputVariants {
    outline = "rounded-[6px] bg-white text-stone-900 placeholder:text-stone-400 border border-stone-200 text-stone-900 hover:border-stone-300 outline-solid outline-stone-100 outline-0 focus:outline-4",
    underline = "bg-white text-stone-900 placeholder:text-stone-400 border-b border-b-stone-300 text-stone-900 hover:border-b-stone-400 focus:border-b-c-primary",
}

interface InputProps {
    type: keyof typeof InputTypes;
    variants: keyof typeof InputVariants;

    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onKeyUp?: (e: React.KeyboardEvent) => void;

    disabled?: boolean;
}

export const Input = ({
    type,
    variants,
    placeholder,
    value,
    onChange,
    disabled,
    onKeyUp,
}: InputProps) => {
    return (
        <input
            type="text"
            className={`${InputTypes[type]} ${InputVariants[variants]}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyUp={onKeyUp}
            disabled={disabled}
        />
    );
};
