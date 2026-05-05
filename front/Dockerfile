# Etapa 1: Construccion (Build)
FROM node:22-alpine AS build
WORKDIR /app

# Instalamos compatibilidad para esbuild en Alpine
RUN apk add --no-cache libc6-compat

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias con limite de memoria aumentado
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm install

# Copiamos el resto del codigo
COPY . .

# Construimos la aplicacion
RUN npm run build

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
