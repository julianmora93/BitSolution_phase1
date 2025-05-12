import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { MicroserviceController } from './controller';
import { MicroservicesSchema } from './schema';

export default async function microserviceRoutes(fastify: FastifyInstance): Promise<void> {

  const controller = container.resolve(MicroserviceController);
  const schema = container.resolve(MicroservicesSchema);

  fastify.get('/microservices', {
    schema: schema.getAllMicroservicesSchema,
    handler: controller.getAll.bind(controller)
  });

  fastify.get('/microservices/:id', {
    schema: schema.getMicroserviceByIdSchema,
    handler: controller.getById.bind(controller)
  });

  fastify.post('/microservices', {
    schema: schema.createMicroserviceSchema,
    handler: controller.create.bind(controller)
  });

  fastify.put('/microservices/:id', {
    schema: schema.updateMicroserviceSchema,
    handler: controller.update.bind(controller)
  });

  fastify.delete('/microservices/:id', {
    schema: schema.deleteMicroserviceSchema,
    handler: controller.delete.bind(controller)
  });
}