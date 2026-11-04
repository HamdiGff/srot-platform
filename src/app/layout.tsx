import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const viewport: Viewport = {
  themeColor: "#05080d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://srot-platform.vercel.app"),
  title: {
    default: "SROT Platform | Digital Agronomy & Certified Veterinary Healthcare (বাংলাদেশ)",
    template: "%s | SROT Platform Bangladesh",
  },
  description:
    "Bangladesh's verified digital agriculture & veterinary operating system. Direct tele-consultation with DAE agronomists and BVC veterinary surgeons. AI crop pest diagnosis, doorstep soil testing, bovine herd health, and tamper-proof digital prescriptions.",
  keywords: [
    "SROT",
    "Digital Agriculture Bangladesh",
    "কৃষি ও প্রাণিসম্পদ স্বাস্থ্য",
    "ধানের রোগ ব্লাস্ট",
    "গাভীর ওলান পাকা চিকিৎসা",
    "ভেটেরিনারি সার্জন কনসালটেশন",
    "DAE Agronomist Bangladesh",
    "BVC Veterinary Doctor",
    "Soil NPK Testing Bangladesh",
    "Pet Care Telehealth Dhaka",
    "কৃষি সম্প্রসারণ অধিদপ্তর প্রেসক্রিপশন",
    "বাংলাদেশ ভেটেরিনারি কাউন্সিল",
  ],
  authors: [{ name: "SROT Directorate of Agricultural & Animal Health" }],
  creator: "SROT Digital Platform",
  publisher: "SROT Directorate",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SROT Platform | Digital Agronomy & Certified Veterinary Healthcare",
    description:
      "Connect with certified plant pathologists and veterinary surgeons in under 15 minutes. Instant AI visual triage, doorstep lab dispatch, and tamper-proof digital prescriptions across Bangladesh.",
    url: "https://srot-platform.vercel.app",
    siteName: "SROT Platform",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SROT Precision Farm & Clinical Suite V3.5",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SROT Platform | Digital Agronomy & Certified Veterinary Healthcare",
    description:
      "Instant AI crop & livestock pathology triage, verified DAE/BVC prescriptions, and mobile soil laboratory dispatch in Bangladesh.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": "https://srot-platform.vercel.app/#organization",
        name: "SROT Platform Bangladesh",
        url: "https://srot-platform.vercel.app",
        logo: "https://srot-platform.vercel.app/logo.png",
        description:
          "Digital health and precision advisory network connecting farmers, dairy producers, and pet parents with certified agricultural extensionists and veterinarians.",
        areaServed: {
          "@type": "Country",
          name: "Bangladesh",
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "State Council Verification",
            recognizedBy: {
              "@type": "Organization",
              name: "Department of Agricultural Extension (DAE)",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Veterinary Board Licensing",
            recognizedBy: {
              "@type": "Organization",
              name: "Bangladesh Veterinary Council (BVC)",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://srot-platform.vercel.app/#website",
        url: "https://srot-platform.vercel.app",
        name: "SROT Platform",
        publisher: {
          "@id": "https://srot-platform.vercel.app/#organization",
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Hind+Siliguri:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#05080d] text-slate-100 antialiased selection:bg-emerald-500 selection:text-black">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="flex-1 w-full">{children}</main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
