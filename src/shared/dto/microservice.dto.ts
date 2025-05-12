import { MicroserviceSchema, CreateOrUpdateMicroserviceSchema } from "../schema/microservice.schema";

export type MicroserviceDTO = typeof MicroserviceSchema.Static;
export type CreateOrUpdateMicroserviceDTO = typeof CreateOrUpdateMicroserviceSchema.Static;