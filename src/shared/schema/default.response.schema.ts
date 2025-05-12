import { Type, TSchema } from '@sinclair/typebox';

/**
 * Funcion que estructura una respuesta por defecto. Genera uniformidad en las respuestas
 * @param dataSchema 
 * @returns 
 */
export function DefaultResponseSchema<T extends TSchema>(dataSchema: T) {
  return Type.Object({
    status: Type.Boolean(),
    code: Type.String(),
    message: Type.String(),
    data: Type.Union([dataSchema, Type.Null()]),
  });
}