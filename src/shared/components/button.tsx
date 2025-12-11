export enum ButtonTypes {
    default = "cursor-pointer outline-none font-p-medium flex justify-center items-center transition-all duration-[.1s] active:scale-95",

    sm = `${ButtonTypes.default} p-[4px_16px] rounded-[6px] text-[12px] gap-[4px]`,
    md = `${ButtonTypes.default} p-[6px_18px] rounded-[6px] text-[14px] gap-[6px]`,
    lg = `${ButtonTypes.default} p-[8px_20px] rounded-[6px] text-[16px] gap-[8px]`,

    sm_icon = `${ButtonTypes.default} p-[8px] rounded-[6px]`,
    md_icon = `${ButtonTypes.default} p-[10px] rounded-[6px]`,
    lg_icon = `${ButtonTypes.default} p-[12px] rounded-[6px]`,
}

export enum ButtonVariants {
    primary = "bg-c-primary hover:bg-c-primary active:bg-c-primary text-white",
    black = "bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white",
    outline = "bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-gray-900",
    warning = "bg-red-50 border border-red-200 hover:bg-red-100 active:bg-red-200 text-red-700",
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
            className={`${ButtonTypes[type]} ${ButtonVariants[variants]} ${
                disabled
                    ? "!bg-gray-100 !text-gray-400 active:!scale-100 !cursor-not-allowed"
                    : ""
            }`}
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
