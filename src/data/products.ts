import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prod-1",
    slug: "neem-powder",
    name: "Neem Powder",
    category: "Herbal Powders",
    categorySlug: "herbal-powders",
    shortDescription: "Premium quality neem powder sourced from natural ingredients.",
    image: "/images/products/neem-powder.png",
    description: "Pure and natural neem powder processed from carefully harvested neem leaves. Sourced for bulk B2B and export requirements.",
    featured: true,
  },
  {
    id: "prod-2",
    slug: "dehydrated-beetroot-powder",
    name: "Dehydrated Beetroot Powder",
    category: "Dehydrated Vegetables",
    categorySlug: "dehydrated-vegetables",
    shortDescription: "Rich color and natural goodness from dehydrated beetroot.",
    image: "/images/products/dehydrated-beetroot-powder.png",
    description: "Vibrant and natural dehydrated beetroot powder suitable for food coloring, flavoring, and food processing applications.",
    featured: true,
  },
  {
    id: "prod-3",
    slug: "moringa-powder",
    name: "Moringa Powder",
    category: "Herbal Powders",
    categorySlug: "herbal-powders",
    shortDescription: "Pure moringa powder from carefully selected leaves.",
    image: "/images/products/moringa-powder.png",
    description: "High-grade dehydrated moringa leaf powder carefully processed to retain its natural green profile and quality.",
    featured: true,
  },
  {
    id: "prod-4",
    slug: "dehydrated-bottle-gourd-powder",
    name: "Dehydrated Bottle Gourd Powder",
    category: "Dehydrated Vegetables",
    categorySlug: "dehydrated-vegetables",
    shortDescription: "High-quality dehydrated bottle gourd powder.",
    image: "/images/products/dehydrated-bottle-gourd-powder.png",
    description: "Finely milled dehydrated bottle gourd powder prepared from fresh, select produce for food manufacturing and culinary uses.",
    featured: true,
  },
  {
    id: "prod-5",
    slug: "moringa-chutney-powder",
    name: "Moringa Chutney Powder",
    category: "Masala Powders",
    categorySlug: "masala-powders",
    shortDescription: "Traditional taste with natural moringa goodness.",
    image: "/images/products/moringa-chutney-powder.png",
    description: "A specialty blend combining dehydrated moringa with traditional spices for savory food applications and bulk catering supply.",
    featured: true,
  },
  {
    id: "prod-6",
    slug: "dry-ginger-powder",
    name: "Dry Ginger Powder",
    category: "Natural Powders",
    categorySlug: "natural-powders",
    shortDescription: "Pure and natural dry ginger powder for versatile use.",
    image: "/images/products/dry-ginger-powder.png",
    description: "Aromatic and pungent dry ginger powder sourced from select dried ginger roots for culinary and ingredient supply.",
    featured: true,
  },
  {
    id: "prod-7",
    slug: "dehydrated-curry-leaf-powder",
    name: "Dehydrated Curry Leaf Powder",
    category: "Herbal Powders",
    categorySlug: "herbal-powders",
    shortDescription: "Aromatic and flavorful curry leaf powder.",
    image: "/images/products/dehydrated-curry-leaf-powder.png",
    description: "Carefully dehydrated and ground curry leaf powder delivering rich authentic aroma and flavor for industrial and export supply.",
    featured: true,
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getRelatedProducts = (currentSlug: string, categorySlug: string, limit: number = 4): Product[] => {
  return products
    .filter((p) => p.slug !== currentSlug && p.categorySlug === categorySlug)
    .slice(0, limit);
};
