# Vyrox WWW
![Licence](https://img.shields.io/badge/licence-proprietary-lightgrey?style=flat-square)
![Build](https://img.shields.io/badge/build-alpha-6a737d?style=flat-square)
![Version](https://img.shields.io/badge/version-v0.1.0--alpha-005cc5?style=flat-square)
![Platform](https://img.shields.io/badge/platform-node-339933?style=flat-square)
![Funny](https://img.shields.io/badge/hero%20copy-reviewed%20by%20skeptics-6a737d?style=flat-square)

## What is Vyrox?

Vyrox is an **AI-native Managed Detection and Response (MDR) service** that delivers enterprise-grade security at a fraction of traditional MSSP costs.

**The Problem**: Mid-market companies (200-2,500 employees) have CrowdStrike or SentinelOne but no SOC team to monitor it 24/7. Traditional MSSPs charge $15-25/endpoint/month and pad billable hours.

**The Solution**: AI-powered triage that handles 80%+ of alerts automatically, with human analysts for critical decisions. Same SLA as a 50-person MSSP, at 1/3 the price.

### Why Vyrox?

| Traditional MSSP | Vyrox |
|-----------------|-------|
| $15-25/endpoint/month | $6-8/endpoint/month |
| Billable hours padding | No padding — AI doesn't invoice |
| 24-48hr response | 15-minute SLA on CRITICAL |
| Account managers, overhead | API-first, no bloat |

Website: [vyrox.dev](https://vyrox.dev) (launching 2026)

---

Vyrox Landing is the public product site for explaining what Vyrox does, how the trust model works, and why the execution boundary is open-core and auditable. It exists separately from the runtime code so go-to-market iteration does not risk operational systems, while still giving security buyers enough implementation detail to pass an initial zero-trust sniff test.

## Why This Exists

Security teams rarely buy from a homepage, but they often reject from one. If the public narrative is vague, inconsistent, or detached from real architecture, trust is lost before technical review starts.

This repository keeps marketing content versioned and testable like code. Claims in the site should map to public documentation and observable behavior, not optimistic adjectives.

Keeping it separate also protects deployment velocity. Web content changes should not block ingestion, worker, or proxy release pipelines.

## Architecture

```text
[Content files]
	|
	v
[Site build]
	|
	+--> [Pages: product, security, docs links]
	|
	+--> [Assets: diagrams, brand media]
	|
	v
[Static deployment target]
```

## Quickstart

Prerequisites:

1. Node.js 20+
2. npm

1. Install dependencies.

```bash
# Install project dependencies
npm install
```

2. Start the local development server.

```bash
# Run local site in watch mode
npm run dev
```

3. Build for production validation.

```bash
# Create production bundle and catch build regressions
npm run build
```

## Configuration

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| N/A | No | N/A | No runtime environment variables currently defined in this repository. |

## Contributing

Contributions are most useful for factual corrections, accessibility improvements, and content clarity that helps external engineers evaluate the system quickly. Security page accuracy matters more than visual novelty.

Do not merge copy that overstates capabilities, implies unsupported integrations, or conflicts with public architecture documentation. This repository is marketing, not fiction.

See CONTRIBUTING.md for contribution process and review expectations. External contributions may be accepted, but claims must remain technically defensible.

Security contact: sec.vyrox@proton.me

## Licence

This repository is released under Vyrox commercial terms. See LICENCE for details.
