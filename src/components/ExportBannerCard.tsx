import React from "react";
import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";

export default function ExportBannerCard() {
  return (
    <div className="relative bg-gradient-to-br from-[#F1FAFE] to-[#e4f5fc] rounded-2xl border border-[#E1F2FB] p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      {/* Subtle world map background decoration */}
      <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none">
        <Globe className="w-full h-full text-[#102A63]" />
      </div>

      <div>
        <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#E1F2FB] flex items-center justify-center text-[#0BA8EA] mb-5">
          <Globe className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-[#102A63] leading-snug mb-3">
          Reliable Export Supply For Global Markets
        </h3>

        <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed mb-6">
          We are committed to delivering high-quality dehydrated food products and natural ingredients to our global customers.
        </p>
      </div>

      <div>
        <Link
          href="/export-supply"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
