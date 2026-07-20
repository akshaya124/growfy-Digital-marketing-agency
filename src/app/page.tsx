import { HeroSection } from "@/features/home/hero-section";
import dynamic from 'next/dynamic';
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";

const CompanyIntro = dynamic(() => import("@/features/home/company-intro").then(mod => mod.CompanyIntro), { ssr: true });
const TrustedBy = dynamic(() => import("@/features/home/trusted-by").then(mod => mod.TrustedBy), { ssr: true });
const ServicesOverview = dynamic(() => import("@/features/home/services-overview").then(mod => mod.ServicesOverview), { ssr: true });
const ReelSlider = dynamic(() => import("@/features/home/reel-slider").then(mod => mod.ReelSlider), { ssr: true });
const PosterSlider = dynamic(() => import("@/features/home/poster-slider").then(mod => mod.PosterSlider), { ssr: true });

export default async function Home() {
  let initialReels: any[] = [];
  let initialPosters: any[] = [];
  try {
    const qReels = query(collection(db, "gallery"), where("category", "==", "Homepage Reels"), orderBy("createdAt", "desc"), limit(10));
    const querySnapshotReels = await getDocs(qReels);
    querySnapshotReels.forEach((doc) => {
      initialReels.push({
        id: doc.id,
        url: doc.data().url || '',
        title: doc.data().title || ''
      });
    });

    const qPosters = query(collection(db, "gallery"), where("category", "==", "Homepage Posters"), orderBy("createdAt", "desc"), limit(10));
    const querySnapshotPosters = await getDocs(qPosters);
    querySnapshotPosters.forEach((doc) => {
      initialPosters.push({
        id: doc.id,
        url: doc.data().url || '',
        title: doc.data().title || ''
      });
    });
  } catch (error) {
    console.error("Error fetching media on server:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CompanyIntro />
      <TrustedBy />
      <ServicesOverview />
      <PosterSlider initialPosters={initialPosters} />
      <ReelSlider initialReels={initialReels} />
    </div>
  );
}
