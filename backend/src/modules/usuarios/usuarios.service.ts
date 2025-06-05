import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
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

  validate(usuario: Usuario, senha: string): boolean {
    return bcrypt.compareSync(senha, usuario.senha);
  }

  async findById(userId: number) {
    return await this.usuarioRepository.findOneBy({ id: userId });
  }
}
