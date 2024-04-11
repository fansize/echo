import CTA from "./cta";
import HeroVideo from "../customUI/hero-video";

export default function CTASection() {
  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-8 py-8 md:py-8">
      <div className="md:w-1/2 md:pt-6">
        <CTA />
      </div>
      <div className="md:w-1/2">
        <HeroVideo />
      </div>
    </div>
  );
}
