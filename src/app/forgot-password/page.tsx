"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden text-foreground selection:bg-primary/20">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] -z-10" />

      {/* RECOVERY CONTAINER */}
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
          <h1 className="text-2xl font-black mb-2 text-center">Reset Password</h1>
          <p className="text-muted-foreground text-sm text-center mb-8">Enter your email address and we'll send you a link to reset your password.</p>
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
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

            <Button variant="premium" className="w-full rounded-xl h-12 text-base mt-4">
              Send Reset Link <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

        </div>

        <div className="text-center mt-8">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
