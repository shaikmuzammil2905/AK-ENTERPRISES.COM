"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  FolderTree,
  Eye,
  EyeOff,
  Star,
  Plus,
  ArrowRight,
  Database,
  CheckCircle2,
  Clock,
  Sparkles,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { getProducts, getCategories, getActivityLogs, seedInitialData } from "@/lib/db";
import { Product, Category, ActivityLog } from "@/types";
import ToastNotification, { ToastMessage } from "@/components/admin/ToastNotification";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", message: string) => {
    setToasts((prev) => [...prev, { id: `toast-${Date.now()}`, type, message }]);
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [prodsData, catsData, logsData] = await Promise.all([
        getProducts(true),
        getCategories(true),
        getActivityLogs(10),
      ]);
      setProducts(prodsData);
      setCategories(catsData);
      setLogs(logsData);
    } catch (err: any) {
      addToast("error", "Failed to fetch dashboard metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSeedData = async () => {
    setSeeding(true);
    const res = await seedInitialData();
    setSeeding(false);
    if (res.success) {
      addToast("success", res.message);
      loadDashboardData();
    } else {
      addToast("error", res.message);
    }
  };

  const activeProducts = products.filter((p) => p.active !== false).length;
  const hiddenProducts = products.filter((p) => p.active === false).length;
  const featuredProducts = products.filter((p) => p.featured).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 text-[#0BA8EA] animate-spin" />
        <span className="text-sm font-medium">Loading Dashboard metrics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">AK Enterprises Admin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Overview & Content Stats</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Manage website catalog, categories, and dynamic content.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSeedData}
            disabled={seeding}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
            title="Populate Supabase tables with initial static products and categories"
          >
            {seeding ? <Loader2 className="w-4 h-4 animate-spin text-[#0BA8EA]" /> : <Database className="w-4 h-4 text-[#0BA8EA]" />}
            <span>Sync Default Data</span>
          </button>

          <Link
            href="/admin/products?action=add"
            className="px-4 py-2.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
            <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">{products.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Items in catalog</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Public</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{activeProducts}</div>
            <p className="text-[11px] text-slate-400 mt-1">Visible on website</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Hidden Products</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <EyeOff className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{hiddenProducts}</div>
            <p className="text-[11px] text-slate-400 mt-1">Draft or hidden</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Categories</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">{categories.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Active categories</p>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Featured</span>
            <div className="p-2 bg-yellow-500/10 text-yellow-400 rounded-xl">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-yellow-400">{featuredProducts}</div>
            <p className="text-[11px] text-slate-400 mt-1">Homepage featured</p>
          </div>
        </div>
      </div>

      {/* Main Content Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Products List */}
        <div className="lg:col-span-2 bg-slate-950/80 rounded-3xl border border-slate-800/80 p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">Product Catalog Preview</h2>
              <p className="text-xs text-slate-400">Recently added and managed products</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-[#0BA8EA] hover:underline flex items-center gap-1"
            >
              <span>Manage All Products ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/60">
            {products.slice(0, 6).map((product) => (
              <div key={product.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image || "/images/products/neem-powder.png"}
                    alt={product.name}
                    className="w-11 h-11 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white truncate">{product.name}</h3>
                      {product.featured && (
                        <span className="px-1.5 py-0.5 rounded-md bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{product.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      product.active !== false
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {product.active !== false ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Activity Logs & Quick Links */}
        <div className="space-y-8">
          {/* Quick Shortcuts */}
          <div className="bg-slate-950/80 rounded-3xl border border-slate-800/80 p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Management Shortcuts</h2>
            <div className="grid grid-cols-1 gap-2.5">
              <Link
                href="/admin/homepage"
                className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-sm font-semibold text-slate-200 border border-slate-800 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#0BA8EA]" />
                  <span>Edit Homepage Banner & Content</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/admin/categories"
                className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-sm font-semibold text-slate-200 border border-slate-800 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FolderTree className="w-4 h-4 text-purple-400" />
                  <span>Manage Product Categories</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/admin/pages"
                className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-sm font-semibold text-slate-200 border border-slate-800 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Contact Details & Certifications</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Admin Activity Stream */}
          <div className="bg-slate-950/80 rounded-3xl border border-slate-800/80 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Recent Activity Log</h2>
              <Link href="/admin/activity" className="text-xs text-[#0BA8EA] font-semibold hover:underline">
                View All
              </Link>
            </div>

            {logs.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">No recorded admin actions yet.</p>
            ) : (
              <div className="space-y-3">
                {logs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-start gap-3 text-xs border-b border-slate-900 pb-2.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-200 font-semibold">{log.action}</p>
                      <p className="text-[11px] text-slate-400">{log.details || log.itemType}</p>
                      <span className="text-[10px] text-slate-500">{new Date(log.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastNotification toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((item) => item.id !== id))} />
    </div>
  );
}
