# ── Stage 1: Build ────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate --schema=prisma/schema.prisma || true

COPY . .
RUN npm run build

# ── Stage 2: Production ───────────────────────────────────────────
FROM node:20-alpine AS production

RUN apk add --no-cache dumb-init

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma

EXPOSE 3000

USER node

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]