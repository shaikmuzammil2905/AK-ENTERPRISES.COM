"use client";

import React from "react";
import { Mail, ArrowRight, MessageCircle } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { getWhatsAppLink } from "@/data/company";

export default function PreFooterCTA() {
  const { openInquiry } = useInquiry();
  const whatsappUrl = getWhatsAppLink("Hello AK Enterprises, I would like to discuss our bulk supply requirements.");

  return (
    <section className="bg-gradient-to-r from-[#102A63] via-[#1a3880] to-[#0ba8ea] text-white py-10 sm:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left info */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 items-center justify-center text-white shrink-0">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">
                Ready to Discuss Your Requirements?
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
                Get in touch with us for product details, quotations and bulk supply.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openInquiry()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#102A63] hover:bg-blue-50 text-sm font-bold rounded-lg shadow-md transition-all cursor-pointer"
            >
              <span>Send Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold rounded-lg shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
