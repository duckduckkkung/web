import { FanCard } from "@/shared/components/fan-card";
import { Header } from "@/shared/components/header";

import { fans } from "@/mocks/fans";

export default function Fans() {
    return (
        <div>
            <Header />

            <div className="max-w-[1280px] m-[0_auto] py-[48px] flex flex-col gap-[24px]">
                <span className="font-p-semibold text-[20px] text-stone-900">
                    🔥 지금 인기있는 덕질
                </span>

                <div className="grid grid-cols-4 gap-[32px]">
                    {fans.map((fan) => (
                        <FanCard key={fan.id} data={fan} />
                    ))}
                </div>
            </div>
        </div>
    );
}
