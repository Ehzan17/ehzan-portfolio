# AWS deployment

Install Docker Engine and Docker Compose on EC2, clone the repository, and create a server-only `.env` with strong unique secrets. Do not expose PostgreSQL ports in the security group or Compose file.

```bash
docker compose up --build -d
docker compose ps
docker compose logs migrate
```

The `migrate` service runs `prisma migrate deploy`, then the application starts. Nginx is the only service mapped to port 80. Configure a domain and Certbot before enabling HTTPS; trusted certificates cannot be issued for an arbitrary EC2 IP address. Before releases, take a `pg_dump`; if a release fails, restore the previous image and only restore the database when schema/data compatibility requires it.
