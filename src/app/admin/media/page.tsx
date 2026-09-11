"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Upload, Copy, Check, ExternalLink } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastNotification, { ToastMessage } from "@/components/admin/ToastNotification";

export default function AdminMediaLibrary() {
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", message: string) => {
    setToasts((prev) => [...prev, { id: `toast-${Date.now()}`, type, message }]);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    addToast("success", "Image URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const defaultMediaSamples = [
    { name: "Neem Powder", url: "/images/products/neem-powder.png" },
    { name: "Dehydrated Beetroot", url: "/images/products/dehydrated-beetroot-powder.png" },
    { name: "Moringa Powder", url: "/images/products/moringa-powder.png" },
    { name: "Bottle Gourd Powder", url: "/images/products/dehydrated-bottle-gourd-powder.png" },
    { name: "Moringa Chutney", url: "/images/products/moringa-chutney-powder.png" },
    { name: "Dry Ginger Powder", url: "/images/products/dry-ginger-powder.png" },
    { name: "Curry Leaf Powder", url: "/images/products/dehydrated-curry-leaf-powder.png" },
    { name: "Dehydrated Vegetables Category", url: "/images/categories/dehydrated-vegetables.png" },
    { name: "Herbal Powders Category", url: "/images/categories/herbal-powders.png" },
    { name: "Masala Powders Category", url: "/images/categories/masala-powders.png" },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <ImageIcon className="w-7 h-7 text-[#0BA8EA]" />
            <span>Media Library & Image Uploads</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload new high-resolution product photos or banner assets and obtain shareable media URLs.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Upload className="w-5 h-5 text-[#0BA8EA]" />
          <span>Upload Media Asset</span>
        </h2>

        <ImageUploader
          label="Select File to Upload to Cloud Storage"
          value={uploadedUrl}
          onChange={(url) => {
            setUploadedUrl(url);
            addToast("success", "Image uploaded successfully!");
          }}
        />

        {uploadedUrl && (
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Generated Public URL</span>
              <p className="text-xs font-mono text-sky-400 truncate">{uploadedUrl}</p>
            </div>
            <button
              onClick={() => handleCopyUrl(uploadedUrl)}
              className="px-4 py-2 bg-[#0BA8EA] hover:bg-[#0996D3] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Stock Media Assets */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white">Existing Website Images</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {defaultMediaSamples.map((item, idx) => (
            <div key={idx} className="bg-slate-900 rounded-2xl border border-slate-800 p-3 space-y-2 group">
              <div className="aspect-square bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <p className="text-xs font-bold text-white truncate">{item.name}</p>
              <button
                onClick={() => handleCopyUrl(item.url)}
                className="w-full py-1.5 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Copy className="w-3 h-3 text-[#0BA8EA]" />
                <span>Copy Path</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <ToastNotification toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((item) => item.id !== id))} />
    </div>
  );
}
