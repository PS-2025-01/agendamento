import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, senha: string): Promise<LoginResponseDto> {
    const usuario = await this.getUsuario(email);

    if (!this.usuarioService.validate(usuario, senha)) {
      throw new UnauthorizedException('credenciais invalidas');
    }

    const token = this.jwtService.sign({
      id: usuario.id,
      tipoUsuario: usuario.tipoUsuario,
    });

    return {
      access_token: token,
      acesso: usuario.tipoUsuario,
    };
  }

  private async getUsuario(email: string) {
    try {
      return await this.usuarioService.findByEmail(email);
    } catch {
      throw new UnauthorizedException('credenciais invalidas');
    }
  }

  async getUserById(userId: number) {
    const user = await this.usuarioService.findById(userId);

    if (!user) {
      throw new InternalServerErrorException();
    }

    return user;
  }
}
