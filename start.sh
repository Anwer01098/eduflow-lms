#!/bin/bash

echo "Starting EduFlow LMS..."

export NG_CLI_ANALYTICS=false

if [ -n "$PGHOST" ] && [ -n "$PGPORT" ] && [ -n "$PGDATABASE" ]; then
  export SPRING_DATASOURCE_URL="jdbc:postgresql://${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=disable"
  echo "Database URL configured."
fi

cd /home/runner/workspace/backend
JAR_FILE=$(find target -name "*.jar" -not -name "*-plain*" 2>/dev/null | head -1)
if [ -n "$JAR_FILE" ]; then
  echo "Starting Spring Boot backend from JAR..."
  java -Xmx512m -jar "$JAR_FILE" &
else
  echo "Building and starting Spring Boot backend..."
  mvn -q spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx512m" &
fi
BACKEND_PID=$!

cd /home/runner/workspace/frontend
echo "Starting Angular frontend on port 5000..."
npx ng serve --host 0.0.0.0 --port 5000 --proxy-config proxy.conf.js &
FRONTEND_PID=$!

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

wait
