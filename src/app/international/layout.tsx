import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Reach | Growfy",
  description: "Take your business global with our international scaling services, multilingual SEO, and global advertising campaigns.",
  openGraph: {
    title: "International Reach | Growfy",
    description: "Scale your business across borders with our global strategies.",
    url: "https://growfy.com/international",
    siteName: "Growfy",
    type: "website",
  },
};

export default function InternationalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
