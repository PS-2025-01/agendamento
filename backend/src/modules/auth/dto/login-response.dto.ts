import { ApiProperty } from '@nestjs/swagger';
import { TipoUsuario } from 'src/modules/usuarios/entities/tipoUsuario.enum';

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  acesso: TipoUsuario;
}
