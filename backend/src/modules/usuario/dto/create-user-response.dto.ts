import { ApiProperty } from '@nestjs/swagger';
import { TipoUsuario } from '../entities/tipoUsuario.enum';
import { Usuario } from '../entities/usuario.entity';

export class CreateUserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'teste' })
  nome: string;

  @ApiProperty({ example: '12345678901' })
  cpf: string;

  @ApiProperty({ example: 'teste@teste.com' })
  email: string;

  @ApiProperty({
    examples: [TipoUsuario.ADMIN, TipoUsuario.MEDICO, TipoUsuario.PACIENTE],
  })
  tipoUsuario: TipoUsuario;

  constructor(usuario: Usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.cpf = usuario.cpf;
    this.email = usuario.email;
    this.tipoUsuario = usuario.tipoUsuario;
  }
}
