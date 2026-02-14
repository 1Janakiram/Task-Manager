# Stage 1: Dependencies
FROM node:22.15.0-slim AS hex_builder
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies (including devDeps if needed for tests)
RUN npm ci

# Stage 2: Production Runner
FROM node:22.15.0-slim AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5500

# Create a non-root user for security
RUN groupadd -r nodejs && useradd -r -g nodejs nodeuser

# Copy only necessary files from builder
COPY --from=hex_builder /app/node_modules ./node_modules
COPY . .

# Change ownership to the non-root user
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Expose the port your API uses
EXPOSE 5500

# Start the application
CMD ["node", "app.js"]