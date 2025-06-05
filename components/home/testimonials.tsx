"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Adebayo Johnson",
    role: "Restaurant Owner",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "Onimu-Elede has transformed how I source meat for my restaurant. The quality is consistently excellent, and the delivery is always on time. I've been able to reduce costs while improving the quality of my offerings.",
  },
  {
    id: 2,
    name: "Chioma Okafor",
    role: "Home Chef",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "The convenience of ordering both my pork and other groceries in one place is incredible. The products are always fresh, and I love that I can track my order in real-time. It's made my weekly shopping so much easier.",
  },
  {
    id: 3,
    name: "Emmanuel Nwachukwu",
    role: "Event Planner",
    avatar: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "For large events, finding reliable suppliers is crucial. Onimu-Elede has never disappointed me. Their bulk ordering system and special rates for events have made them my go-to supplier for all my catering needs.",
  },
  {
    id: 4,
    name: "Oluwaseun Adeyemi",
    role: "Regular Customer",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "The quality of their products speaks for itself. I've been ordering my monthly supply of foodstuff from Onimu-Elede for over a year, and I've never had a bad experience. Their customer service is exceptional too.",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const goToPrevious = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their Onimu-Elede experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 bg-card border-none shadow-md overflow-hidden"
                >
                  <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <Quote className="h-8 w-8 text-primary/30 mb-4 mx-auto md:mx-0" />
                        <p className="text-lg italic mb-6">{testimonial.quote}</p>
                        <div>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background shadow-md rounded-full h-12 w-12 hidden md:flex"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background shadow-md rounded-full h-12 w-12 hidden md:flex"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-primary scale-125" : "bg-muted-foreground/30"
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}