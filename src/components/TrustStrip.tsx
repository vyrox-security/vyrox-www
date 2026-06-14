import { ShieldCheck, Gauge, GitCommit, Workflow } from "lucide-react";
import type { ComponentType } from "react";

type Item =
  | { kind: "lead"; label: string }
  | { kind: "signal"; icon: ComponentType<{ className?: string }>; label: string }
  | { kind: "status"; label: string };

const ITEMS: Item[] = [
  { kind: "lead", label: "The auditable action layer, in production" },
  { kind: "signal", icon: Workflow, label: "Sub-5 ms heuristics" },
  { kind: "signal", icon: ShieldCheck, label: "Human-approved containment" },
  { kind: "signal", icon: GitCommit, label: "SHA-256 audit chain you own" },
  { kind: "signal", icon: Gauge, label: "MIT open-core proxy" },
  { kind: "status", label: "Now onboarding design partners" },
];

/* Diamond separator, ember, between every chip. */
function Sep() {
  return <span aria-hidden className="inline-block w-1 h-1 rotate-45 bg-[#E8462E]/55 shrink-0" />;
}

function Chip({ item }: { item: Item }) {
  if (item.kind === "lead") {
    return (
      <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#FFE6B0]/75 whitespace-nowrap shrink-0">
        {item.label}
      </span>
    );
  }
  if (item.kind === "status") {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-[#F4EFE3]/55 whitespace-nowrap shrink-0">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E8462E] animate-pulse" />
        {item.label}
      </span>
    );
  }
  const Icon = item.icon;
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-[#E4DDC8]/70 whitespace-nowrap shrink-0">
      <Icon className="w-3.5 h-3.5 text-[#E8462E]" />
      {item.label}
    </span>
  );
}

/* One marquee copy. Items are doubled so a single copy comfortably exceeds the
   widest viewport, which keeps the translateX(-50%) loop seamless on any screen. */
function Copy() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="flex items-center gap-7 pr-7 shrink-0" aria-hidden="true">
      {loop.map((item, i) => (
        <span key={i} className="flex items-center gap-7">
          <Chip item={item} />
          <Sep />
        </span>
      ))}
    </div>
  );
}

export default function TrustStrip() {
  return (
    <section className="surface-void relative w-full border-t border-b border-[#F4EFE3]/10 overflow-hidden">
      <div className="bg-grid-void pointer-events-none absolute inset-0 opacity-40" />

      {/* Static, screen-reader-only copy of the signals. */}
      <ul className="sr-only">
        {ITEMS.map((it) => (
          <li key={it.label}>{it.label}</li>
        ))}
      </ul>

      {/* Single-line roundabout ticker, edge-faded into the void. */}
      <div
        className="relative z-10 py-7"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        }}
      >
        <div className="marquee-track [animation-duration:46s] hover:[animation-play-state:paused]">
          <Copy />
          <Copy />
        </div>
      </div>
    </section>
  );
}
