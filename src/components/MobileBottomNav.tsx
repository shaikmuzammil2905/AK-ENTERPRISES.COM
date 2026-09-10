"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, FileText, Plane, Mail } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Products", href: "/products", icon: LayoutGrid },
    { label: "About Us", href: "/about", icon: FileText },
    { label: "Export / Supply", href: "/export-supply", icon: Plane },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg px-2 py-1.5 flex items-center justify-around"
      aria-label="Mobile Bottom Navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2 relative transition-colors ${
              isActive ? "text-[#0BA8EA]" : "text-gray-500 hover:text-[#102A63]"
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">{item.label}</span>
            {isActive && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-[#0BA8EA] rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
