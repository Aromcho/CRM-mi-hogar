import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: any) {
    return this.userService.create(userData);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('email/:email')
async findByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id); 
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
