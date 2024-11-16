# Install dependencies only when needed
FROM node:18-alpine AS build
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./
RUN yarn

COPY . .

# Build the Next.js project
RUN yarn build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Add a system user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install Python and virtualenv
RUN apk add --no-cache python3 py3-pip
RUN python3 -m ensurepip
RUN pip3 install --upgrade pip
RUN pip3 install virtualenv

# Create a virtual environment and install Python dependencies
COPY requirements.txt ./
RUN python3 -m venv venv
RUN . venv/bin/activate && pip install --no-cache-dir -r requirements.txt

# Copy Next.js files from the build stage
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