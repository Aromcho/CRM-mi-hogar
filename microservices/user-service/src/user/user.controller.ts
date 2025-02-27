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

    @Get(':id')
async findOne(@Param('id') id: string) {
  return this.userService.findOneById(Number(id)); // 🔍 Convertir `id` a número antes de buscar
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
