import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Globe, Leaf, Clock, ArrowRight, Building2, MapPin } from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";
import CategoryCard from "@/components/CategoryCard";
import { companyInfo } from "@/data/company";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "About Us | AK Enterprises - Dehydrated Food Ingredients",
  description:
    "Learn about AK Enterprises, an export-oriented supplier of dehydrated vegetables, herbal powders, masala powders, and natural food ingredients based in Vijayawada, India.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F1FAFE] to-white py-12 sm:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
              <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                ABOUT AK ENTERPRISES
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A63] tracking-tight mb-4">
              Export-Oriented B2B Food Ingredients & Dehydrated Products
            </h1>
            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
              {companyInfo.name} specializes in sourcing, processing, and supplying high-quality dehydrated vegetables, herbal powders, masala blends, and natural plant powders for domestic and global B2B markets.
            </p>
          </div>
        </div>
      </section>

      {/* Business Profile Overview */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102A63] mb-5">
                Our Business Profile & Capabilities
              </h2>
              <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed mb-4">
                Operating with a core focus on dehydrated agricultural produce and natural botanicals, AK Enterprises bridges Indian agricultural richness with international industrial supply chains.
              </p>
              <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed mb-6">
                Our operations are geared toward food manufacturers, seasoning processors, herbal and health formulations, and international distributors seeking dependable wholesale consignments.
              </p>

              {/* Factual Business Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F1FAFE] border border-[#E1F2FB]">
                  <div className="flex items-center gap-2 text-[#0BA8EA] font-bold text-xs uppercase mb-1">
                    <Building2 className="w-4 h-4" />
                    <span>Business Nature</span>
                  </div>
                  <p className="text-sm font-bold text-[#102A63]">{companyInfo.businessType}</p>
                  <p className="text-xs text-gray-500 mt-1">Export & wholesale distribution</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F1FAFE] border border-[#E1F2FB]">
                  <div className="flex items-center gap-2 text-[#0BA8EA] font-bold text-xs uppercase mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Industry Experience</span>
                  </div>
                  <p className="text-sm font-bold text-[#102A63]">{companyInfo.experience} Active Operations</p>
                  <p className="text-xs text-gray-500 mt-1">Dedicated to quality consistency</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F1FAFE] border border-[#E1F2FB]">
                  <div className="flex items-center gap-2 text-[#0BA8EA] font-bold text-xs uppercase mb-1">
                    <Leaf className="w-4 h-4" />
                    <span>Specialization</span>
                  </div>
                  <p className="text-sm font-bold text-[#102A63]">Dehydrated Foods</p>
                  <p className="text-xs text-gray-500 mt-1">Vegetable, herbal & masala powders</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F1FAFE] border border-[#E1F2FB]">
                  <div className="flex items-center gap-2 text-[#0BA8EA] font-bold text-xs uppercase mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Headquarters</span>
                  </div>
                  <p className="text-sm font-bold text-[#102A63]">Vijayawada, India</p>
                  <p className="text-xs text-gray-500 mt-1">Andhra Pradesh, 520002</p>
                </div>
              </div>
            </div>

            {/* Right Strategic Summary Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#102A63] to-[#27366F] text-white p-8 rounded-2xl shadow-xl">
              <span className="text-xs font-bold text-[#39BCE5] tracking-widest uppercase block mb-2">
                B2B FOCUS
              </span>
              <h3 className="text-xl font-bold mb-4">
                Committed to Reliable Ingredients Supply
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-gray-200">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#39BCE5] shrink-0 mt-0.5" />
                  <span>Strict focus on product hygiene, pure grading, and natural dehydration.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#39BCE5] shrink-0 mt-0.5" />
                  <span>End-to-end export coordination, customized packaging, and container logistics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-[#39BCE5] shrink-0 mt-0.5" />
                  <span>Transparent communication for samples, specifications, and supply agreements.</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#39BCE5] hover:text-white transition-colors"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="py-12 sm:py-16 bg-[#F1FAFE]/40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102A63] mb-2">
              Our Core Product Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5568]">
              We supply across five key food and botanical categories for domestic and international commercial clients.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer Banner */}
      <PreFooterCTA />
    </div>
  );
}
