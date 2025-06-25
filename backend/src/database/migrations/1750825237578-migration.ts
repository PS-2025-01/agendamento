import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1750825237578 implements MigrationInterface {
  name = 'Migration1750825237578';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`agendamento\` (\`id\` int NOT NULL AUTO_INCREMENT, \`horario\` time NOT NULL, \`data\` date NOT NULL, \`status\` ENUM('AGENDADO', 'CANCELADO', 'CONCLUIDO') NOT NULL, \`medicoId\` int NULL, \`pacienteId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`agendamento\` ADD CONSTRAINT \`FK_6457e818ae8ca1121eda19459b1\` FOREIGN KEY (\`medicoId\`) REFERENCES \`medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`agendamento\` ADD CONSTRAINT \`FK_bdc31f2d4faf6a677a9870dad8e\` FOREIGN KEY (\`pacienteId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`agendamento\` DROP FOREIGN KEY \`FK_bdc31f2d4faf6a677a9870dad8e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`agendamento\` DROP FOREIGN KEY \`FK_6457e818ae8ca1121eda19459b1\``,
    );
    await queryRunner.query(`DROP TABLE \`agendamento\``);
  }
}
