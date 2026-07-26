# AI AGENT — Permanent System Instruction

This document governs every coding task performed by AI agents in this repository.
It is immutable unless explicitly updated by the user. AI agents MUST read this file at the start of every session.

---

## 1. Pre-Task Project Scan

Before ANY modification, the AI agent MUST:

1.1 **Full directory scan** — Run `Get-ChildItem -Recurse` or equivalent to enumerate all files and directories.

1.2 **Git status check** — Run `git status`, `git diff`, `git log --oneline -10` to understand current branch, uncommitted changes, and recent history.

1.3 **Environment detection** — Check for `.env`, `.env.local`, `.env.development`, `.env.production`. If a `.env.example` exists, compare it against actual env files for missing keys.

1.4 **Dependency audit** — Inspect `package.json`, `requirements.txt`, `Cargo.toml`, `go.mod`, `Gemfile`, `composer.json`, etc. Verify dependencies are installed (`node_modules`, `vendor`, `target/debug`, etc.).

1.5 **Build configuration audit** — Read `tsconfig.json`, `vite.config.ts`, `next.config.js`, `webpack.config.js`, `.babelrc`, `jest.config.js`, `.eslintrc.*`, `.prettierrc*`, etc.

1.6 **Database configuration** — Check for `prisma/schema.prisma`, `typeorm`, `sequelize`, `knexfile.js`, `drizzle.config.ts`, etc. Verify connection strings exist (not hardcoded).

1.7 **Broken import detection** — Scan source files for import/require statements, resolve each against the filesystem. Flag unresolved paths.

1.8 **Missing file detection** — Compare imports, route references, and configuration references against actual file listings.

1.9 **Security scan** — Check for hardcoded secrets, exposed API keys, insecure dependencies, missing `.gitignore` entries, exposed internal endpoints.

---

## 2. Automatic Diagnosis

After scanning, the AI agent MUST diagnose every detected issue:

2.1 **Severity classification**
   - **CRITICAL** — Security vulnerability, broken build, data loss risk.
   - **HIGH** — Runtime error, broken route, missing required dependency.
   - **MEDIUM** — Missing config file, type error, lint warning.
   - **LOW** — Style inconsistency, minor performance issue, outdated comment.

2.2 **Root cause analysis** — For each issue, determine the underlying cause (not just the symptom).

2.3 **Impact assessment** — Evaluate what breaks or degrades if the issue is not fixed.

---

## 3. Automatic Fix Rules

### 3.1 Safe Operations (fix without asking)
- Missing `.gitignore` entries for standard ignores (`node_modules`, `.env`, `dist`, `build`, `.next`, `coverage`, `*.log`)
- Missing `.env.example` (create from `.env` with values redacted)
- Unused imports (safe to remove)
- Missing trailing newline at end of files
- Incorrect indentation that breaks parsing
- Missing `package.json` fields (`private`, `license`, `version`)
- Deprecated dependency versions (with patch-level bumps only)
- Typo fixes in comments and non-user-facing strings
- Outdated lock file (run `npm install` or equivalent)
- Incorrect file permissions (missing execute bit on scripts)
- Unused variables (safe to prefix with `_` or remove)

### 3.2 Conditional Operations (ask user)
- Adding new dependencies
- Changing project structure (moving/renaming files)
- Changing API contracts
- Modifying database schemas
- Changing authentication logic
- Modifying environment variable requirements

### 3.3 NEVER DO
- Overwrite user-authored code without explicit instruction
- Delete files (unless explicitly asked)
- Expose secrets, keys, or tokens in output or commits
- Modify `.env` files directly (create `.env.example` instead)
- Install global packages
- Modify production databases
- Commit to main/master/production branch without user confirmation

---

## 4. Verification Loop

After any fix, the AI agent MUST verify:

4.1 **Build verification** — Run the build command and confirm zero errors.

4.2 **Lint verification** — Run the linter and confirm zero errors.

4.3 **Type checking** — Run TypeScript type checker and confirm zero errors.

4.4 **Test verification** — Run test suite and confirm all existing tests pass.

4.5 **Git verification** — Run `git status` and `git diff` to confirm only intended files were modified.

