import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DynamicCursor from "@/components/layout/DynamicCursor";
import ParticleBackground from "@/components/layout/ParticleBackground";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { DashboardProvider } from "@/context/DashboardContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Growfy",
    default: "Growfy | Cinematic Digital Ecosystem",
  },
  description: "A premium interactive galaxy for digital growth. We build high-end websites, powerful mobile apps, and execute data-driven marketing campaigns to scale your business.",
  openGraph: {
    title: "Growfy | Cinematic Digital Ecosystem",
    description: "A premium interactive galaxy for digital growth.",
    url: "https://growfy.com",
    siteName: "Growfy",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Growfy Digital Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growfy | Cinematic Digital Ecosystem",
    description: "A premium interactive galaxy for digital growth.",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ParticleBackground />
        <DynamicCursor />
        <Navbar />
        <main className="flex-1 mt-20">
          <DashboardProvider>
            {children}
          </DashboardProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
