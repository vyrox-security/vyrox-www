import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

/* Type system:
   - Body / UI / general content: Geist (Vercel) - clean neo-grotesque.
   - Display / headings: Forma (DJR) is commercial and not on Google Fonts;
     Bricolage Grotesque is the closest free characterful display grotesque,
     giving the premium contrast + hierarchy Forma provides against Geist.
     Swap in licensed Forma via next/font/local when available.
   - Mono / code: Geist Mono (pairs with Geist). */
const display = Bricolage_Grotesque({
  variable: "--font-display-src",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body-src",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-src",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vyrox Security · We extract the signal",
  description:
    "Vyrox Security is the autonomous, auditable action layer for security operations. We triage your EDR alerts, contain the real threats on your approval, and hand each client a tamper-evident record their auditor can verify.",
  openGraph: {
    title: "Vyrox Security · We extract the signal",
    description:
      "The auditable action layer for MSSPs. Deterministic triage, human-approved containment, and an owned, verifiable evidence pack for every client.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505]">{children}</body>
    </html>
  );
}
