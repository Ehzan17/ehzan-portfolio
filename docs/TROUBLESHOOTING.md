# Troubleshooting

If Prisma cannot connect, verify `DATABASE_URL` and that the PostgreSQL container is healthy. If Nginx returns 502, inspect `docker compose logs app`. Do not expose port 5432 publicly.
