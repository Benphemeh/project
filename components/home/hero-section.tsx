"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Farm Fresh Products",
      description: "Get high-quality pigs, pork, foodstuff, and drinks delivered straight to your doorstep.",
    },
    {
      image: "https://www.carniceriacorbacho.com/wp-content/uplo…2018/01/carne-de-cerdo-carniceria-en-marbella.jpg",
      title: "Premium Quality Pork",
      description: "Freshly processed pork from trusted local farmers, delivered within hours of processing.",
    },
    {
      image: "https://images.pexels.com/photos/1927542/pexels-photo-1927542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Complete Provision Store",
      description: "From foodstuff to drinks, get everything you need in a single order with same-day delivery.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            currentSlide === index ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      ))}
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-xl text-white">
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-700 transform",
              currentSlide === 0 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            {slides[currentSlide].title}
          </h1>
          <p 
            className={cn(
              "mt-4 text-lg md:text-xl opacity-90 transition-all duration-700 delay-200 transform",
              currentSlide === 0 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            {slides[currentSlide].description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-md"
              asChild
            >
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-md bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/how-it-works">
                How It Works
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentSlide === index ? "bg-white scale-125" : "bg-white/50"
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}