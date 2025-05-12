import { EndpointSchema, CreateEndpointSchema, UpdateEndpointSchema } from "../schema/endpoint.schema";

export type EndpointDTO = typeof EndpointSchema.Static;
export type CreateEndpointDTO = typeof CreateEndpointSchema.Static;
export type UpdateEndpointDTO = typeof UpdateEndpointSchema.Static;