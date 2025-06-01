import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { CreateGradeDto } from './dtos/create-grade.dto';
import { MedicosService } from '../medicos/medicos.service';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade) private gradeRepository: Repository<Grade>,
    private medicoService: MedicosService,
  ) {}

  async create(body: CreateGradeDto, userId: number) {
    const medico = await this.medicoService.findByUserId(userId);

    return await this.gradeRepository.save({
      dia: body.dia,
      inicio: body.inicio,
      fim: body.fim,
      intervalo: body.intervalo,
      medico: medico
    })
  }

  async available(medicoId: number, date: Date) {
    const grade = await this.gradeRepository.findOneBy({
      medico: { id: medicoId },
      dia: date.getDay(),
    });

    if (!grade) return [];

    const horarios = this.generate(grade.inicio, grade.fim, grade.intervalo);

    return horarios;
  }

  private generate(begin: string, end: string, interval: number) {
    const parse = (time: string) => new Date(`1970-01-01T${time}`);

    const current = parse(begin);
    const last = parse(end);
    const result: string[] = [];

    while (current < last) {
      result.push(current.toTimeString().slice(0, 5));
      current.setMinutes(current.getMinutes() + interval);
    }

    return result;
  }
}
