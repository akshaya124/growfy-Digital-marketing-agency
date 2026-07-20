import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Growfy",
  description: "Explore our featured projects, case studies, and the success stories of the brands we've helped scale with high-end websites, apps, and marketing.",
  openGraph: {
    title: "Our Work & Portfolio | Growfy",
    description: "Proof is in the pixels. Explore our case studies and successful client transformations.",
    url: "https://growfy.com/portfolio",
    siteName: "Growfy",
    type: "website",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
