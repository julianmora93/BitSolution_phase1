import prisma from "../prisma";
import { ScopeDTO, CreateOrUpdateScopeDTO } from "../shared/dto/scope.dto";
import { injectable } from "tsyringe";

@injectable()
export class ScopeService {
  
  getAll = async (): Promise<ScopeDTO[]> => prisma.scope.findMany();

  getById = async (id: number): Promise<ScopeDTO | null> => prisma.scope.findUnique({ where: { id } });

  create = async (data: CreateOrUpdateScopeDTO): Promise<ScopeDTO> => 
    prisma.scope.create({
      data: {
        name: data.name
      }
    });

  update = async (id: number, data: CreateOrUpdateScopeDTO): Promise<ScopeDTO> => 
    prisma.scope.update({
      where: { id },
      data: { 
        name: data.name
      }
    });

  deleteOne = async (id: number): Promise<any> => prisma.scope.delete({ where: { id } });
}