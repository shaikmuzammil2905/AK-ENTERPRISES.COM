"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";

export default function Hero() {
  const { openInquiry } = useInquiry();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F1FAFE] via-[#f7fcff] to-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                DEHYDRATED PRODUCTS | FOOD INGREDIENTS | GLOBAL EXPORT SUPPLY
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#102A63] tracking-tight leading-[1.15] mb-5">
              Premium Dehydrated <br className="hidden sm:inline" />
              <span className="text-[#102A63]">Food Ingredients</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed max-w-xl mb-8">
              We supply high-quality dehydrated vegetables, herbs, masala powders and natural powders for global markets.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button
                type="button"
                onClick={() => openInquiry()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#F1FAFE] border border-[#0BA8EA] text-[#0BA8EA] text-sm font-semibold rounded-lg shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl sm:max-w-2xl aspect-16/10 lg:aspect-4/3 rounded-2xl overflow-hidden shadow-xs">
              <Image
                src="/images/hero-ingredients.png"
                alt="Dehydrated vegetables, herbs, masala powders, and natural ingredients"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center scale-100 hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
