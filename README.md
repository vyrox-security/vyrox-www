# Vyrox WWW
![Licence](https://img.shields.io/badge/licence-proprietary-lightgrey?style=flat-square)
![Build](https://img.shields.io/badge/build-alpha-6a737d?style=flat-square)
![Version](https://img.shields.io/badge/version-v0.1.0--alpha-005cc5?style=flat-square)
![Platform](https://img.shields.io/badge/platform-node-339933?style=flat-square)
![Funny](https://img.shields.io/badge/hero%20copy-reviewed%20by%20skeptics-6a737d?style=flat-square)

## What is Vyrox?

Vyrox is the **autonomous, auditable action layer for security operations**. We act on EDR alerts and prove every action with an owned, tamper-evident audit trail.

**The Problem**: detection is solved, response is not. An alert fires, it sits in a queue, and at 2am nobody is home. Even when someone acts, no one can reconstruct what was done afterward. Companies bought detection and were left alone with the hard part.

**The Solution**: deterministic heuristics drop most of the noise, an LLM handles the ambiguous rest, and we act on what is real (human approval by default, autonomous where the customer turns it on and the action is reversible). Every action is written to a SHA-256 hash-chained audit log the customer owns.

### Who it is for

Sold MSSP-first: one analyst covers many client tenants and can prove every action to each client's auditor. Lean in-house teams come in through the inbound door.

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

Security contact: security@vyrox.dev

## Licence

This repository is released under Vyrox commercial terms. See LICENCE for details.
