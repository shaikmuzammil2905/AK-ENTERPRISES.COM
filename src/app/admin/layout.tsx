"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Home,
  FileText,
  Award,
  Image as ImageIcon,
  History,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exclude auth routes from admin shell layout
  const isAuthRoute =
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password";

  useEffect(() => {
    if (isAuthRoute) {
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        setUserEmail(session.user.email || "admin@ak-enterprises.com");
      } else {
        router.push("/admin/login");
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserEmail(session.user.email || "admin@ak-enterprises.com");
      } else if (!isAuthRoute) {
        router.push("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, isAuthRoute, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (isAuthRoute) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-3">
        <Loader2 className="w-8 h-8 text-[#0BA8EA] animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading Admin Workspace...</p>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Homepage Editor", href: "/admin/homepage", icon: Home },
    { name: "Pages & Contact", href: "/admin/pages", icon: FileText },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Activity Logs", href: "/admin/activity", icon: History },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#102A63] to-[#0BA8EA] rounded-xl flex items-center justify-center text-white font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-tight leading-none">AK ADMIN</h1>
            <span className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase">Content Manager</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 text-xs font-semibold flex items-center gap-1"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 focus:outline-hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#102A63] to-[#0BA8EA] rounded-2xl flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-black text-base text-white tracking-tight">AK Enterprises</h2>
                <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider">Admin Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#0BA8EA] text-white shadow-lg shadow-sky-500/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-80" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
          </Link>

          <div className="pt-2 flex items-center justify-between">
            <div className="truncate max-w-[140px]">
              <p className="text-xs font-bold text-white truncate">{userEmail || "Admin User"}</p>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Authorized</span>
              </span>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        {/* Desktop Top Nav Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-950/60 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-bold text-slate-200">AK Admin</span>
            <span>/</span>
            <span className="capitalize text-[#0BA8EA] font-semibold">
              {pathname === "/admin" ? "Dashboard" : pathname.replace("/admin/", "").replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#0BA8EA]" />
              <span>Preview Website</span>
            </Link>

            <div className="h-4 w-px bg-slate-800" />

            <button
              onClick={handleLogout}
              className="text-xs font-bold text-slate-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
