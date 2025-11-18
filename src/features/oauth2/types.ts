// 로그인 req, res
export interface SignRequest {
    code: string;
}

export interface SignResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
}
