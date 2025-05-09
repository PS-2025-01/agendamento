import { ApiProperty } from '@nestjs/swagger';
import { TipoUsuario } from '../entities/tipoUsuario.enum';
import { Usuario } from '../entities/usuario.entity';

export class CreateUserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  tipoUsuario: TipoUsuario;

  constructor(usuario: Usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.cpf = usuario.cpf;
    this.email = usuario.email;
    this.tipoUsuario = usuario.tipoUsuario;
  }
}
