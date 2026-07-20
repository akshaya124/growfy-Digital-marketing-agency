import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Growfy",
  description: "Transparent pricing for website development, marketing, social media, branding, and AI automation. No hidden fees. Choose your growth engine.",
  openGraph: {
    title: "Pricing | Growfy",
    description: "Transparent pricing for website development, marketing, social media, branding, and AI automation.",
    url: "https://growfy.com/pricing",
    siteName: "Growfy",
    type: "website",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
