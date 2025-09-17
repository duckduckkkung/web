import { Notifications } from "@/shared/components/notifications";

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Notifications />
            {children}
        </>
    );
};
