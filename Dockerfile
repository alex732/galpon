# Etapa 1: Construcción (Usa una imagen con Maven ya instalado)
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
# Descarga las dependencias primero (mejora la velocidad en futuros despliegues)
RUN mvn dependency:go-offline
COPY src ./src
# Compila el proyecto
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución (Usa una imagen más ligera solo con Java)
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
# Copia el .jar desde la Etapa 1
# Nota: Si tu pom.xml genera un nombre diferente, debes ajustarlo aquí
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
