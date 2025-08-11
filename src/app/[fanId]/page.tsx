import { Header } from "@/shared/components/header";

export default function Fan() {
    const fan = {
        id: "1",
        name: "송하영",
        description:
            "작고귀엽고사랑스럽고노래도너무잘부르고춤도잘추는레전드송하영사랑꾼들의모임",
        imageUrl: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk1q1Fk5medS__SP2mw9fwJLICbzwo5_UpsA&s",
        ],
        communityCount: 7,
        isGoodsSiteExists: false,
    };

    return (
        <div>
            <Header />

            <div className="max-w-[1280px] m-[0_auto]"></div>
        </div>
    );
}
