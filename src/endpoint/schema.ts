import { Type } from "@sinclair/typebox";
import { DefaultResponseSchema } from "../shared/schema/default.response.schema";
import { CreateEndpointSchema, UpdateEndpointSchema, EndpointSchema } from "../shared/schema/endpoint.schema";
import { injectable } from "tsyringe";

@injectable()
export class EndpointsSchema {

  getAllEndpointsSchema = {
    description: 'Obtener todos los endpoints',
    tags: ['Endpoints'],
    response: {
      200: DefaultResponseSchema(Type.Array(EndpointSchema)),
      404: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null()),
    }
  };
  
  getEndpointByIdSchema = {
    description: 'Obtener un endpoint por Id',
    tags: ['Endpoints'],
    params: Type.Object({ id: Type.Number() }),
    response: {
      200: DefaultResponseSchema(EndpointSchema),
      400: DefaultResponseSchema(Type.Null()),
      404: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null()),
    }
  };

  createEndpointSchema = {
    description: 'Crear endpoint',
    tags: ['Endpoints'],
    body: CreateEndpointSchema,
    response: {
      201: DefaultResponseSchema(EndpointSchema),
      400: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null()),
    }
  };

  updateEndpointSchema = {
    description: 'Actualizar endpoint',
    tags: ['Endpoints'],
    params: Type.Object({ id: Type.Number() }),
    body: UpdateEndpointSchema,
    response: {
      200: DefaultResponseSchema(EndpointSchema),
      400: DefaultResponseSchema(Type.Null()),
      404: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null())
    }
  };

  deleteEndpointSchema = {
    description: 'Eliminar un endpoint',
    tags: ['Endpoints'],
    params: Type.Object({ id: Type.Number() }),
    response: {
      200: DefaultResponseSchema(Type.Null()),
      400: DefaultResponseSchema(Type.Null()),
      404: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null())
    }
  };
}