"use client";

import React from "react";
import { categories } from "@/data/categories";

interface ProductFilterProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export default function ProductFilter({
  selectedCategory,
  onSelectCategory,
}: ProductFilterProps) {
  const filterOptions = [
    { slug: "all", name: "ALL" },
    ...categories.map((c) => ({
      slug: c.slug,
      name: c.name.toUpperCase(),
    })),
  ];

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 sm:gap-3 flex-nowrap min-w-max">
        {filterOptions.map((item) => {
          const isSelected = selectedCategory === item.slug;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => onSelectCategory(item.slug)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-[#0BA8EA] text-white shadow-md shadow-[#0BA8EA]/25"
                  : "bg-[#F1FAFE] text-[#102A63] hover:bg-[#e2f4fc] border border-[#E1F2FB]"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
