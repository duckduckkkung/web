"use client";

import { useState, useRef, useEffect } from "react";

interface PopoverProps {
    overlay: React.ReactNode;
    children: React.ReactNode;
}

export const Popover = ({ overlay, children }: PopoverProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [position, setPosition] = useState<{
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    }>({});
    const popoverRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

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

    // 팝오버 위치 계산 및 애니메이션 트리거
    useEffect(() => {
        if (isOpen && popoverRef.current && overlayRef.current) {
            const calculatePosition = () => {
                const trigger = popoverRef.current;
                const overlay = overlayRef.current;
                if (!trigger || !overlay) return;

                const triggerRect = trigger.getBoundingClientRect();
                const overlayRect = overlay.getBoundingClientRect();
                const viewport = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                };

                const newPosition: {
                    top?: string;
                    bottom?: string;
                    left?: string;
                    right?: string;
                } = {};

                // 수직 위치 계산 (위 또는 아래)
                const spaceBelow = viewport.height - triggerRect.bottom;
                const spaceAbove = triggerRect.top;

                if (
                    spaceBelow >= overlayRect.height ||
                    spaceBelow >= spaceAbove
                ) {
                    // 아래쪽에 배치
                    newPosition.top = "100%";
                } else {
                    // 위쪽에 배치
                    newPosition.bottom = "100%";
                }

                // 수평 위치 계산 (패딩 10px 고려)
                const padding = 120;
                const spaceRight = viewport.width - triggerRect.left - padding;
                const spaceLeft = triggerRect.right - padding;

                if (spaceRight >= overlayRect.width) {
                    // 왼쪽 정렬 (충분한 공간)
                    newPosition.left = "0";
                } else if (spaceLeft >= overlayRect.width) {
                    // 오른쪽 정렬 (충분한 공간)
                    newPosition.right = "0";
                } else {
                    // 화면보다 큰 경우 또는 양쪽 공간 부족한 경우
                    const centerPosition =
                        triggerRect.left + triggerRect.width / 2;
                    const halfOverlayWidth = overlayRect.width / 2;

                    if (centerPosition - halfOverlayWidth < padding) {
                        // 왼쪽으로 벗어나는 경우
                        newPosition.left = "0";
                    } else if (
                        centerPosition + halfOverlayWidth >
                        viewport.width - padding
                    ) {
                        // 오른쪽으로 벗어나는 경우
                        newPosition.right = "0";
                    } else {
                        // 중앙 정렬 가능
                        newPosition.left = "50%";
                    }
                }

                setPosition(newPosition);
            };

            // DOM에 추가된 후 위치 계산
            const timer = setTimeout(() => {
                calculatePosition();
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
            setPosition({});
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
                    ref={overlayRef}
                    className={`absolute bg-white border border-gray-200 rounded-[6px] overflow-hidden z-50 transition-all duration-200 ease-out transform-gpu ${
                        isAnimating
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95"
                    }`}
                    style={{
                        ...position,
                        transform:
                            position.left === "50%"
                                ? "translateX(-50%)"
                                : undefined,
                        marginTop: position.top ? "10px" : undefined,
                        marginBottom: position.bottom ? "10px" : undefined,
                        transformOrigin: position.bottom ? "bottom" : "top",
                        maxWidth: "calc(100vw - 20px)",
                        maxHeight: "calc(100vh - 40px)",
                    }}
                >
                    {overlay}
                </div>
            )}
        </div>
    );
};
