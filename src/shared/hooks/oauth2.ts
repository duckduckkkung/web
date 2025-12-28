import { useQuery } from "@tanstack/react-query";

import { getGuestInfo, GuestInfoRequest } from "@ice1/api-client";

// 게스트 토큰 정보 query
export const useGuestInfo = (credentials: GuestInfoRequest) => {
    return useQuery({
        queryKey: ["guest"],
        queryFn: async () => await getGuestInfo(credentials),
        retry: false,
        refetchOnWindowFocus: false,
    });
};
