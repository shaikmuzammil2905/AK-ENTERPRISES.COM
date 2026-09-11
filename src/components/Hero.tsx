"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { HeroContent } from "@/types";
import { getSiteContent } from "@/lib/db";

interface HeroProps {
  initialContent?: HeroContent;
}

export default function Hero({ initialContent }: HeroProps) {
  const { openInquiry } = useInquiry();
  const [content, setContent] = useState<HeroContent>(
    initialContent || {
      eyebrow: "DEHYDRATED PRODUCTS | FOOD INGREDIENTS | GLOBAL EXPORT SUPPLY",
      title: "Premium Dehydrated Vegetables & Herbal Powders",
      description:
        "Leading processor and exporter of premium quality dehydrated vegetables, herbal powders, masala powders, and natural food ingredients.",
      badge: "PROVEN QUALITY | GLOBAL EXPORT",
      primaryBtnText: "Explore Products",
      primaryBtnLink: "/products",
      secondaryBtnText: "Contact Us",
      secondaryBtnLink: "/contact",
      heroImage: "/images/hero-bg.png",
      visible: true,
    }
  );

  const [imgSrc, setImgSrc] = useState<string>(content.heroImage || "/images/hero-bg.png");

  useEffect(() => {
    if (!initialContent) {
      getSiteContent<HeroContent>("hero", content).then((data) => {
        if (data) {
          setContent(data);
          setImgSrc(data.heroImage || "/images/hero-bg.png");
        }
      });
    }
  }, [initialContent]);

  useEffect(() => {
    if (content.heroImage) {
      setImgSrc(content.heroImage);
    }
  }, [content.heroImage]);

  if (content.visible === false) return null;

  return (
    <section className="relative w-full bg-[#e8f4fd] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Buttons */}
          <div className="md:col-span-7 xl:col-span-6 z-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full shrink-0" />
              <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase leading-snug">
                {content.eyebrow}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold text-[#102A63] tracking-tight leading-[1.15] mb-4">
              {content.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed mb-6 sm:mb-8 max-w-xl">
              {content.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href={content.primaryBtnLink || "/products"}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all group min-h-[48px]"
              >
                <span>{content.primaryBtnText || "Explore Products"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => openInquiry()}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 border-2 border-[#0BA8EA] text-[#0BA8EA] font-bold text-sm sm:text-base rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[48px]"
              >
                <Mail className="w-4 h-4" />
                <span>{content.secondaryBtnText || "Contact Us"}</span>
              </button>
            </div>
          </div>

          {/* Right Column / Bottom Mobile: Hero Picture (100% visible, no blinking) */}
          <div className="md:col-span-5 xl:col-span-6 w-full flex justify-center items-center">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-xl border border-sky-100/80 bg-white/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
                alt={content.title || "Premium Dehydrated Food Ingredients"}
                onError={() => {
                  if (imgSrc !== "/images/hero-bg.png") {
                    setImgSrc("/images/hero-bg.png");
                  }
                }}
                className="w-full h-auto max-h-[350px] sm:max-h-[450px] lg:max-h-[500px] object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
