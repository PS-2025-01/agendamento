import { IsEnum, IsNotEmpty } from 'class-validator';
import { TipoUsuario } from '../entities/tipoUsuario.enum';
import { CreateUserDto } from './create-user.dto';

export class AdminCreateUserDto extends CreateUserDto {
  @IsEnum(TipoUsuario)
  @IsNotEmpty()
  tipoUsuario: TipoUsuario;
}
