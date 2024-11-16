# Use Node.js as the base image
FROM node:18-alpine AS build

# Install necessary packages
RUN apk add --no-cache libc6-compat python3 py3-pip gcc musl-dev libffi-dev openssl-dev make g++

WORKDIR /app

# Copy package files and install Node.js dependencies
COPY package.json yarn.lock ./
RUN yarn

COPY . .

# Build the Next.js project
RUN yarn build

# Create a production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Add a system user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install Python and create a virtual environment
RUN apk add --no-cache python3 py3-pip

# Install build dependencies for Python packages
RUN apk add --no-cache gcc musl-dev libffi-dev openssl-dev make g++

# Create a virtual environment and install Python dependencies
RUN python3 -m venv /app/venv

# Activate virtual environment and install dependencies
COPY requirements.txt ./
RUN . /app/venv/bin/activate && pip install --no-cache-dir -r requirements.txt

# Copy Next.js build artifacts from the previous build stage
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/package.json ./package.json
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV DSTACK_SIMULATOR_ENDPOINT="http://host.docker.internal:8090"
ENV HOSTNAME="0.0.0.0"

# Run the Node.js server
CMD ["node", "server.js"]