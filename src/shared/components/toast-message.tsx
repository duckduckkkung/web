export enum ToastMessageVariants {
    default = "p-[4px_8px] rounded-[4px]",

    error = `${ToastMessageVariants.default} bg-red-700`,
    success = `${ToastMessageVariants.default} bg-green-600`,
}

interface ToastMessageProps {
    variants: keyof typeof ToastMessageVariants;
    children?: React.ReactNode;
    message: React.ReactNode;
    isOpen: boolean;
}

export const ToastMessage = ({
    variants,
    children,
    message,
    isOpen,
}: ToastMessageProps) => {
    return (
        <div className="w-full grid grid-cols-1 relative cursor-default">
            <div
                className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap z-50 transition-all origin-bottom ${
                    isOpen
                        ? "opacity-100 translate-y-0 scale-100 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] duration-[.25s]"
                        : "opacity-0 translate-y-2 scale-0 pointer-events-none ease-in duration-[.1s]"
                }`}
            >
                <div className={`${ToastMessageVariants[variants]}`}>
                    {message}
                </div>

                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div
                        className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] ${
                            variants === "error"
                                ? "border-t-red-700"
                                : variants === "success"
                                ? "border-t-green-600"
                                : "border-t-gray-800"
                        }`}
                    ></div>
                </div>
            </div>

            {children}
        </div>
    );
};
