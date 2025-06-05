import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1748398350751 implements MigrationInterface {
  name = 'Migration1748398350751';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`grade\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dia\` int NOT NULL, \`inicio\` time NOT NULL, \`fim\` time NOT NULL, \`intervalo\` int NOT NULL, \`medicoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`grade\` ADD CONSTRAINT \`FK_0b42b9ad25a47cb2fd9758b4f9f\` FOREIGN KEY (\`medicoId\`) REFERENCES \`medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`grade\` DROP FOREIGN KEY \`FK_0b42b9ad25a47cb2fd9758b4f9f\``,
    );
    await queryRunner.query(`DROP TABLE \`grade\``);
  }
}
