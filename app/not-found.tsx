import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PiggyBank } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <PiggyBank className="h-24 w-24 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Oops! The page you are looking for seems to have wandered off.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
}