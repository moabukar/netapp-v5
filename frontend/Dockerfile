# Build stage
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY public/ /app/public/
RUN npm run build

# Production stage
FROM node:14-slim
WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
