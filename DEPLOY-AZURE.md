# Deploying Altivision to Azure Static Web Apps

Step-by-step guide to publish this static site to **Azure Static Web Apps** using a **GitHub** repository.

> **Why Azure Static Web Apps?** Free tier covers personal/marketing sites, automatic HTTPS with managed certificates, GitHub-integrated CI/CD, global CDN, and custom-domain support — all at no cost for the workload this site generates.

---

## Prerequisites

| Item | Notes |
|---|---|
| Azure account | https://azure.microsoft.com/free — comes with a free Static Web Apps tier |
| GitHub account | https://github.com — repo will live here |
| Git installed locally | `git --version` to confirm |
| Domain access (optional) | For wiring `altivision.co.in` later — you'll need DNS access at your registrar |

---

## Step 1 — Initialize a Git repository locally

Open a terminal in the project root (`/Users/xeadmin/Documents/Altivision`):

```bash
cd /Users/xeadmin/Documents/Altivision

git init
git branch -M main
git add .
git commit -m "Initial commit: Altivision static site"
```

---

## Step 2 — Create the GitHub repository

### Option A — via GitHub website
1. Go to https://github.com/new
2. Name: `altivision-website` (or your choice)
3. Visibility: **Private** is fine — Azure Static Web Apps works with both public and private repos
4. **Do NOT** initialize with README, .gitignore, or license (you already have files locally)
5. Click **Create repository**

### Option B — via GitHub CLI

```bash
# Install once if not already: brew install gh
gh auth login
gh repo create altivision-website --private --source=. --remote=origin
```

### Push your code

```bash
# If you used Option A, set the remote URL manually:
git remote add origin https://github.com/<your-username>/altivision-website.git

git push -u origin main
```

---

## Step 3 — Add a `.gitignore` (recommended)

Before the first push (or as a follow-up commit), create a `.gitignore`:

```bash
cat > .gitignore <<'EOF'
# macOS
.DS_Store

# Editor
.vscode/
.idea/

# Node (if you later add Tailwind CLI build)
node_modules/
npm-debug.log
yarn-error.log

# Local env
.env
.env.local

# Build output (none for current setup)
EOF

git add .gitignore
git commit -m "Add .gitignore"
git push
```

---

## Step 4 — Create the Azure Static Web App

1. Sign in to the **Azure Portal**: https://portal.azure.com
2. In the top search bar type **Static Web Apps** → click the result.
3. Click **+ Create**.
4. Fill the **Basics** tab:

   | Field | Value |
   |---|---|
   | Subscription | Your subscription (e.g., "Azure subscription 1") |
   | Resource Group | Click **Create new** → `rg-altivision` |
   | Name | `altivision-web` (must be globally unique) |
   | Plan type | **Free** |
   | Source | **GitHub** |
   | Region (for Azure Functions) | **Central India** or **East Asia** (closest to Pune users) |

5. Click **Sign in with GitHub** → authorize Azure.
6. Pick your **Organization**, **Repository** (`altivision-website`), and **Branch** (`main`).
7. **Build Details** — this is the most important section for a static site:

   | Field | Value |
   |---|---|
   | Build Presets | **Custom** |
   | App location | `/` |
   | Api location | *(leave blank)* |
   | Output location | *(leave blank)* |

   > **Why these values?** Tailwind is pre-built locally into `assets/tailwind.css` and committed, so Azure has no build step — it simply uploads the repo root. If you later prefer Azure to compile Tailwind on each deploy, set **App build command** to `npm run build:css` and **Output location** to `.`.

8. Click **Review + create**, then **Create**.
9. Wait ~1–2 minutes for the resource to provision.

---

## Step 5 — Review the auto-generated GitHub Actions workflow

Azure adds a workflow file to your repo at:

```
.github/workflows/azure-static-web-apps-<random-suffix>.yml
```

**Pull it locally** so you have it:

```bash
git pull
```

The workflow runs on every push to `main` and on every PR. No editing needed for the default static setup.

You can watch the first deployment from:
- **GitHub** → repo → **Actions** tab → click the running workflow, or
- **Azure Portal** → your Static Web App → **Overview** → **Deployment history**

When the run finishes (green check), your site is live at a URL like:

```
https://<random-name>.<region>.azurestaticapps.net
```

The exact URL is shown in the Azure Portal under **Overview → URL**.

---

## Step 6 — (Optional but recommended) Add `staticwebapp.config.json`

