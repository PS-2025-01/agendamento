import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidade } from '../especialidades/entities/especialidade.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico) private medicosRepository: Repository<Medico>,
  ) {}

  async create(usuario: Usuario, especialidade: Especialidade) {
    const medico = this.medicosRepository.create({
      id: usuario.id,
      especialidade,
    });
    return await this.medicosRepository.save(medico);
  }
}
