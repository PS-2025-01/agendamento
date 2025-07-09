import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752100310677 implements MigrationInterface {
    name = 'Migration1752100310677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`deletedAt\``);
    }

}
