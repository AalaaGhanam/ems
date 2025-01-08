import { Employee } from "src/employees/entities/employee.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true })
  Name: string;

  @OneToMany(() => Employee, (employee) => employee.Department)
  employees: Employee[];
}
