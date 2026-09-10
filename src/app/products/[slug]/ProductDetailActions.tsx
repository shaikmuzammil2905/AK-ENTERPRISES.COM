"use client";

import React from "react";
import Link from "next/link";
import { Mail, MessageCircle, PhoneCall } from "lucide-react";
import { Product } from "@/types";
import { useInquiry } from "@/context/InquiryContext";
import { getWhatsAppLink } from "@/data/company";

export default function ProductDetailActions({ product }: { product: Product }) {
  const { openInquiry } = useInquiry();
  const whatsappUrl = getWhatsAppLink(
    `Hello AK Enterprises, I would like to inquire about specifications and bulk pricing for ${product.name} (${product.category}).`
  );

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4 border-t border-gray-100">
      <button
        type="button"
        onClick={() => openInquiry(product)}
        className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
      >
        <Mail className="w-4 h-4" />
        <span>Send Inquiry</span>
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>WhatsApp Inquiry</span>
      </a>

      <Link
        href="/contact"
        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-[#F1FAFE] border border-gray-300 hover:border-[#0BA8EA] text-[#102A63] text-sm font-semibold rounded-xl transition-all"
      >
        <PhoneCall className="w-4 h-4 text-[#0BA8EA]" />
        <span>Contact Us</span>
      </Link>
    </div>
  );
}
