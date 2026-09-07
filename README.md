# BAD FORM Systems

Marketing site for BAD FORM's South West WA operations / IMS work. Ingested from a Gemini one-pager into Next.js App Router routes.

## Stack

- Next.js 16 App Router
- Tailwind CSS v4
- TypeScript

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in keys if you want live Gemini ingest or Resend contact delivery. Without them:

- `/lab` still demos using the local fallback payload
- `/contact` returns a clear failure plus a `mailto:` draft when `NEXT_PUBLIC_CONTACT_EMAIL` is set

## Routes

| Path | Page |
| --- | --- |
| `/` | Overview |
| `/coexistence` | Keep Xero / MYOB + custom IMS |
| `/sectors`, `/sectors/[slug]` | Trade, civil, fab, logistics |
| `/ghost-tax` | Ghost tax calculator |
| `/pricing` | Packages |
| `/lab` | Docket ingestion demo |
| `/contact` | Yard walkthrough form |

Legacy hashes (`/#coexistence`) and paths (`/southwest`, `/calculator`, `/fieldtest`, `/overview`) redirect to the routes above.

Copy for the later voice pass lives in `src/content/`.
