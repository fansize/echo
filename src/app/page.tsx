import Container from "@/components/container/container";
import FeatureSection from "@/components/home/feature-section";
import Recommendation from "@/components/home/recommendation-section";
import Footer from "@/components/customUI/footer";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <main>
      <Container>
        <div className="lg:mx-6">
          <CTASection />
          <FeatureSection />
          <Recommendation />
        </div>
      </Container>
      <Footer />
    </main>
  );
}
