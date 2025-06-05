import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1748224737877 implements MigrationInterface {
  name = 'Migration1748224737877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_aec4c649fc7271a07188203310\` ON \`medico\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_aec4c649fc7271a07188203310\` ON \`medico\` (\`usuarioId\`)`,
    );
  }
}
