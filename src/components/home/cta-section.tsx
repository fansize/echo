import CTA from "./cta";
import HeroVideo from "../CustomUI/hero-video";

export default function CTASection() {
    return (
        <div className="flex flex-col gap-8 md:flex-row md:gap-8 py-8 md:py-12">
            <div className="md:w-1/2 md:pt-6">
                <CTA />
            </div>
            <div className="md:w-1/2">
                <HeroVideo />
            </div>
        </div>
    );
}
