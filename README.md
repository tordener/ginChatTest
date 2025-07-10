# Distributed Chat System (EDA Practice Project)

## Overview

This project is a learning-focused implementation of a distributed chat system using modern web technologies and containerized microservices. Our primary goal is to explore and practice **Event-Driven Architecture (EDA)** by building a real-time chat application. The system is fully containerized using **Podman**, designed around **Kafka** as the central message broker, with services written in **Golang** and a modern frontend built with **React**, **Tailwind CSS**, and **Vite**.

We are simulating a production-grade environment to learn key principles of distributed system design, observability, fault-tolerance, orchestration, and messaging patterns.

## Tech Stack

* **Frontend**: React (TypeScript) + Tailwind CSS + Vite
* **Backend**: Golang with Gin framework
* **Messaging**: Apache Kafka
* **Containerization**: Podman (OCI-compatible containers)
* **Build Tools**: Vite (frontend), SWC (React/TS compilation)
* **Messaging Protocol**: Kafka Pub/Sub topics (JSON encoded events)
* **Infrastructure**: Multi-container setup via Podman Compose

## Key Concepts Practiced

* Event-Driven Architecture (EDA)
* Microservices and containerization
* Kafka consumer groups and producers
* Frontend and backend separation of concerns
* Stateless service design
* Message serialization, routing, and filtering
* Logging and debugging in distributed systems

## Project Structure (Planned)

```
├── backend/             # Golang services
│   ├── gateway/         # HTTP server (Gin)
│   ├── chatservice/     # Kafka consumer/producer logic
├── frontend/            # React + Tailwind UI
├── kafka/               # Kafka broker, zookeeper, init scripts
├── infra/               # Podman Compose, network setup, volumes
├── proto/               # (Optional) protobuf schemas if needed
└── README.md
```

## Mission Objectives (TODO)

### Phase 1: Initial Setup

* [x] Initialize Vite + React + Tailwind frontend with working dev server
* [x] Create minimal registration/chatroom UI using TypeScript + Tailwind
* [ ] Build `podman-compose.yaml` to spin up Kafka + Zookeeper containers
* [ ] Configure Gin backend server with basic REST API (register, ping)
* [ ] Set up Kafka topic for chat messages

### Phase 2: WebSocket & Messaging

* [ ] Add WebSocket upgrade route to Gin backend
* [ ] Integrate WebSocket server with Kafka producer/consumer
* [ ] Broadcast messages to all connected users
* [ ] Display messages in frontend chatroom in real-time

### Phase 3: Service Orchestration

* [ ] Containerize frontend with Podman
* [ ] Containerize Gin backend
* [ ] Wire up services via Podman Compose (networking, ports)
* [ ] Health checks and auto-restart policies

### Phase 4: Observability + Resilience

* [ ] Add structured logging (JSON logs)
* [ ] Implement simple tracing (request IDs or spans)
* [ ] Introduce artificial failures to test retry/backoff logic

### Phase 5: Advanced Features (Optional)

* [ ] User presence (join/leave events)
* [ ] Private messaging
* [ ] Chat history persistence (Redis, file, or DB)
* [ ] gRPC integration for backend-to-backend communication

## Getting Started (Coming Soon)

We will provide full instructions to run this system locally once the core containers are ready.

---

This project is designed for learning, iteration, and exploration. Code quality will improve as the system evolves. Contributions, insights, and architectural critiques are welcome.
