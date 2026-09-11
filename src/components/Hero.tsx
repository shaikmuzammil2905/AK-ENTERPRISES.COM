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

  const [bgImage, setBgImage] = useState<string>("/images/hero-bg.png");

  useEffect(() => {
    const imgUrl = content.heroImage || "/images/hero-bg.png";
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => setBgImage(imgUrl);
    img.onerror = () => setBgImage("/images/hero-bg.png");
  }, [content.heroImage]);

  useEffect(() => {
    if (!initialContent) {
      getSiteContent<HeroContent>("hero", content).then((data) => {
        if (data) {
          setContent(data);
        }
      });
    }
  }, [initialContent]);

  if (content.visible === false) return null;

  return (
    <section
      className="relative w-full overflow-hidden hero-bg-section"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Light overlay for readability */}
      <div className="absolute inset-0 pointer-events-none hero-overlay" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-24 lg:py-28 min-h-[440px] md:min-h-[520px] flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3.5">
            <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full shrink-0" />
            <span className="text-xs font-bold tracking-widest text-[#0BA8EA] uppercase leading-snug">
              {content.eyebrow}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold text-[#102A63] tracking-tight leading-[1.12] mb-4">
            {content.title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#334155] font-medium leading-relaxed mb-7 max-w-lg">
            {content.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Link
              href={content.primaryBtnLink || "/products"}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white font-bold text-sm sm:text-base rounded-full shadow-lg shadow-sky-500/25 hover:shadow-xl transition-all group min-h-[48px]"
            >
              <span>{content.primaryBtnText || "Explore Products"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={() => openInquiry()}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/90 hover:bg-white border-2 border-[#0BA8EA] text-[#0BA8EA] font-bold text-sm sm:text-base rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer backdrop-blur-sm min-h-[48px]"
            >
              <Mail className="w-4 h-4" />
              <span>{content.secondaryBtnText || "Contact Us"}</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-bg-section {
          background-position: center center;
        }
        .hero-overlay {
          background: linear-gradient(to bottom, rgba(232, 244, 253, 0.88) 0%, rgba(232, 244, 253, 0.72) 65%, rgba(232, 244, 253, 0.4) 100%);
        }
        @media (min-width: 768px) {
          .hero-bg-section {
            background-position: center right;
          }
          .hero-overlay {
            background: linear-gradient(to right, rgba(232, 244, 253, 0.95) 0%, rgba(232, 244, 253, 0.85) 45%, rgba(232, 244, 253, 0.25) 75%, transparent 100%);
          }
        }
      `}</style>
    </section>
  );
}
