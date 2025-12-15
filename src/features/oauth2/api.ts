import { apiClient } from "@/shared/api/client";

import {
    RegisterRequest,
    SocialLoginRequest,
    SocialLoginResponse,
} from "./types";

// 카카오 로그인 api
export const signWithKakao = async (
    credentials: SocialLoginRequest
): Promise<SocialLoginResponse> => {
    return await apiClient.get<SocialLoginResponse>("/social/callback/kakao", {
        params: credentials,
        headers: { skipAuth: true },
    });
};

// 구글 로그인 api
export const signWithGoogle = async (
    credentials: SocialLoginRequest
): Promise<SocialLoginResponse> => {
    return await apiClient.get<SocialLoginResponse>("/social/callback/google", {
        params: credentials,
        headers: { skipAuth: true },
    });
};

// 소셜 회원가입 api
export const register = async (
    credentials: RegisterRequest
): Promise<SocialLoginResponse> => {
    const formData = new FormData();
    Object.entries(credentials).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return await apiClient.postFormData<SocialLoginResponse>(
        "/api/auth",
        formData,
        {
            headers: { skipAuth: true },
        }
    );
};
