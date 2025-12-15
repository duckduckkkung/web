import { DefaultResponse } from "@/shared/api/types";
import { apiClient } from "@/shared/api/client";

import { ShortInfoResponse } from "./types";

// 기본 정보 api
export const getShortInfo = async (): Promise<
    DefaultResponse<ShortInfoResponse>
> => {
    return await apiClient.get<DefaultResponse<ShortInfoResponse>>("/api/auth");
};
