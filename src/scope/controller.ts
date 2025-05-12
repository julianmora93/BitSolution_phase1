import { FastifyRequest, FastifyReply } from 'fastify';
import { DefaultResponseDTO } from '../shared/dto/default.response.dto';
import { ScopeDTO, CreateOrUpdateScopeDTO } from '../shared/dto/scope.dto';
import { ScopeService } from './service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class ScopeController {

  constructor(
    @inject(ScopeService) private service: ScopeService
  ) { }
  
  async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<ScopeDTO> = { // Adjusted for array
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const data: ScopeDTO[]  = await this.service.getAll();
      if(!data || data.length === 0) { // Adjusted condition
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Unregistered Scopes';
        defaultResponse.status = false;
        return reply.status(404).send(defaultResponse);
      }
      defaultResponse.data = data;
      return reply.send(defaultResponse);
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }

  async getById(request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<ScopeDTO> = {
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const { id } = request.params as { id: number };
      if(id === 0) {
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Exception service: It is not allowed to send a zero id search';
        defaultResponse.status = false;
        return reply.status(400).send(defaultResponse);
      }
      const data = await this.service.getById(id);
      if(!data) {
        defaultResponse.code = '0x03';
        defaultResponse.message = 'Exception service: Scope not found';
        defaultResponse.status = false;
        return reply.status(404).send(defaultResponse);
      }
      defaultResponse.data = data;
      return reply.send(defaultResponse);
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<ScopeDTO> = {
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const data: CreateOrUpdateScopeDTO = request.body as CreateOrUpdateScopeDTO;
      if(!data.name || data.name === ''){
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Exception service: Request error, name is required';
        defaultResponse.status = false;
        return reply.status(400).send(defaultResponse);
      }
      const createdData = await this.service.create(data); // Renamed variable
      defaultResponse.data = createdData;
      defaultResponse.message = 'Scope created successfully';
      return reply.status(201).send(defaultResponse); // Use 201 for created
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<ScopeDTO> = {
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const { id } = request.params as { id: number };
      const dataBody: CreateOrUpdateScopeDTO = request.body as CreateOrUpdateScopeDTO;
      if(id === 0) {
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Exception service: It is not allowed to send a zero id search';
        defaultResponse.status = false;
        return reply.status(400).send(defaultResponse);
      }
      if(!dataBody.name || dataBody.name === ''){
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Exception service: Request error, name is required';
        defaultResponse.status = false;
        return reply.status(400).send(defaultResponse);
      }
      const scopeById = await this.service.getById(id);
      if(!scopeById) {
        defaultResponse.code = '0x03';
        defaultResponse.message = 'Exception service: Scope not found';
        defaultResponse.status = false;
        return reply.status(404).send(defaultResponse);
      }
      defaultResponse.data = await this.service.update(id, dataBody);
      defaultResponse.message = 'Scope updated successfully';
      return reply.send(defaultResponse);
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<any> = { // Data can be null for delete
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const { id } = request.params as { id: number };
      if(id === 0) {
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Exception service: It is not allowed to send a zero id search';
        defaultResponse.status = false;
        return reply.status(400).send(defaultResponse);
      }
      const scopeById = await this.service.getById(id);
      if(!scopeById) {
        defaultResponse.code = '0x03';
        defaultResponse.message = 'Exception service: Scope not found';
        defaultResponse.status = false;
        return reply.status(404).send(defaultResponse);
      }
      await this.service.deleteOne(id);
      defaultResponse.message = 'The scope was successfully deleted';
      return reply.send(defaultResponse);
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }
}