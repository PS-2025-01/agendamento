import { App } from 'supertest/types';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthModule } from '../src/auth/auth.module';
import { options } from '../src/data-source';
import { CreateUserResponseDto } from '../src/usuario/dto/create-user-response.dto';
import { Usuario } from '../src/usuario/entities/usuario.entity';
import { TipoUsuario } from '../src/usuario/entities/tipoUsuario.enum';
import { LoginResponseDto } from '../src/auth/dto/login-response.dto';

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;
  let usuarioRepository: Repository<Usuario>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(options), AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    usuarioRepository = moduleFixture.get<Repository<Usuario>>(
      getRepositoryToken(Usuario),
    );
  });

  const makeSignup = async (body: Record<string, any>) => {
    return await request(app.getHttpServer()).post('/auth/signup').send(body);
  };

  const makeRegister = async (body: Record<string, any>, token?: string) => {
    const r = request(app.getHttpServer()).post('/auth/register');

    if (token) {
      r.set('Authorization', 'Bearer ' + token);
    }

    return await r.send(body);
  };

  const makeLogin = async (body: Record<string, any>) => {
    return await request(app.getHttpServer()).post('/auth/login').send(body);
  };

  beforeEach(async () => {
    await usuarioRepository.clear();
  });

  test('cadastro de paciente', async () => {
    const response = await makeSignup({
      nome: 'jackson',
      email: 'jackson@email.com',
      cpf: '12345678901',
      senha: '123456',
    });

    expect(response.status).toBe(201);

    const body = response.body as CreateUserResponseDto;

    expect(body.id).toBeDefined();
  });

  test('cadastro de usuario com campos em branco', async () => {
    const response = await makeSignup({
      nome: '',
      email: '',
      cpf: '',
      senha: '',
    });

    expect(response.status).toBe(400);
  });

  test('cadastro de medico', async () => {
    await usuarioRepository.save({
      nome: 'admin',
      email: 'admin@admin.com',
      cpf: '123456789099',
      senha: bcrypt.hashSync('123456', 10),
      tipoUsuario: TipoUsuario.ADMIN,
    });

    const login = await makeLogin({
      email: 'admin@admin.com',
      senha: '123456',
    });

    const response = await makeRegister(
      {
        nome: 'jackson',
        email: 'jackson@email.com',
        cpf: '12345678901',
        tipoUsuario: 'medico',
        senha: '123456',
      },
      (login.body as LoginResponseDto).access_token,
    );

    expect(response.status).toBe(201);

    const body = response.body as CreateUserResponseDto;

    expect(body.id).toBeDefined();
  });

  test('cadastro de medico sem autorização', async () => {
    await usuarioRepository.save({
      nome: 'admin',
      email: 'admin@admin.com',
      cpf: '123456789099',
      senha: bcrypt.hashSync('123456', 10),
      tipoUsuario: TipoUsuario.MEDICO,
    });

    const login = await makeLogin({
      email: 'admin@admin.com',
      senha: '123456',
    });

    const response = await makeRegister(
      {
        nome: 'jackson',
        email: 'jackson@email.com',
        cpf: '12345678901',
        tipoUsuario: 'medico',
        senha: '123456',
      },
      (login.body as LoginResponseDto).access_token,
    );

    expect(response.status).toBe(403);
  });

  test('cadastro de medico sem autenticação', async () => {
    const response = await makeRegister({
      nome: 'jackson',
      email: 'jackson@email.com',
      cpf: '12345678901',
      tipoUsuario: 'medico',
      senha: '123456',
    });

    expect(response.status).toBe(401);
  });
});
