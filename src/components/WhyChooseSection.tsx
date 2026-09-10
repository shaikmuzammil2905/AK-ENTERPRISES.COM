"use client";

import React from "react";
import Image from "next/image";
import { Leaf, Globe, Handshake, ShieldCheck, ArrowRight } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";

export default function WhyChooseSection() {
  const { openInquiry } = useInquiry();

  const pillars = [
    {
      title: "Wide Range of Products",
      icon: Leaf,
    },
    {
      title: "Global Export Supply",
      icon: Globe,
    },
    {
      title: "Reliable Partnerships",
      icon: Handshake,
    },
    {
      title: "Quality Focused",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Dehydrated Chips Circular Visual */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-md border-4 border-white">
              <Image
                src="/images/why-choose-chips.png"
                alt="Dehydrated vegetable chips and natural ingredients"
                fill
                sizes="(max-width: 1024px) 256px, 256px"
                className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Middle: Content & 4 Value Pillars */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
              <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                WHY CHOOSE AK ENTERPRISES
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A63] tracking-tight mb-8">
              Your Trusted Partner in Dehydrated Food Ingredients
            </h2>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="flex flex-col items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#F1FAFE] border border-[#E1F2FB] flex items-center justify-center text-[#0BA8EA] mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#102A63] leading-snug">
                      {pillar.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: From Nature to the World Card */}
          <div className="lg:col-span-3">
            <div className="bg-[#F1FAFE] rounded-2xl border border-[#E1F2FB] p-6 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="relative w-16 h-16 rounded-full bg-white shadow-xs border border-[#E1F2FB] flex items-center justify-center p-2 mb-3">
                <Image
                  src="/logo.png"
                  alt="AK Enterprises emblem"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <h3 className="text-base font-bold text-[#102A63] mb-4">
                From Nature <br /> to the World
              </h3>

              <button
                type="button"
                onClick={() => openInquiry()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>Send Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
