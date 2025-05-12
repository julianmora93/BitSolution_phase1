import { Type } from '@sinclair/typebox';

export const EndpointSchema = Type.Object({
  id: Type.Number(),
  path: Type.String(),
  name: Type.String(),
  method: Type.String(), //-- Aqui seria bueno usar un ENUM
  microserviceId: Type.Number(),
  scopeId: Type.Optional(Type.Number())
});

export const CreateEndpointSchema = Type.Object({
  path: Type.String(),
  name: Type.String(),
  method: Type.String(),
  microserviceId: Type.Number(),
  scopeId: Type.Optional(Type.Number())
});

export const UpdateEndpointSchema = Type.Object({
  path: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  method: Type.Optional(Type.String()),
  microserviceId: Type.Optional(Type.Number()),
  scopeId: Type.Optional(Type.Union([Type.Number(), Type.Null()]))
});