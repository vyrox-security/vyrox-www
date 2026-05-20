import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import NoiseVsSignal from "@/components/NoiseVsSignal";
import TrustModel from "@/components/TrustModel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-[#FF512F] selection:text-white">
      <Hero />
      <BentoGrid />
      <NoiseVsSignal />
      <TrustModel />
      <Footer />
    </main>
  );
}
