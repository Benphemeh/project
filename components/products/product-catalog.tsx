"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from '@/components/ui/slider';
import { 
  ShoppingCart, 
  Heart,
  Search, 
  Grid, 
  List, 
  Filter,
  X,
} from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Mock data - would come from API in real implementation
import { allProducts } from '@/lib/mock-data';

type ProductViewType = 'grid' | 'list';

interface ProductCatalogProps {
  initialCategory?: string;
}

export function ProductCatalog({ initialCategory }: ProductCatalogProps) {
  const [products, setProducts] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewType, setViewType] = useState<ProductViewType>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: initialCategory || 'all',
    priceRange: [0, 100000] as [number, number],
    size: [] as string[],
    breed: [] as string[],
    type: [] as string[],
    inStock: false,
  });
  
  const itemsPerPage = viewType === 'grid' ? 12 : 8;
  
  useEffect(() => {
    // Filter logic based on current filters
    let filtered = [...allProducts];
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && 
      p.price <= filters.priceRange[1]
    );
    
    if (filters.size.length > 0) {
      filtered = filtered.filter(p => 'size' in p && filters.size.includes(p.size as string));
    }
    
    if (filters.breed.length > 0) {
      filtered = filtered.filter(p => 'breed' in p && filters.breed.includes(p.breed as string));
    }
    
    if (filters.type.length > 0) {
      filtered = filtered.filter(p => 'type' in p && filters.type.includes(p.type as string));
    }
    
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, searchQuery]);
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
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
  
  const handleSizeToggle = (size: string) => {
    if (filters.size.includes(size)) {
      setFilters({...filters, size: filters.size.filter(s => s !== size)});
    } else {
      setFilters({...filters, size: [...filters.size, size]});
    }
  };
  
  const handleBreedToggle = (breed: string) => {
    if (filters.breed.includes(breed)) {
      setFilters({...filters, breed: filters.breed.filter(b => b !== breed)});
    } else {
      setFilters({...filters, breed: [...filters.breed, breed]});
    }
  };
  
  const handleTypeToggle = (type: string) => {
    if (filters.type.includes(type)) {
      setFilters({...filters, type: filters.type.filter(t => t !== type)});
    } else {
      setFilters({...filters, type: [...filters.type, type]});
    }
  };
  
  const resetFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 100000],
      size: [],
      breed: [],
      type: [],
      inStock: false,
    });
    setSearchQuery('');
  };
  
  // Get unique values for filter options
  const sizes = Array.from(new Set(allProducts
    .filter(p => 'size' in p)
    .map(p => p.size as string)
  ));
  
  const breeds = Array.from(new Set(allProducts
    .filter(p => 'breed' in p)
    .map(p => p.breed as string)
  ));
  
  const types = Array.from(new Set(allProducts
    .filter(p => 'type' in p)
    .map(p => p.type as string)
  ));
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters and search */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="w-full md:w-auto flex items-center space-x-2">
          {/* Mobile filter button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down products to find exactly what you're looking for.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Category</h3>
                    <Select 
                      value={filters.category} 
                      onValueChange={(value) => setFilters({...filters, category: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="pigs">Pigs</SelectItem>
                        <SelectItem value="pork">Pork</SelectItem>
                        <SelectItem value="foodstuff">Foodstuff</SelectItem>
                        <SelectItem value="drinks">Drinks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[0, 100000]}
                        min={0}
                        max={100000}
                        step={1000}
                        value={filters.priceRange}
                        onValueChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
                      />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <div>{formatPrice(filters.priceRange[0])}</div>
                        <div>{formatPrice(filters.priceRange[1])}</div>
                      </div>
                    </div>
                  </div>

                  {filters.category === 'pigs' && (
                    <div>
                      <h3 className="font-medium mb-2">Size</h3>
                      <div className="space-y-2">
                        {sizes.map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`size-${size}`} 
                              checked={filters.size.includes(size)}
                              onCheckedChange={() => handleSizeToggle(size)}
                            />
                            <Label htmlFor={`size-${size}`}>{size}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filters.category === 'pigs' && (
                    <div>
                      <h3 className="font-medium mb-2">Breed</h3>
                      <div className="space-y-2">
                        {breeds.map((breed) => (
                          <div key={breed} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`breed-${breed}`} 
                              checked={filters.breed.includes(breed)}
                              onCheckedChange={() => handleBreedToggle(breed)}
                            />
                            <Label htmlFor={`breed-${breed}`}>{breed}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filters.category === 'foodstuff' && (
                    <div>
                      <h3 className="font-medium mb-2">Type</h3>
                      <div className="space-y-2">
                        {types.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`type-${type}`} 
                              checked={filters.type.includes(type)}
                              onCheckedChange={() => handleTypeToggle(type)}
                            />
                            <Label htmlFor={`type-${type}`}>{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="in-stock-mobile" 
                      checked={filters.inStock}
                      onCheckedChange={(checked) => setFilters({...filters, inStock: !!checked})}
                    />
                    <Label htmlFor="in-stock-mobile">In Stock Only</Label>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          {/* Desktop filter sidebar */}
          <div className="hidden md:block w-64 pr-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => setFilters({...filters, category: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="pigs">Pigs</SelectItem>
                    <SelectItem value="pork">Pork</SelectItem>
                    <SelectItem value="foodstuff">Foodstuff</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="px-2">
                  <Slider 
                    defaultValue={[0, 100000]}
                    min={0}
                    max={100000}
                    step={1000}
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <div>{formatPrice(filters.priceRange[0])}</div>
                    <div>{formatPrice(filters.priceRange[1])}</div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {filters.category === 'pigs' && (
                <div>
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="space-y-2">
                    {sizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`size-${size}`} 
                          checked={filters.size.includes(size)}
                          onCheckedChange={() => handleSizeToggle(size)}
                        />
                        <Label htmlFor={`size-${size}`}>{size}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {filters.category === 'pigs' && (
                <div>
                  <h3 className="font-medium mb-2">Breed</h3>
                  <div className="space-y-2">
                    {breeds.map((breed) => (
                      <div key={breed} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`breed-${breed}`} 
                          checked={filters.breed.includes(breed)}
                          onCheckedChange={() => handleBreedToggle(breed)}
                        />
                        <Label htmlFor={`breed-${breed}`}>{breed}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {filters.category === 'foodstuff' && (
                <div>
                  <h3 className="font-medium mb-2">Type</h3>
                  <div className="space-y-2">
                    {types.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`type-${type}`} 
                          checked={filters.type.includes(type)}
                          onCheckedChange={() => handleTypeToggle(type)}
                        />
                        <Label htmlFor={`type-${type}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="in-stock" 
                  checked={filters.inStock}
                  onCheckedChange={(checked) => setFilters({...filters, inStock: !!checked})}
                />
                <Label htmlFor="in-stock">In Stock Only</Label>
              </div>
              
              <Button variant="outline" className="w-full" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </div>
          
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6" 
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Results info and view toggle */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <span className="text-muted-foreground text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </span>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant={viewType === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewType('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewType('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="md:flex gap-8">
        {/* Desktop filter sidebar (placeholder div) */}
        <div className="hidden md:block w-64 flex-shrink-0"></div>
        
        {/* Products list */}
        <div className="flex-1">
          {currentProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button className="mt-4" variant="outline" onClick={resetFilters}>
                Reset All Filters
              </Button>
            </div>
          ) : viewType === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
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
                        {product.category === 'pigs' ? (product as any).breed : product.category === 'pork' ? (product as any).cut : (product as any).type}
                      </Badge>
                      {product.category === 'pigs' && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          {(product as any).size}
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
          ) : (
            <div className="space-y-4">
              {currentProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <Link 
                      href={`/products/${product.id}`} 
                      className="relative sm:w-48 h-48 sm:h-auto overflow-hidden"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 192px"
                        className="object-cover"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge variant="destructive" className="text-lg py-1.5 px-3">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                    </Link>
                    <div className="flex-1 flex flex-col p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="mb-2">
                            <Badge variant="outline" className="text-xs">
                              {product.category === 'pigs' ? (product as any).breed : product.category === 'pork' ? (product as any).cut : (product as any).type}
                            </Badge>
                            {product.category === 'pigs' && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                {(product as any).size}
                              </Badge>
                            )}
                          </div>
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-semibold text-lg leading-tight mb-2 transition-colors hover:text-primary">
                              {product.name}
                            </h3>
                          </Link>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className={favorites.includes(product.id) ? 'text-destructive' : ''}
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Heart className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">
                        {product.category === 'pigs' 
                          ? `${(product as any).breed} breed, ${(product as any).size} size` 
                          : product.category === 'pork'
                          ? `${(product as any).cut}, ${(product as any).weight}`
                          : `${(product as any).type}, ${(product as any).weight || (product as any).volume}`
                        }
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(product.price)}
                        </p>
                        <Button 
                          disabled={!product.inStock}
                          className="gap-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}