import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Carrot, Leaf, UtensilsCrossed, Sparkles, Package } from "lucide-react";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

const iconMap: Record<string, React.ElementType> = {
  Carrot: Carrot,
  Leaf: Leaf,
  Utensils: UtensilsCrossed,
  Sparkles: Sparkles,
  Package: Package,
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = (category.iconName && iconMap[category.iconName]) || Leaf;

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-[#E1F2FB] hover:border-[#0BA8EA]/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      {/* Category Thumbnail Image */}
      <div className="relative w-full h-32 sm:h-36 bg-[#F1FAFE] overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Category Info */}
      <div className="p-3 sm:p-4 flex items-center gap-2 bg-white">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F1FAFE] text-[#0BA8EA] border border-[#E1F2FB] flex items-center justify-center shrink-0 group-hover:bg-[#0BA8EA] group-hover:text-white transition-colors duration-300">
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <h3 className="flex-1 text-xs sm:text-sm font-bold text-[#102A63] group-hover:text-[#0BA8EA] transition-colors leading-tight">
          {category.name}
        </h3>
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[#0BA8EA] shrink-0 group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>
    </Link>
  );
}
