import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { ServicesClient } from "./services-client";

export const revalidate = 3600;

export default async function ServicesPage() {
  let designImages: any[] = [];
  let marketingImages: any[] = [];
  let mediaImages: any[] = [];

  try {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const item = {
        id: doc.id,
        url: data.url || '',
        title: data.title || '',
        category: data.category || '',
        createdAt: data.createdAt ? data.createdAt.toMillis?.() || null : null
      };

      if (item.category === "Design Slider") designImages.push(item);
      if (item.category === "Marketing Slider") marketingImages.push(item);
      if (item.category === "Media Slider") mediaImages.push(item);
    });
  } catch (error) {
    console.error("Error fetching service sliders on server:", error);
  }

  return (
    <ServicesClient 
      designImages={designImages}
      marketingImages={marketingImages}
      mediaImages={mediaImages}
    />
  );
}
