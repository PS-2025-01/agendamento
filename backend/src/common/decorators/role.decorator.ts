import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from '../../modules/usuarios/entities/tipoUsuario.enum';

export const ROLE_KEY = 'role';

export function Role(...roles: TipoUsuario[]) {
  return SetMetadata(ROLE_KEY, roles);
}
