'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ShoppingCart, User, Menu, X, PiggyBank } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from '@/components/ui/mode-toggle';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-200",
      isScrolled ? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <PiggyBank className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl">Onimu-Elede</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/products?category=pigs" 
                          className="block p-3 space-y-1 rounded-md hover:bg-accent"
                        >
                          <div className="font-medium">Pigs</div>
                          <p className="text-sm text-muted-foreground">
                            Live pigs by size or breed
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/products?category=pork" 
                          className="block p-3 space-y-1 rounded-md hover:bg-accent"
                        >
                          <div className="font-medium">Pork</div>
                          <p className="text-sm text-muted-foreground">
                            Freshly processed pork cuts
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/products?category=foodstuff" 
                          className="block p-3 space-y-1 rounded-md hover:bg-accent"
                        >
                          <div className="font-medium">Foodstuff</div>
                          <p className="text-sm text-muted-foreground">
                            Essential food ingredients
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/products?category=drinks" 
                          className="block p-3 space-y-1 rounded-md hover:bg-accent"
                        >
                          <div className="font-medium">Drinks</div>
                          <p className="text-sm text-muted-foreground">
                            Beverages and refreshments
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/how-it-works" legacyBehavior passHref>
                  <NavigationMenuLink>How It Works</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/business" legacyBehavior passHref>
                  <NavigationMenuLink>For Businesses</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User Controls */}
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                0
              </span>
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <PiggyBank className="w-7 h-7 text-primary" />
                    <span className="font-bold text-xl">Onimu-Elede</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex flex-col space-y-6 py-6">
                  <Link href="/products?category=pigs" className="text-lg font-medium">
                    Pigs
                  </Link>
                  <Link href="/products?category=pork" className="text-lg font-medium">
                    Pork
                  </Link>
                  <Link href="/products?category=foodstuff" className="text-lg font-medium">
                    Foodstuff
                  </Link>
                  <Link href="/products?category=drinks" className="text-lg font-medium">
                    Drinks
                  </Link>
                  <Link href="/how-it-works" className="text-lg font-medium">
                    How It Works
                  </Link>
                  <Link href="/business" className="text-lg font-medium">
                    For Businesses
                  </Link>
                </nav>
                <div className="mt-auto pt-6 border-t">
                  <div className="flex flex-col space-y-3">
                    <Link href="/login">
                      <Button className="w-full" variant="outline">Sign In</Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full">Create Account</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}