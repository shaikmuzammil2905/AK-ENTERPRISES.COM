import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { InquiryProvider } from "@/context/InquiryContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBottomNav from "@/components/MobileBottomNav";
import InquiryModal from "@/components/InquiryModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akenterprises.com"),
  title: "AK Enterprises | Dehydrated Food Products & Food Ingredients",
  description:
    "AK Enterprises is a premier B2B supplier and exporter of dehydrated vegetables, herbal powders, masala powders, and natural food ingredients.",
  keywords: [
    "AK Enterprises",
    "Dehydrated Vegetables",
    "Herbal Powders",
    "Masala Powders",
    "Natural Powders",
    "Food Ingredients",
    "B2B Food Supply",
    "Export Food Ingredients India",
  ],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-[#16244A] antialiased">
        <InquiryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <MobileBottomNav />
          <InquiryModal />
        </InquiryProvider>
      </body>
    </html>
  );
}
