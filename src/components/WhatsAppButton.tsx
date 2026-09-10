"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/company";

export default function WhatsAppButton() {
  const whatsappUrl = getWhatsAppLink("Hello AK Enterprises, I would like to inquire about your products.");

  return (
    <aside aria-label="WhatsApp Quick Contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AK Enterprises on WhatsApp"
        className="fixed bottom-20 md:bottom-8 right-5 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-green-600/30 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-400"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </aside>
  );
}
