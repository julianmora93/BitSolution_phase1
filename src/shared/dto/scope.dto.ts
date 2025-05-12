import { ScopeSchema, CreateOrUpdateScopeSchema } from "../schema/scope.schema";

export type ScopeDTO = typeof ScopeSchema.Static;
export type CreateOrUpdateScopeDTO = typeof CreateOrUpdateScopeSchema.Static;