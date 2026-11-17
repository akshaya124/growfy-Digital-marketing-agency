"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth, Role } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: Role[];
}) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in -> go to login
        router.push("/login");
      } else if (role && !allowedRoles.includes(role)) {
        // Logged in but wrong role
        if (role === "ADMIN") {
          router.push("/admin");
        } else if (role === "TEAM_MEMBER") {
          router.push("/team");
        } else if (role === "CLIENT") {
          router.push("/dashboard");
        } else {
          // Role is "NONE" or something else, meaning unauthorized
          router.push("/login"); // or a specific "unauthorized" page
        }
      }
    }
  }, [user, role, loading, router, allowedRoles, pathname]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // If we have a user and their role is in the allowedRoles array, render the children
  if (user && role && allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  return null; // Will redirect in useEffect
}
