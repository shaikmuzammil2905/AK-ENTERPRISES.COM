"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";

/**
 * Hero — single unified component, fully responsive via CSS.
 *
 * Mobile  (<768px): vertical stack — text → buttons → image
 * Desktop (≥768px): two-column — text left | image right
 *
 * NO separate mobile/desktop divs with show/hide toggling.
 * ONE render tree. CSS handles the layout shift.
 */
export default function Hero() {
  const { openInquiry } = useInquiry();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #e8f4fd 0%, #f5fbff 60%, #ffffff 100%)" }}
    >
      {/*
       * Two-column on desktop  → grid-cols-[1fr_1fr]
       * Single column on mobile → grid-cols-1
       */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          alignItems: "center",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0",
        }}
        className="hero-grid"
      >

        {/* ── LEFT / TOP: Text content ── */}
        <div
          style={{
            padding: "2.5rem 1.25rem 1.5rem",
            zIndex: 1,
          }}
          className="hero-text"
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1rem" }}>
            <span
              style={{
                flexShrink: 0,
                width: "1.5rem",
                height: "2px",
                background: "#0BA8EA",
                borderRadius: "9999px",
                marginTop: "0.55em",
              }}
            />
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#0BA8EA",
                textTransform: "uppercase",
                lineHeight: 1.4,
              }}
            >
              DEHYDRATED PRODUCTS | FOOD INGREDIENTS | IMPORT &amp; EXPORT
            </span>
          </div>

          {/* Main Heading */}
          <h1
            style={{
              fontWeight: 800,
              color: "#102A63",
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              marginBottom: "1rem",
              fontSize: "clamp(2.25rem, 9vw, 3.5rem)",
            }}
          >
            Premium Dehydrated
            <br />
            <span style={{ color: "#0BA8EA" }}>Food Ingredients</span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#4A5568",
              lineHeight: 1.6,
              marginBottom: "1.75rem",
              maxWidth: "28rem",
            }}
          >
            Explore our range of dehydrated vegetables, herbal powders, masala
            powders and natural food ingredients for B2B supply and
            export/import requirements.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxWidth: "22rem",
            }}
            className="hero-buttons"
          >
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.875rem 1.75rem",
                background: "#0BA8EA",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9375rem",
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(11,168,234,0.35)",
                transition: "background 0.2s, transform 0.2s",
                minHeight: "48px",
              }}
            >
              Explore Products
              <ArrowRight style={{ width: "1rem", height: "1rem" }} />
            </Link>

            <button
              type="button"
              onClick={() => openInquiry()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.875rem 1.75rem",
                background: "#ffffff",
                color: "#0BA8EA",
                fontWeight: 700,
                fontSize: "0.9375rem",
                borderRadius: "9999px",
                border: "2px solid #0BA8EA",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "background 0.2s",
                minHeight: "48px",
              }}
            >
              <Mail style={{ width: "1rem", height: "1rem" }} />
              Send Inquiry
            </button>
          </div>
        </div>

        {/* ── RIGHT / BOTTOM: Hero Image ── */}
        <div
          style={{ position: "relative", width: "100%", lineHeight: 0 }}
          className="hero-image-wrap"
        >
          <Image
            src="/images/hero-bg.png"
            alt="Premium dehydrated vegetables, herbs, masala powders and natural food ingredients – AK Enterprises"
            width={1568}
            height={880}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              display: "block",
              animation: "heroZoom 20s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>

      {/* Responsive grid override */}
      <style>{`
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            min-height: 480px;
          }
          .hero-text {
            padding: 3.5rem 2rem 3.5rem 3rem !important;
          }
          .hero-image-wrap {
            height: 100%;
          }
          .hero-image-wrap img {
            height: 100% !important;
            object-fit: cover !important;
          }
          .hero-buttons {
            flex-direction: row !important;
            max-width: 100% !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-text {
            padding: 4rem 2rem 4rem 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
