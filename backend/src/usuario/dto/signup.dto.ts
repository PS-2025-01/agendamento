import { IsNotEmpty } from 'class-validator';
import { TipoUsuario } from '../entities/tipoUsuario.enum';

export class SignupDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  tipoUsuario: TipoUsuario;

  @IsNotEmpty()
  senha: string;
}
