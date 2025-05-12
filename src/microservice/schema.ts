import { Type } from "@sinclair/typebox";
import { DefaultResponseSchema } from "../shared/schema/default.response.schema";
import { CreateOrUpdateMicroserviceSchema, MicroserviceSchema } from "../shared/schema/microservice.schema";
import { injectable } from "tsyringe";

@injectable()
export class MicroservicesSchema {

  getAllMicroservicesSchema = {
    description: 'Obtener todos los microservicios',
    tags: ['Microservices'],
    response: {
      200: DefaultResponseSchema(Type.Array(MicroserviceSchema)),
      404: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null()),
    }
  };
  
  getMicroserviceByIdSchema = {
    description: 'Obtener un microservicio por Id',
    tags: ['Microservices'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }
      },
      required: ['id']
    },
    response: {
      200: DefaultResponseSchema(MicroserviceSchema),
      400: DefaultResponseSchema(Type.Null()),
      404: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null()),
    }
  };

  createMicroserviceSchema = {
    description: 'Crear microservicio',
    tags: ['Microservices'],
    body: CreateOrUpdateMicroserviceSchema,
    response: {
      201: DefaultResponseSchema(MicroserviceSchema),
      400: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null()),
    }
  };

  updateMicroserviceSchema = {
    description: 'Actualizar microservicio',
    tags: ['Microservices'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }
      },
      required: ['id']
    },
    body: CreateOrUpdateMicroserviceSchema,
    response: {
      200: DefaultResponseSchema(MicroserviceSchema),
      400: DefaultResponseSchema(MicroserviceSchema),
      404: DefaultResponseSchema(MicroserviceSchema),
      500: DefaultResponseSchema(MicroserviceSchema)
    }
  };

  deleteMicroserviceSchema = {
    description: 'Eliminar un microservicio',
    tags: ['Microservices'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }
      },
      required: ['id']
    },
    response: {
      200: DefaultResponseSchema(MicroserviceSchema),
      400: DefaultResponseSchema(MicroserviceSchema),
      404: DefaultResponseSchema(MicroserviceSchema),
      500: DefaultResponseSchema(MicroserviceSchema)
    }
  };

}