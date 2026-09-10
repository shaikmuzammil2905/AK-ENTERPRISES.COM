"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";

/**
 * Hero — full-width background image with text overlaid on the left.
 *
 * Desktop: tall hero, products visible on right side of BG image.
 * Mobile:  shorter hero, products still visible, text on left.
 *
 * Single render tree. Background via CSS background-image (not <Image>).
 */
export default function Hero() {
  const { openInquiry } = useInquiry();

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundImage: "url(/images/hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
        animation: "heroZoom 20s ease-in-out infinite alternate",
      }}
    >
      {/* Light overlay for text readability on the left side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(232,244,253,0.92) 0%, rgba(232,244,253,0.75) 40%, rgba(232,244,253,0.15) 65%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      {/* Content container — left-aligned text, right side shows the BG image */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3rem 1.25rem",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <span
            style={{
              width: "1.5rem",
              height: "2px",
              background: "#0BA8EA",
              borderRadius: "9999px",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#0BA8EA",
              textTransform: "uppercase" as const,
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
            lineHeight: 1.1,
            marginBottom: "1rem",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            maxWidth: "600px",
          }}
        >
          Premium Dehydrated
          <br />
          <span style={{ color: "#0BA8EA" }}>Food Ingredients</span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
            color: "#4A5568",
            lineHeight: 1.6,
            marginBottom: "2rem",
            maxWidth: "480px",
          }}
        >
          Explore our range of dehydrated vegetables, herbal powders,
          masala powders and natural food ingredients for B2B supply
          and export/import requirements.
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-buttons"
          style={{
            display: "flex",
            gap: "0.875rem",
            flexWrap: "wrap" as const,
          }}
        >
          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              background: "#0BA8EA",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.9375rem",
              borderRadius: "9999px",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(11,168,234,0.35)",
              minHeight: "48px",
              transition: "background 0.2s",
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
              minHeight: "48px",
              transition: "background 0.2s",
            }}
          >
            <Mail style={{ width: "1rem", height: "1rem" }} />
            Send Inquiry
          </button>
        </div>
      </div>

      {/* Responsive padding for desktop */}
      <style>{`
        .hero-content {
          padding: 3rem 1.25rem !important;
        }
        @media (min-width: 768px) {
          .hero-content {
            padding: 5rem 3rem !important;
            min-height: 440px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
        @media (min-width: 1024px) {
          .hero-content {
            padding: 5rem 4rem !important;
            min-height: 500px;
          }
        }
      `}</style>
    </section>
  );
}
