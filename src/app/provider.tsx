"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Notifications } from "@/shared/components/notifications";

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Notifications />

            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </>
    );
};
