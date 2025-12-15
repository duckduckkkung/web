import { useQuery } from "@tanstack/react-query";

import { getShortInfo } from "./api";

// 기본 정보 query
export const useShortInfo = () => {
    return useQuery({
        queryKey: ["user.short"],
        queryFn: async () => await getShortInfo(),
        retry: false,
        refetchOnWindowFocus: false,
    });
};
