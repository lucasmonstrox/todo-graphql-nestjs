import { MigrationInterface, QueryRunner } from 'typeorm';

export class Todos1595655984530 implements MigrationInterface {
  name = 'Todos1595655984530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "done" boolean NOT NULL DEFAULT false, "task" character varying(50) NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
