import "reflect-metadata";
import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import microserviceRoutes from './microservice/routes';
import scopeRoutes from './scope/routes';
import endpointRoutes from './endpoint/routes';

const server = Fastify({ logger: true });

server.register(swagger, {
  swagger: {
    info: {
      title: 'BitSolution API',
      description: 'API for Microservices, Endpoints and Scopes',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  }
});

server.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true
  }
});

server.register(microserviceRoutes);
server.register(scopeRoutes);
server.register(endpointRoutes);

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server listening at ${address}`);
});
