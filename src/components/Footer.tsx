import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { companyInfo, getPhoneLink, getMailtoLink, getWhatsAppLink } from "@/data/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1B3E] text-white pt-14 pb-20 md:pb-12 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-5">
              <div className="relative h-20 w-64 sm:h-24 sm:w-72">
                <Image
                  src="/logo.png"
                  alt="AK ENTERPRISES"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm mb-4">
              Leading supplier and exporter of dehydrated vegetables, herbal powders, masala powders, and pure natural food ingredients.
            </p>
            <div className="text-xs text-[#39BCE5] font-semibold tracking-wide">
              {companyInfo.tagline}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#39BCE5] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#39BCE5] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#39BCE5] transition-colors">
                  Products Catalogue
                </Link>
              </li>
              <li>
                <Link href="/export-supply" className="hover:text-[#39BCE5] transition-colors">
                  Export & Supply
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#39BCE5] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Office & Inquiries
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#39BCE5] shrink-0 mt-0.5" />
                <span>
                  {companyInfo.address.line1}, {companyInfo.address.line2}, {companyInfo.address.line3}, {companyInfo.address.country}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                {companyInfo.phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={getPhoneLink(phone)}
                    className="flex items-center gap-2 hover:text-[#39BCE5] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#39BCE5]" />
                    <span>+91 {phone}</span>
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href={getMailtoLink()}
                  className="flex items-center gap-2 hover:text-[#39BCE5] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#39BCE5]" />
                  <span>{companyInfo.email}</span>
                </a>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp Desk"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Desk</span>
              </a>
              <a
                href={getMailtoLink()}
                aria-label="Send Email"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#0BA8EA] text-white text-xs font-semibold transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} AK Enterprises. All rights reserved.</p>
          <p className="text-center sm:text-right text-gray-400">
            {companyInfo.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
