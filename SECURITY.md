# Security Policy

This is a personal blog. The realistic security surface is small, mostly the CloudFront Function code, the GitHub Actions workflow, and configuration in this repo. If you find something that affects the security or integrity of matt.berther.io, please disclose privately rather than opening a public issue.

## Reporting

- GitHub: [private vulnerability report](https://github.com/mattberther/berther.io/security/advisories/new)
- PGP: [public key](https://matt.berther.io/pgp/) for encrypted reports.

I'll acknowledge receipt in a reasonable timeframe. Expect coordination on timeline. I'm one person, not running an enterprise security program.

## Scope

In scope:

- The deployed site (matt.berther.io and aliased domains)
- Code in this repository (workflow, plugins, config, edge function)

Out of scope:

- Upstream dependency vulnerabilities (chirpy, Jekyll, gems). Report those to their respective maintainers.
- Third-party services (AWS, GitHub, Disqus) unless the issue is in how I've configured them.
- Automated scanner findings without proof of impact.

## Disclosure

I prefer coordinated disclosure. Give me reasonable time to fix the issue, and I'll credit you in any public writeup if you'd like to be named.
