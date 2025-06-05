import { DataSource } from 'typeorm';
import { Seeder } from '../seeder';
import { Especialidade } from '../../../modules/especialidades/entities/especialidade.entity';

export default class EspecialidadeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const especialidades = [
      { nome: 'cardiologista' },
      { nome: 'neurologista' },
      { nome: 'dermatologista' },
    ];

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Especialidade)
      .values(especialidades)
      .orIgnore()
      .execute();
  }
}
