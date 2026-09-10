"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";

export default function Hero() {
  const { openInquiry } = useInquiry();

  return (
    <section className="relative overflow-hidden bg-[#e8f4fd]">

      {/* ─── DESKTOP HERO (hidden on mobile) ─── */}
      <div className="hidden md:block relative w-full" style={{ aspectRatio: "1568 / 620" }}>
        {/* Background Image with slow zoom animation */}
        <Image
          src="/images/hero-bg.png"
          alt="Premium dehydrated vegetables, herbs, masala powders and natural ingredients – AK Enterprises"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ animation: "heroZoom 20s ease-in-out infinite alternate" }}
        />

        {/* Overlay: text + buttons on left half */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-[52%]">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-4">
                <span className="h-0.5 w-8 bg-[#0BA8EA] rounded-full" />
                <span className="text-xs font-bold tracking-widest text-[#102A63] uppercase">
                  DEHYDRATED PRODUCTS | FOOD INGREDIENTS | IMPORT &amp; EXPORT
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl xl:text-5xl 2xl:text-[3.25rem] font-extrabold text-[#102A63] tracking-tight leading-[1.12] mb-4">
                Premium Dehydrated
                <br />
                <span className="text-[#0BA8EA]">Food Ingredients</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm xl:text-base text-[#4A5568] leading-relaxed mb-7 max-w-lg">
                Explore our range of dehydrated vegetables, herbal powders,
                masala powders and natural food ingredients for B2B supply and
                export/import requirements.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => openInquiry()}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-white/80 hover:bg-white border border-[#0BA8EA] text-[#0BA8EA] text-sm font-bold rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer backdrop-blur-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE HERO (hidden on md+) ─── */}
      <div className="block md:hidden">
        {/* Text content */}
        <div className="px-4 pt-6 pb-4">
          {/* Eyebrow */}
          <div className="flex items-start gap-2 mb-3">
            <span className="h-0.5 w-5 bg-[#0BA8EA] rounded-full mt-[9px] shrink-0" />
            <span className="text-[10px] font-bold tracking-wider text-[#0BA8EA] uppercase leading-snug">
              DEHYDRATED PRODUCTS | FOOD INGREDIENTS | IMPORT &amp; EXPORT
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[1.85rem] font-extrabold text-[#102A63] tracking-tight leading-[1.15] mb-3">
            Premium Dehydrated
            <br />
            <span className="text-[#0BA8EA]">Food Ingredients</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-[#4A5568] leading-relaxed mb-5">
            Explore our range of dehydrated vegetables, herbal powders, masala
            powders and natural food ingredients for B2B supply and
            export/import requirements.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 mb-5">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-sm font-bold rounded-full shadow-md transition-all group"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={() => openInquiry()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-[#F1FAFE] border border-[#0BA8EA] text-[#0BA8EA] text-sm font-bold rounded-full shadow-sm transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send Inquiry</span>
            </button>
          </div>
        </div>

        {/* Full-width hero image */}
        <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
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

    </section>
  );
}
