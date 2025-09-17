"use client";

import { Popover } from "./popover";

export function ContributionGraph() {
    const now = new Date();
    const currentDate = now.getDate();

    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const getDayDate = (weekIndex: number, dayIndex: number) => {
        const date = new Date(now);
        date.setDate(currentDate - (51 - weekIndex) * 7 + dayIndex);
        return date;
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
        const weekday = weekdays[date.getDay()];

        return `${month} / ${day} / ${year} ${weekday}요일`;
    };

    return (
        <div className="py-[24px]">
            <div className="w-full h-fit flex gap-[4px]">
                {Array(52)
                    .fill(0)
                    .map((_, weekIndex) => (
                        <div
                            key={`week-${weekIndex}`}
                            className="flex flex-col gap-[4px]"
                        >
                            {weekdays.map((_, dayIndex) => {
                                const colors = [
                                    "bg-slate-100",
                                    "bg-slate-100",
                                    "bg-slate-100",
                                    "bg-slate-100",
                                    "bg-slate-100",
                                    "bg-slate-100",
                                    "bg-slate-200",
                                    "bg-slate-200",
                                    "bg-slate-200",
                                    "bg-slate-200",
                                    "bg-slate-200",
                                    "bg-slate-300",
                                    "bg-slate-300",
                                    "bg-slate-300",
                                    "bg-slate-300",
                                    "bg-slate-400",
                                    "bg-slate-400",
                                    "bg-slate-400",
                                    "bg-slate-500",
                                    "bg-slate-500",
                                    "bg-slate-600",
                                    "bg-slate-700",
                                    "bg-slate-800",
                                    "bg-slate-900",
                                ];

                                const color =
                                    colors[
                                        Math.floor(
                                            Math.random() * colors.length
                                        )
                                    ];

                                const dayDate = getDayDate(weekIndex, dayIndex);
                                const formattedDate = formatDate(dayDate);

                                return (
                                    <Popover
                                        key={`day-${weekIndex}-${dayIndex}`}
                                        overlay={
                                            <div className="w-[180px] p-3 font-p-medium text-[14px] text-stone-900">
                                                {formattedDate}
                                            </div>
                                        }
                                    >
                                        <div
                                            className={`w-[16px] h-[16px] rounded-[2px] cursor-pointer hover:opacity-80 transition-opacity ${color}`}
                                        />
                                    </Popover>
                                );
                            })}
                        </div>
                    ))}
            </div>
        </div>
    );
}
