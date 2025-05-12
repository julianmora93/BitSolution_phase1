import prisma from "../prisma";
import { EndpointDTO, CreateEndpointDTO, UpdateEndpointDTO } from "../shared/dto/endpoint.dto";
import { injectable } from "tsyringe";

@injectable()
export class EndpointService {
  
  getAll = async (): Promise<EndpointDTO[]> => prisma.endpoint.findMany();

  getById = async (id: number): Promise<EndpointDTO | null> => prisma.endpoint.findUnique({ where: { id } });

  create = async (data: CreateEndpointDTO): Promise<EndpointDTO> => 
    prisma.endpoint.create({
      data: {
        path: data.path,
        name: data.name,
        method: data.method,
        microserviceId: data.microserviceId,
        scopeId: data.scopeId
      }
    });

  update = async (id: number, data: UpdateEndpointDTO): Promise<EndpointDTO> => 
    prisma.endpoint.update({
      where: { id },
      data: { 
        path: data.path,
        name: data.name,
        method: data.method,
        microserviceId: data.microserviceId,
        scopeId: data.scopeId
      }
    });

  deleteOne = async (id: number): Promise<any> => prisma.endpoint.delete({ where: { id } });
}