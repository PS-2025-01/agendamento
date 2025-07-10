import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { CreateGradeDto } from './dtos/create-grade.dto';
import { MedicosService } from '../medicos/medicos.service';
import { AgendamentosService } from '../agendamentos/agendamentos.service';
import { Agendamento } from '../agendamentos/entities/agendamento.entity';
import { AgendamentoStatus } from '../agendamentos/entities/agendamentoStatus.enum';

@Injectable()
export class GradesService {
  private logger = new Logger(GradesService.name);

  constructor(
    @InjectRepository(Grade) private gradeRepository: Repository<Grade>,
    private medicoService: MedicosService,
    private agendamentoService: AgendamentosService,
  ) {}

  async create(body: CreateGradeDto, userId: number) {
    const medico = await this.medicoService.findByUserId(userId);

    const exist = await this.gradeRepository.findOneBy({
      dia: body.dia,
      medico,
    });

    this.logger.debug(exist);

    if (exist) {
      throw new BadRequestException('Já existe grade cadastrada neste dia');
    }

    return await this.gradeRepository.save({
      dia: body.dia,
      inicio: body.inicio,
      fim: body.fim,
      intervalo: body.intervalo,
      medico: medico,
    });
  }

  async available(medicoId: number, date: Date) {
    this.logger.debug(date.getDay());
    const grade = await this.gradeRepository.findOneBy({
      medico: { id: medicoId },
      dia: date.getDay(),
    });

    this.logger.debug(grade);

    if (!grade) return [];

    const agendamentos = await this.agendamentoService.listByMedicoId(
      medicoId,
      date,
    );

    const horarios = this.generate(
      grade.inicio,
      grade.fim,
      grade.intervalo,
      agendamentos,
    );

    return horarios;
  }

  private generate(
    begin: string,
    end: string,
    interval: number,
    agendamentos: Agendamento[],
  ) {
    const horariosAgendados = agendamentos.filter(
      (agendamentos) => agendamentos.status != AgendamentoStatus.CANCELADO,
    );

    const parse = (time: string) => new Date(`1970-01-01T${time}`);

    const current = parse(begin);
    const last = parse(end);
    const result: string[] = [];

    while (current < last) {
      if (this.verificarHorario(horariosAgendados, current, interval)) {
        result.push(current.toTimeString().slice(0, 5));
      }

      current.setMinutes(current.getMinutes() + interval);
    }

    return result;
  }

  private verificarHorario(
    agendamentos: Agendamento[],
    horario: Date,
    intervalo: number,
  ) {
    const inicio = horario.getHours() + horario.getMinutes() / 60;
    const fim = inicio + intervalo / 60;

    for (const agendamento of agendamentos) {
      if (
        (inicio <= agendamento.getInicio() && fim > agendamento.getInicio()) ||
        (inicio < agendamento.getFim() && fim > agendamento.getFim())
      ) {
        return false;
      }
    }

    return true;
  }

  async listByMedicoId(medicoId: number) {
    await this.medicoService.findByMedicoId(medicoId);

    return await this.gradeRepository.find({
      where: {
        medico: {
          id: medicoId,
        },
      },
      loadRelationIds: { disableMixedMap: true },
    });
  }

  async update(gradeId: number, request: CreateGradeDto) {
    const grade = await this.gradeRepository.findOne({
      where: { id: gradeId },
      relations: {
        medico: true,
      },
    });

    if (grade === null) {
      throw new NotFoundException('grade não encontrada');
    }

    if (grade.dia != request.dia) {
      const exist = await this.gradeRepository.findOneBy({
        dia: request.dia,
        medico: grade.medico,
      });

      if (exist) {
        throw new BadRequestException('Já existe grade cadastrada neste dia');
      }
    }

    grade.dia = request.dia;
    grade.fim = request.fim;
    grade.inicio = request.inicio;
    grade.intervalo = request.intervalo;

    return await this.gradeRepository.save(grade);
  }

  async delete(gradeId: number) {
    await this.gradeRepository.delete({ id: gradeId });
  }
}
