import HeroSection from '@/components/home/HeroSection';
import FeaturedTuitions from '@/components/home/FeaturedTuitions';
import HowItWorks from '@/components/home/HowItWorks';
import TopSubjectsAndStats from '@/components/home/TopSubjectsAndStats';
import PricingSection from '@/components/home/PricingSection';
import AnimateOnScroll from '@/components/AnimateOnScroll';

export default function HomePage() {
  return (
    <div className="overflow-hidden space-y-4">
      <HeroSection />

      <AnimateOnScroll delay={0.1}>
        <FeaturedTuitions />
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.1}>
        <HowItWorks />
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.1}>
        <TopSubjectsAndStats />
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.1}>
        <PricingSection />
      </AnimateOnScroll>
    </div>
  );
}
