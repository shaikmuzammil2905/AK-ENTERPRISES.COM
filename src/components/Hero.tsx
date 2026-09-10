"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";

export default function Hero() {
  const { openInquiry } = useInquiry();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f4fd] via-[#f0f8ff] to-white">
      {/* Desktop Hero — Full-width background image with animated subtle zoom */}
      <div className="hidden md:block relative w-full">
        <div className="relative w-full" style={{ aspectRatio: "1568 / 620" }}>
          <Image
            src="/images/hero-bg.png"
            alt="Premium dehydrated vegetables, herbs, masala powders, and natural ingredients – AK Enterprises"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center animate-[heroZoom_20s_ease-in-out_infinite_alternate]"
          />
        </div>
      </div>

      {/* Mobile Hero — Content + image below, matching mobile reference */}
      <div className="md:hidden pt-6 pb-4 px-4">
        <div className="mb-5">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
            <span className="text-[10px] sm:text-xs font-bold tracking-wider text-[#0BA8EA] uppercase leading-tight">
              DEHYDRATED PRODUCTS | FOOD INGREDIENTS | IMPORT & EXPORT
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-[1.75rem] sm:text-3xl font-extrabold text-[#102A63] tracking-tight leading-[1.15] mb-3">
            Premium Dehydrated<br />
            <span className="text-[#0BA8EA]">Food Ingredients</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-[#4A5568] leading-relaxed mb-5">
            Explore our range of dehydrated vegetables, herbal powders, masala powders and natural food ingredients for B2B supply and export/import requirements.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-sm font-semibold rounded-lg shadow-sm transition-all group"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={() => openInquiry()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#F1FAFE] border border-[#0BA8EA] text-[#0BA8EA] text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send Inquiry</span>
            </button>
          </div>
        </div>

        {/* Mobile Hero Image — full-width, matching mobile reference */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden -mx-4 px-0" style={{ width: "calc(100% + 2rem)" }}>
          <Image
            src="/images/hero-bg.png"
            alt="Premium dehydrated food ingredients – AK Enterprises"
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>

      {/* Hero zoom animation */}
      <style jsx global>{`
        @keyframes heroZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.04);
          }
        }
      `}</style>
    </section>
  );
}
