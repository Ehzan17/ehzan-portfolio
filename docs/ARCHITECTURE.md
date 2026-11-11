# Architecture

Next.js App Router renders public pages; PostgreSQL/Prisma owns projects, media, skills and messages. Nginx is the only public container. PostgreSQL and the app remain on Docker's private network. Persistent volumes preserve database and uploaded media.
