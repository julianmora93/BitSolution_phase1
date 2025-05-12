import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { EndpointController } from './controller';
import { EndpointsSchema } from './schema';

export default async function endpointRoutes(fastify: FastifyInstance): Promise<void> {

  const controller = container.resolve(EndpointController);
  const schema = container.resolve(EndpointsSchema);

  fastify.get('/endpoints', {
    schema: schema.getAllEndpointsSchema,
    handler: controller.getAll.bind(controller)
  });

  fastify.get('/endpoints/:id', {
    schema: schema.getEndpointByIdSchema,
    handler: controller.getById.bind(controller)
  });

  fastify.post('/endpoints', {
    schema: schema.createEndpointSchema,
    handler: controller.create.bind(controller)
  });

  fastify.put('/endpoints/:id', {
    schema: schema.updateEndpointSchema,
    handler: controller.update.bind(controller)
  });

  fastify.delete('/endpoints/:id', {
    schema: schema.deleteEndpointSchema,
    handler: controller.delete.bind(controller)
  });
}