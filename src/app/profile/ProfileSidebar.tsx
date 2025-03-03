"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: "info", label: "MY INFORMATION" },
  { id: "orders", label: "MY ORDERS" },
  { id: "address", label: "ADDRESS BOOK" },
];

export default function ProfileSidebar({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (section: string) => void }) {
  

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <button
          type="button"
          key={item.id}
          onClick={() => {
            setActiveSection(item.id);
            // Find the corresponding section and scroll to it
            const section = document.getElementById(item.id);
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={cn(
            "flex w-full items-center justify-between py-3 text-sm font-medium border-b border-gray-200",
            activeSection === item.id ? "text-purple-800" : "text-gray-600 hover:text-purple-800"
          )}
        >
          <span>{item.label}</span>
          <span>▶</span>
        </button>
      ))}
    </nav>
  );
}