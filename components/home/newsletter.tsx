"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-primary rounded-xl overflow-hidden shadow-lg">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                Join the Herd
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Subscribe to our newsletter and be the first to know about new products, 
                special offers, and delivery locations. No spam, just farm-fresh updates!
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  className="bg-background text-foreground hover:bg-background/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
            <div className="hidden md:block flex-1">
              <div className="relative h-40 w-40 mx-auto">
                <svg viewBox="0 0 24 24" fill="none" className="absolute inset-0 text-primary-foreground/10 w-full h-full">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-10a3 3 0 0 0-3 3v2a3 3 0 1 0 6 0v-2a3 3 0 0 0-3-3Z"
                    className="fill-primary-foreground"
                  />
                  <path
                    d="M14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                    className="fill-primary-foreground/30"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.071 4.929A10 10 0 1 0 4.93 19.071 10 10 0 0 0 19.07 4.929ZM12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
                    className="fill-primary-foreground"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}