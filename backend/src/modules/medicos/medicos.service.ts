import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
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
      especialidade,
      usuario,
    });
    return await this.medicosRepository.save(medico);
  }

  async list(nome?: string, especialidade?: string) {
    const where: FindOptionsWhere<Medico> = {};

    if (nome) {
      where.usuario = {
        nome: Like(`%${nome}%`),
      };
    }

    if (especialidade) {
      where.especialidade = {
        nome: Like(`%${especialidade}%`),
      };
    }

    return await this.medicosRepository.find({
      where,
      relations: {
        usuario: true,
        especialidade: true,
      },
    });
  }
}
