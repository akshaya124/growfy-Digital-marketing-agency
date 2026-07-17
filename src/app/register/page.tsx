"use client";

import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden text-foreground selection:bg-primary/20">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -z-10" />

      {/* REGISTER CONTAINER */}
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
          <h1 className="text-2xl font-black mb-2 text-center">Create an Account</h1>
          <p className="text-muted-foreground text-sm text-center mb-8">Join the Growfy ecosystem and start scaling.</p>
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                <input 
                  type="text" 
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary transition-colors font-medium" 
                  placeholder="John Doe" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                <input 
                  type="email" 
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary transition-colors font-medium" 
                  placeholder="name@example.com" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                <input 
                  type="password" 
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary transition-colors font-medium" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <Button variant="premium" className="w-full rounded-xl h-12 text-base mt-4">
              Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground font-medium uppercase">Or register with</span>
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
          Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in here</Link>
        </p>

      </motion.div>
    </div>
  );
}
