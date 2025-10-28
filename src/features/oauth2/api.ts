import { apiClient } from "@/shared/api/client";

import { SignWithKakaoRequest, SignWithKakaoResponse } from "./types";

// 카카오 로그인 api
export const signWithKakao = async (
    credentials: SignWithKakaoRequest
): Promise<SignWithKakaoResponse> => {
    return await apiClient.get<SignWithKakaoResponse>(
        "/social/callback/kakao",
        {
            params: credentials,
            headers: { skipAuth: true },
        }
    );
};
