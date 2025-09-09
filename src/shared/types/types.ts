export interface TypeFan {
    id: string;
    name: string;
    description: string;
    imageUrl: string[];
    isGoodsSiteExists: boolean;
    tags: string[];
}

export interface TypeGoods {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    fanName: string;
}

export interface TypeMoment {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    likeCount: number;
    commentCount: number;
    watchCount: number;
}
