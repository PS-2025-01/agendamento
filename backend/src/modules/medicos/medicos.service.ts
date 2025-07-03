import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidade } from '../especialidades/entities/especialidade.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

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

  async findByUserId(userId: number) {
    const medico = await this.medicosRepository.findOne({
      where: { usuario: { id: userId } },
      relations: {
        especialidade: true,
        usuario: true,
      },
    });

    if (!medico) {
      throw new NotFoundException('medico nao encontrado');
    }

    return medico;
  }

  async findByMedicoId(medicoId: number) {
    const medico = await this.medicosRepository.findOneBy({
      id: medicoId,
    });

    if (!medico) {
      throw new NotFoundException('medico não encontrado');
    }

    return medico;
  }
}
