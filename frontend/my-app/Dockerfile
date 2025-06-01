FROM node:24-bullseye AS base

WORKDIR /src

COPY package.json .

RUN npm install


# Copy source after installing deps
COPY . .

# Environment variable to disable unstable Turbopack
ENV NEXT_PRIVATE_TURBOPACK=0

EXPOSE 3000

CMD npm run dev