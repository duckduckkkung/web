import { useRef, useEffect, useState } from "react";

interface TabProps {
    options: string[];
    tab: string;
    onChange: (newTab: string, direction: number) => void;
}

export const Tab = ({ options, tab, onChange }: TabProps) => {
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const getTabIndex = (tabName: string) => {
        return options.indexOf(tabName);
    };

    const handleTabClick = (newTab: string) => {
        const currentIndex = getTabIndex(tab);
        const newIndex = getTabIndex(newTab);
        const direction = newIndex > currentIndex ? 1 : -1;
        onChange(newTab, direction);
    };

    useEffect(() => {
        const activeTabRef = tabRefs.current[tab];
        if (activeTabRef) {
            setIndicatorStyle({
                width: activeTabRef.offsetWidth,
                left: activeTabRef.offsetLeft,
            });
        }
    }, [tab]);

    return (
        <div className="relative flex">
            {options.map((option) => (
                <div
                    key={option}
                    ref={(el) => {
                        tabRefs.current[option] = el;
                    }}
                    className={`shrink-0 w-fit p-[8px_12px] flex justify-center items-center border-b border-b-gray-300 transition-all duration-[.1s] cursor-pointer group`}
                    onClick={() => handleTabClick(option)}
                >
                    <span
                        className={`text-[16px] transition-all duration-[.1s] ${
                            option === tab
                                ? "font-p-medium text-gray-900"
                                : "font-p-regular text-gray-400"
                        }`}
                    >
                        {option}
                    </span>
                </div>
            ))}

            <div className="w-full p-[8px_12px] border-b border-b-gray-300" />

            <div
                className="absolute bottom-0 h-[2px] bg-gray-900 transition-all duration-300 ease-in-out"
                style={{
                    width: `${indicatorStyle.width}px`,
                    left: `${indicatorStyle.left}px`,
                }}
            />
        </div>
    );
};
