import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Growfy",
  description: "Get in touch with the Growfy team. Whether you need a complete digital overhaul or just want to bounce an idea off us, we're here to help.",
  openGraph: {
    title: "Contact Us | Growfy",
    description: "Get in touch with the Growfy team to start scaling your business.",
    url: "https://growfy.com/contact",
    siteName: "Growfy",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
