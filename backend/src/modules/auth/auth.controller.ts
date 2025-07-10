import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { CreateUserDto } from '../usuarios/dto/create-user.dto';
import { CreateUserResponseDto } from '../usuarios/dto/create-user-response.dto';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { AdminCreateUserDto } from '../usuarios/dto/admin-create-user.dto';
import { TipoUsuario } from '../usuarios/entities/tipoUsuario.enum';
import { RoleGuard } from '../../common/guards/role.guard';
import { RegisterUsuariosService } from '../usuarios/register-usuarios.service';
import { UserResponseDto } from '../usuarios/dto/user-response.dto';
import { Role } from '../../common/decorators/role.decorator';
import { User } from '../../common/decorators/user.decorator';
import { UsuariosService } from '../usuarios/usuarios.service';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    private authSerivce: AuthService,
    private registerUsuarioService: RegisterUsuariosService,
    private usuarioService: UsuariosService,
  ) {}

  @ApiOperation({ summary: 'Login do usuário' })
  @ApiOkResponse({
    type: LoginResponseDto,
    description: 'Autenticação do usuário',
  })
  @Post('login')
  async login(@Body() request: LoginDto): Promise<LoginResponseDto> {
    return await this.authSerivce.validate(request.email, request.senha);
  }

  @ApiOperation({ summary: 'Cadastro de paciente' })
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
    description: 'Cadastro de paciente',
  })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const usuario = await this.registerUsuarioService.signup(createUserDto);
    return new CreateUserResponseDto(usuario);
  }

  @ApiOperation({
    summary: 'Cadastro de médico ou admin (autenticado como ADMIN)',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
    description: 'Cadastro de ADMIN e MEDICO, requer autorização de ADMIN',
  })
  @Role(TipoUsuario.ADMIN)
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() adminCreateUser: AdminCreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const usuario = await this.registerUsuarioService.register(adminCreateUser);
    return new CreateUserResponseDto(usuario);
  }

  @ApiOperation({ summary: 'Obter dados do usuário atual (JWT)' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get('current')
  async current(@User() userId: string) {
    const user = await this.authSerivce.getUserById(Number(userId));
    return new UserResponseDto(user);
  }

  @ApiNoContentResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string, @User() userId: string) {
    await this.usuarioService.delete(Number(id), Number(userId));
  }
}
