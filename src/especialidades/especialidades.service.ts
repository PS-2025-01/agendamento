import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { Especialidade } from './entities/especialidade.entity';

@Injectable()
export class EspecialidadesService {
  constructor(
    @Inject('ESPECIALIDADE_REPOSITORY')
    private especialidadeRepository: Repository<Especialidade>,
  ) {}

  async create(
    createEspecialidade: CreateEspecialidadeDto,
  ): Promise<Especialidade> {
    const especialidade = new Especialidade();
    especialidade.nome = createEspecialidade.nome;

    await this.especialidadeRepository.save(especialidade);
    return especialidade;
  }

  async findAll(): Promise<Especialidade[]> {
    return await this.especialidadeRepository.find();
  }
}
