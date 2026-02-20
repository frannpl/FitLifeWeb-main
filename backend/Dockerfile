# Etapa 1: Construccion (Build)
# Usamos Maven con Eclipse Temurin (Java 21) para compilar el proyecto
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copiamos primero los archivos de configuracion de Maven para aprovechar la cache de capas de Docker
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
COPY mvnw.cmd .

# Descargamos las dependencias (se cachean si pom.xml no cambia)
RUN mvn dependency:go-offline -B || echo "Algunas dependencias no se pudieron descargar offline, se descargaran durante el build."

# Copiamos el codigo fuente
COPY src src

# Compilamos el proyecto y empaquetamos el .jar, omitiendo tests para acelerar el build en produccion
RUN mvn clean package -DskipTests

# Etapa 2: Ejecucion (Runtime)
# Usamos una imagen ligera (Alpine) de Java 21 para correr la app, asi reducimos drasticamente el peso final de la imagen
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Creamos un usuario no-root por seguridad (buenas practicas)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copiamos el .jar generado en la etapa de build
COPY --from=build /app/target/*.jar app.jar

# Exponemos el puerto del backend
EXPOSE 8080

# Punto de entrada de la aplicacion
ENTRYPOINT ["java", "-jar", "app.jar"]
