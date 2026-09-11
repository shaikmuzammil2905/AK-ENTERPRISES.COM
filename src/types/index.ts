export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  image: string;
  iconName?: string;
  displayOrder?: number;
  active?: boolean;
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
  categoryId?: string;
  shortDescription: string;
  image: string;
  description?: string;
  gallery?: string[];
  availableForm?: string;
  packaging?: string;
  specifications?: ProductSpecification[];
  featured?: boolean;
  active?: boolean;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
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

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  heroImage: string;
  visible?: boolean;
}

export interface WhyChoosePoint {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseContent {
  title: string;
  subtitle: string;
  description: string;
  points: WhyChoosePoint[];
  visible?: boolean;
}

export interface PreFooterCTAContent {
  title: string;
  description: string;
  buttonText: string;
  visible?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  image: string;
  displayOrder?: number;
  active?: boolean;
}

export interface ActivityLog {
  id: string;
  adminEmail: string;
  action: string;
  itemType: string;
  itemId?: string;
  details?: string;
  createdAt: string;
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
