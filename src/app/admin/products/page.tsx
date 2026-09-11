"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Package,
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Star,
  X,
  Upload,
  ArrowUpDown,
  CheckCircle2,
  Loader2,
  ListPlus,
} from "lucide-react";
import { getProducts, getCategories, saveProduct, deleteProduct, toggleProductActive } from "@/lib/db";
import { Product, Category, ProductSpecification } from "@/types";
import ImageUploader from "@/components/admin/ImageUploader";
import ConfirmModal from "@/components/admin/ConfirmModal";
import ToastNotification, { ToastMessage } from "@/components/admin/ToastNotification";

export default function AdminProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'active' | 'hidden'
  const [featuredFilter, setFeaturedFilter] = useState("all"); // 'all' | 'featured'
  const [sortBy, setSortBy] = useState("displayOrder"); // 'displayOrder' | 'name' | 'newest'

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Confirm Modal State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Specs helper state
  const [specs, setSpecs] = useState<ProductSpecification[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [galleryInput, setGalleryInput] = useState("");

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", message: string) => {
    setToasts((prev) => [...prev, { id: `toast-${Date.now()}`, type, message }]);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([getProducts(true), getCategories(true)]);
      setProducts(prods);
      setCategories(cats);
    } catch (err: any) {
      addToast("error", "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    if (searchParams.get("action") === "add") {
      openAddModal();
    }
  }, [searchParams]);

  const openAddModal = () => {
    setEditingProduct({
      name: "",
      shortDescription: "",
      description: "",
      category: categories[0]?.name || "General",
      categorySlug: categories[0]?.slug || "general",
      image: "/images/products/neem-powder.png",
      availableForm: "Powder / Flakes",
      packaging: "25 kg HDPE Bags / Custom Export Packaging",
      featured: true,
      active: true,
      displayOrder: products.length + 1,
    });
    setSpecs([{ label: "Grade", value: "A-Grade Export Quality" }, { label: "Moisture", value: "< 8%" }]);
    setGallery([]);
    setIsEditModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setSpecs(prod.specifications || []);
    setGallery(prod.gallery || [prod.image]);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct.name) {
      addToast("error", "Product name is required.");
      return;
    }

    setIsSaving(true);
    try {
      const selectedCatObj = categories.find((c) => c.slug === editingProduct.categorySlug);
      const productPayload: Partial<Product> = {
        ...editingProduct,
        category: selectedCatObj ? selectedCatObj.name : editingProduct.category || "General",
        categorySlug: editingProduct.categorySlug || "general",
        categoryId: selectedCatObj?.id,
        specifications: specs.filter((s) => s.label.trim() !== ""),
        gallery: gallery.length > 0 ? gallery : [editingProduct.image || "/images/products/neem-powder.png"],
      };

      const saved = await saveProduct(productPayload);
      addToast("success", editingProduct.id ? "Product updated successfully!" : "Product added successfully!");
      setIsEditModalOpen(false);
      loadData();
    } catch (err: any) {
      addToast("error", err.message || "Failed to save product.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (prod: Product) => {
    try {
      await toggleProductActive(prod.id, prod.active !== false);
      addToast("success", prod.active !== false ? "Product hidden from public site." : "Product activated on public site.");
      loadData();
    } catch (err: any) {
      addToast("error", "Failed to update product status.");
    }
  };

  const promptDelete = (prod: Product) => {
    setProductToDelete(prod);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      addToast("success", `Product "${productToDelete.name}" deleted successfully.`);
      setDeleteConfirmOpen(false);
      setProductToDelete(null);
      loadData();
    } catch (err: any) {
      addToast("error", err.message || "Failed to delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === "all" || p.categorySlug === selectedCategory;
    const matchesStatus =
      statusFilter === "all" || (statusFilter === "active" ? p.active !== false : p.active === false);
    const matchesFeatured = featuredFilter === "all" || (featuredFilter === "featured" ? p.featured : true);

    return matchesSearch && matchesCat && matchesStatus && matchesFeatured;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "newest") return (b.id || "").localeCompare(a.id || "");
    return (a.displayOrder || 0) - (b.displayOrder || 0);
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Package className="w-7 h-7 text-[#0BA8EA]" />
            <span>Product Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, edit, hide, feature, or delete dehydrated food products. Changes update live on the website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-[#0BA8EA] hover:bg-[#0996D3] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA] cursor-pointer"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Active / Hidden Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA] cursor-pointer"
          >
            <option value="all">All Status (Active & Hidden)</option>
            <option value="active">Active Only</option>
            <option value="hidden">Hidden Only</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA] cursor-pointer"
          >
            <option value="displayOrder">Sort by Display Order</option>
            <option value="name">Sort by Product Name</option>
            <option value="newest">Sort by Newest</option>
          </select>
        </div>
      </div>

      {/* Products Table & Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 text-[#0BA8EA] animate-spin" />
          <span className="text-sm">Fetching product catalog...</span>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="bg-slate-950 p-12 text-center rounded-3xl border border-slate-800 text-slate-400 space-y-3">
          <Package className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Products Found</h3>
          <p className="text-xs">No products match your search query or filter selection.</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 uppercase tracking-wider text-[11px] font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-4">Product</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Order</th>
                  <th className="py-4 px-4">Featured</th>
                  <th className="py-4 px-4">Visibility</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sortedProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.image || "/images/products/neem-powder.png"}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-sm text-white">{prod.name}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{prod.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-slate-300">
                        {prod.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">#{prod.displayOrder || 1}</td>
                    <td className="py-3.5 px-4">
                      {prod.featured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-bold text-[10px]">
                          <Star className="w-3 h-3 fill-yellow-400" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(prod)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer transition-colors ${
                          prod.active !== false
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                        }`}
                        title="Click to toggle visibility on public site"
                      >
                        {prod.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{prod.active !== false ? "Active" : "Hidden"}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4 text-sky-400" />
                        </button>
                        <button
                          onClick={() => promptDelete(prod)}
                          className="p-2 text-slate-300 hover:text-red-400 bg-slate-900 hover:bg-red-950/40 rounded-xl border border-slate-800 hover:border-red-800 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-100 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Package className="w-6 h-6 text-[#0BA8EA]" />
                <span>{editingProduct.id ? "Edit Product" : "Add New Product"}</span>
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="e.g. Dehydrated Carrot Powder"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Category *
                  </label>
                  <select
                    value={editingProduct.categorySlug || ""}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.slug === e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        categorySlug: e.target.value,
                        category: cat ? cat.name : "General",
                      });
                    }}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Display Order Position
                  </label>
                  <input
                    type="number"
                    value={editingProduct.displayOrder || 1}
                    onChange={(e) => setEditingProduct({ ...editingProduct, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Short Summary / Card Description *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.shortDescription || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  placeholder="A concise overview shown on product cards..."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Full Detailed Description
                </label>
                <textarea
                  rows={4}
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Detailed technical overview, processing method, and export applications..."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                />
              </div>

              {/* Main Image Uploader */}
              <ImageUploader
                label="Primary Product Image"
                value={editingProduct.image || ""}
                onChange={(url) => setEditingProduct({ ...editingProduct, image: url })}
              />

              {/* Additional Details: Form & Packaging */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Available Form
                  </label>
                  <input
                    type="text"
                    value={editingProduct.availableForm || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, availableForm: e.target.value })}
                    placeholder="e.g. Powder / Flakes / Slices"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Packaging Specification
                  </label>
                  <input
                    type="text"
                    value={editingProduct.packaging || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, packaging: e.target.value })}
                    placeholder="e.g. 25 kg HDPE Bags with inner liner"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                  />
                </div>
              </div>

              {/* Product Specifications Editor */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Technical Specifications
                  </label>
                  <button
                    type="button"
                    onClick={() => setSpecs([...specs, { label: "", value: "" }])}
                    className="text-xs font-bold text-[#0BA8EA] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Spec Line
                  </button>
                </div>
                {specs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Label (e.g. Moisture)"
                      value={spec.label}
                      onChange={(e) => {
                        const copy = [...specs];
                        copy[index].label = e.target.value;
                        setSpecs(copy);
                      }}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. < 6%)"
                      value={spec.value}
                      onChange={(e) => {
                        const copy = [...specs];
                        copy[index].value = e.target.value;
                        setSpecs(copy);
                      }}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setSpecs(specs.filter((_, i) => i !== index))}
                      className="p-2 text-slate-500 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Switches: Featured & Active */}
              <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="w-4 h-4 rounded-sm border-slate-700 bg-slate-950 text-[#0BA8EA] focus:ring-[#0BA8EA]"
                  />
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Featured on Homepage
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.active !== false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, active: e.target.checked })}
                    className="w-4 h-4 rounded-sm border-slate-700 bg-slate-950 text-[#0BA8EA] focus:ring-[#0BA8EA]"
                  />
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    Active / Publicly Visible
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-[#0BA8EA] hover:bg-[#0996D3] transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${productToDelete?.name}"? This action cannot be undone and will immediately remove the product from the public website.`}
        confirmLabel="Delete Product"
        isDangerous={true}
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setProductToDelete(null);
        }}
      />

      <ToastNotification toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((item) => item.id !== id))} />
    </div>
  );
}
