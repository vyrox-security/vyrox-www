import Hero from "@/components/Hero";
import NoiseVsSignal from "@/components/NoiseVsSignal";
import BentoGrid from "@/components/BentoGrid";
import TrustModel from "@/components/TrustModel";
import Footer from "@/components/Footer";

/**
 * Narrative flow:
 *  1. Hero (void)                 — Vyrox awakens
 *  2. NoiseVsSignal (handoff)     — void → bone, the conceptual pivot
 *  3. BentoGrid (bone)            — the engine, shown on paper
 *  4. TrustModel (bone)           — open-core credibility
 *  5. Footer (bone)               — final CTA
 */
export default function Home() {
  return (
    <main className="relative min-h-screen text-white selection:bg-[#E8462E] selection:text-[#F2EAD8]">
      <Hero />
      <NoiseVsSignal />
      <BentoGrid />
      <TrustModel />
      <Footer />
    </main>
  );
}
