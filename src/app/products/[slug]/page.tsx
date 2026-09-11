import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import ProductDetailActions from "./ProductDetailActions";
import ProductCard from "@/components/ProductCard";
import PreFooterCTA from "@/components/PreFooterCTA";
import { getProductBySlug, getProducts } from "@/lib/db";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts(true);
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | AK Enterprises",
    };
  }

  return {
    title: `${product.name} | AK Enterprises - Dehydrated Food Ingredients`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | AK Enterprises`,
      description: product.shortDescription,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts(false);
  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug)
    .slice(0, 4);

  return (
    <div>
      {/* Breadcrumb Bar */}
      <div className="bg-[#F1FAFE] border-b border-[#E1F2FB] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-xs text-[#4A5568] space-x-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0BA8EA] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/products" className="hover:text-[#0BA8EA] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="hover:text-[#0BA8EA] transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-[#102A63] truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Info Section */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Product Image Gallery */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-4/3 bg-[#F1FAFE] rounded-2xl border border-[#E1F2FB] p-6 flex items-center justify-center overflow-hidden shadow-xs">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>

              {/* Trust Indicators below image */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 bg-[#F1FAFE] rounded-xl border border-[#E1F2FB] text-center">
                  <ShieldCheck className="w-5 h-5 text-[#0BA8EA] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#102A63] block">B2B Standard</span>
                  <span className="text-[10px] text-gray-500">Quality Verified</span>
                </div>
                <div className="p-3 bg-[#F1FAFE] rounded-xl border border-[#E1F2FB] text-center">
                  <Truck className="w-5 h-5 text-[#0BA8EA] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#102A63] block">Bulk Supply</span>
                  <span className="text-[10px] text-gray-500">Global Logistics</span>
                </div>
                <div className="p-3 bg-[#F1FAFE] rounded-xl border border-[#E1F2FB] text-center">
                  <CheckCircle2 className="w-5 h-5 text-[#0BA8EA] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#102A63] block">Natural Source</span>
                  <span className="text-[10px] text-gray-500">Pure Ingredients</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-[#F1FAFE] text-[#0BA8EA] text-xs font-bold rounded-md border border-[#E1F2FB] mb-3">
                  {product.category}
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#102A63] tracking-tight mb-4">
                  {product.name}
                </h1>

                <p className="text-base text-[#4A5568] leading-relaxed mb-6">
                  {product.shortDescription}
                </p>

                {/* Conditional Product Description */}
                {product.description && (
                  <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Product Overview
                    </h2>
                    <p className="text-sm text-[#16244A] leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Optional Available Form */}
                {product.availableForm && (
                  <div className="mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Available Form
                    </h3>
                    <p className="text-sm font-semibold text-[#102A63]">
                      {product.availableForm}
                    </p>
                  </div>
                )}

                {/* Optional Packaging */}
                {product.packaging && (
                  <div className="mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Packaging
                    </h3>
                    <p className="text-sm font-semibold text-[#102A63]">
                      {product.packaging}
                    </p>
                  </div>
                )}

                {/* Optional Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Product Specifications
                    </h3>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <tbody>
                          {product.specifications.map((spec, i) => (
                            <tr
                              key={i}
                              className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                            >
                              <td className="py-2 px-3 font-semibold text-gray-700 w-1/3">
                                {spec.label}
                              </td>
                              <td className="py-2 px-3 text-[#102A63]">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <ProductDetailActions product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-12 sm:py-16 bg-[#F1FAFE]/40 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="h-0.5 w-6 bg-[#0BA8EA] rounded-full" />
                <span className="text-xs font-bold tracking-wider text-[#0BA8EA] uppercase">
                  SIMILAR CATEGORY
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#102A63]">Related Products</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pre-Footer Banner */}
      <PreFooterCTA />
    </div>
  );
}
