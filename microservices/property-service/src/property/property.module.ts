import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { Property, PropertySchema } from './property.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }]), // Asegurar que el esquema está registrado
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService], // Exportar para otros módulos si es necesario
})
export class PropertyModule {}
