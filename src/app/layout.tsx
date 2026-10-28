import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "SROT Platform | Digital Agriculture & Animal Healthcare",
  description:
    "Modular service platform connecting farmers, livestock producers, and pet parents with accredited plant pathologists, agronomists, and veterinarians for rapid visual triage, tele-consultation, and digital prescriptions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
