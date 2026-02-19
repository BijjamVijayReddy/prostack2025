"use client";

import { ReactNode } from "react";
import { useLayout } from "./LayoutContext";

interface AppHeaderProps {
  rightSlot?: ReactNode;
}

export function AppHeader({ rightSlot }: AppHeaderProps) {
  const { active } = useLayout();

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      {/* Left */}
      <div>
        <p className="text-sm text-gray-500 capitalize">{active}</p>
        <h1 className="text-2xl font-semibold">
          {active === "dashboard" ? "Dashboard" : active}
        </h1>
      </div>

      {/* Right (Injected from page/layout) */}
      <div className="flex items-center gap-4">
        {rightSlot}

        {/* User */}
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-gray-400" />
          <div className="text-sm">
            <p className="font-medium">Raziyoddin Shaik</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
