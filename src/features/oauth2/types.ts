// 일반 로그인
export interface SocialLogin {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
}

// 소셜 로그인 req, res
export interface SocialLoginRequest {
    code: string;
}

export interface SocialLoginResponse extends SocialLogin {
    type: "register" | "signin";
    token: string;
}

// 소셜 회원가입 req
export interface RegisterRequest {
    username: string;
    introduction: string;
    provider_name: string;
    token: string;
    file: File;
}
