import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { InquiryProvider } from "@/context/InquiryContext";
import PublicLayoutWrapper from "@/components/PublicLayoutWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const seoKeywords = [
  "AK Enterprise Corp",
  "AK Enterprises Corp",
  "AK Enterprise Corp official website",
  "AK Enterprise Corp India",
  "AK Enterprise Corp products",
  "AK Enterprise Corp services",
  "AK Enterprise Corp contact details",
  "AK Enterprise Corp business",
  "AK Enterprise Corp supplier",
  "AK Enterprise Corp company profile",
  "best companies in India",
  "trusted business supplier in India",
  "reliable product supplier",
  "wholesale supplier in India",
  "industrial products supplier",
  "business solutions provider",
  "corporate services in India",
  "manufacturer in India",
  "distributor in India",
  "product supplier near me",
  "best supplier near me",
  "affordable business solutions",
  "quality products supplier",
  "professional business services",
  "leading enterprise solutions",
  "trusted company in India",
  "products and services in India",
  "wholesale products",
  "B2B supplier India",
  "business-to-business services",
  "company contact information",
  "product catalogue",
  "online product enquiry",
  "supplier quotation",
  "local business services",
  "top-rated supplier",
  "reliable manufacturer",
  "enterprise company website",
  "business products and services",
  "Google SEO keywords",
  "local SEO keywords",
  "product-specific SEO keywords",
  "long-tail SEO keywords",
  "transactional search keywords",
  "dehydrated food products",
  "herbal powders supplier",
  "dehydrated vegetables India",
];

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://akenterprisecorp.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default:
      "AK Enterprise Corp | Trusted Business Supplier, Manufacturer & B2B Solutions India",
    template: "%s | AK Enterprise Corp",
  },
  description:
    "Official website of AK Enterprise Corp (AK Enterprises Corp). A trusted business supplier, reliable manufacturer, and leading wholesale distributor in India. Explore our company profile, product catalogue, industrial products, business solutions, and request supplier quotations.",
  keywords: seoKeywords,
  authors: [{ name: "AK Enterprise Corp", url: baseUrl }],
  creator: "AK Enterprise Corp",
  publisher: "AK Enterprise Corp",
  applicationName: "AK Enterprise Corp",
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "AK Enterprise Corp",
    title:
      "AK Enterprise Corp | Official Website & Trusted Business Supplier in India",
    description:
      "AK Enterprise Corp (AK Enterprises Corp) is a premier B2B supplier, wholesale distributor, and manufacturer of quality products and enterprise business solutions in India.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "AK Enterprise Corp Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Enterprise Corp | Official Website",
    description:
      "Trusted business supplier, manufacturer, and wholesale products partner in India.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: [{ rel: "apple-touch-icon", url: "/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${baseUrl}/#organization`,
        name: "AK Enterprise Corp",
        alternateName: [
          "AK Enterprises Corp",
          "AK Enterprise",
          "AK Enterprises",
        ],
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        image: `${baseUrl}/logo.png`,
        description:
          "AK Enterprise Corp is a trusted business supplier, reliable manufacturer, and leading wholesale provider of dehydrated foods, natural ingredients, and industrial business solutions in India.",
        telephone: "+91-9502947144",
        email: "akenterprisecorp@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "28-10-9 Jaleel Street, Arundalpet",
          addressLocality: "Vijayawada",
          addressRegion: "Andhra Pradesh",
          postalCode: "520002",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "16.5062",
          longitude: "80.6480",
        },
        priceRange: "$$",
        currenciesAccepted: "INR, USD, EUR",
        paymentAccepted: "Cash, Bank Transfer, Letter of Credit",
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-9502947144",
            contactType: "customer service",
            areaServed: ["IN", "US", "GB", "AE", "EU"],
            availableLanguage: ["English", "Hindi", "Telugu"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "AK Enterprise Corp",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/products?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#16244A] antialiased">
        <InquiryProvider>
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </InquiryProvider>
      </body>
    </html>
  );
}
