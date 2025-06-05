import { HeroSection } from '@/components/home/hero-section';
import { HowItWorks } from '@/components/home/how-it-works';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Testimonials } from '@/components/home/testimonials';
import { Newsletter } from '@/components/home/newsletter';
import { BusinessSection } from '@/components/home/business-section';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <HowItWorks />
      <FeaturedProducts />
      <BusinessSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
}