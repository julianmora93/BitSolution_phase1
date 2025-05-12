import prisma from "../prisma";
import { MicroserviceDTO, CreateOrUpdateMicroserviceDTO } from "../shared/dto/microservice.dto";
import { injectable } from "tsyringe";

//-- IMPORTANTE --//
// Las consultas deberian retornar un objeto de tipo modelo y debe existir una capa de adapter para transformar el modelo a DTO

@injectable()
export class MicroserviceService {
  
  getAll = async (): Promise<MicroserviceDTO[]> => prisma.microservice.findMany<MicroserviceDTO>();

  getById = async (id: number): Promise<MicroserviceDTO> => prisma.microservice.findUnique({where: { id }});

  create = async (data: CreateOrUpdateMicroserviceDTO): Promise<MicroserviceDTO> => 
    prisma.microservice.create({
      data: {
        name: data.name,
        description: data.description
      }
    });

  update = async (id: number, data: CreateOrUpdateMicroserviceDTO): Promise<MicroserviceDTO> => 
    prisma.microservice.update({
      where: { id },
      data: { 
        name: data.name, 
        description: data.description
      }
    });

  deleteOne = async (id: number): Promise<any> => prisma.microservice.delete({where: { id }});

}