FROM node:18-bookworm-slim

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
