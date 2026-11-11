# EHZAN Portfolio

Next.js portfolio with PostgreSQL, Prisma, authenticated administration, and Docker deployment support.

## Local database and application

1. Install Docker Desktop and make sure it is running.
2. In `.env`, choose a strong `POSTGRES_PASSWORD`, `ADMIN_PASSWORD`, and `AUTH_SECRET`. Keep `DATABASE_URL` pointed at `localhost` for local development.
3. Start PostgreSQL only: `docker compose up -d db`.
4. Apply the committed, non-destructive migration: `npm run db:migrate`.
5. Create or reset the initial environment-configured administrator: `npm run db:seed`.
6. Start the website: `npm run dev`.

The seed command uses `upsert`: it preserves existing projects and updates the configured admin password. The four original portfolio entries are inserted only if their slugs do not already exist.

## Full container stack

Run `docker compose up --build -d`. The one-off `migrate` service applies committed migrations before the app starts. PostgreSQL data lives in the `postgres_data` named volume; it survives container restarts and recreation.
