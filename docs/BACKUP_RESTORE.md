# Backup and restore

Back up a running Docker database from PowerShell:

```powershell
docker compose exec -T db pg_dump -U ehzan -d ehzan > backup.sql
```

Restore only into a deliberately chosen database after taking a fresh backup:

```powershell
Get-Content -Raw backup.sql | docker compose exec -T db psql -U ehzan -d ehzan
```

Do not run `docker compose down -v`; it deletes the persistent PostgreSQL volume. Database backups do not include uploaded media; archive the `media_data` Docker volume separately.
