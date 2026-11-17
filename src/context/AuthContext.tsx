"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isEmailWhitelisted } from "@/lib/firestore-helpers";

export type Role = "ADMIN" | "TEAM_MEMBER" | "CLIENT" | "NONE" | null;

interface AuthContextType {
  user: User | null;
  role: Role;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser && currentUser.email) {
        // 1. Check if they are the hardcoded Admin
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        
        if (adminEmail && currentUser.email.toLowerCase() === adminEmail.toLowerCase()) {
          setRole("ADMIN");
        } else {
          // 2. Fetch their explicitly assigned role from Firestore
          try {
            const { doc, getDoc } = await import("firebase/firestore");
            const { db } = await import("@/lib/firebase");
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            
            if (userDocSnap.exists()) {
              const data = userDocSnap.data();
              setRole(data.role as Role || "CLIENT");
            } else {
              // Fallback to whitelist check just in case it's an old user
              const isWhitelisted = await isEmailWhitelisted(currentUser.email);
              if (isWhitelisted) {
                setRole("TEAM_MEMBER");
              } else {
                setRole("CLIENT"); // Standard users are Clients
              }
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            setRole("CLIENT");
          }
        }
      } else {
        setRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
