import { apiClient } from "@/shared/api/client";

import { RegisterRequest, SignRequest, Response } from "./types";

// 카카오 로그인 api
export const signWithKakao = async (
    credentials: SignRequest
): Promise<Response> => {
    return await apiClient.get<Response>("/social/callback/kakao", {
        params: credentials,
        headers: { skipAuth: true },
    });
};

// 구글 로그인 api
export const signWithGoogle = async (
    credentials: SignRequest
): Promise<Response> => {
    return await apiClient.get<Response>("/social/callback/google", {
        params: credentials,
        headers: { skipAuth: true },
    });
};

// 소셜 회원가입 api
export const register = async (
    credentials: RegisterRequest
): Promise<Response> => {
    const fromData = new FormData();
    Object.entries(credentials).forEach(([key, value]) => {
        fromData.append(key, value);
    });

    return await apiClient.postFormData<Response>("/api/user", fromData, {
        headers: { skipAuth: true },
    });
};
