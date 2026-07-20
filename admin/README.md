# Gallery admin

Small standalone React + Vite + TS app for managing `/gallery` media. Talks
only to `../backend`'s existing API — no separate backend of its own, no
auth (local-only tool for now).

Talks to:

- `GET /api/gallery/categories` — populates the upload form's category select
- `GET /api/gallery/media` — full media list with ids, rendered grouped by category
- `POST /api/gallery/media` — upload (multipart: file, category, group?, sortOrder?)
- `DELETE /api/gallery/media/:id` — delete (removes the DB row and the file)

All calls use relative `/api/...` and `/uploads/...` paths, proxied to the
backend by `vite.config.ts` in dev and by `nginx.conf` in the production
Docker image — same pattern as `../frontend`, so no CORS/origin config is
needed here.

## Run

Via Docker Compose (recommended, from the repo root): `docker compose up
--build` — this app is the `admin` service, served at
`http://localhost:5174`.

Standalone: `npm install && npm run dev` (needs the backend running on
`localhost:4000` — see `../backend/README.md`).
