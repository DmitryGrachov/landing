# Gallery backend

API that serves data and media for the `/gallery` page only — the rest of
the site is untouched. `frontend/src/pages/Gallery/hooks/useGalleryData.ts`
fetches page copy (header/tabs/menu/quote) from the static
`gallery-data.json` as before, but now fetches the gallery images/videos
themselves from this API (`GET /api/gallery`) and merges the two. The
frontend always calls relative `/api/...` and `/uploads/...` paths — the
dev server (`vite.config.ts`) and the production Docker image
(`frontend/nginx.conf`) both proxy those to this backend, so no origin/CORS
wiring is needed either way.

Stack: Node.js + Express + TypeScript + PostgreSQL + Prisma + Multer.

## Data model

The legacy `frontend/public/gallery-data.json` stored the gallery as three
hardcoded arrays of image paths (`feature`, `works`, `showcase`) inside one
JSON blob. That shape doesn't hold metadata per file and can't be edited
without a redeploy, so it is **not** mirrored as-is in the database.

Instead:

- **`gallery_categories`** — one row per site tab: `archiviz` (photos),
  `video` (video), `software` (photos, the "ПО/UE" tab). `feature`/`works`/
  `showcase` used to be three separate categories under the "Архивиз" tab,
  matching the legacy JSON's three arrays — the site now shows them as one
  grid, so `prisma/seed.ts` merges them into a single `archiviz` category
  (see `retireOldArchivizCategories` there), keeping each item's original
  sub-folder as its `group` (`feature`, `works-1`, `works-2`, `works-3`,
  `showcase`) purely for reference in the admin UI. Adding another category
  later is a data change, not a schema change. Each category has a
  `media_type` (`IMAGE`/`VIDEO`) — a category only ever holds one kind of
  media (e.g. `video` is video-only), enforced in `gallery.service.ts` on
  upload, not just a display convention.
- **`gallery_media`** — one row per photo/video: `category_id`, `type`
  (`IMAGE`/`VIDEO`), `file_path` (relative to `uploads/`), `original_name`,
  `mime_type`, `size`, optional `width`/`height`, an optional `group` label,
  and `sort_order` for display order.

This is a standard normalized "media library" shape: swapping categories,
reordering items, or adding an admin CRUD UI on top later needs no schema
changes — see `docs`/inline comments in `prisma/schema.prisma`.

Only metadata lives in Postgres. Actual files live on disk under
`backend/uploads/<category>/...` and are served by Express as static assets.

## Project layout

```
backend/
  prisma/
    schema.prisma          # GalleryCategory, GalleryMedia, MediaType
    migrations/             # SQL migration history
    seed.ts                 # one-off: legacy JSON -> uploads/ + DB rows
  src/
    config/                 # env, prisma client, multer storage
    middlewares/            # error handler, 404 handler
    modules/gallery/
      gallery.routes.ts
      gallery.controller.ts
      gallery.service.ts     # validation, file moves, business rules
      gallery.repository.ts  # only place that talks to Prisma
      gallery.types.ts
    utils/                  # asyncHandler, HttpError, mime, file URL helper
    app.ts                   # express app wiring
    server.ts                # entrypoint
  uploads/                   # local file storage (gitignored, kept via .gitkeep)
```

Controllers stay thin, `gallery.service.ts` holds the logic, and
`gallery.repository.ts` is the only file importing the Prisma client — adding
an admin app later (bulk reorder, category CRUD, etc.) means adding
repository/service methods and new routes, not restructuring anything.

## Setup

### Option A — Docker Compose (fastest)

From the **repo root** (not `backend/`):

```
docker compose up --build
```

This starts Postgres and the backend together. On first boot the backend
container automatically runs `prisma migrate deploy`, then seeds the gallery
data (copies files from `frontend/public/gallery` — mounted read-only into
the container — into a Docker volume, and inserts the DB rows). Nothing in
`frontend/` is written to.

- API: `http://localhost:4000` (try `GET http://localhost:4000/api/gallery`)
- Postgres is also published on `localhost:5432` (user/pass/db: `gallery`)
- Uploaded files persist in the `gallery_uploads` named volume; Postgres data
  in `gallery_pgdata`. `docker compose down -v` wipes both.
- Re-running `docker compose up` re-runs the seed step, but it's idempotent
  (upserts), so it won't duplicate rows or files.
- Set `SKIP_SEED=true` as an environment variable on the `backend` service in
  `docker-compose.yml` if you don't want the automatic seed on every restart.

