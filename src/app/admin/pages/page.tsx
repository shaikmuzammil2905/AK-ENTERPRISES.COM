"use client";

import React, { useEffect, useState } from "react";
import { FileText, Phone, Mail, MapPin, Award, Plus, Trash2, Edit2, Loader2, Save, X, CheckCircle2 } from "lucide-react";
import { getSiteContent, saveSiteContent, getCertifications, saveCertification, deleteCertification } from "@/lib/db";
import { CompanyInfo, Certification } from "@/types";
import ImageUploader from "@/components/admin/ImageUploader";
import ConfirmModal from "@/components/admin/ConfirmModal";
import ToastNotification, { ToastMessage } from "@/components/admin/ToastNotification";

export default function AdminPagesEditor() {
  const [company, setCompany] = useState<CompanyInfo>({
    name: "AK ENTERPRISES",
    tagline: "Dehydrated Products | Food Ingredients | Global Export Supply",
    eyebrow: "DEHYDRATED PRODUCTS | FOOD INGREDIENTS | GLOBAL EXPORT SUPPLY",
    businessType: "Import & Export",
    businessFocus: "Dehydrated food products, vegetables, herbal powders, masala powders, natural powders and food ingredients.",
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
  });

  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Cert modal
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Partial<Certification>>({});
  const [certConfirmOpen, setCertConfirmOpen] = useState(false);
  const [certToDelete, setCertToDelete] = useState<Certification | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", message: string) => {
    setToasts((prev) => [...prev, { id: `toast-${Date.now()}`, type, message }]);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [compData, certsData] = await Promise.all([
        getSiteContent<CompanyInfo>("company_info", company),
        getCertifications(true),
      ]);
      setCompany(compData);
      setCertifications(certsData);
    } catch (err) {
      addToast("error", "Failed to fetch site content settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveSiteContent("company_info", company);
      addToast("success", "Company contact information updated live!");
    } catch (err: any) {
      addToast("error", err.message || "Failed to save company details.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert.name) return;
    try {
      await saveCertification(editingCert);
      addToast("success", "Certification saved!");
      setCertModalOpen(false);
      loadData();
    } catch (err: any) {
      addToast("error", "Failed to save certification.");
    }
  };

  const confirmDeleteCert = async () => {
    if (!certToDelete) return;
    try {
      await deleteCertification(certToDelete.id);
      addToast("success", `Certification "${certToDelete.name}" deleted.`);
      setCertConfirmOpen(false);
      setCertToDelete(null);
      loadData();
    } catch (err: any) {
      addToast("error", "Failed to delete certification.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 text-[#0BA8EA] animate-spin" />
        <span className="text-sm">Loading page settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-emerald-400" />
            <span>Pages & Contact Information</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage contact details, phone numbers, WhatsApp, office address, and certification badges.
          </p>
        </div>
      </div>

      {/* COMPANY CONTACT INFORMATION */}
      <form onSubmit={handleSaveCompany} className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#0BA8EA]" />
              <span>Contact Details & Business Identity</span>
            </h2>
            <p className="text-xs text-slate-400">Used across Header, Footer, and Contact page.</p>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2.5 bg-[#0BA8EA] hover:bg-[#0996D3] text-white font-bold text-xs rounded-2xl flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Contact Info</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Primary Contact Email
            </label>
            <input
              type="email"
              required
              value={company.email}
              onChange={(e) => setCompany({ ...company, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              WhatsApp Inquiry Number (10 digits)
            </label>
            <input
              type="text"
              required
              value={company.whatsapp}
              onChange={(e) => setCompany({ ...company, whatsapp: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Phone Number 1
            </label>
            <input
              type="text"
              value={company.phones[0] || ""}
              onChange={(e) => {
                const p = [...company.phones];
                p[0] = e.target.value;
                setCompany({ ...company, phones: p });
              }}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Phone Number 2 (Optional)
            </label>
            <input
              type="text"
              value={company.phones[1] || ""}
              onChange={(e) => {
                const p = [...company.phones];
                p[1] = e.target.value;
                setCompany({ ...company, phones: p });
              }}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white text-sm"
            />
          </div>

          <div className="sm:col-span-2 space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Physical Office Address
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Door / Building No."
                value={company.address.line1}
                onChange={(e) => setCompany({ ...company, address: { ...company.address, line1: e.target.value } })}
                className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="Street / Area"
                value={company.address.line2}
                onChange={(e) => setCompany({ ...company, address: { ...company.address, line2: e.target.value } })}
                className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="City, State & Zip"
                value={company.address.cityStateZip}
                onChange={(e) => setCompany({ ...company, address: { ...company.address, cityStateZip: e.target.value } })}
                className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>
      </form>

      {/* CERTIFICATIONS & REGISTRATIONS */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>Certifications & Quality Registrations</span>
            </h2>
            <p className="text-xs text-slate-400">Display ISO, FSSAI, APEDA, or Spices Board certification badges.</p>
          </div>
          <button
            onClick={() => {
              setEditingCert({ name: "", image: "/images/certifications/iso.png", displayOrder: certifications.length + 1, active: true });
              setCertModalOpen(true);
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#0BA8EA]" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-between gap-3 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cert.image} alt={cert.name} className="w-16 h-16 object-contain rounded-xl bg-white p-2" />
              <div>
                <p className="font-bold text-xs text-white">{cert.name}</p>
                <span className="text-[10px] text-slate-500 font-mono">Order #{cert.displayOrder}</span>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800 w-full justify-center">
                <button
                  onClick={() => {
                    setEditingCert(cert);
                    setCertModalOpen(true);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setCertToDelete(cert);
                    setCertConfirmOpen(true);
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cert Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">
                {editingCert.id ? "Edit Certification" : "Add Certification"}
              </h3>
              <button onClick={() => setCertModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Certification Name
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.name || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                  placeholder="e.g. ISO 9001 Certified"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <ImageUploader
                label="Badge Graphic Image"
                value={editingCert.image || ""}
                onChange={(url) => setEditingCert({ ...editingCert, image: url })}
              />

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-300 bg-slate-900 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0BA8EA] rounded-xl flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cert Delete Modal */}
      <ConfirmModal
        isOpen={certConfirmOpen}
        title="Delete Certification"
        message={`Are you sure you want to delete "${certToDelete?.name}"?`}
        confirmLabel="Delete"
        isDangerous={true}
        onConfirm={confirmDeleteCert}
        onClose={() => setCertConfirmOpen(false)}
      />

      <ToastNotification toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((item) => item.id !== id))} />
    </div>
  );
}
