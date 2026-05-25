# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| v0.1.x | Yes |
| < v0.1.0-alpha | No |

Versions before `v0.1.0-alpha` are not supported and should not be deployed.

## Reporting a Vulnerability

Do not open a public issue for vulnerabilities.

Email: `sec.vyrox@proton.me`

Subject format:

```text
SECURITY: <brief description>
```

Response SLA:

- Acknowledgement within 48 hours
- Initial triage within 7 days
- Patch timeline communicated within 14 days

PGP key available at https://vyrox.dev/.well-known/pgp-key.txt.

## Scope

In scope:

- Vulnerabilities in deployment/build configuration
- Sensitive data exposure through site content or scripts
- Dependency-related security issues in the web stack

Out of scope:

- Visual style preferences
- Physical-access attack scenarios

## Disclosure Policy

Vyrox follows coordinated disclosure. Reporters are credited unless anonymity is requested.

No bounty program is active during alpha.

## Known Limitations

- Marketing pages may temporarily lead implementation details during active iteration.
- Infrastructure capacity constraints can affect preview environment reliability.

These are operational constraints, not vulnerabilities.
