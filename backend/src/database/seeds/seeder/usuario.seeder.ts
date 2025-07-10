import { Faker, pt_BR } from '@faker-js/faker';
import { Seeder } from '../seeder';
import * as brcrypt from 'bcrypt';
import { DataSource, DeepPartial } from 'typeorm';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { TipoUsuario } from 'src/modules/usuarios/entities/tipoUsuario.enum';
import { Medico } from 'src/modules/medicos/entities/medico.entity';
import { Especialidade } from 'src/modules/especialidades/entities/especialidade.entity';

export default class UsuarioSeeder implements Seeder {
  private readonly faker: Faker;

  constructor() {
    this.faker = new Faker({
      locale: [pt_BR],
    });
  }

  async run(dataSource: DataSource): Promise<void> {
    const admin = this.createRandomUser(TipoUsuario.ADMIN);
    console.log('admin: ' + admin.email);

    const users = [admin];

    for (let i = 0; i < 20; i++) {
      const tipoUsuario = i > 5 ? TipoUsuario.MEDICO : TipoUsuario.PACIENTE;
      const user = this.createRandomUser(tipoUsuario);

      console.log(`${tipoUsuario}:  ${user.email}`);

      users.push(user);
    }

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Usuario)
      .values(users)
      .orIgnore()
      .execute();

    const especialidades = await dataSource.getRepository(Especialidade).find();

    const medicos = users
      .filter((user) => user.tipoUsuario === TipoUsuario.MEDICO)
      .map<DeepPartial<Medico>>((user) => ({
        usuario: {
          id: user.id!,
        },
        especialidade: {
          id: especialidades.at((Math.random() * especialidades.length) | 0)
            ?.id,
        },
      }));

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Medico)
      .values(medicos)
      .orIgnore()
      .execute();
  }

  private createRandomUser(tipoUsuario: TipoUsuario): Partial<Usuario> {
    const firstName = this.faker.person.firstName();
    const lastName = this.faker.person.lastName();
    return {
      tipoUsuario,
      senha: brcrypt.hashSync('12345678', 10),
      nome: `${firstName} ${lastName}`,
      email: this.faker.internet.email({ firstName, lastName }).toLowerCase(),
      cpf: this.faker.string.numeric(11),
    };
  }
}
