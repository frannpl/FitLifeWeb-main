# Etapa 1: Construccion (Build)
# Usamos Node.js para instalar dependencias y contruir los assets estaticos
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos package.json y package-lock.json para aprovechar la cache de Docker
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos el resto del codigo del frontend
COPY . .

# Argumentos de compilacion (si necesitas variables de entorno durante el build de Vite)
# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL

# Construimos la aplicacion para produccion
RUN npm run build

# Etapa 2: Servidor Web (Nginx)
# Usamos un servidor web Nginx alpino ultra-ligero para servir los archivos HTML/JS/CSS generados
FROM nginx:alpine

# Opcional: Reemplazar el archivo de configuracion de Nginx por defecto si necesitas manejar rutas del Single Page Application (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el build estatico desde la etapa de Node hacia el directorio html de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto HTTP
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]
