import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { ScopeController } from './controller';
import { ScopesSchema } from './schema';

export default async function scopeRoutes(fastify: FastifyInstance): Promise<void> {

  const controller = container.resolve(ScopeController);
  const schema = container.resolve(ScopesSchema);

  fastify.get('/scopes', {
    schema: schema.getAllScopesSchema,
    handler: controller.getAll.bind(controller)
  });

  fastify.get('/scopes/:id', {
    schema: schema.getScopeByIdSchema,
    handler: controller.getById.bind(controller)
  });

  fastify.post('/scopes', {
    schema: schema.createScopeSchema,
    handler: controller.create.bind(controller)
  });

  fastify.put('/scopes/:id', {
    schema: schema.updateScopeSchema,
    handler: controller.update.bind(controller)
  });

  fastify.delete('/scopes/:id', {
    schema: schema.deleteScopeSchema,
    handler: controller.delete.bind(controller)
  });
}