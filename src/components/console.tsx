/* =============================================================
   Vyrox console UI toolkit.
   Faithful, in-DOM reproductions of the real operator console
   (vyrox-console). Pure presentation, no hooks, no browser APIs,
   so it composes into any section. The dark slate + ember + bone
   palette is the same brand DNA as the marketing site; the console
   tokens are sourced from this site's globals.css.
   ============================================================= */

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

export const C = {
  void: "#07070a",
  pitch: "#0b0c10",
  graphite: "#14161c",
  ash: "#1c1f27",
  slate: "#262a35",
  line: "#2e333f",
  lineSoft: "#23272f",
  fg: "#e9e7df",
  fgDim: "#a8a89e",
  fgFaint: "#6c6f78",
  bone: "#f2ead8",
  ember: "#e8462e",
  ember2: "#ff6a3d",
  emberSoft: "rgba(232, 70, 46, 0.12)",
  emberLine: "rgba(232, 70, 46, 0.4)",
  pass: "#2faf6a",
  passSoft: "rgba(47, 175, 106, 0.12)",
  passLine: "rgba(47, 175, 106, 0.45)",
  medium: "#eab308",
} as const;

export const consoleGrid: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(233,231,223,0.022) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,231,223,0.022) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
};

export type Verdict = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "BENIGN";
export type QStatus = "pending" | "auto_closed" | "executed" | "approved" | "denied";

/* ---- Window chrome ---------------------------------------------------- */

