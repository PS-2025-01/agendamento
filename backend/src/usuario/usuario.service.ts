import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(request: SignupDto): Promise<Usuario> {
    await this.verifyUser(request.email, request.cpf);

    const senha = bcrypt.hashSync(request.senha, 10);

    return await this.usuarioRepository.save({
      nome: request.nome,
      cpf: request.cpf,
      email: request.email,
      senha: senha,
      tipoUsuario: request.tipoUsuario,
    });
  }

  private async verifyUser(email: string, cpf: string) {
    const exist = await this.usuarioRepository.findOneBy([{ email }, { cpf }]);

    if (exist) {
      let message = 'cpf já cadastrado';

      if (exist.email == email) {
        message = 'email já cadastrado';
      }

      throw new BadRequestException(message);
    }
  }

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
}
