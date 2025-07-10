# docker/backend.Dockerfile
FROM golang:1.22-alpine
WORKDIR /app
COPY . .
RUN go mod tidy
RUN go build -o server .
EXPOSE 8080
CMD ["./server"]