export function ConsoleWindow({
  route,
  status,
  tab,
  ariaLabel,
  className = "",
  style,
  children,
  ...rest
}: {
  route: string;
  status?: ReactNode;
  tab?: { icon?: ReactNode; label: string };
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <div
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      className={`relative w-full ${className}`}
      style={{
        background: "#0d0f14",
        border: `1px solid #232834`,
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 40px 90px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(232,70,46,0.06)",
        ...style,
      }}
      {...rest}
    >
      {tab && (
        <div
          className="absolute -top-3.5 left-5 z-20 inline-flex items-center gap-2 px-3.5 py-[6px] font-mono text-[11.5px] font-semibold tracking-[0.12em] uppercase text-[#F8F4EA]"
          style={{
            background: "#1b1e26",
            border: "1px solid #424a5a",
            boxShadow: "0 8px 22px -8px rgba(0,0,0,0.75)",
          }}
        >
          <span className="flex text-[#FF6A3D]">{tab.icon}</span>
          {tab.label}
        </div>
      )}
      <div
        className="flex items-center justify-between gap-3"
        style={{ height: 36, padding: "0 14px", borderBottom: `1px solid ${C.lineSoft}` }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Image
            src="/vyrox-mark.png"
            alt=""
            width={581}
            height={569}
            className="shrink-0 object-contain"
            style={{ width: 18, height: 18 }}
          />
          <span className="font-mono truncate" style={{ fontSize: 11, color: C.fgDim }}>
            {route}
          </span>
        </div>
        {status != null && (
          <span
            className="font-mono uppercase shrink-0"
            style={{ fontSize: 10, letterSpacing: "0.12em", color: C.fgFaint }}
          >
            {status}
          </span>
        )}
      </div>
      <div className="relative" style={{ background: C.void }}>
        <div className="pointer-events-none absolute inset-0" style={consoleGrid} />
        <div className="relative" style={{ padding: "18px 18px 16px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Panel({
  title,
  right,
  children,
}: {
  title?: string;
  right?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ border: `1px solid ${C.line}`, background: C.pitch, padding: "12px 13px" }}>
      {(title || right) && (
        <div className="flex items-center justify-between" style={{ marginBottom: 9 }}>
          <span className="font-mono uppercase" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: C.fgFaint }}>
            {title}
          </span>
          {right && (
            <span className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.12em", color: C.fgFaint }}>
              {right}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export function Td({ children }: { children: ReactNode }) {
  return <td style={{ padding: "11px 12px", verticalAlign: "middle" }}>{children}</td>;
}

const VERDICT_C: Record<Verdict, string> = {
  CRITICAL: "#ef4444",
  HIGH: "#f97316",
  MEDIUM: "#eab308",
  LOW: "#3b82f6",
  BENIGN: "#5a8a6b",
};

export function VerdictChip({ v }: { v: Verdict }) {
  const c = VERDICT_C[v];
  return (
    <span
      className="inline-flex items-center font-mono font-semibold uppercase"
      style={{ color: c, border: `1px solid ${c}`, fontSize: 9, letterSpacing: "0.08em", padding: "2px 6px" }}
    >
      {v}
    </span>
  );
}

const STATUS_DOT: Record<QStatus, string> = {
  pending: "#f97316",
  auto_closed: "#2faf6a",
  executed: "#3b82f6",
  approved: "#2faf6a",
  denied: "#6c6f78",
};

export function StatusPill({ status, label }: { status: QStatus; label: string }) {
  return (
    <span
      className="inline-flex items-center font-mono uppercase whitespace-nowrap"
      style={{ fontSize: 9.5, letterSpacing: "0.06em", color: C.fgDim }}
    >
      <span
        className="inline-block"
        style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_DOT[status], marginRight: 6 }}
      />
      {label}
    </span>
  );
}

export function ConfBar({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center" style={{ gap: 8 }}>
      <span style={{ width: 48, height: 5, background: C.ash, position: "relative", overflow: "hidden", display: "inline-block" }}>
        <span style={{ position: "absolute", inset: "0 auto 0 0", width: `${value * 100}%`, background: C.ember }} />
      </span>
      <span className="font-mono" style={{ fontSize: 10.5, color: C.fgDim, width: 30 }}>
        {Math.round(value * 100)}%
      </span>
    </span>
  );
}

export function ContribBar({ name, weight }: { name: string; weight: number }) {
  return (
    <div className="flex items-center" style={{ gap: 10, padding: "7px 0" }}>
      <span className="font-mono flex-1 truncate" style={{ fontSize: 11, color: C.fgDim }}>
        {name}
      </span>
      <span style={{ width: 110, height: 6, background: C.ash, position: "relative", overflow: "hidden", flex: "none" }}>
        <span
          style={{ position: "absolute", inset: "0 auto 0 0", width: `${weight * 100}%`, background: `linear-gradient(90deg, ${C.ember}, ${C.ember2})` }}
        />
      </span>
      <span className="font-mono text-right" style={{ fontSize: 10.5, color: C.fgDim, width: 34, flex: "none" }}>
        {Math.round(weight * 100)}%
      </span>
    </div>
  );
}

export function WinButton({
  variant,
  children,
}: {
  variant: "primary" | "default" | "ghost";
  children: ReactNode;
}) {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "8px 14px",
    border: `1px solid ${C.line}`,
  };
  const variants: Record<typeof variant, CSSProperties> = {
    primary: { ...base, background: C.ember, borderColor: C.ember, color: C.bone },
    default: { ...base, background: C.graphite, color: C.fg },
    ghost: { ...base, background: "transparent", color: C.fg },
  };
  return (
    <span className="font-mono" style={variants[variant]} aria-hidden>
      {children}
    </span>
  );
}

/* ---- Shared fixture data (mirrors vyrox-console mock fixtures) --------- */

export const QUEUE_ROWS: {
  id: string;
  tenant: string;
  swatch: string;
  title: string;
  verdict: Verdict;
  conf: number;
  status: QStatus;
  statusLabel: string;
}[] = [
  { id: "alr_0xC1", tenant: "Meridian Health", swatch: "#eab308", title: "Credential dumping via LSASS access", verdict: "CRITICAL", conf: 0.94, status: "pending", statusLabel: "Needs you" },
  { id: "alr_0xC3", tenant: "Northwind Capital", swatch: "#e8462e", title: "Lateral movement over SMB", verdict: "HIGH", conf: 0.77, status: "pending", statusLabel: "Needs you" },
  { id: "alr_0xC2", tenant: "Meridian Health", swatch: "#eab308", title: "Encoded PowerShell, crown-jewel host", verdict: "HIGH", conf: 0.81, status: "pending", statusLabel: "Needs you" },
  { id: "alr_0xC5", tenant: "Northwind Capital", swatch: "#e8462e", title: "nmap against staging subnet", verdict: "BENIGN", conf: 0.88, status: "auto_closed", statusLabel: "Auto closed" },
];

export const HEURISTIC_ROWS = [
  { rule: "sanctioned_scanner_subnet", weight: 0.92 },
  { rule: "known_dev_account", weight: 0.74 },
  { rule: "internal_destination_only", weight: 0.55 },
];

export const MITRE = [
  { id: "T1003.001", name: "LSASS Memory" },
  { id: "T1003", name: "OS Credential Dumping" },
  { id: "T1071.001", name: "Web Protocols" },
];

export const CHAIN = [
  { label: "verdict CRITICAL", hash: "a4f1c9e2b7d8" },
  { label: "approved · r.mehta", hash: "018b7c3d6e5f" },
  { label: "host isolated", hash: "4a2b1c0d9e8f" },
];

/* ---- Composed screens ------------------------------------------------- */

/** The cross-client work queue table (used in the hero + pipeline). */
export function QueueTable({ rows = QUEUE_ROWS }: { rows?: typeof QUEUE_ROWS }) {
  return (
    <div className="overflow-x-auto" style={{ border: `1px solid ${C.line}`, background: C.pitch }}>
      <table className="w-full border-collapse" style={{ fontSize: 12.5 }}>
        <thead>
          <tr>
            {["Tenant", "Alert", "Verdict", "Conf", "Status"].map((h) => (
              <th
                key={h}
                className="font-mono uppercase text-left whitespace-nowrap"
                style={{ fontSize: 9, letterSpacing: "0.16em", color: C.fgFaint, padding: "9px 12px", background: C.graphite, borderBottom: `1px solid ${C.line}` }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id} style={{ borderBottom: i === rows.length - 1 ? "none" : `1px solid ${C.lineSoft}` }}>
              <Td>
                <span className="inline-flex items-center gap-2 whitespace-nowrap" style={{ color: C.fgDim, fontSize: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: r.swatch, flex: "none" }} />
                  {r.tenant}
                </span>
              </Td>
              <Td><span style={{ color: C.fg, fontWeight: 600 }}>{r.title}</span></Td>
              <Td><VerdictChip v={r.verdict} /></Td>
              <Td><ConfBar value={r.conf} /></Td>
              <Td><StatusPill status={r.status} label={r.statusLabel} /></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Full work-queue window with chrome + live footer. */
export function QueueWindow({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <ConsoleWindow
      route="console.vyrox.dev / queue"
      className={className}
      style={style}
      ariaLabel="Vyrox console work queue: EDR alerts across two client tenants, from a critical credential-dumping alert to a benign scan auto-closed by heuristics."
      status={
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.ember }} />
          Live
        </span>
      }
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {[["Tenant", "All"], ["Severity", "Any"], ["Status", "Any"]].map(([k, v]) => (
          <span
            key={k}
            className="inline-flex items-center gap-1.5 font-mono"
            style={{ fontSize: 10, padding: "4px 8px", border: `1px solid ${C.line}`, background: C.graphite, color: C.fgDim }}
          >
            <span style={{ color: C.fgFaint }}>{k}:</span>
            {v}
          </span>
        ))}
      </div>
      <QueueTable />
      <div className="flex items-center justify-between mt-3 font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.16em", color: C.fgFaint }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.ember }} />
          Stream active
        </span>
        <span>CrowdStrike · SentinelOne</span>
      </div>
    </ConsoleWindow>
  );
}

/** Evidence-pack verification window: PASS banner + SHA-256 chain. */
export function EvidenceWindow({ className, style }: { className?: string; style?: CSSProperties }) {
  const chain = [
    { label: "genesis", hash: "genesis::0000" },
    { label: "alert ingested", hash: "a4f1c9e2b7d8" },
    { label: "verdict CRITICAL", hash: "0631f5ac24e9" },
    { label: "approved · r.mehta", hash: "018b7c3d6e5f" },
    { label: "host isolated", hash: "4a2b1c0d9e8f" },
    { label: "rolled back", hash: "7a6b5c4d3e2f" },
  ];
  return (
    <ConsoleWindow
      route="console.vyrox.dev / evidence / Meridian Health"
      status="SHA-256 · signed"
      className={className}
      style={style}
      ariaLabel="Vyrox evidence pack verification for Meridian Health: 44 records re-hashed, chain continuous, signature valid."
    >
      <div
        className="flex items-center gap-4"
        style={{ border: `2px solid ${C.passLine}`, background: C.passSoft, padding: "16px 18px", marginBottom: 14 }}
      >
        <span
          className="grid place-items-center shrink-0"
          style={{ width: 44, height: 44, borderRadius: "50%", border: `3px solid ${C.pass}`, color: C.pass, fontSize: 22, fontWeight: 800 }}
        >
          ✓
        </span>
        <div>
          <div style={{ color: C.pass, fontWeight: 800, fontSize: 20, letterSpacing: "0.04em" }}>VERIFIED</div>
          <div style={{ color: C.fgDim, fontSize: 12, marginTop: 3 }}>
            44 records re-hashed, chain continuous, signature valid.
          </div>
        </div>
      </div>
      <Panel title="Audit chain" right="append-only">
        <div className="font-mono" style={{ fontSize: 11.5 }}>
          {chain.map((n, i) => (
            <div key={n.hash} className="flex items-center" style={{ gap: 12, padding: "6px 0" }}>
              <span className="flex flex-col items-center" style={{ width: 14, flex: "none" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${C.pass}`, background: C.void }} />
                {i < chain.length - 1 && <span style={{ width: 2, height: 12, background: C.pass, marginTop: 2 }} />}
              </span>
              <span style={{ color: C.fgDim, minWidth: 140 }}>{n.label}</span>
              <span style={{ color: C.fgFaint }} className="truncate">{n.hash}</span>
            </div>
          ))}
        </div>
      </Panel>
      <div className="flex items-center justify-between mt-3 font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.16em", color: C.fgFaint }}>
        <span>signer · 9F2A 4C71 8E0B 6D3A</span>
        <span style={{ color: C.medium, border: `1px dashed ${C.medium}`, padding: "1px 6px" }}>synthetic reference</span>
      </div>
    </ConsoleWindow>
  );
}

/** Per-tenant autonomy ladder (L0-L4), L2 current, L3 settable, L4 locked. */
export function AutonomyWindow({ className, style }: { className?: string; style?: CSSProperties }) {
  const rungs = [
    { lvl: "L0", title: "Observe only", desc: "Triage and explain. No actions surfaced." },
    { lvl: "L1", title: "Recommend", desc: "Recommend an action; human executes." },
    { lvl: "L2", title: "Human approves everything", desc: "Containment queued for one-click approval.", current: true },
    { lvl: "L3", title: "Auto-execute reversible", desc: "High-confidence, low-blast-radius, reversible.", settable: true },
    { lvl: "L4", title: "Run operations", desc: "Runs within policy; humans handle exceptions.", locked: true },
  ];
  return (
    <ConsoleWindow
      route="console.vyrox.dev / autonomy / Meridian Health"
      status="default L2"
      className={className}
      style={style}
      ariaLabel="Vyrox autonomy ladder for a tenant: levels L0 to L4, currently L2 (human approves everything), L3 settable, L4 locked."
    >
      <div className="flex flex-col" style={{ gap: 8 }}>
        {rungs.map((r) => {
          const active = r.current;
          return (
            <div
              key={r.lvl}
              className="flex items-start"
              style={{
                gap: 12,
                padding: "11px 12px",
                border: `1px solid ${active ? C.emberLine : C.lineSoft}`,
                background: active ? C.emberSoft : C.graphite,
                opacity: r.locked ? 0.5 : 1,
              }}
            >
              <span className="font-mono" style={{ fontSize: 12, fontWeight: 700, width: 22, flex: "none", color: active ? C.ember2 : C.fgDim }}>
                {r.lvl}
              </span>
              <div className="flex-1">
                <div style={{ fontSize: 13, color: C.fg }}>{r.title}</div>
                <div style={{ fontSize: 12, color: C.fgFaint, marginTop: 2 }}>{r.desc}</div>
              </div>
              {(active || r.settable || r.locked) && (
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    padding: "2px 6px",
                    border: `1px solid ${active ? C.emberLine : C.line}`,
                    color: active ? C.ember2 : C.fgFaint,
                  }}
                >
                  {active ? "current" : r.settable ? "settable" : "locked"}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-3 font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.16em", color: C.fgFaint }}>
        <span>per-tenant policy</span>
        <span>reversible · audited</span>
      </div>
    </ConsoleWindow>
  );
}
