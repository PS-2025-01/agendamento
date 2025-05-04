import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { CreateUserDto } from '../usuario/dto/create-user.dto';
import { CreateUserResponseDto } from '../usuario/dto/create-user-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { AdminCreateUserDto } from '../usuario/dto/admin-create-user.dto';
import { Role } from '../common/decorrators/role.decorator';
import { TipoUsuario } from '../usuario/entities/tipoUsuario.enum';
import { RoleGuard } from '../common/guards/role.guard';

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
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const usuario = await this.usuarioService.signup(createUserDto);
    return new CreateUserResponseDto(usuario);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(TipoUsuario.ADMIN)
  @Post('register')
  async register(
    @Body() adminCreateUser: AdminCreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const usuario = await this.usuarioService.register(adminCreateUser);
    return new CreateUserResponseDto(usuario);
  }
}
