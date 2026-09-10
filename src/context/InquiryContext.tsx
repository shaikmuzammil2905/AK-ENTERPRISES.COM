"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/types";

interface InquiryContextType {
  isOpen: boolean;
  selectedProduct: Product | null;
  openInquiry: (product?: Product | null) => void;
  closeInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openInquiry = (product: Product | null = null) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeInquiry = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <InquiryContext.Provider value={{ isOpen, selectedProduct, openInquiry, closeInquiry }}>
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}
