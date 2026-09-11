import React, { useState } from "react";
import { Upload, X, Check, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadImageToStorage } from "@/lib/media";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUploader({ value, onChange, label = "Image Upload", className = "" }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WebP, SVG).");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit. Please select a smaller image.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const url = await uploadImageToStorage(file);
      onChange(url);
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">{label}</label>}

      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video flex items-center justify-center p-2 max-h-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded Preview" className="max-h-full max-w-full object-contain rounded-lg" onError={(e) => { e.currentTarget.src = "/logo.png"; }} />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <label className="p-2 bg-white text-gray-800 rounded-xl hover:bg-gray-100 cursor-pointer text-xs font-semibold shadow-md flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Replace</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />
            </label>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 text-xs font-semibold shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <label className="border-2 border-dashed border-gray-300 hover:border-[#0BA8EA] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-sky-50/30 group">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="w-8 h-8 text-[#0BA8EA] animate-spin" />
              <span className="text-xs font-medium text-gray-600">Uploading media file...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="p-3 bg-white text-gray-400 group-hover:text-[#0BA8EA] rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700 group-hover:text-[#0BA8EA]">Click to select an image</p>
                <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WebP up to 5MB</p>
              </div>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />
        </label>
      )}

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
