import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748211619580 implements MigrationInterface {
    name = 'Migration1748211619580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`medico\` ADD \`usuarioId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`medico\` ADD UNIQUE INDEX \`IDX_aec4c649fc7271a07188203310\` (\`usuarioId\`)`);
        await queryRunner.query(`ALTER TABLE \`medico\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`medico\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`medico\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_aec4c649fc7271a07188203310\` ON \`medico\` (\`usuarioId\`)`);
        await queryRunner.query(`ALTER TABLE \`medico\` ADD CONSTRAINT \`FK_aec4c649fc7271a07188203310d\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`medico\` DROP FOREIGN KEY \`FK_aec4c649fc7271a07188203310d\``);
        await queryRunner.query(`DROP INDEX \`REL_aec4c649fc7271a07188203310\` ON \`medico\``);
        await queryRunner.query(`ALTER TABLE \`medico\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`medico\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`medico\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`medico\` DROP INDEX \`IDX_aec4c649fc7271a07188203310\``);
        await queryRunner.query(`ALTER TABLE \`medico\` DROP COLUMN \`usuarioId\``);
    }

}
