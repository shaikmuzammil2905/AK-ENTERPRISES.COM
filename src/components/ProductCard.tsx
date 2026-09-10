"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { Product } from "@/types";
import { useInquiry } from "@/context/InquiryContext";

interface ProductCardProps {
  product: Product;
  horizontalOnMobile?: boolean;
}

const getBadgeStyle = (categorySlug: string) => {
  switch (categorySlug) {
    case "herbal-powders":
      return "bg-[#0d8276] text-white";
    case "dehydrated-vegetables":
      return "bg-[#0BA8EA] text-white";
    case "masala-powders":
      return "bg-[#D97706] text-white";
    case "natural-powders":
      return "bg-[#6366F1] text-white";
    default:
      return "bg-[#102A63] text-white";
  }
};

export default function ProductCard({ product, horizontalOnMobile = false }: ProductCardProps) {
  const { openInquiry } = useInquiry();
  const badgeStyle = getBadgeStyle(product.categorySlug);

  if (horizontalOnMobile) {
    return (
      <div className="group bg-white rounded-2xl border border-[#E1F2FB] hover:border-[#0BA8EA]/40 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col md:flex-col justify-between">
        {/* On mobile horizontal, on md+ vertical */}
        <div className="flex flex-col sm:flex-row md:flex-col">
          {/* Image */}
          <div className="relative w-full sm:w-1/2 md:w-full aspect-16/10 bg-[#F1FAFE] p-3 flex items-center justify-center shrink-0">
            <span
              className={`absolute top-3 left-3 z-10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-xs ${badgeStyle}`}
            >
              {product.category}
            </span>
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-contain group-hover:scale-104 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg md:text-base font-bold text-[#102A63] mb-1 group-hover:text-[#0BA8EA] transition-colors">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                {product.shortDescription}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-col md:grid md:grid-cols-2 gap-2 mt-auto">
              <Link
                href={`/products/${product.slug}`}
                className="w-full py-2.5 md:py-2 px-3 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <span>View Product</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => openInquiry(product)}
                className="w-full py-2.5 md:py-2 px-3 bg-white hover:bg-[#F1FAFE] border border-[#0BA8EA] text-[#0BA8EA] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl border border-[#E1F2FB] hover:border-[#0BA8EA]/40 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image Box */}
        <div className="relative w-full aspect-16/10 bg-[#F1FAFE] overflow-hidden p-3 flex items-center justify-center">
          <span
            className={`absolute top-3 left-3 z-10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-xs ${badgeStyle}`}
          >
            {product.category}
          </span>
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain group-hover:scale-104 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Content Box */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base font-bold text-[#102A63] mb-1.5 group-hover:text-[#0BA8EA] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
        <Link
          href={`/products/${product.slug}`}
          className="w-full py-2 px-2.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors text-center"
        >
          <span>View Product</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
        <button
          type="button"
          onClick={() => openInquiry(product)}
          className="w-full py-2 px-2.5 bg-white hover:bg-[#F1FAFE] border border-[#0BA8EA] text-[#0BA8EA] text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer text-center"
        >
          <Mail className="w-3 h-3" />
          <span>Send Inquiry</span>
        </button>
      </div>
    </div>
  );
}
