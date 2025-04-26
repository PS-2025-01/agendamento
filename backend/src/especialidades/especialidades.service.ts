import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidade } from './especialidade.entity';

@Injectable()
export class EspecialidadeService {
  constructor(
    @InjectRepository(Especialidade)
    private especialidadeRepository: Repository<Especialidade>,
  ) {}

  async criar(nome: string): Promise<Especialidade> {
    const existente = await this.especialidadeRepository.findOne({ where: { nome } });

    if (existente) {
      throw new BadRequestException({ mensagem: 'Especialidade já cadastrada.' });
    }

    const especialidade = this.especialidadeRepository.create({ nome });
    return this.especialidadeRepository.save(especialidade);
  }
}
