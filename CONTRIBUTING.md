# Contributing to Vyrox WWW

## Before You Open a PR

This repository is in alpha. Bug reports and copy/UX fixes are welcome.

The most useful contributions improve clarity, accessibility, and factual accuracy.

## Development Setup

```bash
# Clone repository
git clone https://github.com/vyrox-security/vyrox-landing.git
cd vyrox-landing

# Install dependencies
npm install

# Run locally
npm run dev

# Build production bundle
npm run build
```

## Opening an Issue

Use issue templates under `.github/ISSUE_TEMPLATE`.

Do not report security vulnerabilities in public issues. Follow `SECURITY.md`.

## Opening a Pull Request

Use `.github/PULL_REQUEST_TEMPLATE.md`.

Include validation steps and screenshots for UI changes when relevant.

## Code Style

- Keep technical claims consistent with docs
- Prefer clarity over hype
- Keep accessibility and mobile behavior intact
- Commit messages follow Conventional Commits (`feat`, `fix`, `docs`, `test`, `chore`)

## What We Will Not Merge

- Claims that overstate product behavior
- Security guidance that weakens controls
- Hardcoded secrets in client code
- Documentation-only PRs without concrete corrections
