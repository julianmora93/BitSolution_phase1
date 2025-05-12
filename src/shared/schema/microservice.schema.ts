import { Type } from '@sinclair/typebox';

export const MicroserviceSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  description: Type.String()
});

export const CreateOrUpdateMicroserviceSchema = Type.Object({
  name: Type.String(),
  description: Type.String()
});