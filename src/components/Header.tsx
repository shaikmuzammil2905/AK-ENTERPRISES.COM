"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Menu, X, Search } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Export / Supply", href: "/export-supply" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { openInquiry } = useInquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative h-14 w-56 sm:h-16 sm:w-64 lg:h-[72px] lg:w-72">
              <Image
                src="/logo.png"
                alt="AK ENTERPRISES - Dehydrated Food Products & Ingredients"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors py-2 ${
                    active
                      ? "text-[#102A63]"
                      : "text-[#4A5568] hover:text-[#102A63]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0BA8EA] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => openInquiry()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-sm font-semibold rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send Inquiry</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#102A63] hover:text-[#0BA8EA] rounded-lg focus:outline-none"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#102A63] hover:text-[#0BA8EA] rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay Bar */}
        {searchOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-fadeIn">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search dehydrated powders, vegetables, herbs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0BA8EA]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                    active
                      ? "bg-[#F1FAFE] text-[#0BA8EA]"
                      : "text-[#16244A] hover:bg-gray-50"
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-[#0BA8EA]" />}
                </Link>
              );
            })}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openInquiry();
                }}
                className="w-full py-3 bg-[#0BA8EA] hover:bg-[#0996D3] text-white font-semibold rounded-lg text-sm shadow-sm flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
