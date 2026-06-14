import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import BentoGrid from "@/components/BentoGrid";
import Features from "@/components/Features";
import Personas from "@/components/Personas";
import TrustModel from "@/components/TrustModel";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

/**
 * Product-led narrative:
 *  1. Hero (void)          - MSSP promise + the live console work queue
 *  2. TrustStrip (void)    - honest, in-production trust signals
 *  3. BentoGrid (bone)     - Section 01: the triage pipeline, on the console
 *  4. Features (bone)      - Section 02: the moat (evidence pack + autonomy)
 *  5. Personas (void)      - same promise, two ways (MSSP / lean team)
 *  6. TrustModel (bone)    - Section 03: open-core, total transparency
 *  7. Pricing (bone)       - Section 04: priced for the analyst
 *  8. Footer (bone)        - final CTA
 */
export default function Home() {
  return (
    <main className="relative min-h-screen text-white selection:bg-[#E8462E] selection:text-[#F2EAD8]">
      <Hero />
      <TrustStrip />
      <BentoGrid />
      <Features />
      <Personas />
      <TrustModel />
      <Pricing />
      <Footer />
    </main>
  );
}
