import { MigrationInterface, QueryRunner } from 'typeorm';
export class TODO1595852339963 implements MigrationInterface {
  name = 'TODO1595852339963';
  async up(queryRunner: QueryRunner) {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task" character varying(100) NOT NULL, "done" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
