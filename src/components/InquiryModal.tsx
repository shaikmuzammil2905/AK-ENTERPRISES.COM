"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, Send, MessageCircle, Mail } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { getWhatsAppLink, getMailtoLink } from "@/data/company";

export default function InquiryModal() {
  const { isOpen, selectedProduct, closeInquiry } = useInquiry();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (selectedProduct) {
        setMessage(`We are interested in receiving specifications and a bulk quotation for ${selectedProduct.name}.`);
      } else {
        setMessage("We would like to inquire about your product catalogue and bulk export supply options.");
      }
    } else {
      document.body.style.overflow = "unset";
      setSubmitted(false);
    }
  }, [isOpen, selectedProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const directWhatsAppUrl = getWhatsAppLink(
    `Inquiry for ${selectedProduct ? selectedProduct.name : "Products"}\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nRequirement: ${message}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A63]/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#102A63] text-white">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#39BCE5] font-semibold">
              B2B Product & Export Inquiry
            </span>
            <h3 className="text-lg font-bold">
              {selectedProduct ? `Inquire About ${selectedProduct.name}` : "Request Quotation / Supply Inquiry"}
            </h3>
          </div>
          <button
            onClick={closeInquiry}
            className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#102A63] mb-2">Inquiry Details Prepared</h4>
              <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
                Thank you, {name || "Valued Client"}. For immediate verification and instant quotation, you can send these requirements directly via WhatsApp or Email:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium rounded-lg text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Send via WhatsApp
                </a>
                <a
                  href={getMailtoLink(`Quotation Inquiry: ${selectedProduct ? selectedProduct.name : "Products"}`)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#102A63] hover:bg-[#27366F] text-white font-medium rounded-lg text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" /> Send via Email
                </a>
              </div>
              <button
                onClick={closeInquiry}
                className="text-xs text-gray-500 hover:text-gray-800 underline"
              >
                Close this window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedProduct && (
                <div className="p-3 bg-[#F1FAFE] rounded-lg border border-[#E1F2FB] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#0BA8EA] uppercase">Selected Product</span>
                    <p className="font-bold text-[#102A63] text-sm">{selectedProduct.name}</p>
                  </div>
                  <span className="text-xs bg-white text-[#27366F] px-2.5 py-1 rounded-md border border-[#E1F2FB] font-medium">
                    {selectedProduct.category}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
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
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
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
                    placeholder="+91 9876543210"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Inquiry / Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your bulk inquiry requirements, destination, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0BA8EA] hover:bg-[#0996D3] text-white font-semibold rounded-lg text-sm shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Submit Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
