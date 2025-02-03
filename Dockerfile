FROM node:22-bookworm
LABEL authors="rogama25"

ENV COREPACK_INTEGRITY_KEYS=0

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

RUN pnpm install --frozen-lockfile

EXPOSE 4100

CMD ["pnpm", "start"]