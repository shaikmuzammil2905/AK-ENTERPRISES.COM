import { supabase } from "./supabaseClient";
import { Product, Category, CompanyInfo, HeroContent, WhyChooseContent, PreFooterCTAContent, Certification, ActivityLog } from "@/types";
import { categories as defaultCategories } from "@/data/categories";
import { products as defaultProducts } from "@/data/products";
import { companyInfo as defaultCompanyInfo } from "@/data/company";

// --- SEED & MIGRATION DATA ---
export async function seedInitialData(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Seed Categories
    const { data: existingCats } = await supabase.from("categories").select("id");
    if (!existingCats || existingCats.length === 0) {
      const catRows = defaultCategories.map((c, idx) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        short_description: c.shortDescription || "",
        image: c.image,
        icon_name: c.iconName || "Package",
        display_order: idx + 1,
        active: true,
      }));
      await supabase.from("categories").insert(catRows);
    }

    // 2. Seed Products
    const { data: existingProds } = await supabase.from("products").select("id");
    if (!existingProds || existingProds.length === 0) {
      const prodRows = defaultProducts.map((p, idx) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        category_id: p.categorySlug === "herbal-powders" ? "cat-2" : p.categorySlug === "dehydrated-vegetables" ? "cat-1" : p.categorySlug === "masala-powders" ? "cat-3" : "cat-4",
        category_name: p.category,
        category_slug: p.categorySlug,
        short_description: p.shortDescription,
        description: p.description || "",
        image: p.image,
        gallery: JSON.stringify(p.gallery || [p.image]),
        available_form: p.availableForm || "Powder / Flakes",
        packaging: p.packaging || "25 kg / 50 kg HDPE Bags / Custom Export Packaging",
        specifications: JSON.stringify(p.specifications || []),
        featured: p.featured ?? true,
        active: true,
        display_order: idx + 1,
      }));
      await supabase.from("products").insert(prodRows);
    }

    // 3. Seed Site Content (Company info, Hero, Why Choose, CTA)
    const { data: existingContent } = await supabase.from("site_content").select("key");
    if (!existingContent || existingContent.length === 0) {
      await supabase.from("site_content").upsert([
        { key: "company_info", content: defaultCompanyInfo },
        {
          key: "hero",
          content: {
            eyebrow: defaultCompanyInfo.eyebrow,
            title: "Premium Dehydrated Vegetables & Herbal Powders",
            description: "Leading processor and exporter of premium quality dehydrated vegetables, herbal powders, masala powders, and natural food ingredients for global B2B supply.",
            badge: "PROVEN QUALITY | GLOBAL EXPORT",
            primaryBtnText: "Explore Products",
            primaryBtnLink: "/products",
            secondaryBtnText: "Contact Us",
            secondaryBtnLink: "/contact",
            heroImage: "/images/hero-dehydrated-food.png",
            visible: true,
          },
        },
        {
          key: "why_choose",
          content: {
            title: "Why Choose AK Enterprises?",
            subtitle: "YOUR TRUSTED B2B PARTNER FOR DEHYDRATED FOOD INGREDIENTS",
            description: "We deliver supreme quality dehydrated food products and natural powders processed under strict quality controls for worldwide supply.",
            points: [
              { id: "1", title: "100% Pure & Natural", description: "Sourced from select harvests with zero artificial additives or preservatives.", icon: "CheckCircle" },
              { id: "2", title: "Global Export Quality", description: "Processed to meet rigorous export standards and international specifications.", icon: "Globe" },
              { id: "3", title: "Custom Packaging & Bulk Supply", description: "Tailored B2B packaging options for food processors, manufacturers, and distributors.", icon: "Package" },
              { id: "4", title: "Reliable On-Time Delivery", description: "Efficient supply chain ensuring timely global dispatch and order fulfillment.", icon: "Truck" },
            ],
            visible: true,
          },
        },
        {
          key: "pre_footer_cta",
          content: {
            title: "Looking for Bulk Dehydrated Food Ingredients?",
            description: "Contact AK Enterprises today for technical specifications, product samples, and competitive wholesale pricing.",
            buttonText: "Request Wholesale Quote",
            visible: true,
          },
        },
      ]);
    }

    // 4. Seed Certifications
    const { data: existingCerts } = await supabase.from("certifications").select("id");
    if (!existingCerts || existingCerts.length === 0) {
      await supabase.from("certifications").insert([
        { id: "cert-1", name: "ISO Certified", image: "/images/certifications/iso.png", display_order: 1, active: true },
        { id: "cert-2", name: "FSSAI Registered", image: "/images/certifications/fssai.png", display_order: 2, active: true },
        { id: "cert-3", name: "APEDA Export Member", image: "/images/certifications/apeda.png", display_order: 3, active: true },
        { id: "cert-4", name: "Spices Board India", image: "/images/certifications/spices-board.png", display_order: 4, active: true },
      ]);
    }

    return { success: true, message: "Database successfully seeded with default website data!" };
  } catch (err: any) {
    console.error("Error seeding initial data:", err);
    return { success: false, message: err.message || "Failed to seed database" };
  }
}

