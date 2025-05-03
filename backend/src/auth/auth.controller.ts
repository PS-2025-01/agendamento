import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { SignupDto } from '../usuario/dto/signup.dto';
import { SignupResponseDto } from '../usuario/dto/signup-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authSerivce: AuthService,
    private usuarioService: UsuarioService,
  ) {}

  @Post('login')
  async login(@Body() request: LoginDto): Promise<LoginResponseDto> {
    const token = await this.authSerivce.validate(request.email, request.senha);
    return { access_token: token };
  }

  @Post('signup')
  async register(@Body() request: SignupDto): Promise<SignupResponseDto> {
    const usuario = await this.usuarioService.create(request);
    return new SignupResponseDto(usuario);
  }
}
