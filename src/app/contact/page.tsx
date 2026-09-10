import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import ContactForm from "./ContactForm";
import PreFooterCTA from "@/components/PreFooterCTA";
import { companyInfo, getPhoneLink, getMailtoLink, getWhatsAppLink } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact Us | AK Enterprises - Dehydrated Food Ingredients Inquiries",
  description:
    "Get in touch with AK Enterprises for bulk quotes, product specifications, and export inquiries. Located in Vijayawada, Andhra Pradesh, India.",
};

export default function ContactPage() {
  const whatsappUrl = getWhatsAppLink("Hello AK Enterprises, I would like to inquire about your dehydrated products.");

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#F1FAFE] to-white py-12 sm:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
              <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                GET IN TOUCH
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A63] tracking-tight mb-4">
              Contact AK Enterprises
            </h1>
            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
              We welcome inquiries from domestic manufacturers, spice blenders, food processors, and international import partners. Connect with our trade desk below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left: Verified Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#102A63] mb-2">
                  Direct Inquiries & Office
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Reach out to us directly via phone, WhatsApp, or email for immediate product assistance.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Address Card */}
                <div className="p-5 rounded-2xl bg-[#F1FAFE] border border-[#E1F2FB] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0BA8EA] border border-[#E1F2FB] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0BA8EA] mb-1">
                      Office Address
                    </h3>
                    <p className="text-sm font-semibold text-[#102A63] leading-relaxed">
                      {companyInfo.address.line1}, {companyInfo.address.line2}, <br />
                      {companyInfo.address.line3}, <br />
                      {companyInfo.address.cityStateZip}, {companyInfo.address.country}
                    </p>
                  </div>
                </div>

                {/* Phone Numbers Card */}
                <div className="p-5 rounded-2xl bg-[#F1FAFE] border border-[#E1F2FB] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0BA8EA] border border-[#E1F2FB] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0BA8EA] mb-1">
                      Phone (Tap to Call)
                    </h3>
                    <div className="space-y-1">
                      {companyInfo.phones.map((phone, idx) => (
                        <div key={idx}>
                          <a
                            href={getPhoneLink(phone)}
                            className="text-sm font-bold text-[#102A63] hover:text-[#0BA8EA] transition-colors inline-block"
                          >
                            +91 {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Direct Card */}
                <div className="p-5 rounded-2xl bg-[#F1FAFE] border border-[#E1F2FB] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                      Instant WhatsApp Desk
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      Direct chat for quick price checks and catalogue PDFs.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      <span>Chat on +91 {companyInfo.whatsapp}</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="p-5 rounded-2xl bg-[#F1FAFE] border border-[#E1F2FB] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0BA8EA] border border-[#E1F2FB] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0BA8EA] mb-1">
                      Official Email
                    </h3>
                    <a
                      href={getMailtoLink()}
                      className="text-sm font-bold text-[#102A63] hover:text-[#0BA8EA] transition-colors"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E1F2FB] p-6 sm:p-8 shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0BA8EA]">
                  QUICK RESPONSE FORM
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#102A63]">
                  Send Your Product Inquiry
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Fill out the form below with your requirements and our export team will respond promptly.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer Banner */}
      <PreFooterCTA />
    </div>
  );
}
