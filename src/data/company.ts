import { CompanyInfo } from "@/types";

export const companyInfo: CompanyInfo = {
  name: "AK ENTERPRISES",
  tagline: "Dehydrated Products | Food Ingredients | Global Export Supply",
  eyebrow: "DEHYDRATED PRODUCTS | FOOD INGREDIENTS | GLOBAL EXPORT SUPPLY",
  businessType: "Import & Export",
  businessFocus:
    "Dehydrated food products, vegetables, herbal powders, masala powders, natural powders and food ingredients.",
  experience: "1 year",
  address: {
    line1: "D.No. 28-6-19",
    line2: "Arundalpet, Jaleel Street",
    line3: "Vijayawada – 520002",
    cityStateZip: "Vijayawada – 520002, Andhra Pradesh",
    country: "India",
  },
  phones: ["9502947144", "9848124030"],
  whatsapp: "9502947144",
  email: "akenterprisecorp@gmail.com",
};

export const getWhatsAppLink = (message?: string): string => {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || companyInfo.whatsapp;
  const cleanNumber = number.replace(/\D/g, "");
  const formattedNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
  const encodedMsg = encodeURIComponent(
    message || "Hello AK Enterprises, I would like to inquire about your dehydrated food products and ingredients."
  );
  return `https://wa.me/${formattedNumber}?text=${encodedMsg}`;
};

export const getPhoneLink = (phone: string): string => {
  const cleanNumber = phone.replace(/\D/g, "");
  return `tel:+91${cleanNumber}`;
};

export const getMailtoLink = (subject?: string): string => {
  const encodedSubject = encodeURIComponent(subject || "Inquiry - AK Enterprises Products");
  return `mailto:${companyInfo.email}?subject=${encodedSubject}`;
};
