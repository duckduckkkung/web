"use client";

import { useState, useRef, useEffect } from "react";

interface PopoverProps {
    overlay: React.ReactNode;
    children: React.ReactNode;
}

export const Popover = ({ overlay, children }: PopoverProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node)
            ) {
                closePopover();
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closePopover();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscapeKey);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isOpen]);

    // 팝오버가 열릴 때 애니메이션 트리거
    useEffect(() => {
        if (isOpen) {
            // DOM에 추가된 후 애니메이션 시작
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, 10);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const openPopover = () => {
        setIsOpen(true);
        // isAnimating은 useEffect에서 처리
    };

    const closePopover = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsOpen(false);
        }, 200); // 애니메이션 지속 시간과 맞춤
    };

    const handleToggle = () => {
        if (isOpen) {
            closePopover();
        } else {
            openPopover();
        }
    };

    return (
        <div className="relative" ref={popoverRef}>
            <div onClick={handleToggle}>{children}</div>

            {isOpen && (
                <div
                    className={`absolute top-[100%] left-0 translate-y-[10px] bg-white border border-stone-200 rounded-[6px] overflow-hidden z-50 transition-all duration-200 ease-out transform-gpu ${
                        isAnimating
                            ? "opacity-100 scale-100 translate-y-[10px]"
                            : "opacity-0 scale-95 translate-y-[5px]"
                    }`}
                    style={{
                        transformOrigin: "top left",
                    }}
                    onClick={() => closePopover()}
                >
                    {overlay}
                </div>
            )}
        </div>
    );
};