4.6 **Regression check** — Verify that fixing one issue did not introduce another.

**Loop until stable.** If any verification step fails, diagnose and fix iteratively.

---

## 5. Specific Checks

### 5.1 Import Verification
- Resolve every `import X from "..."` against the filesystem.
- Resolve every `require("...")` against the filesystem.
- Check for circular dependencies.
- Verify that barrel exports (`index.ts`) re-export only what exists.
- Check for `.ts` imports without extension in compiled contexts.

### 5.2 Route Verification
- For Next.js: Verify `app/` and `pages/` directory structure matches intended routes.
- For Express/Fastify: Verify all route handlers exist and middleware chain is valid.
- For React Router: Verify all `<Route>` components point to existing components.
- Check for missing `generateStaticParams`, `getStaticPaths`, `getServerSideProps`.

### 5.3 Dependency Verification
- Check `version` in `package.json` matches `package-lock.json`.
- Verify all `peerDependencies` are satisfied.
- Check for duplicate dependencies across workspaces.
- Verify Node.js version matches `engines` field.
- Run `npm audit` or `yarn audit` for known vulnerabilities.

### 5.4 Environment Variable Verification
- For every `process.env.X` usage, verify a corresponding entry in `.env.example`.
- Check that all required vars are documented in README or env example.
- Verify type correctness (string, number, boolean parsing).

### 5.5 Database Verification
- Verify Prisma/TypeORM/Drizzle schema compiles.
- Verify migration files are in order and not conflicting.
- Check `DATABASE_URL` format correctness.
- Verify connection with a test query (if safe and non-destructive).

### 5.6 Migration Verification
- Check migration files are sequential and non-overlapping.
- Verify down migrations reverse up migrations correctly.
- Check for missing migration after schema changes.

### 5.7 Git Status Verification
- Check for uncommitted work before making changes.
- Verify branch naming conventions (feature/, fix/, chore/).
- Check for merge conflicts.
- Verify `.gitignore` covers all generated/build directories.
- Check for committed credentials (run `git log --all -p | grep -i` for sensitive patterns).

### 5.8 Runtime Error Detection
- Scan for `console.log` left in production code.
- Check for `TODO`, `FIXME`, `HACK`, `XXX` comments.
- Check for `any` type usage that could mask runtime errors.
- Check for missing error boundaries.
- Check for unhandled promise rejections (`process.on('unhandledRejection')`).

### 5.9 Console Error Detection
- Check for `console.error` usage that should be structured logging.
- Check for swallowed errors in catch blocks (bare `catch(e) {}`).
- Verify error reporting service is configured (Sentry, DataDog, etc.).

### 5.10 Build Error Detection
- Verify all build scripts are valid.
- Check for missing build dependencies.
- Verify output directory is configured and writable.
- Check for incompatible TypeScript/Babel/Webpack versions.

### 5.11 Lint Error Detection
- Run `eslint`, `tslint`, `stylelint`, `prettier --check`.
- Verify lint configuration extends the correct presets.
- Check for disabled rules that should be enabled.

### 5.12 Type Checking
- Run `tsc --noEmit`.
- Verify strict mode is enabled.
- Check for `@ts-ignore` and `@ts-expect-error` comments.
- Check `"strict": true` in `tsconfig.json`.

### 5.13 Security Scanning
- Check for hardcoded secrets: `API_KEY`, `SECRET`, `PASSWORD`, `TOKEN`, `PRIVATE_KEY`.
- Run `npm audit` / `yarn audit`.
- Check for `eval()`, `Function()`, `setTimeout(string)`, `setInterval(string)`.
- Check for SQL injection vectors (raw query concatenation).
- Check for XSS vectors (dangerouslySetInnerHTML, v-html).
- Check for CSRF protection on mutation routes.
- Verify helmet/security headers are configured.
- Check for exposed `.env` files in static builds.

### 5.14 Performance Optimization
- Check for large bundle sizes (use `next/bundle-analyzer` or `webpack-bundle-analyzer`).
- Check for missing code splitting (lazy loading routes/components).
- Check for missing image optimization (next/image, optimized images).
- Check for unoptimized re-renders (missing React.memo, useMemo, useCallback).
- Check for large third-party libraries that could be tree-shaken.
- Check for missing caching headers on API routes.
- Check for database N+1 queries.
- Check for missing pagination on list endpoints.

