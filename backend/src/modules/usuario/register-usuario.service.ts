import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { TipoUsuario } from './entities/tipoUsuario.enum';
import { MedicosService } from '../medicos/medicos.service';
import { EspecialidadesService } from '../especialidades/especialidades.service';
import { Especialidade } from '../especialidades/entities/especialidade.entity';

@Injectable()
export class RegisterUsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private medicosService: MedicosService,
    private especialidadesService: EspecialidadesService,
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

    if (createUserDto.tipoUsuario === TipoUsuario.MEDICO) {
      await this.handleMedico(usuario, createUserDto);
    } else {
      await this.create(usuario);
    }

    return usuario;
  }

  private async handleMedico(
    usuario: Usuario,
    createUserDto: AdminCreateUserDto,
  ) {
    if (!createUserDto.especialidade) {
      throw new BadRequestException('especialidade nao informada');
    }

    let especialidade: Especialidade;

    if (typeof createUserDto.especialidade == 'number') {
      especialidade = await this.especialidadesService.findById(
        createUserDto.especialidade,
      );
    } else {
      especialidade = await this.especialidadesService.findOrCreate(
        createUserDto.especialidade,
      );
    }

    await this.create(usuario);

    await this.medicosService.create(usuario, especialidade);
  }

  private async create(usuario: Usuario): Promise<Usuario> {
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
}
