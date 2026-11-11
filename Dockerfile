FROM node:22-alpine AS base
WORKDIR /app
FROM base AS deps
COPY package.json ./
RUN npm install --omit=dev
FROM base AS builder
COPY package.json ./
RUN npm install
COPY . .
RUN npx prisma generate && npm run build
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup -S app && adduser -S app -G app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
RUN mkdir -p /app/public/uploads && chown -R app:app /app
USER app
EXPOSE 3000
CMD ["node","server.js"]
