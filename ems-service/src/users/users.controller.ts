import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
    UseGuards,
  } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { UsersService } from './users.service';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

  
  @Controller('users')
  @UseGuards(RolesGuard)
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @ApiOperation({
        summary:
          'User registration with credentials and storing user data in DataBase.',
    })
    @ApiOkResponse({
    description: 'User registered Response.',
    schema: {
        title: 'RegisterResponse',
        properties: {
        message: { type: 'User registered successfully.' },
        },
    },
    })
    @ApiBody({ type: CreateUserDto })
    @Post()
    //@Roles(UserRole.Admin)
    async create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }
  
    @Get()
    //@Roles(UserRole.Admin)
    async findAll() {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    @Roles(UserRole.Admin)
    async findOne(@Param('id') id: string) {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    }
  
    @Put(':id')
    @Roles(UserRole.Admin)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    @Roles(UserRole.Admin)
    async remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
    }
  }