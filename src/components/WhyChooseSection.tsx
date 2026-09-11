"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Leaf, Globe, Handshake, ShieldCheck, ArrowRight, CheckCircle, Package, Truck } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { WhyChooseContent } from "@/types";
import { getSiteContent } from "@/lib/db";

export default function WhyChooseSection() {
  const { openInquiry } = useInquiry();
  const [content, setContent] = useState<WhyChooseContent>({
    title: "Your Trusted Partner in Dehydrated Food Ingredients",
    subtitle: "WHY CHOOSE AK ENTERPRISES",
    description: "",
    points: [
      { id: "1", title: "Wide Range of Products", description: "", icon: "Leaf" },
      { id: "2", title: "Global Export Supply", description: "", icon: "Globe" },
      { id: "3", title: "Reliable Partnerships", description: "", icon: "Handshake" },
      { id: "4", title: "Quality Focused", description: "", icon: "ShieldCheck" },
    ],
    visible: true,
  });

  useEffect(() => {
    getSiteContent<WhyChooseContent>("why_choose", content).then((data) => setContent(data));
  }, []);

  if (content.visible === false) return null;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return Globe;
      case "Handshake":
        return Handshake;
      case "ShieldCheck":
        return ShieldCheck;
      case "Package":
        return Package;
      case "Truck":
        return Truck;
      case "CheckCircle":
        return CheckCircle;
      default:
        return Leaf;
    }
  };

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Visual */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg border-4 border-white ring-2 ring-[#E1F2FB]">
              <Image
                src="/images/why-choose-dehydrated.png"
                alt="Colorful dehydrated vegetable chips and natural ingredients"
                fill
                sizes="(max-width: 1024px) 256px, 288px"
                className="object-cover scale-110 hover:scale-115 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Middle: Title & Points */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
              <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                {content.subtitle || "WHY CHOOSE AK ENTERPRISES"}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A63] tracking-tight mb-8">
              {content.title}
            </h2>

            {/* Points Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {content.points.map((pillar, idx) => {
                const Icon = getIconComponent(pillar.icon);
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

          {/* Right: Card */}
          <div className="lg:col-span-3">
            <div className="bg-[#F1FAFE] rounded-2xl border border-[#E1F2FB] p-6 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="relative w-16 h-16 rounded-full bg-white shadow-xs border border-[#E1F2FB] flex items-center justify-center p-2 mb-3">
                <Image src="/logo.png" alt="AK Enterprises emblem" fill className="object-contain p-2" />
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
