import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1752114358111 implements MigrationInterface {
  name = 'Migration1752114358111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`agendamento\` ADD \`duracao\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`agendamento\` DROP COLUMN \`duracao\``,
    );
  }
}
