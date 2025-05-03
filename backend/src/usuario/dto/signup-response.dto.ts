import { TipoUsuario } from '../entities/tipoUsuario.enum';
import { Usuario } from '../entities/usuario.entity';

export class SignupResponseDto {
  id: number;

  nome: string;

  cpf: string;

  email: string;

  tipoUsuario: TipoUsuario;

  constructor(usuario: Usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.cpf = usuario.cpf;
    this.email = usuario.email;
    this.tipoUsuario = usuario.tipoUsuario;
  }
}
