import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidade } from './entities/especialidade.entity';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidade)
    private especialidadeRepository: Repository<Especialidade>,
  ) {}

  async create(nome: string): Promise<Especialidade> {
    const existente = await this.especialidadeRepository.findOne({
      where: { nome },
    });

    if (existente) {
      throw new BadRequestException({
        mensagem: 'Especialidade já cadastrada.',
      });
    }

    const especialidade = this.especialidadeRepository.create({ nome });
    return this.especialidadeRepository.save(especialidade);
  }

  async findAll(): Promise<Especialidade[]> {
    return this.especialidadeRepository.find();
  }
}
