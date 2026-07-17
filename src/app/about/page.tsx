import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { AboutClient } from "./about-client";

export const revalidate = 3600;

export default async function AboutPage() {
  let initialTeam: any[] = [];
  let initialGallery: any[] = [];

  try {
    // Fetch Team
    const teamQ = query(collection(db, "team"), orderBy("createdAt", "desc"));
    const teamSnapshot = await getDocs(teamQ);
    teamSnapshot.forEach((doc) => {
      initialTeam.push({ id: doc.id, ...doc.data() });
    });

    // Fetch Gallery
    const galleryQ = query(collection(db, "gallery"), orderBy("createdAt", "desc"), limit(4));
    const gallerySnapshot = await getDocs(galleryQ);
    gallerySnapshot.forEach((doc) => {
      initialGallery.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error fetching about data on server:", error);
  }

  // Convert Firebase timestamps to strings to avoid hydration/serialization errors
  const serializedTeam = initialTeam.map(t => ({
    ...t,
    createdAt: t.createdAt ? t.createdAt.toMillis?.() || null : null
  }));

  const serializedGallery = initialGallery.map(g => ({
    ...g,
    createdAt: g.createdAt ? g.createdAt.toMillis?.() || null : null
  }));

  return <AboutClient initialTeam={serializedTeam} initialGallery={serializedGallery} />;
}
