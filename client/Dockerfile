FROM node:20-alpine AS base
RUN npm cache clean --force

# Build
FROM base AS builder

# Environment Variables
ARG VITE_PUBLIC_SERVER_URL
ENV VITE_PUBLIC_SERVER_URL=$VITE_PUBLIC_SERVER_URL

WORKDIR /app
COPY ./client .
RUN npm install
RUN npm run build

# Start the client
FROM builder AS runner
WORKDIR /app
CMD npm run preview
