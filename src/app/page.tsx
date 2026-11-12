import type { Viewport } from "next";
import { HomeContent } from "@/components/home/HomeContent";

// The homepage uses the light theme, so the browser bar and form controls follow it.
export const viewport: Viewport = {
  themeColor: "#f5f8ef",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function HomePage() {
  return <HomeContent />;
}
