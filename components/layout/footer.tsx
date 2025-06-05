import Link from 'next/link';
import { PiggyBank, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <PiggyBank className="h-8 w-8 text-primary" />
              <h3 className="font-bold text-2xl">Onimu-Elede</h3>
            </div>
            <p className="text-muted-foreground">
              Your trusted source for farm-fresh pigs, pork, foodstuff, and drinks delivered right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=pigs" className="text-muted-foreground hover:text-primary transition-colors">
                  Pigs
                </Link>
              </li>
              <li>
                <Link href="/products?category=pork" className="text-muted-foreground hover:text-primary transition-colors">
                  Pork
                </Link>
              </li>
              <li>
                <Link href="/products?category=foodstuff" className="text-muted-foreground hover:text-primary transition-colors">
                  Foodstuff
                </Link>
              </li>
              <li>
                <Link href="/products?category=drinks" className="text-muted-foreground hover:text-primary transition-colors">
                  Drinks
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-muted-foreground hover:text-primary transition-colors">
                  For Businesses
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Join Our Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Stay updated with our latest offers and products.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Onimu-Elede Technologies. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/vendor-login" className="hover:text-primary transition-colors">
              Vendor Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}