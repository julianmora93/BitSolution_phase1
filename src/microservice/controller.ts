import { FastifyRequest, FastifyReply } from 'fastify';
import { DefaultResponseDTO } from '../shared/dto/default.response.dto';
import { MicroserviceDTO, CreateOrUpdateMicroserviceDTO } from '../shared/dto/microservice.dto';
import { MicroserviceService } from './service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class MicroserviceController {

  constructor(
    @inject(MicroserviceService) private service: MicroserviceService
  ) { }
  
  async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<MicroserviceDTO> = {
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const data: MicroserviceDTO[]  = await this.service.getAll();
      if(!data) {
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Unregistered Microservices';
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
    const defaultResponse: DefaultResponseDTO<MicroserviceDTO> = {
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
        defaultResponse.message = 'Exception service: Microservice not found';
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
    const defaultResponse: DefaultResponseDTO<MicroserviceDTO> = {
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const data: CreateOrUpdateMicroserviceDTO = request.body as CreateOrUpdateMicroserviceDTO;
      if(!data.name || data.name === '' || !data.description || data.description === ''){
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Exception service: Request error';
        defaultResponse.status = false;
        return reply.status(400).send(defaultResponse);
      }
      defaultResponse.data = await this.service.create(data);
      return reply.send(defaultResponse);
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<MicroserviceDTO> = {
      code: '0x00',
      data: null,
      message: 'Ok',
      status: true
    };
    try {
      const { id } = request.params as { id: number };
      const dataBody: CreateOrUpdateMicroserviceDTO = request.body;
      if(id === 0) {
        defaultResponse.code = '0x02';
        defaultResponse.message = 'Exception service: It is not allowed to send a zero id search';
        defaultResponse.status = false;
        return reply.status(400).send(defaultResponse);
      }
      const serviceById = await this.service.getById(id);
      if(!serviceById) {
        defaultResponse.code = '0x03';
        defaultResponse.message = 'Exception service: Microservice not found';
        defaultResponse.status = false;
        return reply.status(404).send(defaultResponse);
      }
      defaultResponse.data = await this.service.update(id, dataBody);
      return reply.send(defaultResponse);
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply): Promise<never> {
    const defaultResponse: DefaultResponseDTO<MicroserviceDTO> = {
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
      const serviceById = await this.service.getById(id);
      if(!serviceById) {
        defaultResponse.code = '0x03';
        defaultResponse.message = 'Exception service: Microservice not found';
        defaultResponse.status = false;
        return reply.status(404).send(defaultResponse);
      }
      await this.service.deleteOne(id);
      defaultResponse.message = 'The service was successfully deleted';
      return reply.send(defaultResponse);
    } catch(ex: any) {
      defaultResponse.code = '0x01';
      defaultResponse.message = `Exception service: ${ex.message}`;
      defaultResponse.status = false;
      return reply.status(500).send(defaultResponse);
    }
  }

}