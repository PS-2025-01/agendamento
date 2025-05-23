import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TipoUsuario } from '../entities/tipoUsuario.enum';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AdminCreateUserDto extends CreateUserDto {
  @ApiProperty({ enum: TipoUsuario, example: TipoUsuario.MEDICO })
  @IsEnum(TipoUsuario)
  @IsNotEmpty()
  tipoUsuario: TipoUsuario;

  @ApiProperty({ examples: [1, 'cardilogista']})
  @IsOptional()
  especialidade: string | number;
}
