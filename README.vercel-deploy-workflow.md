# 🚀 GitHub Actions + Vercel Deploy Workflow

This workflow automates **testing and deployment** of your Nuxt 4 + Nitro project to Vercel.

## ✅ Overview

| Stage | Description |
|--------|--------------|
| 🧪 Test | Runs typecheck, Vitest, Playwright E2E |
| 🚀 Deploy | Deploys Preview on PRs, Production on `main` |
| 🧰 Stack | Node 22, npm, Nitro, Vercel CLI |

---

## 🔐 Required Secrets (GitHub → Repo → Settings → Secrets → Actions)

| Secret | Description |
|---------|--------------|
| `VERCEL_TOKEN` | Personal or team token from Vercel |
| `VERCEL_ORG_ID` | From Vercel Organization settings |
| `VERCEL_PROJECT_ID` | From Project settings |

---

## ⚙️ Required Environment Variables (in Vercel)

```
NUXT_BASEROW_BASE_URL=https://api.baserow.io
NUXT_BASEROW_TOKEN=********
NUXT_BASEROW_TABLE_ID=***
NUXT_BASEROW_TOKEN_PERF=********
NUXT_BASEROW_TABLE_ID_PERF=***
NUXT_BASEROW_TOKEN_BARGAIN=********
NUXT_BASEROW_TABLE_ID_BARGAIN=***
NUXT_ADMIN_PASSWORD=********
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
```

---

## 📁 File: `.github/workflows/vercel-deploy.yml`

```yaml
name: CI + Vercel Deploy

on:
  pull_request:
  push:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '22'

jobs:
  test:
    name: Typecheck & Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run test:coverage
      - run: npx playwright install --with-deps
      - run: npm run test:e2e

  deploy:
    name: Vercel Deploy
    needs: test
    runs-on: ubuntu-latest
    if: ${{ github.event_name == 'pull_request' || github.ref == 'refs/heads/main' }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci

      - name: Pull Env (Preview)
        if: ${{ github.event_name == 'pull_request' }}
        run: npx vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Pull Env (Production)
        if: ${{ github.ref == 'refs/heads/main' }}
        run: npx vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Build
        run: npx vercel build --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Deploy Preview
        if: ${{ github.event_name == 'pull_request' }}
        run: npx vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Deploy Production
        if: ${{ github.ref == 'refs/heads/main' }}
        run: npx vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 💬 Copilot Prompt

> Create `.github/workflows/vercel-deploy.yml` exactly as shown in README.vercel-deploy-workflow.md.  
> Include both jobs: `test` (typecheck + coverage + e2e) and `deploy` (Vercel CLI preview/prod).  
> Use Node 22, npm ci, and cache npm. Require GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`.  
> After creation, do not modify other files.
