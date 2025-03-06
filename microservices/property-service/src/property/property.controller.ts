import { Controller, Get, Post, Put, Delete, Body, Param, Req, Query, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() data: any) {
    try {
      return await this.propertyService.create(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }
  @Get('by-branch/:id')
  findByBranchId(
    @Param('id', ParseIntPipe) id: number,  // ✅ Se convierte automáticamente a `number`
    @Query('page', ParseIntPipe) page = 1,  // ✅ También convertimos `page` automáticamente
    @Query('limit', ParseIntPipe) limit = 10, // ✅ `limit` también se convierte automáticamente
  ) {
    return this.propertyService.findByBranchId(id, page, limit);
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.propertyService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.propertyService.delete(id);
  }
}
