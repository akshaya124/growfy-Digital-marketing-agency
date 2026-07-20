"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/team")) return null;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-card transition-all duration-300 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Growfy
            </Link>
          </div>
          
          {/* DESKTOP NAV */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-sm font-medium">About</Link>
              <Link href="/services" className="text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-sm font-medium">Services</Link>
              <Link href="/portfolio" className="text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-sm font-medium">Portfolio</Link>
              <Link href="/case-studies" className="text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-sm font-medium">Case Studies</Link>
              <Link href="/workflow" className="text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-sm font-medium">Workflow</Link>
              <Link href="/pricing" className="text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-sm font-medium">Pricing</Link>
              <Link href="/industries" className="text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-sm font-medium">Industries</Link>
              <Link href="/international" className="text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-sm font-medium text-purple-400">International</Link>
              <Link href="/blog" className="text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-sm font-medium">Blog</Link>
            </div>
          </div>
          <div className="hidden lg:flex gap-4">
             <Link href="/login">
               <Button variant="ghost">Login</Button>
             </Link>
             <Link href="/contact">
               <Button variant="premium">Contact</Button>
             </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary p-2 transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-white/10 overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col space-y-6 overflow-y-auto pb-32">
              <Link href="/about" onClick={closeMenu} className="text-xl font-medium text-foreground hover:text-primary">About</Link>
              <Link href="/services" onClick={closeMenu} className="text-xl font-medium text-foreground hover:text-primary">Services</Link>
              <Link href="/portfolio" onClick={closeMenu} className="text-xl font-medium text-foreground hover:text-primary">Portfolio</Link>
              <Link href="/case-studies" onClick={closeMenu} className="text-xl font-medium text-foreground hover:text-primary">Case Studies</Link>
              <Link href="/workflow" onClick={closeMenu} className="text-xl font-medium text-foreground hover:text-primary">Workflow</Link>
              <Link href="/pricing" onClick={closeMenu} className="text-xl font-medium text-foreground hover:text-primary">Pricing</Link>
              <Link href="/industries" onClick={closeMenu} className="text-xl font-medium text-foreground hover:text-primary">Industries</Link>
              <Link href="/international" onClick={closeMenu} className="text-xl font-bold text-purple-400 hover:text-purple-300">International</Link>
              <Link href="/blog" onClick={closeMenu} className="text-xl font-medium text-foreground hover:text-primary">Blog</Link>
              
              <div className="border-t border-border/50 pt-8 flex flex-col gap-4">
                <Link href="/login" onClick={closeMenu} className="w-full">
                  <Button variant="ghost" className="w-full h-14 text-lg">Login</Button>
                </Link>
                <Link href="/contact" onClick={closeMenu} className="w-full">
                  <Button variant="premium" className="w-full h-14 text-lg">Contact</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
