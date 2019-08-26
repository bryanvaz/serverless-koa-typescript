import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1565565048960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'first_name',
            type: 'varchar',
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isPrimary: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
