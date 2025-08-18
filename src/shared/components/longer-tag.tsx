interface LongerTagProps {
    icon: React.ReactNode;
    text: React.ReactNode;

    onClick?: () => void;
}

export const LongerTag = ({ icon, text, onClick }: LongerTagProps) => {
    return (
        <div
            className="w-fit p-[4px_14px] bg-stone-100 rounded-[100px] flex items-center gap-[4px] cursor-pointer hover:bg-stone-200 transition-all duration-[.1s]"
            onClick={onClick}
        >
            {icon}

            <span className="font-p-medium text-[12px] text-stone-700">
                {text}
            </span>
        </div>
    );
};
