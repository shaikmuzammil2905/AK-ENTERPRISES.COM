"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";
import { getWhatsAppLink, getMailtoLink } from "@/data/company";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const directWhatsAppUrl = getWhatsAppLink(
    `B2B Inquiry from Website Contact Page\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nProduct/Requirement: ${product}\nMessage: ${message}`
  );

  if (submitted) {
    return (
      <div className="bg-[#F1FAFE] rounded-2xl border border-[#E1F2FB] p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-[#102A63] mb-2">Inquiry Form Submitted</h3>
        <p className="text-sm text-[#4A5568] max-w-md mx-auto mb-6">
          Thank you for reaching out to AK Enterprises. We have logged your request. For fastest turnaround and direct quotations, send this inquiry directly to our trade desk:
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" /> Send Direct via WhatsApp
          </a>
          <a
            href={getMailtoLink(`Website Inquiry from ${name || "Client"}`)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#102A63] hover:bg-[#27366F] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
          >
            Send via Email
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setCompany("");
            setEmail("");
            setPhone("");
            setProduct("");
            setMessage("");
          }}
          className="text-xs text-gray-500 hover:text-gray-800 underline mt-4"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your enterprise or company"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@company.com"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 95029 47144"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Product of Interest / Requirement
        </label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g. Neem Powder, Dehydrated Beetroot, Moringa, Bulk Spices"
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Inquiry Message <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please describe your quantity requirements, destination port/city, and packaging specifications..."
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white font-semibold rounded-xl text-sm shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" /> Send Inquiry
        </button>
      </div>
    </form>
  );
}
