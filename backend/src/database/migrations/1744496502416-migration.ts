import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1744496502416 implements MigrationInterface {
  name = 'Migration1744496502416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`especialidade\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`especialidade\``);
  }
}
