import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1745024367654 implements MigrationInterface {
  name = 'Migration1745024367654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`tipoUsuario\` enum ('admin', 'paciente', 'medico') NOT NULL DEFAULT 'paciente', \`senha\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_28cd8597e57c8197d4929a98e7\` (\`cpf\`), UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_2863682842e688ca198eb25c12\` ON \`usuario\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_28cd8597e57c8197d4929a98e7\` ON \`usuario\``,
    );
    await queryRunner.query(`DROP TABLE \`usuario\``);
  }
}
