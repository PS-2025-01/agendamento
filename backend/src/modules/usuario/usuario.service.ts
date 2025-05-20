import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { TipoUsuario } from './entities/tipoUsuario.enum';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const usuario = this.usuarioRepository.create({
      nome: createUserDto.nome,
      cpf: createUserDto.cpf,
      email: createUserDto.email,
      senha: createUserDto.senha,
      tipoUsuario: TipoUsuario.PACIENTE,
    });

    return await this.create(usuario);
  }

  async register(createUserDto: AdminCreateUserDto) {
    const usuario = this.usuarioRepository.create(createUserDto);
    return await this.create(usuario);
  }

  async create(usuario: Usuario): Promise<Usuario> {
    await this.verifyUser(usuario.email, usuario.cpf);

    usuario.senha = bcrypt.hashSync(usuario.senha, 10);

    return await this.usuarioRepository.save(usuario);
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
