import { HeroSection } from "@/features/home/hero-section";
import dynamic from 'next/dynamic';
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";

const CompanyIntro = dynamic(() => import("@/features/home/company-intro").then(mod => mod.CompanyIntro), { ssr: true });
const TrustedBy = dynamic(() => import("@/features/home/trusted-by").then(mod => mod.TrustedBy), { ssr: true });
const ServicesOverview = dynamic(() => import("@/features/home/services-overview").then(mod => mod.ServicesOverview), { ssr: true });
const ReelSlider = dynamic(() => import("@/features/home/reel-slider").then(mod => mod.ReelSlider), { ssr: true });

export default async function Home() {
  let initialReels: any[] = [];
  try {
    const q = query(collection(db, "gallery"), where("category", "==", "Homepage Reels"), orderBy("createdAt", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      initialReels.push({
        id: doc.id,
        url: doc.data().url || '',
        title: doc.data().title || ''
      });
    });
  } catch (error) {
    console.error("Error fetching reels on server:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CompanyIntro />
      <TrustedBy />
      <ServicesOverview />
      <ReelSlider initialReels={initialReels} />
    </div>
  );
}
