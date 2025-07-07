# Build stage
FROM node:20 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto por defecto de nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 