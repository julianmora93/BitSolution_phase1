import { Static, TSchema } from "@sinclair/typebox";
import { DefaultResponseSchema } from "./../schema/default.response.schema";

export type DefaultResponseDTO<T extends TSchema> = Static<ReturnType<typeof DefaultResponseSchema<T>>>;