// --- ACTIVITY LOG HELPER ---
export async function logAdminAction(adminEmail: string, action: string, itemType: string, itemId?: string, details?: string) {
  try {
    await supabase.from("admin_activity_logs").insert({
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      admin_email: adminEmail || "admin@ak-enterprises.com",
      action,
      item_type: itemType,
      item_id: itemId || null,
      details: details || null,
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to insert admin activity log:", err);
  }
}

// --- CATEGORIES ---
export async function getCategories(includeInactive = false): Promise<Category[]> {
  try {
    let query = supabase.from("categories").select("*").order("display_order", { ascending: true });
    if (!includeInactive) {
      query = query.eq("active", true);
    }
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return defaultCategories.map((c, i) => ({ ...c, displayOrder: i + 1, active: true }));
    }
    return data.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      shortDescription: item.short_description,
      image: item.image,
      iconName: item.icon_name,
      displayOrder: item.display_order,
      active: item.active,
    }));
  } catch (err) {
    return defaultCategories.map((c, i) => ({ ...c, displayOrder: i + 1, active: true }));
  }
}

export async function saveCategory(category: Partial<Category>, adminEmail = "admin"): Promise<Category> {
  const isNew = !category.id;
  const id = category.id || `cat-${Date.now()}`;
  const slug = category.slug || category.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `category-${Date.now()}`;

  const row = {
    id,
    slug,
    name: category.name || "Untitled Category",
    short_description: category.shortDescription || "",
    image: category.image || "/images/categories/dehydrated-vegetables.png",
    icon_name: category.iconName || "Package",
    display_order: category.displayOrder ?? 1,
    active: category.active ?? true,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("categories").upsert(row);
  if (error) throw new Error(error.message);

  await logAdminAction(adminEmail, isNew ? "Created Category" : "Updated Category", "Category", id, `Category: ${row.name}`);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    image: row.image,
    iconName: row.icon_name,
    displayOrder: row.display_order,
    active: row.active,
  };
}

export async function deleteCategory(id: string, adminEmail = "admin"): Promise<void> {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logAdminAction(adminEmail, "Deleted Category", "Category", id, `Category ID: ${id}`);
}

// --- PRODUCTS ---
export async function getProducts(includeInactive = false): Promise<Product[]> {
  try {
    let query = supabase.from("products").select("*").order("display_order", { ascending: true });
    if (!includeInactive) {
      query = query.eq("active", true);
    }
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return defaultProducts.map((p, idx) => ({ ...p, displayOrder: idx + 1, active: true }));
    }
    return data.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      category: item.category_name || item.category,
      categorySlug: item.category_slug,
      categoryId: item.category_id,
      shortDescription: item.short_description,
      description: item.description,
      image: item.image,
      gallery: typeof item.gallery === "string" ? JSON.parse(item.gallery) : item.gallery || [item.image],
      availableForm: item.available_form,
      packaging: item.packaging,
      specifications: typeof item.specifications === "string" ? JSON.parse(item.specifications) : item.specifications || [],
      featured: item.featured,
      active: item.active,
      displayOrder: item.display_order,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  } catch (err) {
    return defaultProducts.map((p, idx) => ({ ...p, displayOrder: idx + 1, active: true }));
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts(true);
  return products.find((p) => p.slug === slug);
}

export async function saveProduct(product: Partial<Product>, adminEmail = "admin"): Promise<Product> {
  const isNew = !product.id;
  const id = product.id || `prod-${Date.now()}`;
  const slug = product.slug || product.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `product-${Date.now()}`;

  const row = {
    id,
    slug,
    name: product.name || "Untitled Product",
    category_id: product.categoryId || null,
    category_name: product.category || "General",
    category_slug: product.categorySlug || "general",
    short_description: product.shortDescription || "",
    description: product.description || "",
    image: product.image || "/images/products/neem-powder.png",
    gallery: JSON.stringify(product.gallery || [product.image || "/images/products/neem-powder.png"]),
    available_form: product.availableForm || "Powder / Flakes",
    packaging: product.packaging || "Bulk Packaging Options Available",
    specifications: JSON.stringify(product.specifications || []),
    featured: product.featured ?? false,
    active: product.active ?? true,
    display_order: product.displayOrder ?? 1,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("products").upsert(row);
  if (error) throw new Error(error.message);

  await logAdminAction(adminEmail, isNew ? "Created Product" : "Updated Product", "Product", id, `Product: ${row.name}`);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category_name,
    categorySlug: row.category_slug,
    categoryId: row.category_id || undefined,
    shortDescription: row.short_description,
    description: row.description,
    image: row.image,
    gallery: JSON.parse(row.gallery),
    availableForm: row.available_form,
    packaging: row.packaging,
    specifications: JSON.parse(row.specifications),
    featured: row.featured,
    active: row.active,
    displayOrder: row.display_order,
  };
}

