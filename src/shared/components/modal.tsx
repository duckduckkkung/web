import { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
            document.body.style.overflow = "hidden";
        } else {
            setIsAnimating(false);
            setTimeout(() => setIsVisible(false), 200);
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, setIsOpen]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className={`z-50 fixed inset-0 w-full h-full flex justify-center items-center transition-opacity duration-200 ${
                isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`absolute inset-0 w-full h-full bg-stone-900/64 transition-opacity duration-200 ${
                    isAnimating ? "opacity-100" : "opacity-0"
                }`}
                onClick={handleBackdropClick}
            />

            <div
                className={`transform transition-all duration-200 ease-out ${
                    isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                {children}
            </div>
        </div>
    );
};
