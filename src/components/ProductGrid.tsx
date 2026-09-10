import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  horizontalOnMobile?: boolean;
}

export default function ProductGrid({
  products,
  emptyMessage = "No products found in this category.",
  horizontalOnMobile = false,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-[#F1FAFE] rounded-2xl border border-[#E1F2FB]">
        <p className="text-gray-500 text-sm font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          horizontalOnMobile={horizontalOnMobile}
        />
      ))}
    </div>
  );
}
