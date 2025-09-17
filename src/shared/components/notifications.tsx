import { CassetteTapeIcon, ScanBarcodeIcon, XIcon } from "lucide-react";

interface NotificationsProps {}

export const Notifications = ({}: NotificationsProps) => {
    return (
        <div className="fixed right-[36px] bottom-[36px]">
            <div className="bg-white border border-stone-200 rounded-[8px] p-[16px] flex flex-col gap-[16px]">
                <div className="flex-1 flex flex-col gap-[2px]">
                    <span className="font-p-semibold text-[14px] text-stone-900">
                        새 굿즈 도착
                    </span>

                    <div className="flex items-center flex-wrap gap-[6px]">
                        <span className="font-p-medium text-[14px] text-stone-600">
                            고서온님을 위한 새
                        </span>

                        <div className="w-fit p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                            <CassetteTapeIcon
                                size={12}
                                className="stroke-stone-900"
                            />

                            <span className="font-p-regular text-[14px] text-stone-900">
                                송하영
                            </span>
                        </div>

                        <span className="font-p-medium text-[14px] text-stone-600">
                            굿즈가 도착했어요.
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="w-fit p-[4px_8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                        <ScanBarcodeIcon
                            size={12}
                            className="stroke-stone-900"
                        />

                        <span className="font-p-regular text-[14px] text-stone-900">
                            2025 명지대 프로미스나인 응원봉
                        </span>
                    </div>

                    <div className="shrink-0 w-fit p-[8px] flex items-center gap-[4px] hover:bg-stone-100 rounded-[8px] cursor-pointer transition-all duration-[.1s]">
                        <XIcon size={12} className="stroke-stone-900" />
                    </div>
                </div>
            </div>
        </div>
    );
};
