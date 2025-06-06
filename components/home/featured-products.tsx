"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart } from 'lucide-react';

// Mock data - would come from API in real implementation
const mockProducts = {
  pigs: [
    {
      id: 'pig-1',
      name: 'Hampshire Pig (Medium)',
      image: '/hampshire-boar.jpg',
      price: 45000,
      category: 'pigs',
      breed: 'Hampshire',
      size: 'Medium',
      inStock: true,
    },
    {
      id: 'pig-2',
      name: 'Yorkshire Pig (Large)',
      image: 'https://images.pexels.com/photos/110820/pexels-photo-110820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 65000,
      category: 'pigs',
      breed: 'Yorkshire',
      size: 'Large',
      inStock: true,
    },
    {
      id: 'pig-3',
      name: 'Duroc Pig (Small)',
      image: '/duroc.jpg',
      price: 30000,
      category: 'pigs',
      breed: 'Duroc',
      size: 'Small',
      inStock: true,
    },
    {
      id: 'pig-4',
      name: 'Berkshire Pig (Medium)',
      image: 'https://images.pexels.com/photos/2218481/pexels-photo-2218481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 48000,
      category: 'pigs',
      breed: 'Berkshire',
      size: 'Medium',
      inStock: false,
    },
  ],
  pork: [
    {
      id: 'pork-1',
      name: 'Premium Pork Belly (1kg)',
      image: 'https://images.pexels.com/photos/6861257/pexels-photo-6861257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 3500,
      category: 'pork',
      cut: 'Belly',
      weight: '1kg',
      inStock: true,
    },
    {
      id: 'pork-2',
      name: 'Pork Loin Chops (500g)',
      image: 'https://images.pexels.com/photos/5774154/pexels-photo-5774154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 2800,
      category: 'pork',
      cut: 'Loin',
      weight: '500g',
      inStock: true,
    },
    {
      id: 'pork-3',
      name: 'Ground Pork (1kg)',
      image: 'https://images.pexels.com/photos/4969887/pexels-photo-4969887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 3000,
      category: 'pork',
      cut: 'Ground',
      weight: '1kg',
      inStock: true,
    },
    {
      id: 'pork-4',
      name: 'Pork Ribs (1.5kg)',
      image: 'https://images.pexels.com/photos/7988252/pexels-photo-7988252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 4200,
      category: 'pork',
      cut: 'Ribs',
      weight: '1.5kg',
      inStock: true,
    },
  ],
  foodstuff: [
    {
      id: 'food-1',
      name: 'Rice (5kg)',
      image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 5500,
      category: 'foodstuff',
      type: 'Grains',
      weight: '5kg',
      inStock: true,
    },
    {
      id: 'food-2',
      name: 'Palm Oil (2L)',
      image: 'https://images.pexels.com/photos/4033636/pexels-photo-4033636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 3800,
      category: 'foodstuff',
      type: 'Oil',
      volume: '2L',
      inStock: true,
    },
    {
      id: 'food-3',
      name: 'Beans (2kg)',
      image: 'https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 2500,
      category: 'foodstuff',
      type: 'Legumes',
      weight: '2kg',
      inStock: true,
    },
    {
      id: 'food-4',
      name: 'Garri (5kg)',
      image: 'https://images.pexels.com/photos/6248853/pexels-photo-6248853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 3200,
      category: 'foodstuff',
      type: 'Processed',
      weight: '5kg',
      inStock: true,
    },
  ],
};

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('pigs');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const toggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our selection of premium quality products from trusted sources
          </p>
        </div>
        
        <Tabs defaultValue="pigs" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-3 gap-4 bg-transparent">
              <TabsTrigger 
                value="pigs"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
              >
                Pigs
              </TabsTrigger>
              <TabsTrigger 
                value="pork"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
              >
                Pork
              </TabsTrigger>
              <TabsTrigger 
                value="foodstuff"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
              >
                Foodstuff
              </TabsTrigger>
            </TabsList>
          </div>
          
          {(Object.keys(mockProducts) as Array<keyof typeof mockProducts>).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockProducts[category].map((product) => (
                  <Card key={product.id} className="overflow-hidden group transition-all duration-300 hover:shadow-md">
                    <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge variant="destructive" className="text-lg py-1.5 px-3">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background ${favorites.includes(product.id) ? 'text-destructive' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                      >
                        <Heart className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </Link>
                    <CardContent className="pt-4">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category === 'pigs' ? product.breed : product.category === 'pork' ? product.cut : product.type}
                        </Badge>
                        {product.category === 'pigs' && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            {product.size}
                          </Badge>
                        )}
                      </div>
                      <Link href={`/products/${product.id}`} className="block">
                        <h3 className="font-semibold text-lg leading-tight mb-2 transition-colors hover:text-primary">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        className="w-full gap-2" 
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-12 text-center">
                <Button asChild variant="outline" size="lg">
                  <Link href={`/products?category=${category}`}>
                    View All {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}