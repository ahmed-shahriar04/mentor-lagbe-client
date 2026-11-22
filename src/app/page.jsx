'use client';

import HeroSection from '@/components/home/HeroSection';
import FeaturedTuitions from '@/components/home/FeaturedTuitions';
import HowItWorks from '@/components/home/HowItWorks';
import TopSubjectsAndStats from '@/components/home/TopSubjectsAndStats';
import PricingSection from '@/components/home/PricingSection';

export default function HomePage() {
  return (
    <div className="overflow-hidden space-y-4">
      <HeroSection />
      <FeaturedTuitions />
      <HowItWorks />
      <TopSubjectsAndStats />
      <PricingSection />
    </div>
  );
}
