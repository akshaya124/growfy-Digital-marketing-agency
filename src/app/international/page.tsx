import type { Metadata } from "next";
import InternationalContent from "./InternationalContent";

export const metadata: Metadata = {
  title: "International Clients | Growfy",
  description: "Global digital solutions with dedicated support, transparent communication, and premium design standards.",
};

export default function InternationalPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="relative z-10 pt-20 pb-24 sm:pb-32">
        <InternationalContent />
      </div>
    </div>
  );
}
