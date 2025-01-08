import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class InitDatabase1691234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create tables
    await queryRunner.query(`
      CREATE TABLE "department" (
        "Id" SERIAL PRIMARY KEY,
        "Name" VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "user" (
        "Id" SERIAL PRIMARY KEY,
        "Username" VARCHAR(255) NOT NULL,
        "Password" VARCHAR(255) NOT NULL,
        "Role" VARCHAR(50) NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "employee" (
        "Id" SERIAL PRIMARY KEY,
        "FirstName" VARCHAR(255) NOT NULL,
        "LastName" VARCHAR(255) NOT NULL,
        "Email" VARCHAR(255) NOT NULL UNIQUE,
        "DepartmentId" INTEGER REFERENCES "department"("Id") ON DELETE SET NULL,
        "HireDate" TIMESTAMP NOT NULL,
        "Salary" DECIMAL(18, 2) NOT NULL
      );
    `);

    // Insert initial Admin user
    const hashedPassword = await bcrypt.hash('admin123', 10); // Hash the password
    await queryRunner.query(`
      INSERT INTO "user" ("Username", "Password", "Role")
      VALUES ('admin123', '${hashedPassword}', 'Admin');
    `);

    await queryRunner.query(`
        INSERT INTO "department" ("Name")
        VALUES ('HR'), ('Engineering'), ('Sales'), ('Marketing');
    `);

    await queryRunner.query(`
        INSERT INTO "employee" ("FirstName", "LastName", "Email", "DepartmentId", "HireDate", "Salary" )
        VALUES ('Emp', '1', 'emp1@company.com', 1, '1-2-2023', 4000),
        ('John', 'Doe', 'john.doe@example.com', 2, '2023-01-01', 50000.00),
        ('Jane', 'Smith', 'jane.smith@example.com', 1, '2023-02-15', 60000.00),
        ('Alice', 'Johnson', 'alice.johnson@example.com', 2, '2023-03-10', 55000.00),
        ('Bob', 'Brown', 'bob.brown@example.com', 3, '2023-04-20', 45000.00);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables
    await queryRunner.query(`DROP TABLE "employee";`);
    await queryRunner.query(`DROP TABLE "user";`);
    await queryRunner.query(`DROP TABLE "department";`);
  }
}