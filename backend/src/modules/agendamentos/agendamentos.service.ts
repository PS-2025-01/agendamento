import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { FindManyOptions, IsNull, Not, Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { TipoUsuario } from '../usuarios/entities/tipoUsuario.enum';
import { CreateAgendamentoDto } from './dtos/create-agendamento.dto';
import { AgendamentoStatus } from './entities/agendamentoStatus.enum';
import { Grade } from '../grades/entities/grade.entity';

@Injectable()
export class AgendamentosService {
  private logger = new Logger(AgendamentosService.name);

  constructor(
    @InjectRepository(Agendamento)
    private readonly agendamentoRepository: Repository<Agendamento>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  async list(usuario: Usuario): Promise<Agendamento[]> {
    const options: FindManyOptions<Agendamento> = {
      relations: {
        paciente: true,
        medico: {
          especialidade: true,
          usuario: true,
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
    const date = new Date(`${request.data}T00:00:00`);

    const grade = await this.gradeRepository.findOneBy({
      medico: { id: request.medicoId },
      dia: date.getDay(),
    });

    if (grade === null) {
      throw new BadRequestException('medico nao possui grade');
    }

    const agendamento = this.agendamentoRepository.create({
      data: date,
      horario: request.horario,
      medico: {
        id: request.medicoId,
      },
      paciente: usuario,
      status: AgendamentoStatus.AGENDADO,
      duracao: grade.intervalo,
    });

    await this.validarHorario(agendamento, request.medicoId, request.data);

    return this.agendamentoRepository.save(agendamento);
  }

  private async validarHorario(
    novoAgendamento: Agendamento,
    medicoId: number,
    data: string,
  ) {
    const agendamentos = await this.agendamentoRepository
      .createQueryBuilder()
      .where('status <> :status and medicoId = :medicoId and data = :data', {
        status: AgendamentoStatus.CANCELADO,
        medicoId: medicoId,
        data: data,
      })
      .getMany();

    const inicio = novoAgendamento.getInicio();
    const fim = novoAgendamento.getFim();

    for (const agendamento of agendamentos) {
      if (
        (inicio <= agendamento.getInicio() && fim > agendamento.getInicio()) ||
        (inicio < agendamento.getFim() && fim > agendamento.getFim())
      ) {
        throw new BadRequestException('horario ocupado');
      }
    }
  }

  async findById(agendamentoId: number) {
    const agendamento = await this.agendamentoRepository
      .createQueryBuilder('agendamento')
      .withDeleted()
      .leftJoinAndSelect('agendamento.paciente', 'paciente', '1=1')
      .withDeleted()
      .where('agendamento.id = :id', {id: agendamentoId })
      .getOne();

    if (agendamento === null) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    return agendamento;
  }

  async done(agendamentoId: number) {
    const agendamento = await this.findById(agendamentoId);
    return await this.updateStatus(agendamento, AgendamentoStatus.CONCLUIDO);
  }

  async cancel(agendamentoId: number) {
    const agendamento = await this.findById(agendamentoId);
    return await this.updateStatus(agendamento, AgendamentoStatus.CANCELADO);
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
    const agendamento = await this.findById(agendamentoId);

    await this.agendamentoRepository.softDelete({
      id: agendamentoId,
    });

    return agendamento;
  }
}
