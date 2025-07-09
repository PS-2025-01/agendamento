import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { TipoUsuario } from './entities/tipoUsuario.enum';

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

  async findById(userId: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOneBy({ id: userId });

    if (user === null) {
      throw new NotFoundException('Usuario não encontrado');
    }

    return user;
  }

  async delete(userId: number, authenticateUserId: number): Promise<void> {
    const user = await this.findById(authenticateUserId);

    if (user.id != userId && user.tipoUsuario != TipoUsuario.ADMIN) {
      throw new BadRequestException('Apenas os admins podem remover outros usuarios');
    }

    await this.usuarioRepository.softDelete({
      id: userId
    });
  }
}
