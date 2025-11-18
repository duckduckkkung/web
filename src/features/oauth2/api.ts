import { apiClient } from "@/shared/api/client";

import { SignRequest, SignResponse } from "./types";

// 카카오 로그인 api
export const signWithKakao = async (
    credentials: SignRequest
): Promise<SignResponse> => {
    return await apiClient.get<SignResponse>("/social/callback/kakao", {
        params: credentials,
        headers: { skipAuth: true },
    });
};

// 구글 로그인 api
export const signWithGoogle = async (
    credentials: SignRequest
): Promise<SignResponse> => {
    return await apiClient.get<SignResponse>("/social/callback/google", {
        params: credentials,
        headers: { skipAuth: true },
    });
};
