# BitSolution API - Phase 1

API para la gestión de Microservicios, Endpoints y Scopes. Este proyecto proporciona una interfaz RESTful para administrar los componentes centrales de una arquitectura de microservicios.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Funcionalidades](#funcionalidades)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Esquema de la Base de Datos](#esquema-de-la-base-de-datos)
- [Configuración e Instalación](#configuración-e-instalación)
- [Desarrollo con Docker Compose](#desarrollo-con-docker-compose)
- [Scripts Disponibles](#scripts-disponibles)
- [Documentación de la API (Swagger)](#documentación-de-la-api-swagger)
- [Endpoints de la API](#endpoints-de-la-api)
  - [Microservicios](#microservicios)
  - [Endpoints](#endpoints)
  - [Scopes](#scopes)

## Descripción General

Este proyecto implementa un servidor API utilizando Fastify y TypeScript. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre tres entidades principales: Microservicios, Endpoints (puntos de acceso de los microservicios) y Scopes (ámbitos o permisos asociados a los endpoints). Utiliza Prisma como ORM para la interacción con la base de datos PostgreSQL y tsyringe para la inyección de dependencias.

## Funcionalidades

- **Gestión de Microservicios**:
  - Crear nuevos microservicios.
  - Obtener la lista de todos los microservicios.
  - Obtener un microservicio específico por su ID.
  - Actualizar la información de un microservicio existente.
  - Eliminar un microservicio.
- **Gestión de Endpoints**:
  - Crear nuevos endpoints asociados a un microservicio.
  - Obtener la lista de todos los endpoints.
  - Obtener un endpoint específico por su ID.
  - Actualizar la información de un endpoint existente.
  - Eliminar un endpoint.
- **Gestión de Scopes**:
  - Crear nuevos scopes.
  - Obtener la lista de todos los scopes.
  - Obtener un scope específico por su ID.
  - Actualizar la información de un scope existente.
  - Eliminar un scope.

## Tecnologías Utilizadas

- **Framework**: [Fastify](https://www.fastify.io/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Base de Datos**: PostgreSQL (configurable a través de `DATABASE_URL`)
- **Contenerización**: [Docker](https://www.docker.com/) / [Docker Compose](https://docs.docker.com/compose/)
- **Inyección de Dependencias**: [tsyringe](https://github.com/microsoft/tsyringe)
- **Validación de Esquemas**: [@sinclair/typebox](https://github.com/sinclairzx81/typebox)
- **Documentación API**: [@fastify/swagger](https://github.com/fastify/fastify-swagger) y [@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui)

## Esquema de la Base de Datos

Definido en <mcfile name="schema.prisma" path="d:\Desarrollo\BitSolution\phase_1\prisma\schema.prisma"></mcfile>:

- **`Microservice`**:
  - `id`: Int (PK, Autoincremento)
  - `name`: String
  - `description`: String
  - `endpoints`: Relación uno a muchos con `Endpoint`.

- **`Endpoint`**:
  - `id`: Int (PK, Autoincremento)
  - `path`: String
  - `name`: String
  - `method`: String (e.g., GET, POST)
  - `microserviceId`: Int (FK a `Microservice`)
  - `microservice`: Relación muchos a uno con `Microservice`.
  - `scopeId`: Int? (FK opcional a `Scope`, Único)
  - `scope`: Relación uno a uno opcional con `Scope`.

- **`Scope`**:
  - `id`: Int (PK, Autoincremento)
  - `name`: String
  - `endpoint`: Relación uno a uno opcional con `Endpoint`.

## Configuración e Instalación

1.  **Clonar el repositorio (si aplica)**:
    ```bash
    git clone https://github.com/julianmora93/BitSolution_phase1.git
    ```

    ```bash
    cd phase_1
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example` (si existe) o directamente.
    La variable más importante es `DATABASE_URL` para la conexión a PostgreSQL.
    Ejemplo:
    ```env
    DATABASE_URL="postgresql://bitsolution:bitsolution@localhost:5432/db_test"
    ```

4.  **Ejecutar migraciones de Prisma**:
    Esto creará las tablas en tu base de datos según el <mcfile name="schema.prisma" path="d:\Desarrollo\BitSolution\phase_1\prisma\schema.prisma"></mcfile>.
    ```bash
    npx prisma migrate dev --name init
    ```
    (Puedes usar otro nombre para la migración si `init` ya existe).
    Opcionalmente, para generar el cliente Prisma:
    ```bash
    npx prisma generate
    ```

## Desarrollo con Docker Compose

El archivo <mcfile name="docker-compose.yml" path="d:\Desarrollo\BitSolution\phase_1\docker-compose.yml"></mcfile> se proporciona para facilitar la configuración de la base de datos PostgreSQL en un entorno de desarrollo local.

**Contenido de `docker-compose.yml`:**
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
      - "5432:5432" # Expone el puerto de PostgreSQL al host
    volumes:
      - postgres_data:/var/lib/postgresql/data # Persiste los datos de la BD

volumes:
  postgres_data:
```

Para iniciar la base de datos PostgreSQL con Docker Compose, ejecuta:
```bash
docker-compose up -d
```

Para detener la base de datos PostgreSQL con Docker Compose, ejecuta:
```bash
docker-compose down
```

Para reconstruir en caso de hacer cambios en el archivo DockerFile o dependencias, puedes ejecutar:
```bash
docker-compose up -d --build
```

Para ver los contenedores que se están ejecutando:
```bash
docker ps
```

Acceder al contenedor de PostgreSQL::
```bash
docker exec -it db-bitsolution bash
```

## Scripts Disponibles

En el archivo <mcfile name="package.json" path="d:\Desarrollo\BitSolution\phase_1\package.json"></mcfile>, puedes encontrar los siguientes scripts:

-   **`npm run dev`**: Inicia el servidor en modo de desarrollo con recarga automática usando `ts-node-dev`.
-   **`npm run build`**: Compila el código TypeScript a JavaScript (en el directorio `dist/`).
-   **`npm run start`**: Inicia el servidor en modo de producción desde los archivos compilados en `dist/`.
-   **`npm test`**: (Script de ejemplo, actualmente muestra un error y sale) - Deberías configurarlo con tu framework de pruebas.

## Documentación de la API (Swagger)

Una vez que el servidor está en ejecución, la documentación interactiva de la API (Swagger UI) está disponible en:

[http://localhost:3000/docs](http://localhost:3000/docs)

## Endpoints de la API

Todos los endpoints devuelven una estructura de respuesta estándar definida en <mcfile name="default.response.dto.ts" path="d:\Desarrollo\BitSolution\phase_1\src\shared\dto\default.response.dto.ts"></mcfile>.

### Microservicios

Rutas base: `/microservices`
Controlador: <mcsymbol name="MicroserviceController" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\microservice\controller.ts" startline="7" type="class"></mcsymbol>
Rutas: <mcfile name="routes.ts" path="d:\Desarrollo\BitSolution\phase_1\src\microservice\routes.ts"></mcfile>

-   **`GET /microservices`**
    -   Descripción: Obtener todos los microservicios.
    -   Controlador: <mcsymbol name="MicroserviceController.getAll" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\microservice\controller.ts" startline="13" type="function"></mcsymbol>
-   **`GET /microservices/:id`**
    -   Descripción: Obtener un microservicio por su ID.
    -   Parámetros: `id` (number)
    -   Controlador: <mcsymbol name="MicroserviceController.getById" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\microservice\controller.ts" startline="39" type="function"></mcsymbol>
-   **`POST /microservices`**
    -   Descripción: Crear un nuevo microservicio.
    -   Body: `CreateOrUpdateMicroserviceDTO` (`name`: string, `description`: string)
    -   Controlador: <mcsymbol name="MicroserviceController.create" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\microservice\controller.ts" startline="71" type="function"></mcsymbol>
-   **`PUT /microservices/:id`**
    -   Descripción: Actualizar un microservicio existente.
    -   Parámetros: `id` (number)
    -   Body: `CreateOrUpdateMicroserviceDTO` (`name`?: string, `description`?: string)
    -   Controlador: <mcsymbol name="MicroserviceController.update" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\microservice\controller.ts" startline="96" type="function"></mcsymbol>
-   **`DELETE /microservices/:id`**
    -   Descripción: Eliminar un microservicio.
    -   Parámetros: `id` (number)
    -   Controlador: <mcsymbol name="MicroserviceController.delete" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\microservice\controller.ts" startline="129" type="function"></mcsymbol>

### Endpoints

Rutas base: `/endpoints`
Controlador: <mcsymbol name="EndpointController" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\endpoint\controller.ts" startline="7" type="class"></mcsymbol>
Rutas: <mcfile name="routes.ts" path="d:\Desarrollo\BitSolution\phase_1\src\endpoint\routes.ts"></mcfile>

-   **`GET /endpoints`**
    -   Descripción: Obtener todos los endpoints.
    -   Controlador: <mcsymbol name="EndpointController.getAll" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\endpoint\controller.ts" startline="13" type="function"></mcsymbol>
-   **`GET /endpoints/:id`**
    -   Descripción: Obtener un endpoint por su ID.
    -   Parámetros: `id` (number)
    -   Controlador: <mcsymbol name="EndpointController.getById" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\endpoint\controller.ts" startline="39" type="function"></mcsymbol>
-   **`POST /endpoints`**
    -   Descripción: Crear un nuevo endpoint.
    -   Body: `CreateEndpointDTO` (`path`: string, `name`: string, `method`: string, `microserviceId`: number, `scopeId`?: number)
    -   Controlador: <mcsymbol name="EndpointController.create" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\endpoint\controller.ts" startline="71" type="function"></mcsymbol>
-   **`PUT /endpoints/:id`**
    -   Descripción: Actualizar un endpoint existente.
    -   Parámetros: `id` (number)
    -   Body: `UpdateEndpointDTO` (campos opcionales de `CreateEndpointDTO`)
    -   Controlador: <mcsymbol name="EndpointController.update" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\endpoint\controller.ts" startline="98" type="function"></mcsymbol>
-   **`DELETE /endpoints/:id`**
    -   Descripción: Eliminar un endpoint.
    -   Parámetros: `id` (number)
    -   Controlador: <mcsymbol name="EndpointController.delete" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\endpoint\controller.ts" startline="132" type="function"></mcsymbol>

### Scopes

Rutas base: `/scopes`
Controlador: <mcsymbol name="ScopeController" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\scope\controller.ts" startline="7" type="class"></mcsymbol>
Rutas: <mcfile name="routes.ts" path="d:\Desarrollo\BitSolution\phase_1\src\scope\routes.ts"></mcfile>

-   **`GET /scopes`**
    -   Descripción: Obtener todos los scopes.
    -   Controlador: <mcsymbol name="ScopeController.getAll" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\scope\controller.ts" startline="13" type="function"></mcsymbol>
-   **`GET /scopes/:id`**
    -   Descripción: Obtener un scope por su ID.
    -   Parámetros: `id` (number)
    -   Controlador: <mcsymbol name="ScopeController.getById" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\scope\controller.ts" startline="39" type="function"></mcsymbol>
-   **`POST /scopes`**
    -   Descripción: Crear un nuevo scope.
    -   Body: `CreateOrUpdateScopeDTO` (`name`: string)
    -   Controlador: <mcsymbol name="ScopeController.create" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\scope\controller.ts" startline="71" type="function"></mcsymbol>
-   **`PUT /scopes/:id`**
    -   Descripción: Actualizar un scope existente.
    -   Parámetros: `id` (number)
    -   Body: `CreateOrUpdateScopeDTO` (`name`: string)
    -   Controlador: <mcsymbol name="ScopeController.update" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\scope\controller.ts" startline="98" type="function"></mcsymbol>
-   **`DELETE /scopes/:id`**
    -   Descripción: Eliminar un scope.
    -   Parámetros: `id` (number)
    -   Controlador: <mcsymbol name="ScopeController.delete" filename="controller.ts" path="d:\Desarrollo\BitSolution\phase_1\src\scope\controller.ts" startline="136" type="function"></mcsymbol>

---
