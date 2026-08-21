FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY . .
RUN ./mvnw clean package || mvn clean package
EXPOSE 8080
CMD ["java", "-jar", "target/zentinel-core.jar"]
