# Multi-stage Dockerfile for JANSAAHAY Spring Boot Backend
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper & pom.xml
COPY pom.xml .
COPY src ./src

# Install maven & package JAR
RUN apk add --no-cache maven && \
    mvn clean package -DskipTests

# Runtime Stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Add non-root user for security
RUN addgroup -S jansaahay && adduser -S jansaahay -G jansaahay
USER jansaahay:jansaahay

# Copy executable jar from build stage
COPY --from=build /app/target/jansaahay-backend-1.0.0.jar app.jar

# Expose port (default 8080)
EXPOSE 8080

# Environment variables with sensible defaults
ENV PORT=8080 \
    JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseG1GC"

# Healthcheck endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/api/health || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