Create this file at the repo root to control routing, headers, and 404 behavior:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/*.{png,jpg,jpeg,gif,svg,ico,webp,css,js,woff,woff2}"]
  },
  "globalHeaders": {
    "Cache-Control": "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "mimeTypes": {
    ".json": "application/json"
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html",
      "statusCode": 200
    }
  }
}
```

Commit and push:

```bash
git add staticwebapp.config.json
git commit -m "Add Azure Static Web Apps config"
git push
```

This adds security headers, sane caching, and falls back any unknown route to `index.html` (useful even for single-page marketing sites).

---

## Step 7 — Configure a custom domain (`altivision.co.in`)

> Skip this step if you only need the `*.azurestaticapps.net` URL.

### 7.1 — Add domain in Azure

1. In the Azure Portal, open your Static Web App.
2. Left sidebar → **Custom domains** → **+ Add**.
3. Choose **Custom domain on other DNS**.
4. Enter your domain. Two options:
   - **Apex / root domain**: `altivision.co.in`
   - **Subdomain (recommended for first try)**: `www.altivision.co.in`
5. Azure shows a validation value. Keep this tab open.

### 7.2 — Add DNS records at your registrar

Log in to wherever the domain DNS is hosted (GoDaddy, Hostinger, Cloudflare, etc.) and add the records Azure asks for.

**For a subdomain** (`www.altivision.co.in`) — easy path:

| Type | Name | Value | TTL |
|---|---|---|---|
| `CNAME` | `www` | `<your-app>.azurestaticapps.net` | 1 hour |
| `TXT` | `_dnsauth.www` | `<validation-value-from-Azure>` | 1 hour |

**For the apex domain** (`altivision.co.in`) — requires `ALIAS`/`ANAME` support or Azure DNS:

| Type | Name | Value |
|---|---|---|
| `ALIAS` or `ANAME` | `@` | `<your-app>.azurestaticapps.net` |
| `TXT` | `_dnsauth` | `<validation-value-from-Azure>` |

If your registrar doesn't support `ALIAS`/`ANAME` records, either:
- Use only `www.altivision.co.in`, OR
- Move DNS to **Azure DNS** or **Cloudflare** (both support apex aliasing).

### 7.3 — Validate and wait for the certificate

1. Back in Azure → **Validate**. Wait until status shows **Ready**.
2. Azure auto-provisions an SSL certificate (managed, free, auto-renewing). This can take **5–30 minutes** after validation.
3. Visit `https://www.altivision.co.in` — you should see your site with a valid lock icon.

### 7.4 — Redirect apex → www (or vice versa)

Add this to `staticwebapp.config.json` if you want everything to redirect to `www`:

```json
{
  "globalHeaders": { "...": "..." },
  "responseOverrides": { "...": "..." },
  "routes": [
    {
      "route": "/*",
      "redirect": "https://www.altivision.co.in",
      "statusCode": 301
    }
  ]
}
```

> Add this only on the apex-mapped app if you keep both apex and www configured.

---

## Step 8 — Verify everything

| Check | How |
|---|---|
| Site loads on Azure URL | Open `https://<your-app>.azurestaticapps.net` |
| Site loads on custom domain | Open `https://www.altivision.co.in` |
| Certificate is valid | Browser shows the lock icon, no warnings |
| Assets load | DevTools → Network tab → all 200s, especially `assets/logo.webp` and `assets/styles.css` |
| Mobile responsive | Resize browser, or test on phone |
| Form behavior | Submit the contact form — check console for the logged payload |
| WhatsApp link | Click the floating button — should open `wa.me/918623857899` |
| Social links | LinkedIn + Facebook open in new tab |
| Legal links | Privacy / Terms / Refund / Shipping / Disclaimer all resolve to altivision.co.in |

---

## Step 9 — Day-2 operations

### Making content updates
Edit any file, commit, push:

```bash
git add .
git commit -m "Update course descriptions"
git push
```

The GitHub Actions workflow auto-runs and redeploys within ~1–2 minutes. **Zero downtime.**

### Preview environments for PRs
By default, every pull request gets its own preview URL like `https://<app>-<pr-number>.<region>.azurestaticapps.net`. Useful for reviewing changes before merge — no extra config needed.

### Wiring the contact form to a real backend
The form currently logs to console. To capture leads, swap the submit handler in `assets/script.js` for one of:

- **Formspree** — `https://formspree.io` — drop-in POST endpoint
- **Web3Forms** — `https://web3forms.com` — free, no signup
- **Azure Function** — add an `api/` folder with a function; Azure auto-deploys it alongside the static site (set `Api location: api` in the workflow)
- **WhatsApp deeplink** — build `https://wa.me/918623857899?text=...` and `window.open()` on submit

### Monitoring
Azure Static Web Apps → **Overview** → shows traffic, deployments, and any errors. For deeper analytics, add **Application Insights** or any third-party analytics tag (Plausible, Google Analytics, Microsoft Clarity, etc.) directly in `index.html`.

### Cost
The **Free tier** of Azure Static Web Apps includes:
- 100 GB bandwidth/month
- 250 MB of app storage
- 2 custom domains
- Free SSL certificates

A marketing site like this will comfortably stay free unless you receive significant traffic. The next paid tier is **Standard** at ~$9/month, only needed for enterprise SLA / private endpoints.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| GitHub Actions deploy fails with "App directory not found" | Check **App location = `/`** in the workflow YAML |
| `assets/logo.webp` returns 404 | Confirm the file path is lowercase and committed — Linux build agents are case-sensitive |
| Custom domain stuck on "Validating" | Wait 15–30 min after adding DNS records; DNS propagation can lag |
| Site shows old content after deploy | Hard-refresh (Cmd-Shift-R), or check the workflow run finished green |
| Form does nothing on submit | Expected — handler currently only logs to console. Wire to Formspree/Web3Forms/Azure Function |
| Tailwind utilities not applying | Rebuild the stylesheet: `npm install && npm run build:css`, then commit the updated `assets/tailwind.css`. Tailwind only emits classes it sees in `index.html` / `assets/script.js`. |

---

## Quick command summary

```bash
# 1 — Initialize repo
cd /Users/xeadmin/Documents/Altivision
git init && git branch -M main
git add . && git commit -m "Initial commit"

# 2 — Push to GitHub (using gh CLI)
gh repo create altivision-website --private --source=. --remote=origin
git push -u origin main

# 3 — Create Azure resource via Portal UI (Steps 4–5 above)

# 4 — Every subsequent change:
git add .
git commit -m "Your change message"
git push
# Auto-deploys in ~1–2 min
```

---

**You're live.** Once Step 5 finishes, the site is publicly reachable on the Azure URL; once Step 7 finishes, it's live on `altivision.co.in`.