### 5.15 Responsive UI Validation
- Check for hardcoded pixel widths that break on mobile.
- Verify `meta viewport` tag is present.
- Check for missing responsive breakpoints.
- Verify touch targets are at least 44x44px.
- Check for horizontal scroll issues.
- Verify font sizes use relative units (`rem`, `em`, `vw`).

### 5.16 Accessibility Validation
- Check for missing `alt` attributes on images.
- Check for missing `aria-label` on icon buttons.
- Check for proper heading hierarchy (h1 -> h2 -> h3).
- Check for missing form labels.
- Check for missing `lang` attribute on `<html>`.
- Check for sufficient color contrast.
- Check for keyboard navigability.
- Check for focus indicators.

### 5.17 API Validation
- Verify all endpoints return proper status codes.
- Check for missing error responses.
- Verify request validation (zod, joi, yup schemas).
- Check for missing rate limiting.
- Check for missing authentication on protected routes.
- Verify CORS configuration.
- Verify API versioning strategy.

### 5.18 Testing
- Check for missing unit tests on business logic.
- Check for missing integration tests on API routes.
- Check for missing E2E tests on critical flows.
- Verify test coverage is above 80% on critical modules.
- Check that tests actually assert (not empty test blocks).
- Verify CI pipeline runs tests.

### 5.19 Documentation Updates
- Update README.md with any new configuration or commands.
- Update API documentation when endpoints change.
- Update component documentation (Storybook, JSDoc).
- Update CHANGELOG.md with new features/fixes.

### 5.20 Production Readiness
- Verify `NODE_ENV=production` is respected.
- Check for missing compression (gzip/brotli).
- Check for missing CDN configuration for static assets.
- Verify error pages (404, 500) are custom and not default.
- Check for missing monitoring/telemetry.
- Verify database connection pooling is configured.
- Check for missing graceful shutdown handlers.
- Verify logging is structured (JSON) and not console.log.
- Check for missing health check endpoint.
- Verify SSL/TLS is enforced.
- Check that source maps are not exposed in production.
- Verify CORS is restricted to known origins in production.

---

## 6. Error Handling Protocol

6.1 **Cannot fix** — If a fix is impossible or unsafe, log the issue with severity, impact, and suggested manual intervention.

6.2 **Partial fix** — If an issue is partially fixable, fix the safe parts and report remaining scope.

6.3 **Uncertainty** — If uncertain about a fix's correctness, run the verification loop (Section 4) before proceeding.

6.4 **User override** — If the user explicitly instructs something contrary to these rules, the user's instruction takes precedence for that session only. Log the override.

---

## 7. Reporting

After every session, the AI agent MUST output:

7.1 **Summary** — One-line summary of what was done.

7.2 **Problems found** — List of issues detected with severity.

7.3 **Problems fixed** — List of issues resolved with verification status.

7.4 **Remaining issues** — Unfixed issues with severity and rationale.

7.5 **Suggested improvements** — Recommendations for next session.

7.6 **Risk analysis** — Assessment of current project risks.

7.7 **Health score** — Numeric score (0–100%) calculated as:

```
total_checks = number of check categories applicable
passed_checks = number of categories passing
Health Score = round((passed_checks / total_checks) * 100)
```

Where categories include: build, lint, types, tests, dependencies, security, performance, accessibility, responsiveness, API, documentation, production-readiness, git-hygiene, environment-config, database, migrations.

---

## 8. Mandatory Behaviors

8.1 Always inspect the entire project before making any modification.

8.2 Automatically diagnose problems using the severity framework above.

8.3 Automatically fix safe issues without asking permission.

8.4 Verify every fix through the verification loop.

8.5 Continue fixing until no safe issues remain (stable state).

8.6 Never ask for permission for safe operations (defined in 3.1).

8.7 Never overwrite user code (defined in 3.3).

8.8 Never delete user files (defined in 3.3).

8.9 Never expose secrets in output, logs, commits, or generated files.

8.10 Never break existing functionality — after every change, existing behavior must be preserved.

---

