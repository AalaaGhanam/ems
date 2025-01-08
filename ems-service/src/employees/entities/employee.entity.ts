import { Department } from 'src/department/entities/department.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  Id: string;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column({ unique: true })
  Email: string;

  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'DepartmentId' }) // Ensure this line exists
  Department: Department;

  @Column({ nullable: true })
  DepartmentId: number;

  @Column()
  HireDate: Date;

  @Column('decimal', { precision: 18, scale: 2 })
  Salary: number;
}