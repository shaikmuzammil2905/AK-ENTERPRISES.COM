import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import ExportBannerCard from "@/components/ExportBannerCard";
import WhyChooseSection from "@/components/WhyChooseSection";
import PreFooterCTA from "@/components/PreFooterCTA";
import { getCategories, getProducts } from "@/lib/db";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(false),
    getProducts(false),
  ]);

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Product Categories Section */}
      {categories.length > 0 && (
        <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
                <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                  OUR PRODUCT CATEGORIES
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A63] tracking-tight">
                Explore Our Product Categories
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#F1FAFE]/50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
                  <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                    FEATURED PRODUCTS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A63] tracking-tight">
                  Our Dehydrated Products
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0BA8EA] hover:text-[#0996D3] transition-colors group"
              >
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  horizontalOnMobile={true}
                />
              ))}
              {/* Export Banner Card */}
              <ExportBannerCard />
            </div>
          </div>
        </section>
      )}

      {/* 4. Why Choose AK Enterprises Section */}
      <WhyChooseSection />

      {/* 5. Pre-Footer Call to Action Banner */}
      <PreFooterCTA />
    </div>
  );
}
