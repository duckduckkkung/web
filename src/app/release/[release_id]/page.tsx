import { ReleaseHeader } from "@/shared/components/release-header";
import { Footer } from "@/shared/components/footer";

export default function Release() {
    return (
        <div>
            <ReleaseHeader />

            <div className="max-w-[1280px] m-[0_auto] py-[96px] flex flex-col gap-[64px]">
                <div className="flex flex-col gap-[8px]">
                    <span className="font-p-semibold text-[24px] text-gray-900">
                        이번주 업데이트 안내
                    </span>

                    <span className="font-p-medium text-[16px] text-gray-900">
                        최신 릴리즈 · v1
                    </span>
                </div>

                <div className="flex flex-col gap-[8px]">
                    <span className="font-p-mj text-[18px] text-gray-900">
                        안녕하세요! <u>2025년 새해</u>가 밝았네요.
                    </span>

                    <span className="font-p-mj text-[18px] text-gray-900">
                        송하영 커뮤니티를 방문해 주신 분들에게 정말 감사하다는
                        말씀 드리고 싶습니다.
                    </span>

                    <br />

                    <span className="font-p-mj text-[18px] text-gray-900">
                        📌 규칙
                    </span>

                    <span className="font-p-mj text-[18px] text-gray-900">
                        - 타 인물 언급하지 않기
                    </span>

                    <span className="font-p-mj text-[18px] text-gray-900">
                        - 기본 대화 에티켓 지키기
                    </span>

                    <span className="font-p-mj text-[18px] text-gray-900">
                        - 오프라인 만남 자제하기
                    </span>

                    <span className="font-p-mj text-[18px] text-gray-900">
                        - 송하영 사랑하기
                    </span>

                    <br />

                    <span className="font-p-mj text-[18px] text-gray-900">
                        읽어주셔서 감사합니다! 활기찬 새해 되세요 ;)
                    </span>
                </div>
            </div>

            <Footer />
        </div>
    );
}
