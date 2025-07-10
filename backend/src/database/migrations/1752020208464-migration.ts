import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1752020208464 implements MigrationInterface {
  name = 'Migration1752020208464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`agendamento\` ADD \`deleted_at\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`agendamento\` DROP COLUMN \`deleted_at\``,
    );
  }
}
