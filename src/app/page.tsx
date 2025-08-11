import { FanCard } from "@/shared/components/fan-card";
import { Header } from "@/shared/components/header";

export default function Home() {
    const fans = [
        {
            id: "1",
            name: "송하영",
            description:
                "작고귀엽고사랑스럽고노래도너무잘부르고춤도잘추는레전드송하영사랑꾼들의모임",
            imageUrl: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk1q1Fk5medS__SP2mw9fwJLICbzwo5_UpsA&s",
            ],
            communityCount: 7,
            isGoodsSiteExists: false,
        },
        {
            id: "2",
            name: "릴파",
            description: "내첫사랑",
            imageUrl: [
                "https://yt3.googleusercontent.com/ZqC92CDGtM19mufhDBXEUixTQ0wkzjONrhZqVJBfLiRYEaRhXfilzJX8w7Sn6K9yU8g5iETX=s900-c-k-c0x00ffffff-no-rj",
            ],
            communityCount: 4,
            isGoodsSiteExists: true,
        },
        {
            id: "3",
            name: "봇치 더 록!",
            description: "내 아내 니지카 사랑해",
            imageUrl: [
                "https://i.namu.wiki/i/YiPDD_HksgrHwFI4iQSQ_ASpLO0RF2uat67-N3yelFBFqKyAp7kfPmF0xa-3o3_Vkx0lwpTYvsMhBAGbnhJP_A.webp",
            ],
            communityCount: 5,
            isGoodsSiteExists: false,
        },
        {
            id: "4",
            name: "심영",
            description: "내가 고자라니 ㅠㅠ",
            imageUrl: [
                "https://i.namu.wiki/i/BsXbPLjSFVBupEyhtSBPQM2aZZ9dfnXUtgDAHwrsbAcL4U4e2S8a48wz9bz4RnOg5-M2R06zOcQpf57HxvmE4g.webp",
            ],
            communityCount: 19,
            isGoodsSiteExists: true,
        },
        {
            id: "5",
            name: "귀멸의 칼날",
            description: "엄",
            imageUrl: [
                "https://an2-img.amz.wtchn.net/image/v2/164OpIZTbqcYBKolTKXHbQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1KbklsMHNJbkFpT2lJdmRqSXZjM1J2Y21VdmFXMWhaMlV2TVRZeE5UZzNOamd4TmpNeU5qRXpORFE0T1NKOS5uRERMQV9XN2VRd3NHd2lBT0o1NnY2M3UxeTduR1FKeS1iY1JVVTlIZVJ3",
            ],
            communityCount: 24,
            isGoodsSiteExists: true,
        },
        {
            id: "6",
            name: "주술회전",
            description: "영역 전개",
            imageUrl: [
                "https://www.wishbucket.io/_next/image?url=https%3A%2F%2Fshop-phinf.pstatic.net%2F20230805_93%2F1691163745442HIYcl_JPEG%2F2798572255786923_162918491.jpg&w=1080&q=75",
            ],
            communityCount: 49,
            isGoodsSiteExists: false,
        },
        {
            id: "7",
            name: "그 비스크 돌은 사랑을 한다",
            description:
                "키타가와마린그녀는너무빛이나내가죽을거같아어떡해누나날가져요엉엉",
            imageUrl: [
                "https://mblogthumb-phinf.pstatic.net/MjAyMjAzMjlfMTAg/MDAxNjQ4NTU1MjIxMTM3.Wb1JRp43shYEi1X_0Q5B5mxqdnST9ov3mM_-0hBXxbYg.VENxCbTLjpz8roiXMgOFQ7mfO9fjbp_1Jk5o7_-pLfMg.JPEG.lara46/6ec33251fd64ffcf369d95fa10ddaed4dc4dc06e.jpg?type=w800",
            ],
            communityCount: 18,
            isGoodsSiteExists: true,
        },
        {
            id: "8",
            name: "장난을 잘치는 타카기양",
            description: "이 요오오오망한년",
            imageUrl: [
                "https://i.namu.wiki/i/En-boea9D8WfC0F7pRYgcvZG1Pz5QRjlbKlzs4vdLHl3od6o81PrjJ9DqczG40Z95TFdLUSZtOIajRHWsyeCjw.webp",
            ],
            communityCount: 8,
            isGoodsSiteExists: false,
        },
    ];

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] m-[0_auto] py-[48px] flex flex-col gap-[24px]">
                <span className="font-p-semibold text-[20px] text-stone-900">
                    🔥 지금 인기있는 덕질
                </span>

                <div className="grid grid-cols-4 gap-[32px]">
                    {fans.map((fan) => (
                        <FanCard key={fan.name} data={fan} />
                    ))}
                </div>
            </div>
        </div>
    );
}