To rebuild after changing backend source: `docker compose up --build backend`.

### Option B — local Node + your own Postgres

1. `cp .env.example .env` and point `DATABASE_URL` at a real Postgres
   instance (a local one is fine, e.g. `docker run -p 5432:5432 -e
   POSTGRES_PASSWORD=postgres postgres:16`).
2. `npm install`
3. `npm run prisma:migrate:deploy` (applies the committed migration) — or
   `npm run prisma:migrate` in dev if you want Prisma to manage further
   migrations interactively.
4. `npm run seed` — copies every file referenced by
   `frontend/public/gallery-data.json` into `backend/uploads/<category>/...`
   and inserts the matching `gallery_categories`/`gallery_media` rows. Safe
   to re-run (upserts on `[categoryId, filePath]`).
5. `npm run dev` — starts the API on `http://localhost:4000` (see `PORT` in
   `.env`).

### How this was verified

`docker compose up --build` was run end-to-end against Docker Desktop:
migrations applied cleanly, the seed step inserted 4/24/2 rows for
feature/works/showcase, `GET /api/gallery` returned the expected shape with
working `/uploads/...` URLs, `POST /api/gallery/media` + `DELETE
/api/gallery/media/:id` were exercised against the running stack (upload
showed up in `GET /api/gallery`, delete removed both the DB row and the file
on disk), and restarting the `backend` container re-ran the seed without
duplicating anything (upserts on `[categoryId, filePath]`). `npm run
typecheck` and `npm run build` also pass locally (this is also how a
`tsconfig.json` `rootDir` bug that would have made `npm start` look for
`dist/server.js` in the wrong place got caught and fixed).

The frontend↔backend wiring was also checked in a real browser against the
full `docker compose` stack: `/gallery` renders the header/tabs/quote from
the static JSON and the feature/works/showcase grids (4/24/2 items,
matching the seed) from `GET /api/gallery`; all 30 `<img>` tags point at
`/uploads/...` and load successfully; both `/gallery-data.json` and
`/api/gallery` show up as 200s in the network log with no CORS errors.

## API

All routes are mounted under `/api/gallery`. Uploaded files are served from
`/uploads/...`.

### `GET /api/gallery`

Returns data shaped like the old JSON's `gallery` key, so the React side only
has to change *where* `useGalleryData` fetches from, not how it reads the
response:

```json
{
  "archiviz": ["/uploads/archiviz/feature/feature-1.webp", "..."],
  "video": ["/uploads/video/<uuid>.mp4", "..."],
  "software": ["/uploads/software/<uuid>.jpg", "..."]
}
```

### `POST /api/gallery/media`

`multipart/form-data`:

| field       | required | notes                                              |
|-------------|----------|-----------------------------------------------------|
| `file`      | yes      | must match the target category's media type (below) |
| `category`  | yes      | existing category slug (`archiviz`/`video`/`software`) |
| `group`     | no       | free-text sub-grouping label                        |
| `sortOrder` | no       | integer; defaults to "append at the end"            |

Rejects with `400` if the file's type doesn't match the category's
`mediaType` (e.g. uploading an image into `video`, or a video into any
photo category) — see `GET /api/gallery/categories` for which is which.

Returns `201` with the created media record (id, category, type, `url`,
metadata).

### `DELETE /api/gallery/media/:id`

Deletes the DB row and its file on disk. Returns `204` on success, `404` if
the id doesn't exist.

### `GET /api/gallery/categories`

Added for the admin app below — the raw category rows (id, slug, name,
sortOrder), so a client can populate an upload form without hardcoding
slugs.

### `GET /api/gallery/media`

Also added for the admin app — the full, flat media list with ids and all
metadata (unlike `GET /api/gallery`, which only exposes public URLs grouped
by category). This is what a client needs to know *which* record to
`DELETE`.

## Admin app

`../admin` is a small separate React+Vite+TS app (its own Dockerfile, its
own `nginx.conf` proxying `/api` and `/uploads` to this backend, same
pattern as `../frontend`) that lists all media grouped by category and lets
you upload or delete files. It talks to exactly the four endpoints above —
no auth, no extra backend surface. See `../admin/README.md` if present, or
just `docker compose up` from the repo root (it's wired in as the `admin`
service, `http://localhost:5174`).

Adding real auth in front of the mutating routes (`POST`/`DELETE`) before
exposing this beyond local use is the main thing still worth doing — the
routes are already isolated in `gallery.routes.ts`, so that's a middleware,
not a restructuring.
