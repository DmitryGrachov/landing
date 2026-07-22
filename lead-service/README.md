# Lead service

Small BFF for the marketing site (`frontend/`). It has exactly one job:
receive the contact-form submission (name + email) from the "Запросить
демо" / "Обсудить запуск" modal and forward it to a Telegram chat via the
Bot API.

This is deliberately separate from `backend/` (the `/gallery` page's API +
Postgres/Prisma), which is a different concern for a different page. This
service is stateless — no database.

Stack: Node.js + Express + TypeScript.

## API

`POST /api/leads`

```json
{ "name": "Иван Иванов", "email": "ivan@example.com", "source": "Запросить демо" }
```

`source` is optional and just labels which button/section triggered the
form, so it shows up in the Telegram message.

## Config

`.env` is committed (this is a private repo) so a server deploy just needs
`git pull` + `docker compose up -d --build`, no manual env setup. See
`.env.example` for the shape. `TELEGRAM_BOT_TOKEN` comes from `@BotFather`.
`TELEGRAM_CHAT_ID` is the user/group/channel the bot should post to —
message the bot once, then call
`https://api.telegram.org/bot<token>/getUpdates` to read the chat id back.

If the repo ever goes public, or the token needs rotating, generate a new
token via `@BotFather` (`/revoke`) and replace it here — the old one stays
readable in git history regardless.

## Routing

The frontend calls the same-origin `/api/leads` — `frontend/vite.config.ts`
proxies that to `http://localhost:4100` in dev, and `frontend/nginx.conf`
proxies it to the `lead-service` container in production.
