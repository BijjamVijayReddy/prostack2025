"use client";

import { ReactNode, useEffect, useState } from "react";
import { useLayout } from "./LayoutContext";

interface AppHeaderProps {
  rightSlot?: ReactNode;
}

export function AppHeader({ rightSlot }: AppHeaderProps) {
  const { active } = useLayout();

  const userName = "Narshima Koncha";
  const role = "Admin";
  const firstLetter = userName.charAt(0).toUpperCase();

  const [time, setTime] = useState({
    date: "",
    clock: "",
    period: "",
  });

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const formatted = formatter.format(now);
      const [datePart, timePart] = formatted.split(", ");
      const [clock, period] = timePart.split(" ");

      setTime({
        date: datePart,
        clock,
        period: period.toUpperCase(),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <div>
        <h1 className="text-2xl font-semibold">
          {capitalize(active === "dashboard" ? "dashboard" : active)}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {rightSlot}

        <div className="flex items-center gap-3 rounded-xl bg-gray-100 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-lg font-semibold text-white shadow">
            {firstLetter}
          </div>

          <div className="text-sm leading-tight">
            <p className="font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{role}</p>

            <div className="mt-0.5 flex items-center gap-1 text-xs">
              <span className="text-orange-600 font-medium">
                {time.clock}
              </span>
              <span className="text-orange-600 font-semibold">
                {time.period}
              </span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">
                {time.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
