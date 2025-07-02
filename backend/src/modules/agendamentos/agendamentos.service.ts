import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { TipoUsuario } from '../usuarios/entities/tipoUsuario.enum';
import { CreateAgendamentoDto } from './dtos/create-agendamento.dto';
import { AgendamentoStatus } from './entities/agendamentoStatus.enum';

@Injectable()
export class AgendamentosService {
  private logger = new Logger(AgendamentosService.name);

  constructor(
    @InjectRepository(Agendamento)
    private readonly agendamentoRepository: Repository<Agendamento>,
  ) {}

  async list(usuario: Usuario): Promise<Agendamento[]> {
    const options: FindManyOptions<Agendamento> = {
      loadRelationIds: { disableMixedMap: true },
    };

    switch (usuario.tipoUsuario) {
      case TipoUsuario.MEDICO:
        options.where = {
          medico: {
            usuario: {
              id: usuario.id,
            },
          },
        };
        break;
      case TipoUsuario.PACIENTE:
        options.where = {
          paciente: {
            id: usuario.id,
          },
        };
        break;
    }

    return await this.agendamentoRepository.find(options);
  }

  async listByMedicoId(medicoId: number, date: Date) {
    return await this.agendamentoRepository.find({
      where: {
        medico: {
          id: medicoId,
        },
        data: date,
      },
      loadRelationIds: { disableMixedMap: true },
    });
  }

  async create(
    request: CreateAgendamentoDto,
    usuario: Usuario,
  ): Promise<Agendamento> {
    request.data = request.data.split('T')[0];

    const exist = await this.agendamentoRepository
      .createQueryBuilder()
      .where(
        'horario = :horario and status <> :status and medicoId = :medicoId and data = :data',
        {
          horario: request.horario,
          status: AgendamentoStatus.CANCELADO,
          medicoId: request.medicoId,
          data: request.data,
        },
      )
      .getOne();

    if (exist) {
      throw new BadRequestException('Horario ocupado');
    }

    return await this.agendamentoRepository.save({
      data: request.data,
      horario: request.horario,
      medico: {
        id: request.medicoId,
      },
      paciente: usuario,
      status: AgendamentoStatus.AGENDADO,
    });
  }
}
