import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746293562293 implements MigrationInterface {
  name = 'Migration1746293562293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`especialidade\` ADD UNIQUE INDEX \`IDX_183b33080a97abfae1215f81b2\` (\`nome\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`especialidade\` DROP INDEX \`IDX_183b33080a97abfae1215f81b2\``,
    );
  }
}
