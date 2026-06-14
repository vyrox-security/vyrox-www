import { Building2, User, ArrowUpRight, Check } from "lucide-react";

const PERSONAS = [
  {
    icon: Building2,
    tag: "For MSSPs & MDR",
    title: "One analyst safely covers many clients.",
    body: "Run your whole book from one console. Triage, contain, and prove every action across every client tenant, with isolation enforced at the query.",
    points: [
      "Cross-client work queue, one screen",
      "A per-client evidence pack their auditor can verify",
      "White-label, per-tenant volume pricing",
    ],
    cta: "Become a partner",
  },
  {
    icon: User,
    tag: "For lean security teams",
    title: "The reach of a far larger SOC, no extra headcount.",
    body: "You own security and you are the one triaging alerts. Vyrox takes the first pass in milliseconds and only surfaces what genuinely needs you.",
    points: [
      "Triage you do not have to staff for",
      "Human-approved containment, reversible by rollback",
      "Flat pricing, live in minutes",
    ],
    cta: "Request access",
  },
];

export default function Personas() {
  return (
    <section id="personas" className="surface-void relative w-full overflow-hidden">
      <div className="bg-grid-void pointer-events-none absolute inset-0 opacity-50" />
      <div className="bg-grain mb-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28">
        <div className="flex items-center gap-3 mb-10">
          <span className="inline-block w-8 h-px bg-[#FFE6B0]/40" />
          <span className="eyebrow text-[#FFE6B0]/70">Same promise, two ways</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PERSONAS.map((p) => (
            <div
              key={p.tag}
              className="group relative flex flex-col p-8 md:p-10 border border-[#F4EFE3]/12 bg-[#0A0A0B]/60 hover:border-[#E8462E]/45 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(232,70,46,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative flex items-center gap-3 mb-7">
                <span className="grid place-items-center w-9 h-9 bg-[#E8462E]/12 border border-[#E8462E]/30">
                  <p.icon className="w-4 h-4 text-[#E8462E]" />
                </span>
                <span className="eyebrow text-[#FFE6B0]/70">{p.tag}</span>
              </div>
              <h3 className="relative font-display text-[#F4EFE3] tracking-tight leading-[1.05] text-[clamp(1.5rem,2.4vw,2.1rem)] mb-5">
                {p.title}
              </h3>
              <p className="relative text-[#E4DDC8]/70 leading-[1.65] text-[15px] max-w-[440px]">
                {p.body}
              </p>
              <ul className="relative mt-7 flex flex-col gap-3 flex-1">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[#E4DDC8]/85 text-[14px] leading-snug">
                    <span className="mt-0.5 grid place-items-center w-4 h-4 shrink-0 bg-[#E8462E]/15 border border-[#E8462E]/35">
                      <Check className="w-2.5 h-2.5 text-[#E8462E]" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <a
                href="#access"
                className="relative mt-9 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[#FFE6B0]/80 hover:text-[#E8462E] transition-colors w-fit"
              >
                {p.cta}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
