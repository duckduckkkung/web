# Multi-stage build를 사용한 Next.js Dockerfile

# 1단계: 의존성 설치
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# 2단계: 빌드
FROM node:20-alpine AS builder
WORKDIR /app

# 빌드 타임 환경변수 ARG로 받기
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
ARG NEXT_PUBLIC_KAKAO_REDIRECT_URI
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_GOOGLE_REDIRECT_URI

# ARG를 ENV로 변환하여 빌드 시 사용 가능하게 함
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=$NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
ENV NEXT_PUBLIC_KAKAO_REDIRECT_URI=$NEXT_PUBLIC_KAKAO_REDIRECT_URI
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_GOOGLE_REDIRECT_URI=$NEXT_PUBLIC_GOOGLE_REDIRECT_URI

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# 3단계: 실행
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]