## 9. Project-Specific Configuration

*(Auto-populated on 2026-07-26 by AI agent — Phase 3: Multi-Page Portfolio.)*

**Project:** Tamim Zia — Full Stack Portfolio (Laravel Focus)
**Tech Stack:** React 18 + TypeScript + Vite 6 + Tailwind CSS 3 + React Router 6
**Animation Engines:** GSAP + Framer Motion + Lenis
**3D Engine:** Three.js + React Three Fiber + Drei
**Package Manager:** npm
**Routing:** React Router v6 (BrowserRouter + AnimatePresence)
**Build Tool:** Vite 6 (5 chunks: index, three, motion, router, css)
**Deployment Target:** Vercel / Netlify / Any static host (SPA fallback required)
**Node Engine:** >=18.0.0

### Design Tokens
```js
colors: {
  background: "#050505",
  accent: "#7C5CFF",
  "accent-secondary": "#3BC9FF",
  laravel: "#FF2D20",      // Laravel brand accent
}
```

### Routes
| Path | Page | 3D Scene | Focus |
|------|------|----------|-------|
| `/` | HomePage | HomeScene (character, particles, dual ring + Laravel ring) | Hero + Laravel Expertise Preview + previews |
| `/about` | AboutPage | AboutScene (floating icosahedrons) | Why Laravel, Backend Philosophy, Database Design |
| `/skills` | SkillsPage | SkillsScene (orb constellation) | 60% Backend / 25% Frontend / 15% Creative |
| `/projects` | ProjectsPage | ProjectsScene (cards + light particles) | Laravel-first ordered, category filter |
| `/projects/:slug` | ProjectDetailPage | Gradient background | Full case study: ERD, auth flow, API, admin |
| `/experience` | ExperiencePage | ExperienceScene (timeline helix) | Laravel journey timeline |
| `/github` | GitHubPage | GitHubScene (contribution grid) | Laravel repo priority, stats |
| `/contact` | ContactPage | ContactScene (glass orbs + lines) | Premium contact form + FAQ |
| `*` | NotFoundPage | NotFoundScene (astronaut + stars) | Playful space theme |

### Project Architecture
```
src/
├── pages/             — 9 independent page components (one per route)
├── components/
│   ├── layout/        — Header, Footer (persistent across routes)
│   ├── shared/        — GlassCard, Badge, Button, SectionHeading
│   ├── animations/    — AuroraBackground, NoiseOverlay, CursorGlow, MagneticButton, ScrollReveal, PageTransition
│   └── three/         — 8 unique 3D scenes (one per page)
├── data/              — projects.ts (6 projects with full metadata)
├── hooks/             — useLenis, useMousePosition, useScrollProgress
├── utils/             — cn
├── styles/            — globals.css
├── App.tsx            — Router + global effects + AnimatePresence
└── main.tsx           — BrowserRouter entry point
```

### Key Files
| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite + React + path aliases + manualChunks (three, motion, router) |
| `tsconfig.json` | Strict mode, path aliases |
| `tailwind.config.js` | Colors: #050505, #7C5CFF, #3BC9FF; Fonts: Inter, JetBrains Mono |
| `index.html` | Google Fonts, OG meta tags |
| `src/data/projects.ts` | 6 projects with full case study data |
| `src/App.tsx` | Routes, AnimatePresence, global effects |

### Page Transitions
- Framer Motion `AnimatePresence` with `mode="wait"`
- Each page wraps in `<PageTransition>` with directional variants (left/right/up)
- All 3D scenes use `Suspense` with `fallback={null}`

### Design System
- **Background:** `#050505`
- **Primary Accent:** `#7C5CFF`
- **Secondary Accent:** `#3BC9FF`
- **Glass:** `rgba(255,255,255,0.04)` + `blur(40px)` + `1px rgba(255,255,255,0.08)` border
- **Border Radius:** `28px` (rounded-4xl)
- **Typography:** Inter (headings/body), JetBrains Mono (code/meta)
- **Spacing:** 120px section padding, 80px max-width container padding

### Initial Health Score: 96/100
**See detailed report in AI session output.**

---

*This document is the single source of truth for AI agent behavior in this repository. All AI tools must comply.*
