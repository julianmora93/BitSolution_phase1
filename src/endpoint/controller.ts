import { FastifyRequest, FastifyReply } from 'fastify';
import { DefaultResponseDTO } from '../shared/dto/default.response.dto';
import { EndpointDTO, CreateEndpointDTO, UpdateEndpointDTO } from '../shared/dto/endpoint.dto';
import { EndpointService } from './service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class EndpointController {

  constructor(
    @inject(EndpointService) private service: EndpointService
  ) { }
  
  async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<EndpointDTO> = {
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const data: EndpointDTO[]  = await this.service.getAll();
      if(!data || data.length === 0) {
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Unregistered Endpoints';
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
    const defaultResponse: DefaultResponseDTO<EndpointDTO> = {
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
        defaultResponse.message = 'Exception service: Endpoint not found';
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
    const defaultResponse: DefaultResponseDTO<EndpointDTO> = {
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const data: CreateEndpointDTO = request.body as CreateEndpointDTO;
      if(!data.path || !data.name || !data.method || !data.microserviceId) {
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Exception service: Request error, required fields missing (path, name, method, microserviceId)';
        defaultResponse.status = false;
        return reply.status(400).send(defaultResponse);
      }
      const createdData = await this.service.create(data);
      defaultResponse.data = createdData;
      defaultResponse.message = 'Endpoint created successfully';
      return reply.status(201).send(defaultResponse);
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<EndpointDTO> = {
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const { id } = request.params as { id: number };
      const dataBody: UpdateEndpointDTO = request.body as UpdateEndpointDTO;
      if(id === 0) {
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Exception service: It is not allowed to send a zero id search';
        defaultResponse.status = false;
        return reply.status(400).send(defaultResponse);
      }
      const endpointById = await this.service.getById(id);
      if(!endpointById) {
        defaultResponse.code = '0x03';
        defaultResponse.message = 'Exception service: Endpoint not found';
        defaultResponse.status = false;
        return reply.status(404).send(defaultResponse);
      }
      defaultResponse.data = await this.service.update(id, dataBody);
      defaultResponse.message = 'Endpoint updated successfully';
      return reply.send(defaultResponse);
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<any> = {
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
      const endpointById = await this.service.getById(id);
      if(!endpointById) {
        defaultResponse.code = '0x03';
        defaultResponse.message = 'Exception service: Endpoint not found';
        defaultResponse.status = false;
        return reply.status(404).send(defaultResponse);
      }
      await this.service.deleteOne(id);
      defaultResponse.message = 'The endpoint was successfully deleted';
      return reply.send(defaultResponse);
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }
}