export enum ButtonTypes {
    default = "cursor-pointer outline-none font-p-medium flex justify-center items-center transition-all duration-[.1s] active:scale-95",

    sm = `${ButtonTypes.default} p-[4px_16px] rounded-[6px] text-[12px] gap-[4px]`,
    md = `${ButtonTypes.default} p-[6px_18px] rounded-[6px] text-[14px] gap-[6px]`,
    lg = `${ButtonTypes.default} p-[8px_20px] rounded-[6px] text-[16px] gap-[8px]`,
}

export enum ButtonVariants {
    primary = "bg-c-primary hover:bg-c-primary active:bg-c-primary text-white",
    black = "bg-stone-900 hover:bg-stone-800 active:bg-stone-700 text-white",
    outline = "bg-white border border-stone-200 hover:bg-stone-50 active:bg-stone-100 text-stone-900",
}

export interface Icon {
    component: React.ReactNode;
    float: "left" | "right";
}

interface ButtonProps {
    type: keyof typeof ButtonTypes;
    variants: keyof typeof ButtonVariants;

    icons?: Icon[];
    children?: React.ReactNode;

    onClick?: () => void;

    disabled?: boolean;
}

export const Button = ({
    type,
    variants,
    icons,
    children,
    onClick,
    disabled,
}: ButtonProps) => {
    return (
        <button
            className={`${ButtonTypes[type]} ${ButtonVariants[variants]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icons
                ?.filter((icon) => icon.float === "left")
                .map((icon) => icon.component)}
            {children}
            {icons
                ?.filter((icon) => icon.float === "right")
                .map((icon) => icon.component)}
        </button>
    );
};
