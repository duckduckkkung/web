export enum InputTypes {
    default = "w-full outline-none font-p-medium transition-all duration-[.1s]",

    sm = `${InputTypes.default} p-[4px_8px] rounded-[6px] text-[12px]`,
    md = `${InputTypes.default} p-[8px_12px] rounded-[6px] text-[14px]`,
    lg = `${InputTypes.default} p-[12px_16px] rounded-[6px] text-[16px]`,
}

export enum InputVariants {
    outline = "bg-white text-stone-900 placeholder:text-stone-400 border border-stone-200 text-stone-900 hover:border-stone-300 outline-solid outline-stone-100 outline-0 focus:outline-4",
}

interface InputProps {
    type: keyof typeof InputTypes;
    variants: keyof typeof InputVariants;

    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

export const Input = ({
    type,
    variants,
    placeholder,
    value,
    onChange,
}: InputProps) => {
    return (
        <input
            type="text"
            className={`${InputTypes[type]} ${InputVariants[variants]}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};
