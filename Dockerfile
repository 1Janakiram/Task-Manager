
FROM node:22.15.0-slim AS hex_builder
WORKDIR /app


COPY package*.json ./

RUN npm ci


FROM node:22.15.0-slim AS runner
WORKDIR /app


ENV NODE_ENV=production
ENV PORT=5500


RUN groupadd -r nodejs && useradd -r -g nodejs nodeuser


COPY --from=hex_builder /app/node_modules ./node_modules
COPY . .


RUN chown -R nodeuser:nodejs /app
USER nodeuser


EXPOSE 5500


CMD ["node", "app.js"]
