import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, senha: string): Promise<unknown> {
    const usuario = await this.getUsuario(email);

    if (!this.usuarioService.validate(usuario, senha)) {
      throw new UnauthorizedException('credenciais invalidas');
    }

    const token = this.jwtService.sign({
      id: usuario.id,
      role: usuario.tipoUsuario,
    });

    return token;
  }

  private async getUsuario(email: string) {
    try {
      return await this.usuarioService.findByEmail(email);
    } catch {
      throw new UnauthorizedException('credenciais invalidas');
    }
  }
}
