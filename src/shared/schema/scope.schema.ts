import { Type } from '@sinclair/typebox';

export const ScopeSchema = Type.Object({
  id: Type.Number(),
  name: Type.String()
});

export const CreateOrUpdateScopeSchema = Type.Object({
  name: Type.String()
});