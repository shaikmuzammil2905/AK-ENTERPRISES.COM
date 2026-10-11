import { Suspense } from "react";

export const dynamic = 'force-dynamic';
import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Product Catalogue & Wholesale Supplies | AK Enterprise Corp",
  description:
    "Explore the official AK Enterprise Corp product catalogue. Leading B2B supplier and wholesale distributor in India offering high-quality industrial products, wholesale supplies, and instant supplier quotations.",
  keywords: [
    "AK Enterprise Corp products",
    "AK Enterprise Corp supplier",
    "product catalogue",
    "online product enquiry",
    "supplier quotation",
    "wholesale products",
    "B2B supplier India",
    "industrial products supplier",
    "quality products supplier",
    "product supplier near me",
    "reliable product supplier",
  ],
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#0BA8EA] border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-xs text-gray-500">Loading products catalogue...</p>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
