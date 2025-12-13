export const Footer = () => {
    return (
        <div className="bg-white">
            <div className="sm:block hidden">
                <div className="max-w-[1280px] m-[0_auto] py-[48px] flex justify-between items-end">
                    <div className="flex flex-col gap-[16px]">
                        <span className="font-p-medium text-[16px] text-gray-900">
                            덕덕쿵 ™
                        </span>

                        <div className="flex flex-col gap-[4px]">
                            <span className="font-p-regular text-[16px] text-gray-900">
                                <span className="font-p-medium">
                                    프론트엔드
                                </span>{" "}
                                · ICe1
                            </span>

                            <span className="font-p-regular text-[16px] text-gray-900">
                                <span className="font-p-medium">백엔드</span> ·
                                yeobaek
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[4px]">
                        <span className="font-p-regular text-[16px] text-gray-900 text-right">
                            <span className="font-p-medium">주소</span> · 자기
                            집
                        </span>

                        <span className="font-p-regular text-[16px] text-gray-900 text-right">
                            <span className="font-p-medium">이메일</span> ·
                            example@domain.com
                        </span>
                    </div>
                </div>
            </div>

            <div className="sm:hidden block">
                <div className="max-w-[1280px] m-[0_auto] py-[48px] flex justify-center items-center">
                    <span className="font-p-medium text-[16px] text-gray-900">
                        덕덕쿵 ™
                    </span>
                </div>
            </div>
        </div>
    );
};
