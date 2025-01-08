import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { Department } from './department/entities/department.entity';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './department/departments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Employee, Department, User],
       // synchronize: true,
      }),
    }),
    UsersModule,
    EmployeesModule,
    DepartmentsModule,
    AuthModule
  ],
})
export class AppModule {}