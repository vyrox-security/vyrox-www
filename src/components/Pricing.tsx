import { ArrowUpRight, Check } from "lucide-react";

const INCLUDED = [
  "Your EDRs, your tenants, your real alerts",
  "Triage + human-approved containment from day one",
  "An owned, SHA-256 evidence pack you keep",
  "No credit card, no commitment, cancel anytime",
];

const AUDIENCE = ["MSSPs & MDR", "Lean security teams", "Mid-market SOCs", "Enterprise"];

export default function Pricing() {
  return (
    <section id="pricing" className="surface-deep relative w-full border-t border-white/[0.06]">
      <div className="bg-grid-void absolute inset-0 opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-32">
        <div className="flex items-end justify-between gap-12 flex-wrap mb-14">
          <div>
            <span className="eyebrow text-[#FFE6B0]/70">Section 04 / Pricing</span>
            <h2 className="mt-6 display-tight text-[#F4EFE3] font-medium text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.92] max-w-[15ch]">
              Start with a free
              <br />
              <span className="display-wonk italic text-gradient-ember">30-day pilot.</span>
            </h2>
          </div>
          <p className="max-w-[400px] text-[#E4DDC8]/70 leading-relaxed text-[15px]">
            We&apos;re onboarding design partners, not publishing a price list yet. Run Vyrox on your
            own EDR alerts for 30 days, free. We set pricing with you afterward, scaled to your
            environment, never a number off a web page.
          </p>
        </div>

        {/* Pilot panel */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] border border-white/10 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-px bg-[#E8462E] z-10" />

          {/* Offer */}
          <div
            className="relative p-8 md:p-12 flex flex-col"
            style={{ background: "linear-gradient(180deg, rgba(232,70,46,0.15), rgba(13,15,20,0.92))" }}
          >
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#FF9156]">
              Design-partner pilot
            </span>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display font-medium tracking-tight text-[#F8F4EA] text-[clamp(2.6rem,5vw,3.6rem)] leading-none">
                Free
              </span>
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#E4DDC8]/65">
                for 30 days
              </span>
            </div>
            <p className="mt-5 text-[#E4DDC8]/75 text-[15px] leading-[1.6] max-w-[420px]">
              No card, no commitment. Bring the EDRs you already run; we triage, you approve, and you
              keep the audit trail whether you continue or not.
            </p>
            <a
              href="#access"
              className="group mt-9 inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-[12px] tracking-[0.16em] uppercase bg-[#E8462E] text-[#F2EAD8] hover:bg-[#FF6A3D] transition-colors w-fit"
            >
              Request your pilot
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Included */}
          <div className="p-8 md:p-12 bg-[#0a0b0f] flex flex-col justify-center">
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#FFE6B0]/55 mb-6">
              The pilot includes
            </span>
            <ul className="flex flex-col gap-4">
              {INCLUDED.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[#E4DDC8]/85 text-[14.5px] leading-snug">
                  <span className="mt-0.5 grid place-items-center w-4 h-4 shrink-0 bg-[#E8462E]/15 border border-[#E8462E]/35">
                    <Check className="w-2.5 h-2.5 text-[#E8462E]" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Audience + note */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center gap-x-7 gap-y-4 flex-wrap">
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#FFE6B0]/55 shrink-0">
            Built for
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {AUDIENCE.map((a, i) => (
              <span key={a} className="inline-flex items-center gap-5">
                {i > 0 && <span aria-hidden className="inline-block w-1 h-1 rotate-45 bg-[#E8462E]/55" />}
                <span className="font-mono text-[12px] tracking-[0.06em] text-[#E4DDC8]/75">{a}</span>
              </span>
            ))}
          </div>
        </div>

        <p className="mt-10 font-mono text-[10px] tracking-[0.2em] uppercase text-[#FFE6B0]/45 max-w-[760px] leading-[1.8]">
          Every engagement includes the owned, SHA-256 audit trail. No black-box verdicts. Pricing is
          set with design partners and scales with your book.
        </p>
      </div>
    </section>
  );
}
