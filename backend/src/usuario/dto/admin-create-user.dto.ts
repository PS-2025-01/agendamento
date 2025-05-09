import { IsEnum, IsNotEmpty } from 'class-validator';
import { TipoUsuario } from '../entities/tipoUsuario.enum';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AdminCreateUserDto extends CreateUserDto {
  @ApiProperty({ enum: TipoUsuario })
  @IsEnum(TipoUsuario)
  @IsNotEmpty()
  tipoUsuario: TipoUsuario;
}
