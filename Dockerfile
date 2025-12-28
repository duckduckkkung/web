# Multi-stage build를 사용한 Next.js Dockerfile

# 1단계: 의존성 설치
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.json과 lock 파일 복사
COPY package.json package-lock.json* ./
RUN npm ci

# 2단계: 빌드
FROM node:20-alpine AS builder
WORKDIR /app

# 의존성 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 빌드
RUN npm run build

# 3단계: 실행
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 보안을 위해 non-root 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 필요한 파일들 복사
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 소유권 변경
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]