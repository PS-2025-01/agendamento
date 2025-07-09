/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/role.decorator';
import { TipoUsuario } from '../../modules/usuarios/entities/tipoUsuario.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<TipoUsuario[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (required.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return required.includes(user.tipoUsuario);
  }
}
