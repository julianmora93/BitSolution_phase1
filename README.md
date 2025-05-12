# BitSolution API - Phase 1

API for managing Microservices, Endpoints, and Scopes. This project provides a RESTful interface to manage the core components of a microservices architecture.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [Setup and Installation](#setup-and-installation)
- [Development with Docker Compose](#development-with-docker-compose)
- [Available Scripts](#available-scripts)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [API Endpoints](#api-endpoints)
  - [Microservices](#microservices)
  - [Endpoints](#endpoints)
  - [Scopes](#scopes)

## Overview

This project implements an API server using Fastify and TypeScript. It allows CRUD (Create, Read, Update, Delete) operations on three main entities: Microservices, Endpoints (access points of microservices), and Scopes (permissions associated with endpoints). It uses Prisma as an ORM for interaction with the PostgreSQL database and tsyringe for dependency injection.

## Features

- **Microservice Management**:
  - Create new microservices.
  - Get the list of all microservices.
  - Get a specific microservice by its ID.
  - Update the information of an existing microservice.
  - Delete a microservice.
- **Endpoint Management**:
  - Create new endpoints associated with a microservice.
  - Get the list of all endpoints.
  - Get a specific endpoint by its ID.
  - Update the information of an existing endpoint.
  - Delete an endpoint.
- **Scope Management**:
  - Create new scopes.
  - Get the list of all scopes.
  - Get a specific scope by its ID.
  - Update the information of an existing scope.
  - Delete a scope.

## Technologies Used

- **Framework**: [Fastify](https://www.fastify.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (configurable via `DATABASE_URL`)
- **Containerization**: [Docker](https://www.docker.com/) / [Docker Compose](https://docs.docker.com/compose/)
- **Dependency Injection**: [tsyringe](https://github.com/microsoft/tsyringe)
- **Schema Validation**: [@sinclair/typebox](https://github.com/sinclairzx81/typebox)
- **API Documentation**: [@fastify/swagger](https://github.com/fastify/fastify-swagger) and [@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui)

## Database Schema

Defined in <mcfile name="schema.prisma" path="prisma\schema.prisma"></mcfile>:

- **`Microservice`**:
  - `id`: Int (PK, Auto-increment)
  - `name`: String
  - `description`: String
  - `endpoints`: One-to-many relationship with `Endpoint`.

- **`Endpoint`**:
  - `id`: Int (PK, Auto-increment)
  - `path`: String
  - `name`: String
  - `method`: String (e.g., GET, POST)
  - `microserviceId`: Int (FK to `Microservice`)
  - `microservice`: Many-to-one relationship with `Microservice`.
  - `scopeId`: Int? (Optional FK to `Scope`, Unique)
  - `scope`: Optional one-to-one relationship with `Scope`.

- **`Scope`**:
  - `id`: Int (PK, Auto-increment)
  - `name`: String
  - `endpoint`: Optional one-to-one relationship with `Endpoint`.

## Setup and Installation

1.  **Clone the repository (if applicable)**:
    ```bash
    git clone https://github.com/julianmora93/BitSolution_phase1.git
    ```

    ```bash
    cd phase_1
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Create a `.env` file in the project root based on `.env.example` (if it exists) or directly.
    The most important variable is `DATABASE_URL` for the PostgreSQL connection.
    Example:
    ```env
    DATABASE_URL="postgresql://bitsolution:bitsolution@localhost:5432/db_test"
    ```

4.  **Run Prisma migrations**:
    This will create the tables in your database according to <mcfile name="schema.prisma" path="prisma\schema.prisma"></mcfile>.
    ```bash
    npx prisma migrate dev --name init
    ```
    (You can use a different name for the migration if `init` already exists).
    Optionally, to generate the Prisma client:
    ```bash
    npx prisma generate
    ```

## Development with Docker Compose

The <mcfile name="docker-compose.yml" path="docker-compose.yml"></mcfile> file is provided to facilitate the setup of the PostgreSQL database in a local development environment.

**Contents of `docker-compose.yml`:**
```yaml
version: '1.0'

services:
  postgres:
    image: postgres
    container_name: db-bitsolution
    environment:
      POSTGRES_USER: bitsolution
      POSTGRES_PASSWORD: bitsolution
      POSTGRES_DB: db_test
    ports:
      - "5432:5432" # Exposes the PostgreSQL port to the host
    volumes:
      - postgres_data:/var/lib/postgresql/data # Persists DB data

volumes:
  postgres_data:
```

To start the PostgreSQL database with Docker Compose, run:
```bash
docker-compose up -d
```

To stop the PostgreSQL database with Docker Compose, run:
```bash
docker-compose down
```

To rebuild in case of changes to the DockerFile or dependencies, you can run:
```bash
docker-compose up -d --build
```

To see the running containers:
```bash
docker ps
```

Access the PostgreSQL container:
```bash
docker exec -it db-bitsolution bash
```

## Available Scripts

In the `package.json` file, you can find the following scripts:

-   **`npm run dev`**: Starts the server in development mode with auto-reload using `ts-node-dev`.
-   **`npm run build`**: Compiles the TypeScript code to JavaScript (in the `dist/` directory).
-   **`npm run start`**: Starts the server in production mode from the compiled files in `dist/`.
-   **`npm test`**: (Example script, currently shows an error and exits) - You should configure this with your testing framework.

## API Documentation (Swagger)

Once the server is running, interactive API documentation (Swagger UI) is available at:

[http://localhost:3000/docs](http://localhost:3000/docs)

## Endpoints de la API

All endpoints return a standard response structure defined in [default.response.dto.ts](src\shared\dto\default.response.dto.ts)

### Microservices

Base path: `/microservices`
Controller: <mcsymbol name="MicroserviceController" filename="controller.ts" path="src\microservice\controller.ts" startline="7" type="class"></mcsymbol>
Routes: <mcfile name="routes.ts" path="src\microservice\routes.ts"></mcfile>

-   **`GET /microservices`**
    -   Description: Get all microservices.
    -   Controller: <mcsymbol name="MicroserviceController.getAll" filename="controller.ts" path="src\microservice\controller.ts" startline="13" type="function"></mcsymbol>
-   **`GET /microservices/:id`**
    -   Description: Get a microservice by ID.
    -   Parameters: `id` (number)
    -   Controller: <mcsymbol name="MicroserviceController.getById" filename="controller.ts" path="src\microservice\controller.ts" startline="39" type="function"></mcsymbol>
-   **`POST /microservices`**
    -   Description: Create a new microservice.
    -   Body: `CreateOrUpdateMicroserviceDTO` (`name`: string, `description`: string)
    -   Controller: <mcsymbol name="MicroserviceController.create" filename="controller.ts" path="src\microservice\controller.ts" startline="71" type="function"></mcsymbol>
-   **`PUT /microservices/:id`**
    -   Description: Update an existing microservice.
    -   Parameters: `id` (number)
    -   Body: `CreateOrUpdateMicroserviceDTO` (`name`?: string, `description`?: string)
    -   Controller: <mcsymbol name="MicroserviceController.update" filename="controller.ts" path="src\microservice\controller.ts" startline="96" type="function"></mcsymbol>
-   **`DELETE /microservices/:id`**
    -   Description: Delete a microservice.
    -   Parameters: `id` (number)
    -   Controller: <mcsymbol name="MicroserviceController.delete" filename="controller.ts" path="src\microservice\controller.ts" startline="129" type="function"></mcsymbol>

### Endpoints

Base path: `/endpoints`
Controller: <mcsymbol name="EndpointController" filename="controller.ts" path="src\endpoint\controller.ts" startline="7" type="class"></mcsymbol>
Routes: <mcfile name="routes.ts" path="src\endpoint\routes.ts"></mcfile>

-   **`GET /endpoints`**
    -   Description: Get all endpoints.
    -   Controller: <mcsymbol name="EndpointController.getAll" filename="controller.ts" path="src\endpoint\controller.ts" startline="13" type="function"></mcsymbol>
-   **`GET /endpoints/:id`**
    -   Description: Get an endpoint by ID.
    -   Parameters: `id` (number)
    -   Controller: <mcsymbol name="EndpointController.getById" filename="controller.ts" path="src\endpoint\controller.ts" startline="39" type="function"></mcsymbol>
-   **`POST /endpoints`**
    -   Description: Create a new endpoint.
    -   Body: `CreateEndpointDTO` (`path`: string, `name`: string, `method`: string, `microserviceId`: number, `scopeId`?: number)
    -   Controller: <mcsymbol name="EndpointController.create" filename="controller.ts" path="src\endpoint\controller.ts" startline="71" type="function"></mcsymbol>
-   **`PUT /endpoints/:id`**
    -   Description: Update an existing endpoint.
    -   Parameters: `id` (number)
    -   Body: `UpdateEndpointDTO` (campos opcionales de `CreateEndpointDTO`)
    -   Controller: <mcsymbol name="EndpointController.update" filename="controller.ts" path="src\endpoint\controller.ts" startline="98" type="function"></mcsymbol>
-   **`DELETE /endpoints/:id`**
    -   Description: Delete an endpoint.
    -   Parameters: `id` (number)
    -   Controller: <mcsymbol name="EndpointController.delete" filename="controller.ts" path="src\endpoint\controller.ts" startline="132" type="function"></mcsymbol>

### Scopes

Rutas base: `/scopes`
Controlador: <mcsymbol name="ScopeController" filename="controller.ts" path="src\scope\controller.ts" startline="7" type="class"></mcsymbol>
Rutas: <mcfile name="routes.ts" path="src\scope\routes.ts"></mcfile>

-   **`GET /scopes`**
    -   Description: Get all scopes.
    -   Controller: <mcsymbol name="ScopeController.getAll" filename="controller.ts" path="src\scope\controller.ts" startline="13" type="function"></mcsymbol>
-   **`GET /scopes/:id`**
    -   Description: Get a scope by ID.
    -   Parameters: `id` (number)
    -   Controller: <mcsymbol name="ScopeController.getById" filename="controller.ts" path="src\scope\controller.ts" startline="39" type="function"></mcsymbol>
-   **`POST /scopes`**
    -   Description: Create a new scope.
    -   Body: `CreateOrUpdateScopeDTO` (`name`: string)
    -   Controller: <mcsymbol name="ScopeController.create" filename="controller.ts" path="src\scope\controller.ts" startline="71" type="function"></mcsymbol>
-   **`PUT /scopes/:id`**
    -   Description: Update an existing scope.
    -   Parameters: `id` (number)
    -   Body: `CreateOrUpdateScopeDTO` (`name`: string)
    -   Controller: <mcsymbol name="ScopeController.update" filename="controller.ts" path="src\scope\controller.ts" startline="98" type="function"></mcsymbol>
-   **`DELETE /scopes/:id`**
    -   Description: Delete a scope.
    -   Parameters: `id` (number)
    -   Controller: <mcsymbol name="ScopeController.delete" filename="controller.ts" path="src\scope\controller.ts" startline="136" type="function"></mcsymbol>

---
