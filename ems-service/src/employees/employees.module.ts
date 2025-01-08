import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeesService } from "./employees.service";
import { EmployeesController } from "./employees.controller";
import { Employee } from "./entities/employee.entity";
import { DepartmentsModule } from "src/department/departments.module";

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), DepartmentsModule], // Register the Employee entity and import DepartmentsModule
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
