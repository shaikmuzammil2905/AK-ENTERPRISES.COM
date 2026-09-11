"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import ProductFilter from "@/components/ProductFilter";
import ProductCard from "@/components/ProductCard";
import PreFooterCTA from "@/components/PreFooterCTA";
import { getProducts, getCategories } from "@/lib/db";
import { Product, Category } from "@/types";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  useEffect(() => {
    async function loadData() {
      try {
        const [prods, cats] = await Promise.all([getProducts(false), getCategories(false)]);
        setProductsList(prods);
        setCategoriesList(cats);
      } catch (err) {
        console.error("Failed to load products/categories:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      const matchesCat =
        selectedCategory === "all" || p.categorySlug === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [productsList, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Page Header Banner */}
      <section className="bg-gradient-to-b from-[#F1FAFE] to-white py-12 sm:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
              <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                B2B PRODUCT CATALOGUE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A63] tracking-tight mb-4">
              Dehydrated Products & Ingredients
            </h1>
            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
              Browse our comprehensive catalogue of dehydrated vegetables, herbal powders, masala powders, and natural ingredients available for global bulk supply and export.
            </p>
          </div>
        </div>
      </section>

      {/* Catalogue & Filters Section */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls: Filter Pills & Search Input */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-auto">
              <ProductFilter
                selectedCategory={selectedCategory}
                onSelectCategory={(slug) => setSelectedCategory(slug)}
                categories={categoriesList}
              />
            </div>

            <div className="relative w-full md:w-72 shrink-0">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#0BA8EA] focus:ring-1 focus:ring-[#0BA8EA]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Product Count Indicator */}
          <div className="mb-6 text-xs text-gray-500 font-medium">
            Showing <span className="font-bold text-[#102A63]">{filteredProducts.length}</span> dehydrated products
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="py-16 text-center text-gray-400 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-8 h-8 text-[#0BA8EA] animate-spin" />
              <span className="text-xs font-semibold">Loading product catalog...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-[#F1FAFE] rounded-2xl border border-[#E1F2FB] px-4">
              <p className="text-[#102A63] font-bold text-base mb-1">No products found</p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No products match your current filter or search criteria. Try switching categories or clearing search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 bg-[#0BA8EA] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pre-Footer Banner */}
      <PreFooterCTA />
    </div>
  );
}
