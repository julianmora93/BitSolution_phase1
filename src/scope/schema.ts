import { Type } from "@sinclair/typebox";
import { DefaultResponseSchema } from "../shared/schema/default.response.schema";
import { CreateOrUpdateScopeSchema, ScopeSchema } from "../shared/schema/scope.schema";
import { injectable } from "tsyringe";

@injectable()
export class ScopesSchema {

  getAllScopesSchema = {
    description: 'Obtener todos los scopes',
    tags: ['Scopes'],
    response: {
      200: DefaultResponseSchema(Type.Array(ScopeSchema)),
      404: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null()),
    }
  };
  
  getScopeByIdSchema = {
    description: 'Obtener un scope por Id',
    tags: ['Scopes'],
    params: Type.Object({ id: Type.Number() }),
    response: {
      200: DefaultResponseSchema(ScopeSchema),
      400: DefaultResponseSchema(Type.Null()),
      404: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null()),
    }
  };

  createScopeSchema = {
    description: 'Crear scope',
    tags: ['Scopes'],
    body: CreateOrUpdateScopeSchema,
    response: {
      201: DefaultResponseSchema(ScopeSchema),
      400: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null()),
    }
  };

  updateScopeSchema = {
    description: 'Actualizar scope',
    tags: ['Scopes'],
    params: Type.Object({ id: Type.Number() }),
    body: CreateOrUpdateScopeSchema,
    response: {
      200: DefaultResponseSchema(ScopeSchema),
      400: DefaultResponseSchema(Type.Null()),
      404: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null())
    }
  };

  deleteScopeSchema = {
    description: 'Eliminar un scope',
    tags: ['Scopes'],
    params: Type.Object({ id: Type.Number() }),
    response: {
      200: DefaultResponseSchema(Type.Null()), // Or a success message object
      400: DefaultResponseSchema(Type.Null()),
      404: DefaultResponseSchema(Type.Null()),
      500: DefaultResponseSchema(Type.Null())
    }
  };
}