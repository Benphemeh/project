import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Users, TruckIcon, CreditCard } from 'lucide-react';

export function BusinessSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              For Businesses & Events
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Planning a party, ceremony, or need bulk orders for your restaurant or hotel?
              Onimu-Elede offers special rates, custom delivery schedules, and priority service
              for businesses and event planners.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-3 rounded-full">
                  <TruckIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Scheduled Deliveries</h3>
                  <p className="text-muted-foreground">
                    Set up recurring deliveries on your schedule, ensuring you never run out of essential ingredients.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Bulk Pricing</h3>
                  <p className="text-muted-foreground">
                    Enjoy significant discounts on bulk orders with transparent volume-based pricing.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Event Planning Support</h3>
                  <p className="text-muted-foreground">
                    Our event specialists will help you calculate quantities, schedule deliveries, and handle logistics.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Flexible Payment Options</h3>
                  <p className="text-muted-foreground">
                    We offer flexible payment terms for registered business customers with good standing.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/business">Contact Sales Team</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden aspect-square relative">
                  <img 
                    src="https://images.pexels.com/photos/5710188/pexels-photo-5710188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Restaurant kitchen" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="rounded-lg overflow-hidden aspect-square relative">
                  <img 
                    src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Catered event" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-lg overflow-hidden aspect-square relative">
                  <img 
                    src="https://images.pexels.com/photos/5938222/pexels-photo-5938222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Bulk food preparation" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="rounded-lg overflow-hidden aspect-square relative">
                  <img 
                    src="https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Food truck" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}