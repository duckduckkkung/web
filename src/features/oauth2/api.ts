import { DefaultResponse } from "@/shared/api/types";
import { apiClient } from "@/shared/api/client";

import {
    GuestInfoRequest,
    GuestInfoRespone,
    RegisterRequest,
    SendOtpRequest,
    SocialLoginRequest,
    SocialLoginResponse,
    VerifyOtpRequest,
} from "./types";

// 카카오 로그인 api
export const signWithKakao = async (
    credentials: SocialLoginRequest
): DefaultResponse<SocialLoginResponse> => {
    return await apiClient.get<DefaultResponse<SocialLoginResponse>>(
        "/social/callback/kakao",
        {
            params: credentials,
            headers: { skipAuth: true },
        }
    );
};

// 구글 로그인 api
export const signWithGoogle = async (
    credentials: SocialLoginRequest
): DefaultResponse<SocialLoginResponse> => {
    return await apiClient.get<DefaultResponse<SocialLoginResponse>>(
        "/social/callback/google",
        {
            params: credentials,
            headers: { skipAuth: true },
        }
    );
};

// 소셜 회원가입 api
export const register = async (
    credentials: RegisterRequest
): DefaultResponse<SocialLoginResponse> => {
    const formData = new FormData();
    Object.entries(credentials).forEach(([key, value]) => {
        if (value) formData.append(key, value);
    });

    return await apiClient.postFormData<DefaultResponse<SocialLoginResponse>>(
        "/api/user",
        formData,
        {
            headers: { skipAuth: true },
        }
    );
};

// 인증번호 전송 api
export const sendOtp = async (
    credentials: SendOtpRequest
): DefaultResponse<{ result: boolean }> => {
    return await apiClient.post<DefaultResponse<{ result: boolean }>>(
        "/api/user/authorize",
        credentials,
        {
            headers: { skipAuth: true },
        }
    );
};

// 인증번호 검증 api
export const verifyOtp = async (
    credentials: VerifyOtpRequest
): DefaultResponse<{ result: boolean }> => {
    return await apiClient.post<DefaultResponse<{ result: boolean }>>(
        "/api/user/authorize/verify",
        credentials,
        {
            headers: { skipAuth: true },
        }
    );
};

// 게스트 토큰 정보 api
export const getGuestInfo = async (
    credentials: GuestInfoRequest
): DefaultResponse<GuestInfoRespone> => {
    return await apiClient.get<DefaultResponse<GuestInfoRespone>>(
        `/api/user/guest/${credentials.provider}?token=${encodeURIComponent(
            credentials.token
        )}`,
        {
            headers: { skipAuth: true },
        }
    );
};
