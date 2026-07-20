#!/bin/sh
set -e

echo "[entrypoint] applying database migrations..."
npx prisma migrate deploy

if [ "$SKIP_SEED" != "true" ]; then
  echo "[entrypoint] seeding gallery data from legacy JSON (safe to re-run)..."
  npx tsx prisma/seed.ts || echo "[entrypoint] seed step failed/skipped, continuing startup"
else
  echo "[entrypoint] SKIP_SEED=true, skipping seed step"
fi

echo "[entrypoint] starting server..."
exec node dist/server.js
