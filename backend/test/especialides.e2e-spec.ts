import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { Especialidade } from '../src/modules/especialidades/entities/especialidade.entity';
import { EspecialidadesModule } from '../src/modules/especialidades/especialidades.module';
import { options } from '../src/database/data-source';
import { JwtAuthGuard } from '../src/common/guards/jwt.guard';

describe('Especialidades (e2e)', () => {
  let app: INestApplication<App>;
  let especialidadeRepository: Repository<Especialidade>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(options), EspecialidadesModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    especialidadeRepository = moduleFixture.get<Repository<Especialidade>>(
      getRepositoryToken(Especialidade),
    );
  });

  const makePost = async (name: string) => {
    return await request(app.getHttpServer())
      .post('/especialidades')
      .send({ nome: name });
  };

  test('criando especialidade', async () => {
    const expected = 'especialidade xpto_' + Date.now();

    const response = await makePost(expected);

    expect(response.status).toBe(201);

    const body = response.body as Especialidade;

    expect(body.id).toBeDefined();
    expect(body.nome).toBe(expected);
  });

  test('criando especialidade com nome em branco', async () => {
    const response = await makePost('');
    const specialty = await especialidadeRepository.findOneBy({ nome: '' });

    expect(response.status).toBe(400);
    expect(specialty).toBeNull();
  });

  test('criando especialidade duplicada', async () => {
    const name = 'especialidade xpto_' + Date.now();

    const ok = await makePost(name);
    const bad = await makePost(name);

    const specialties = await especialidadeRepository.findBy({ nome: name });

    expect(ok.status).toBe(201);
    expect(bad.status).toBe(400);
    expect(specialties.length).toBe(1);
  });
});
