"use client";

import React, { useEffect, useState } from "react";
import { FolderTree, Plus, Edit2, Trash2, Eye, EyeOff, Loader2, X, CheckCircle2 } from "lucide-react";
import { getCategories, saveCategory, deleteCategory } from "@/lib/db";
import { Category } from "@/types";
import ImageUploader from "@/components/admin/ImageUploader";
import ConfirmModal from "@/components/admin/ConfirmModal";
import ToastNotification, { ToastMessage } from "@/components/admin/ToastNotification";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<Category>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirm State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", message: string) => {
    setToasts((prev) => [...prev, { id: `toast-${Date.now()}`, type, message }]);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getCategories(true);
      setCategories(data);
    } catch (err) {
      addToast("error", "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingCategory({
      name: "",
      shortDescription: "",
      image: "/images/categories/dehydrated-vegetables.png",
      iconName: "Package",
      displayOrder: categories.length + 1,
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory.name) {
      addToast("error", "Category name is required.");
      return;
    }

    setIsSaving(true);
    try {
      await saveCategory(editingCategory);
      addToast("success", editingCategory.id ? "Category updated!" : "Category created successfully!");
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      addToast("error", err.message || "Failed to save category.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (cat: Category) => {
    try {
      await saveCategory({ ...cat, active: !cat.active });
      addToast("success", cat.active ? "Category hidden." : "Category activated.");
      loadData();
    } catch (err: any) {
      addToast("error", "Failed to update category status.");
    }
  };

  const promptDelete = (cat: Category) => {
    setCategoryToDelete(cat);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    try {
      await deleteCategory(categoryToDelete.id);
      addToast("success", `Category "${categoryToDelete.name}" deleted.`);
      setDeleteConfirmOpen(false);
      setCategoryToDelete(null);
      loadData();
    } catch (err: any) {
      addToast("error", err.message || "Failed to delete category.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FolderTree className="w-7 h-7 text-purple-400" />
            <span>Category Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize dehydrated products into custom categories with custom icons, images, and ordering.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-[#0BA8EA] hover:bg-[#0996D3] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 text-[#0BA8EA] animate-spin" />
          <span className="text-sm">Loading categories...</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-slate-950 p-12 text-center rounded-3xl border border-slate-800 text-slate-400 space-y-3">
          <FolderTree className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Categories Found</h3>
          <p className="text-xs">Click "Add New Category" to create your first category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden p-6 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image || "/images/categories/dehydrated-vegetables.png"}
                      alt={cat.name}
                      className="w-12 h-12 rounded-2xl object-cover bg-slate-900 border border-slate-800 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-base text-white">{cat.name}</h3>
                      <p className="text-[11px] text-slate-400 font-mono">slug: /{cat.slug}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                    Order #{cat.displayOrder || 1}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {cat.shortDescription || "No category description set."}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(cat)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    cat.active !== false
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {cat.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{cat.active !== false ? "Active" : "Hidden"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit2 className="w-4 h-4 text-sky-400" />
                  </button>
                  <button
                    onClick={() => promptDelete(cat)}
                    className="p-2 text-slate-300 hover:text-red-400 bg-slate-900 rounded-xl border border-slate-800 hover:border-red-900 cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <FolderTree className="w-6 h-6 text-purple-400" />
                <span>{editingCategory.id ? "Edit Category" : "Add New Category"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ""}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="e.g. Dehydrated Vegetables"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingCategory.shortDescription || ""}
                  onChange={(e) => setEditingCategory({ ...editingCategory, shortDescription: e.target.value })}
                  placeholder="Short explanation of this product category..."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                />
              </div>

              <ImageUploader
                label="Category Banner / Image"
                value={editingCategory.image || ""}
                onChange={(url) => setEditingCategory({ ...editingCategory, image: url })}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Icon Name (Lucide)
                  </label>
                  <input
                    type="text"
                    value={editingCategory.iconName || "Package"}
                    onChange={(e) => setEditingCategory({ ...editingCategory, iconName: e.target.value })}
                    placeholder="e.g. Carrot, Leaf, Utensils"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingCategory.displayOrder || 1}
                    onChange={(e) => setEditingCategory({ ...editingCategory, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0BA8EA]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-[#0BA8EA] hover:bg-[#0996D3] transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="Delete Category"
        message={`Are you sure you want to delete category "${categoryToDelete?.name}"? Products assigned to this category will revert to general catalog.`}
        confirmLabel="Delete Category"
        isDangerous={true}
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setCategoryToDelete(null);
        }}
      />

      <ToastNotification toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((item) => item.id !== id))} />
    </div>
  );
}
