import { dataSource } from '../data-source';
import EspecialidadeSeeder from './seeder/especialidade.seeder';
import UsuarioSeeder from './seeder/usuario.seeder';

async function run() {
  await dataSource.initialize();

  const especialidades = new EspecialidadeSeeder();
  const usuarios = new UsuarioSeeder();

  await especialidades.run(dataSource);
  await usuarios.run(dataSource);

  await dataSource.destroy();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
