import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>
  ) {}

  async list(usuario: Usuario): Promise<Agendamento[]> {
    const options: FindManyOptions<Agendamento> = {
      relations: {
        paciente: true,
        medico: {
          especialidade: true,
          usuario: true
        },
      },
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

    const agendamentos = await this.agendamentoRepository.find(options);

    for (const agendamento of agendamentos) {
      agendamento.medico.usuario = await this.usuarioRepository.findOneOrFail({
        where :{
          medico: {
            id: agendamento.medico.id
          }
        },
        withDeleted: true
      })
    }

    return agendamentos;
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

  async findById(agendamentoId: number) {
    const agendamento = await this.agendamentoRepository.findOneBy({
      id: agendamentoId,
    });

    if (agendamento === null) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    return agendamento;
  }

  async done(agendamentoId: number) {
    const agendamento = await this.findById(agendamentoId);
    return this.updateStatus(agendamento, AgendamentoStatus.CONCLUIDO);
  }

  async cancel(agendamentoId: number) {
    const agendamento = await this.findById(agendamentoId);
    return this.updateStatus(agendamento, AgendamentoStatus.CANCELADO);
  }

  private async updateStatus(
    agendamento: Agendamento,
    status: AgendamentoStatus,
  ) {
    this.logger.log(
      `Atualizando o status do agendamento: ${agendamento.id} de: ${agendamento.status} para: ${status}`,
    );

    if (agendamento.status === AgendamentoStatus.CANCELADO) {
      this.logger.log('Agendamento já está cancelado');
      throw new BadRequestException('Agendamento cancelado');
    }

    agendamento.status = status;
    return await this.agendamentoRepository.save(agendamento);
  }

  async delete(agendamentoId: number) {
    const agendamento =await this.findById(agendamentoId);

    await this.agendamentoRepository.softDelete({
      id: agendamentoId
    });

    return agendamento;
  }
}