export async function deleteProduct(id: string, adminEmail = "admin"): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logAdminAction(adminEmail, "Deleted Product", "Product", id, `Deleted Product ID: ${id}`);
}

export async function toggleProductActive(id: string, currentActive: boolean, adminEmail = "admin"): Promise<void> {
  const { error } = await supabase.from("products").update({ active: !currentActive, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) throw new Error(error.message);
  await logAdminAction(adminEmail, !currentActive ? "Activated Product" : "Hidden Product", "Product", id, `Status set to ${!currentActive ? 'Active' : 'Hidden'}`);
}

// --- SITE CONTENT (HERO, WHY CHOOSE, COMPANY INFO, ETC.) ---
export async function getSiteContent<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const { data, error } = await supabase.from("site_content").select("content").eq("key", key).single();
    if (error || !data || !data.content) {
      return defaultValue;
    }
    return data.content as T;
  } catch (err) {
    return defaultValue;
  }
}

export async function saveSiteContent(key: string, content: any, adminEmail = "admin"): Promise<void> {
  const { error } = await supabase.from("site_content").upsert({
    key,
    content,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  await logAdminAction(adminEmail, `Updated ${key} Section`, "Site Content", key, `Updated ${key} site settings`);
}

// --- CERTIFICATIONS ---
export async function getCertifications(includeInactive = false): Promise<Certification[]> {
  try {
    let query = supabase.from("certifications").select("*").order("display_order", { ascending: true });
    if (!includeInactive) {
      query = query.eq("active", true);
    }
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return [
        { id: "cert-1", name: "ISO Certified", image: "/images/certifications/iso.png", displayOrder: 1, active: true },
        { id: "cert-2", name: "FSSAI Registered", image: "/images/certifications/fssai.png", displayOrder: 2, active: true },
        { id: "cert-3", name: "APEDA Export Member", image: "/images/certifications/apeda.png", displayOrder: 3, active: true },
        { id: "cert-4", name: "Spices Board India", image: "/images/certifications/spices-board.png", displayOrder: 4, active: true },
      ];
    }
    return data.map((c) => ({
      id: c.id,
      name: c.name,
      image: c.image,
      displayOrder: c.display_order,
      active: c.active,
    }));
  } catch (err) {
    return [
      { id: "cert-1", name: "ISO Certified", image: "/images/certifications/iso.png", displayOrder: 1, active: true },
      { id: "cert-2", name: "FSSAI Registered", image: "/images/certifications/fssai.png", displayOrder: 2, active: true },
      { id: "cert-3", name: "APEDA Export Member", image: "/images/certifications/apeda.png", displayOrder: 3, active: true },
      { id: "cert-4", name: "Spices Board India", image: "/images/certifications/spices-board.png", displayOrder: 4, active: true },
    ];
  }
}

export async function saveCertification(cert: Partial<Certification>, adminEmail = "admin"): Promise<Certification> {
  const isNew = !cert.id;
  const id = cert.id || `cert-${Date.now()}`;
  const row = {
    id,
    name: cert.name || "Certification",
    image: cert.image || "/images/certifications/iso.png",
    display_order: cert.displayOrder ?? 1,
    active: cert.active ?? true,
  };
  const { error } = await supabase.from("certifications").upsert(row);
  if (error) throw new Error(error.message);
  await logAdminAction(adminEmail, isNew ? "Created Certification" : "Updated Certification", "Certification", id, `Cert: ${row.name}`);
  return { id: row.id, name: row.name, image: row.image, displayOrder: row.display_order, active: row.active };
}

export async function deleteCertification(id: string, adminEmail = "admin"): Promise<void> {
  const { error } = await supabase.from("certifications").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logAdminAction(adminEmail, "Deleted Certification", "Certification", id, `Cert ID: ${id}`);
}

// --- ACTIVITY LOGS ---
export async function getActivityLogs(limit = 50): Promise<ActivityLog[]> {
  try {
    const { data, error } = await supabase.from("admin_activity_logs").select("*").order("created_at", { ascending: false }).limit(limit);
    if (error || !data) return [];
    return data.map((log) => ({
      id: log.id,
      adminEmail: log.admin_email,
      action: log.action,
      itemType: log.item_type,
      itemId: log.item_id,
      details: log.details,
      createdAt: log.created_at,
    }));
  } catch (err) {
    return [];
  }
}
