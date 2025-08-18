export enum IconButtonTypes {
    default = "cursor-pointer transition-all duration-[.1s] flex justify-center items-center",

    sm = `${IconButtonTypes.default} rounded-[6px] size-[28px]`,
    md = `${IconButtonTypes.default} rounded-[6px] size-[39px]`,
    lg = `${IconButtonTypes.default} rounded-[6px] size-[50px]`,
}

export enum IconButtonVariants {
    outline = "bg-white border border-stone-200 hover:border-stone-300",
    bg = "bg-stone-900 hover:bg-stone-800",
}

interface IconButtonProps {
    type: keyof typeof IconButtonTypes;
    variants: keyof typeof IconButtonVariants;

    icon: React.ReactNode;

    onClick?: () => void;
}

export const IconButton = ({
    type,
    variants,
    icon,
    onClick,
}: IconButtonProps) => {
    return (
        <div
            className={`${IconButtonTypes[type]} ${IconButtonVariants[variants]}`}
            onClick={onClick}
        >
            {icon}
        </div>
    );
};
