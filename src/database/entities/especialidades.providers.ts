import { Especialidade } from 'src/especialidades/entities/especialidade.entity';
import { DataSource } from 'typeorm';

export const especialidadesProviders = [
  {
    provide: 'ESPECIALIDADE_REPOSITORY',
    inject: ['DATA_SOURCE'],
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(Especialidade);
    },
  },
];
