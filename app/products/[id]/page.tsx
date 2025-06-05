import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/products/product-detail';
import { allProducts } from '@/lib/mock-data';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: ProductPageProps) {
  const product = allProducts.find(p => p.id === params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found - Onimu-Elede',
      description: 'The requested product could not be found',
    };
  }
  
  return {
    title: `${product.name} - Onimu-Elede`,
    description: `Get ${product.name} delivered fresh to your doorstep`,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = allProducts.find(p => p.id === params.id);
  
  if (!product) {
    notFound();
  }
  
  return <ProductDetail product={product} />;
}