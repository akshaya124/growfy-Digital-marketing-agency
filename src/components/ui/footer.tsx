"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./button";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/team")) return null;
  return (
    <footer className="bg-white/30 backdrop-blur-md border-t border-black/5 mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4 inline-block">
              Growfy
            </Link>
            <p className="text-muted-foreground mb-6">
              Transforming businesses with intelligent web solutions, powerful branding, and AI automation.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                In
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                Tw
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                Fb
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/web-development" className="text-muted-foreground hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="/services/ai-automation" className="text-muted-foreground hover:text-primary transition-colors">AI Automation</Link></li>
              <li><Link href="/services/branding" className="text-muted-foreground hover:text-primary transition-colors">Branding & Design</Link></li>
              <li><Link href="/services/marketing" className="text-muted-foreground hover:text-primary transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Newsletter</h4>
            <p className="text-muted-foreground mb-4">Subscribe to our newsletter for the latest updates and insights.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-full border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary" />
              <Button variant="premium" className="rounded-full">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Growfy. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
