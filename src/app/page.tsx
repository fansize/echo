import { Separator } from "@/components/ui/separator";
import Container from "@/components/CustomUI/container";
import CTASection from "@/components/home/cta-section";
import FeatureSection from "@/components/home/feature-section";
import Recommendation from "@/components/home/recommendation-section";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <main>
      <Container>
        <div className="lg:mx-6">
          <CTASection />
          <FeatureSection />
          <Separator />
          <Recommendation />
        </div>
      </Container>
      <Footer />
    </main>
  );
}
