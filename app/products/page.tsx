import { ProductCatalog } from '@/components/products/product-catalog';

export const metadata = {
  title: 'Products - Onimu-Elede',
  description: 'Browse our selection of pigs, pork, foodstuff, and drinks',
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  
  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            {category 
              ? `${category.charAt(0).toUpperCase() + category.slice(1)}` 
              : 'All Products'
            }
          </h1>
          <p className="text-muted-foreground mt-2">
            {category 
              ? getDescription(category) 
              : 'Browse our full selection of farm-fresh products'
            }
          </p>
        </div>
      </div>
      <ProductCatalog initialCategory={category} />
    </div>
  );
}

function getDescription(category: string): string {
  switch (category.toLowerCase()) {
    case 'pigs':
      return 'Live pigs available in different sizes and breeds';
    case 'pork':
      return 'Fresh pork cuts processed under hygienic conditions';
    case 'foodstuff':
      return 'Essential food ingredients for your kitchen';
    case 'drinks':
      return 'Beverages and refreshments for all occasions';
    default:
      return 'Browse our selection of farm-fresh products';
  }
}