import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ email });

    if (usuario == null) {
      throw new Error('usuario não encontrado');
    }

    return usuario;
  }
}
