# =====================
# Build stage
# =====================
FROM node:20 AS build

WORKDIR /usr/src/strapi

COPY package*.json ./
RUN npm install

COPY . .

# Build do admin (Strapi v5)
RUN npm run build

# =====================
# Production stage
# =====================
FROM node:20-alpine

WORKDIR /usr/src/strapi

ENV NODE_ENV=production
ENV PORT=1337

COPY --from=build /usr/src/strapi ./

EXPOSE 1337

CMD ["npm", "run", "start"]
