// 로그인 req
export interface SignRequest {
    code: string;
}

// 소셜 회원가입 req
export interface RegisterRequest {
    username: string;
    introduction: string;
    provider_name: string;
    oauth2_user_id: string;
    file: File;
}

// 공통 res
export interface Response {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
    kakaoId: string;
    email: string;
    file: string;
    type: "register" | "signin";
}
