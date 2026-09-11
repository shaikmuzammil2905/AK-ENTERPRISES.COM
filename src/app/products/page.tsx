import { Suspense } from "react";

export const dynamic = 'force-dynamic';
import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products Catalogue | AK Enterprises - Dehydrated Food Ingredients",
  description:
    "Explore AK Enterprises' full range of dehydrated vegetables, herbal powders, masala powders, and natural food ingredients for global bulk supply and export.",
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
