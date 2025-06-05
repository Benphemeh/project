"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  ShoppingCart,
  Truck,
  Heart,
  Share2,
  Star,
  Plus,
  Minus,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Product } from '@/lib/types';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Mock data
  const images = [product.image];
  if (product.id.includes('pig')) {
    images.push(
      'https://images.pexels.com/photos/70080/pexels-photo-70080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1689931/pexels-photo-1689931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/51311/pig-animals-sow-about-51311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    );
  } else if (product.id.includes('pork')) {
    images.push(
      'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    );
  }
  
  const relatedProducts = Array.from({ length: 4 }).map((_, i) => {
    const startIndex = (Math.floor(Math.random() * 12)) % 12;
    return {
      ...product,
      id: `related-${product.id}-${i}`,
      image: images[i % images.length],
    };
  });
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  
  return (
    <div className="bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-8">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?category=${product.category}`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6 md:p-8">
            {/* Product images */}
            <div className="lg:col-span-3">
              <div className="mb-4 aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg py-1.5 px-3">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Thumbnail gallery */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`relative w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge
                      variant={product.inStock ? 'default' : 'destructive'}
                      className="mb-3"
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                    <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={isFavorite ? 'text-destructive' : ''}
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Product rating */}
                <div className="flex items-center mt-2 mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 ? 'text-yellow-500 fill-current' : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm ml-2">
                    4.0 (24 reviews)
                  </span>
                </div>
                
                {/* Price */}
                <p className="text-3xl font-bold text-primary mb-4">
                  {formatPrice(product.price)}
                </p>
                
                {/* Description */}
                <p className="text-muted-foreground mb-6">
                  {product.category === 'pigs'
                    ? `Premium quality ${(product as any).breed} pig, ${(product as any).size.toLowerCase()} sized. Healthy, vaccinated, and ready for delivery or pickup.`
                    : product.category === 'pork'
                    ? `Fresh ${(product as any).cut} cut, weighing approximately ${(product as any).weight}. Processed under hygienic conditions and refrigerated for freshness.`
                    : `High-quality ${product.name.toLowerCase()}, perfect for your kitchen needs. ${(product as any).weight || (product as any).volume} per pack.`
                  }
                </p>
                
                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex items-center w-32 h-10">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-full rounded-r-none"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="h-full rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-full rounded-l-none"
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Delivery info */}
                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Delivery Information</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.category === 'pigs'
                          ? 'Scheduled delivery within 48 hours. Special transportation for live animals.'
                          : 'Same-day delivery available for orders before 2 PM. Cold chain logistics for meats.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Add to cart button */}
                <Button 
                  className="w-full h-12 text-lg mb-4 gap-2" 
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                
                {/* Features */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>
                      {product.category === 'pigs'
                        ? 'Vaccinated and health-certified'
                        : product.category === 'pork'
                        ? 'Processed under hygienic conditions'
                        : 'Premium quality guaranteed'
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>
                      {product.category === 'pigs' || product.category === 'pork'
                        ? 'Sourced from trusted local farmers'
                        : 'Fresh stock with long shelf life'
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Fast and safe delivery</span>
                  </div>
                  {!product.inStock && (
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Currently out of stock</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for product details */}
          <div className="border-t">
            <div className="p-6 md:p-8">
              <Tabs defaultValue="details">
                <TabsList className="mb-6">
                  <TabsTrigger value="details">Product Details</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <h3 className="text-xl font-semibold">About {product.name}</h3>
                  <p>
                    {product.category === 'pigs'
                      ? `This ${(product as any).size.toLowerCase()} sized ${(product as any).breed} pig is sourced from trusted local farmers who follow ethical farming practices. Our pigs are raised in a clean environment with proper nutrition and care.`
                      : product.category === 'pork'
                      ? `Our ${(product as any).cut} is carefully processed under strict hygienic conditions. The meat is fresh, tender, and perfect for a variety of dishes. Each cut is approximately ${(product as any).weight}.`
                      : `High-quality ${product.name.toLowerCase()} sourced directly from trusted suppliers. Each package contains ${(product as any).weight || (product as any).volume} of product, ensuring you get the best value for your money.`
                    }
                  </p>
                  <p>
                    {product.category === 'pigs'
                      ? `The ${(product as any).breed} breed is known for its ${(product as any).breed === 'Hampshire' ? 'lean meat and rapid growth' : (product as any).breed === 'Yorkshire' ? 'large size and maternal abilities' : (product as any).breed === 'Duroc' ? 'reddish color and muscular build' : 'excellent meat quality and adaptability'}. All our pigs are vaccinated and come with health certificates.`
                      : product.category === 'pork'
                      ? `Our pork is processed within hours of harvesting and immediately refrigerated to maintain freshness. We never use preservatives or additives, ensuring you get the purest, most natural meat possible.`
                      : `We prioritize quality and freshness for all our products. Our suppliers are carefully vetted to ensure they meet our high standards. We regularly restock to ensure you always get the freshest products.`
                    }
                  </p>
                  
                  <div className="pt-4">
                    <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          {product.category === 'pigs'
                            ? 'Ethically raised in a clean environment'
                            : product.category === 'pork'
                            ? 'Fresh processing with no preservatives'
                            : 'Premium quality from trusted sources'
                          }
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          {product.category === 'pigs'
                            ? 'Vaccinated and health certified'
                            : product.category === 'pork'
                            ? 'Cold chain logistics to maintain freshness'
                            : 'Regular quality checks and inspections'
                          }
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          {product.category === 'pigs' || product.category === 'pork'
                            ? 'Traceable source for food safety'
                            : 'Long shelf life with proper storage'
                          }
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Fast and reliable delivery with proper handling
                        </span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="specifications">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <th className="text-left p-3 bg-muted font-medium w-1/3">Category</th>
                          <td className="p-3 capitalize">{product.category}</td>
                        </tr>
                        {product.category === 'pigs' && (
                          <>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Breed</th>
                              <td className="p-3">{(product as any).breed}</td>
                            </tr>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Size</th>
                              <td className="p-3">{(product as any).size}</td>
                            </tr>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Approximate Weight</th>
                              <td className="p-3">
                                {(product as any).size === 'Small' ? '20-40 kg' : 
                                 (product as any).size === 'Medium' ? '40-70 kg' : 
                                 '70-120 kg'}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Age</th>
                              <td className="p-3">
                                {(product as any).size === 'Small' ? '3-5 months' : 
                                 (product as any).size === 'Medium' ? '5-8 months' : 
                                 '8-12 months'}
                              </td>
                            </tr>
                          </>
                        )}
                        {product.category === 'pork' && (
                          <>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Cut Type</th>
                              <td className="p-3">{(product as any).cut}</td>
                            </tr>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Weight</th>
                              <td className="p-3">{(product as any).weight}</td>
                            </tr>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Processing</th>
                              <td className="p-3">Fresh, no preservatives</td>
                            </tr>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Storage</th>
                              <td className="p-3">Refrigerated, use within 3-5 days</td>
                            </tr>
                          </>
                        )}
                        {(product.category === 'foodstuff' || product.category === 'drinks') && (
                          <>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Type</th>
                              <td className="p-3">{(product as any).type}</td>
                            </tr>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Quantity</th>
                              <td className="p-3">{(product as any).weight || (product as any).volume}</td>
                            </tr>
                            <tr className="border-b">
                              <th className="text-left p-3 bg-muted font-medium">Shelf Life</th>
                              <td className="p-3">
                                {(product as any).type === 'Grains' ? 'Up to 12 months in proper storage' : 
                                 (product as any).type === 'Oil' ? 'Up to 6 months in proper storage' : 
                                 'Varies by product, see packaging'}
                              </td>
                            </tr>
                          </>
                        )}
                        <tr>
                          <th className="text-left p-3 bg-muted font-medium">Delivery</th>
                          <td className="p-3">
                            {product.category === 'pigs'
                              ? 'Specialized transportation within 48 hours'
                              : product.category === 'pork'
                              ? 'Cold chain logistics, same-day delivery available'
                              : 'Standard delivery within 24 hours'
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="space-y-8">
                    {/* Reviews summary */}
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-muted rounded-lg">
                        <h3 className="text-5xl font-bold mb-2">4.0</h3>
                        <div className="flex mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < 4 ? 'text-yellow-500 fill-current' : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">Based on 24 reviews</p>
                      </div>
                      
                      <div className="flex-[2] flex flex-col gap-2">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const rating = 5 - i;
                          const count = rating === 5 ? 10 : rating === 4 ? 9 : rating === 3 ? 3 : rating === 2 ? 2 : 0;
                          const percentage = Math.round((count / 24) * 100);
                          
                          return (
                            <div key={rating} className="flex items-center gap-3">
                              <div className="flex items-center">
                                <span className="text-sm w-2">{rating}</span>
                                <Star className="h-4 w-4 text-yellow-500 fill-current ml-1" />
                              </div>
                              <div className="flex-1 h-2 bg-muted overflow-hidden rounded-full">
                                <div 
                                  className="h-full bg-yellow-500" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground w-8">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Individual reviews */}
                    <div className="space-y-6 pt-6">
                      {[
                        {
                          name: "Samuel Okonkwo",
                          avatar: "https://i.pravatar.cc/150?img=11",
                          rating: 5,
                          date: "2 weeks ago",
                          text: "Excellent quality! The delivery was prompt and the product was just as described. Will definitely order again.",
                        },
                        {
                          name: "Blessing Adeyemi",
                          avatar: "https://i.pravatar.cc/150?img=32",
                          rating: 4,
                          date: "1 month ago",
                          text: "Very satisfied with my purchase. The only reason I'm not giving 5 stars is because delivery took a bit longer than expected.",
                        },
                        {
                          name: "Ibrahim Musa",
                          avatar: "https://i.pravatar.cc/150?img=55",
                          rating: 3,
                          date: "2 months ago",
                          text: "The product quality was good, but I had issues with the delivery. Customer service was helpful in resolving the issue.",
                        },
                      ].map((review, idx) => (
                        <div key={idx} className="border-b border-border pb-6 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                              <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
                                <Image
                                  src={review.avatar}
                                  alt={review.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold">{review.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-muted-foreground">
                            {review.text}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        <div className="mt-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, idx) => (
                <Card key={idx} className="overflow-hidden group transition-all duration-300 hover:shadow-md">
                  <Link href={`/products/${relatedProduct.id}`} className="relative block aspect-square overflow-hidden">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/products/${relatedProduct.id}`} className="block">
                      <h3 className="font-semibold text-sm leading-tight mb-2 transition-colors hover:text-primary">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-primary">
                        {formatPrice(relatedProduct.price)}
                      </p>
                      <Button size="sm" variant="ghost" className="p-2 h-8 w-8">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}