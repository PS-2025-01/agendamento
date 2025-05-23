import { App } from 'supertest/types';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthModule } from '../src/modules/auth/auth.module';
import { options } from '../src/data-source';
import { CreateUserResponseDto } from '../src/modules/usuario/dto/create-user-response.dto';
import { Usuario } from '../src/modules/usuario/entities/usuario.entity';
import { TipoUsuario } from '../src/modules/usuario/entities/tipoUsuario.enum';
import { LoginResponseDto } from '../src/modules/auth/dto/login-response.dto';
import { Medico } from '../src/modules/medicos/entities/medico.entity';
import { Especialidade } from '../src/modules/especialidades/entities/especialidade.entity';

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;
  let usuarioRepository: Repository<Usuario>;
  let medicosRepository: Repository<Medico>;
  let especialidadeRepository: Repository<Especialidade>;

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

    medicosRepository = moduleFixture.get<Repository<Medico>>(getRepositoryToken(Medico));
    
    especialidadeRepository = moduleFixture.get<Repository<Especialidade>>(getRepositoryToken(Especialidade));
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
    await medicosRepository.clear();
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

  test('cadastro de medico sem especialidade', async () => {
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
        especialidade: 'cardiologista'
      },
      (login.body as LoginResponseDto).access_token,
    );

    expect(response.status).toBe(201);

    const body = response.body as CreateUserResponseDto;

    expect(body.id).toBeDefined();
  });


  test('cadastro de medico passando id da especialidade', async () => {
    const especialdiade = await especialidadeRepository.save({nome : 'teste_' + Date.now() });

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
        especialidade: especialdiade.id
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
