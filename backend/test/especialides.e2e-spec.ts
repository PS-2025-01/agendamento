import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { Especialidade } from '../src/especialidades/entities/especialidade.entity';
import { EspecialidadesModule } from '../src/especialidades/especialidades.module';
import { options } from '../src/data-source';

describe('Especialidades (e2e)', () => {
  let app: INestApplication<App>;
  let especialidadeRepository: Repository<Especialidade>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(options), EspecialidadesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    especialidadeRepository = moduleFixture.get<Repository<Especialidade>>(
      getRepositoryToken(Especialidade),
    );
  });

  beforeEach(async () => {
    await especialidadeRepository.clear();
  });

  test('criando especialidade', async () => {
    const expected = {
      nome: 'especialidade xpto',
    };

    const response = await request(app.getHttpServer())
      .post('/especialidades')
      .send(expected);

    expect(response.status).toBe(201);

    const body = response.body as Especialidade;

    expect(body.id).toBeDefined();
    expect(body.nome).toBe(expected.nome);
  });
});
