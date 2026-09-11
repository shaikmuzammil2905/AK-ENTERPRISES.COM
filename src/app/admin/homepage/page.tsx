"use client";

import React, { useEffect, useState } from "react";
import { Home, Sparkles, CheckCircle2, Loader2, Save, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { getSiteContent, saveSiteContent } from "@/lib/db";
import { HeroContent, WhyChooseContent, PreFooterCTAContent, WhyChoosePoint } from "@/types";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastNotification, { ToastMessage } from "@/components/admin/ToastNotification";

export default function AdminHomepageEditor() {
  const [hero, setHero] = useState<HeroContent>({
    eyebrow: "DEHYDRATED PRODUCTS | FOOD INGREDIENTS | GLOBAL EXPORT SUPPLY",
    title: "Premium Dehydrated Vegetables & Herbal Powders",
    description: "Leading processor and exporter of premium quality dehydrated vegetables, herbal powders, masala powders, and natural food ingredients.",
    badge: "PROVEN QUALITY | GLOBAL EXPORT",
    primaryBtnText: "Explore Products",
    primaryBtnLink: "/products",
    secondaryBtnText: "Contact Us",
    secondaryBtnLink: "/contact",
    heroImage: "/images/hero-dehydrated-food.png",
    visible: true,
  });

  const [whyChoose, setWhyChoose] = useState<WhyChooseContent>({
    title: "Why Choose AK Enterprises?",
    subtitle: "YOUR TRUSTED B2B PARTNER FOR DEHYDRATED FOOD INGREDIENTS",
    description: "We deliver supreme quality dehydrated food products and natural powders processed under strict quality controls for worldwide supply.",
    points: [
      { id: "1", title: "100% Pure & Natural", description: "Sourced from select harvests with zero artificial additives.", icon: "CheckCircle" },
      { id: "2", title: "Global Export Quality", description: "Processed to meet rigorous export standards.", icon: "Globe" },
      { id: "3", title: "Custom Packaging & Bulk Supply", description: "Tailored B2B packaging options for food processors.", icon: "Package" },
      { id: "4", title: "Reliable On-Time Delivery", description: "Efficient supply chain ensuring timely global dispatch.", icon: "Truck" },
    ],
    visible: true,
  });

  const [cta, setCta] = useState<PreFooterCTAContent>({
    title: "Looking for Bulk Dehydrated Food Ingredients?",
    description: "Contact AK Enterprises today for technical specifications, product samples, and competitive wholesale pricing.",
    buttonText: "Request Wholesale Quote",
    visible: true,
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", message: string) => {
    setToasts((prev) => [...prev, { id: `toast-${Date.now()}`, type, message }]);
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [heroData, whyData, ctaData] = await Promise.all([
          getSiteContent<HeroContent>("hero", hero),
          getSiteContent<WhyChooseContent>("why_choose", whyChoose),
          getSiteContent<PreFooterCTAContent>("pre_footer_cta", cta),
        ]);
        setHero(heroData);
        setWhyChoose(whyData);
        setCta(ctaData);
      } catch (err) {
        addToast("error", "Failed to load homepage content.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await Promise.all([
        saveSiteContent("hero", hero),
        saveSiteContent("why_choose", whyChoose),
        saveSiteContent("pre_footer_cta", cta),
      ]);
      addToast("success", "Homepage content saved and updated live on the website!");
    } catch (err: any) {
      addToast("error", err.message || "Failed to save homepage settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 text-[#0BA8EA] animate-spin" />
        <span className="text-sm">Loading Homepage content editor...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSaveAll} className="space-y-8 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Home className="w-7 h-7 text-[#0BA8EA]" />
            <span>Homepage Section Editor</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Customize the public homepage hero banner, feature cards, and pre-footer CTA.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3 bg-[#0BA8EA] hover:bg-[#0996D3] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0BA8EA]" />
              <span>Hero Banner Section</span>
            </h2>
            <p className="text-xs text-slate-400">Configure top hero text, buttons, and featured background image.</p>
          </div>
          <button
            type="button"
            onClick={() => setHero({ ...hero, visible: !hero.visible })}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              hero.visible !== false
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
            }`}
          >
            {hero.visible !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{hero.visible !== false ? "Visible" : "Hidden"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Eyebrow Top Line
            </label>
            <input
              type="text"
              value={hero.eyebrow}
              onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Main Hero Heading Title
            </label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Hero Subtitle / Description Paragraph
            </label>
            <textarea
              rows={3}
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Primary Button Text
            </label>
            <input
              type="text"
              value={hero.primaryBtnText}
              onChange={(e) => setHero({ ...hero, primaryBtnText: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Primary Button Link
            </label>
            <input
              type="text"
              value={hero.primaryBtnLink}
              onChange={(e) => setHero({ ...hero, primaryBtnLink: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <ImageUploader
              label="Hero Section Right Graphic / Photo"
              value={hero.heroImage || ""}
              onChange={(url) => setHero({ ...hero, heroImage: url })}
            />
          </div>
        </div>
      </div>

      {/* 2. WHY CHOOSE US SECTION */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">"Why Choose Us" Feature Cards</h2>
            <p className="text-xs text-slate-400">Manage heading and value proposition benefit cards.</p>
          </div>
          <button
            type="button"
            onClick={() => setWhyChoose({ ...whyChoose, visible: !whyChoose.visible })}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              whyChoose.visible !== false
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
            }`}
          >
            {whyChoose.visible !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{whyChoose.visible !== false ? "Visible" : "Hidden"}</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={whyChoose.title}
              onChange={(e) => setWhyChoose({ ...whyChoose, title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Value Points Cards ({whyChoose.points.length})
              </label>
              <button
                type="button"
                onClick={() =>
                  setWhyChoose({
                    ...whyChoose,
                    points: [
                      ...whyChoose.points,
                      { id: `point-${Date.now()}`, title: "New Feature", description: "Feature description...", icon: "CheckCircle" },
                    ],
                  })
                }
                className="text-xs font-bold text-[#0BA8EA] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Point
              </button>
            </div>

            {whyChoose.points.map((pt, idx) => (
              <div key={pt.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    placeholder="Card Title"
                    value={pt.title}
                    onChange={(e) => {
                      const copy = [...whyChoose.points];
                      copy[idx].title = e.target.value;
                      setWhyChoose({ ...whyChoose, points: copy });
                    }}
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setWhyChoose({
                        ...whyChoose,
                        points: whyChoose.points.filter((_, i) => i !== idx),
                      })
                    }
                    className="p-1.5 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  placeholder="Card Description"
                  value={pt.description}
                  onChange={(e) => {
                    const copy = [...whyChoose.points];
                    copy[idx].description = e.target.value;
                    setWhyChoose({ ...whyChoose, points: copy });
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. PRE-FOOTER CTA SECTION */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">Pre-Footer Banner CTA</h2>
            <p className="text-xs text-slate-400">Call to action banner above website footer.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Banner Title
            </label>
            <input
              type="text"
              value={cta.title}
              onChange={(e) => setCta({ ...cta, title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Banner Description
            </label>
            <textarea
              rows={2}
              value={cta.description}
              onChange={(e) => setCta({ ...cta, description: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Button Action Text
            </label>
            <input
              type="text"
              value={cta.buttonText}
              onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>
        </div>
      </div>

      <ToastNotification toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((item) => item.id !== id))} />
    </form>
  );
}
