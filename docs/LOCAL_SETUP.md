# Local setup (Windows)

Install Docker Desktop, Node.js 22, and npm. Copy `.env.example` to `.env` and replace every placeholder. Use the local URL already supplied in `.env` (`localhost`, not `db`) when Next.js runs directly on Windows.

```powershell
docker compose up -d db
npm run db:migrate
npm run db:seed
npm run dev
```

The first command starts only PostgreSQL with its persistent volume. `db:migrate` applies the versioned Prisma SQL migration without resetting the database. `db:seed` creates or updates the environment-selected admin and imports only missing original project slugs. `dev` serves the app at `http://localhost:3000`.

Check the connection with `npm run db:status`. Stop only the database with `docker compose stop db`; do not use `down -v` because that removes the database volume.
