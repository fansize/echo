import Container from "@/components/container/container";
import FeatureSection from "@/components/home/feature-section";
import Recommendation from "@/components/home/recommendation-section";
import Footer from "@/components/container/footer";
import CTASection from "@/components/home/cta-section";
import Nav from "@/components/container/nav";
import Background from "@/components/container/background";

export default function Home() {
  return (
    <main>
      <Background />
      <Nav />
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
