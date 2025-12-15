import { apiClient } from "@/shared/api/client";

import { ShortInfoResponse } from "./types";

// 기본 정보 api
export const getShortInfo = async (): Promise<ShortInfoResponse> => {
    return await apiClient.get<ShortInfoResponse>("/api/auth");
};
