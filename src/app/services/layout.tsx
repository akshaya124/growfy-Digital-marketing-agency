import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Growfy",
  description: "Comprehensive digital services including website development, brand identity, social media marketing, and AI automation workflows.",
  openGraph: {
    title: "Services | Growfy",
    description: "End-to-end digital services to help you scale efficiently.",
    url: "https://growfy.com/services",
    siteName: "Growfy",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
