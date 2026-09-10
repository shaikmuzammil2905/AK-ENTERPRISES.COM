import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Search, Send, MessageSquare, FileCheck, ArrowRight, Globe, Shield, Truck } from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Export & Supply | AK Enterprises - Global Ingredients Supply",
  description:
    "Learn about our structured 4-step B2B inquiry and supply process for dehydrated vegetables, herbal powders, masala powders, and natural food ingredients.",
};

const steps = [
  {
    step: "01",
    title: "Select Product",
    desc: "Browse our catalogue of dehydrated vegetables, herbal powders, masala powders, and natural ingredients according to your formulation needs.",
    icon: Search,
  },
  {
    step: "02",
    title: "Send Inquiry",
    desc: "Submit your requirement through our inquiry portal or directly via WhatsApp/Email, noting your desired quantity and destination.",
    icon: Send,
  },
  {
    step: "03",
    title: "Discuss Requirements",
    desc: "Our trade team connects with you to discuss product specifications, custom processing forms, packaging preferences, and delivery schedules.",
    icon: MessageSquare,
  },
  {
    step: "04",
    title: "Receive Quotation",
    desc: "Receive a formal, competitive B2B quotation along with logistics breakdown, sample availability, and fulfillment terms.",
    icon: FileCheck,
  },
];

export default function ExportSupplyPage() {
  return (
    <div>
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F1FAFE] to-white py-12 sm:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
              <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                GLOBAL SUPPLY & EXPORT
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A63] tracking-tight mb-4">
              Export & Bulk Supply Solutions
            </h1>
            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
              We provide streamlined sourcing, export logistics, and consistent bulk supply of dehydrated food products and natural botanical ingredients for worldwide commercial buyers.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Inquiry Process */}
      <section className="py-14 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
              <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                HOW WE WORK
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A63]">
              Our 4-Step Inquiry & Supply Process
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5568] mt-2">
              A transparent, efficient process designed to give B2B buyers clear communication and dependable deliveries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative bg-white rounded-2xl border border-[#E1F2FB] hover:border-[#0BA8EA]/40 p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F1FAFE] border border-[#E1F2FB] text-[#0BA8EA] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black text-[#102A63]/20">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#102A63] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#4A5568] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center text-xs font-semibold text-[#0BA8EA]">
                    <span>Step {item.step}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Export Capabilities Overview */}
      <section className="py-12 sm:py-16 bg-[#F1FAFE]/50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E1F2FB]">
              <Globe className="w-8 h-8 text-[#0BA8EA] mb-4" />
              <h3 className="text-base font-bold text-[#102A63] mb-2">
                International Logistics Support
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Coordination with reputable freight and maritime logistics partners to ensure prompt dispatches from primary Indian ports.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E1F2FB]">
              <Shield className="w-8 h-8 text-[#0BA8EA] mb-4" />
              <h3 className="text-base font-bold text-[#102A63] mb-2">
                Standardized Processing
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Dehydration and powder milling designed to maintain natural properties, flavor profiles, and batch-to-batch consistency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E1F2FB]">
              <Truck className="w-8 h-8 text-[#0BA8EA] mb-4" />
              <h3 className="text-base font-bold text-[#102A63] mb-2">
                Custom Bulk Packaging
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Packaging solutions according to buyer requirements, including moisture-barrier food-grade liners and export-grade cartons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#102A63]">
                Categories Available for Export
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Select a category to explore specifications and request pricing
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0BA8EA] hover:text-[#0996D3]"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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
