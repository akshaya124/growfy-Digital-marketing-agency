"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldAlert, User, Briefcase } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "admin" | "team">("client");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Role-based routing mockup
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "team") {
      router.push("/team");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden text-foreground selection:bg-primary/20">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

      {/* LOGIN CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        
        {/* LOGO */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-black bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Growfy</span>
          </Link>
        </div>

        <div className="glass-card p-8 md:p-10 rounded-[32px] border border-border shadow-2xl">
          <h1 className="text-2xl font-black mb-2 text-center">Welcome Back</h1>
          <p className="text-muted-foreground text-sm text-center mb-8">Enter your credentials to access your dashboard.</p>
          
          <form className="space-y-5" onSubmit={handleLogin}>
            
            {/* ROLE SELECTOR MOCKUP */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Login As (Demo)</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  type="button"
                  onClick={() => setRole("client")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all
                    ${role === 'client' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:bg-muted text-muted-foreground'}`}
                >
                  <User className="w-5 h-5 mb-1" />
                  <span className="text-xs font-bold">Client</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setRole("team")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all
                    ${role === 'team' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:bg-muted text-muted-foreground'}`}
                >
                  <Briefcase className="w-5 h-5 mb-1" />
                  <span className="text-xs font-bold">Team</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all
                    ${role === 'admin' ? 'border-rose-500 bg-rose-500/10 text-rose-500' : 'border-border bg-background hover:bg-muted text-muted-foreground'}`}
                >
                  <ShieldAlert className="w-5 h-5 mb-1" />
                  <span className="text-xs font-bold">Admin</span>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                <input 
                  type="email" 
                  defaultValue={role === 'admin' ? 'admin@growfy.agency' : role === 'team' ? 'marcus@growfy.agency' : 'john@novainc.com'}
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary transition-colors font-medium" 
                  placeholder="name@example.com" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                <input 
                  type="password" 
                  defaultValue="password123"
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary transition-colors font-medium" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <Button variant="premium" type="submit" className="w-full rounded-xl h-12 text-base mt-4 font-bold">
              Sign In <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground font-medium uppercase">Or continue with</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <button className="w-full bg-background border border-border rounded-xl h-12 flex items-center justify-center gap-3 hover:bg-muted transition-colors font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Google
          </button>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Register here</Link>
        </p>

      </motion.div>
    </div>
  );
}
