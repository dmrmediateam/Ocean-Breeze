# Ocean Breeze

Minimal Next.js starter for the Ocean Breeze luxury real estate landing page.

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Lead Form Webhooks

Create `.env.local` with:

```bash
ZAPIER_REQUEST_DETAILS_WEBHOOK_URL=...
```

Optionally add:

```bash
ZAPIER_SCHEDULE_SHOWING_WEBHOOK_URL=...
```

If `ZAPIER_SCHEDULE_SHOWING_WEBHOOK_URL` is omitted, the schedule-showing form reuses the request-details Zapier webhook and includes `leadType: "schedule_showing"` in the payload so Zapier can branch on it.
