import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1747962291226 implements MigrationInterface {
  name = 'Migration1747962291226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`medico\` (\`id\` int NOT NULL, \`especialidadeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medico\` ADD CONSTRAINT \`FK_00ea44c092ae4436d528fa63a32\` FOREIGN KEY (\`especialidadeId\`) REFERENCES \`especialidade\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`medico\` DROP FOREIGN KEY \`FK_00ea44c092ae4436d528fa63a32\``,
    );
    await queryRunner.query(`DROP TABLE \`medico\``);
  }
}
