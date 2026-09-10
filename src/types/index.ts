export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  image: string;
  iconName?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  image: string;
  description?: string;
  gallery?: string[];
  availableForm?: string;
  packaging?: string;
  specifications?: ProductSpecification[];
  featured?: boolean;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  eyebrow: string;
  businessType: string;
  businessFocus: string;
  experience: string;
  address: {
    line1: string;
    line2: string;
    line3: string;
    cityStateZip: string;
    country: string;
  };
  phones: string[];
  whatsapp: string;
  email: string;
}

export interface InquiryFormData {
  productName?: string;
  productSlug?: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  message: string;
}
