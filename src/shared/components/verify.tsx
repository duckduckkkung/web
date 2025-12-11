import { CheckIcon } from "lucide-react";

interface VerifyProps {
    checked: boolean;
    label: string;
}

export const Verify = ({ checked, label }: VerifyProps) => {
    return (
        <div className="flex items-center gap-[4px]">
            <CheckIcon
                size={12}
                className={checked ? "stroke-c-primary" : "stroke-gray-400"}
            />

            <span className="font-p-regular text-[12px] text-gray-600">
                {label}
            </span>
        </div>
    );
};
