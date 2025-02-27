import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from './property.schema';
import axios from 'axios';


@Injectable()
export class PropertyService {
  private readonly userServiceUrl = 'http://localhost:4001/users';

  constructor(@InjectModel(Property.name) private propertyModel: Model<Property>) {}

  async create(propertyData: any) {
    // Verificar que se envió un branch.id
    if (!propertyData.branch || !propertyData.branch.id) {
      throw new HttpException('El campo branch.id es obligatorio', HttpStatus.BAD_REQUEST);
    }

    try {
      console.log('Obteniendo datos del usuario/inmobiliaria...'+ propertyData.branch.id);
      // Hacer una solicitud al microservicio de usuarios para obtener los datos completos del branch
      const response = await axios.get(`${this.userServiceUrl}/${propertyData.branch.id}`);
      const branchData = response.data; // Datos completos de la inmobiliaria o usuario

      // Crear la propiedad incluyendo toda la información del branch
      const newProperty = await this.propertyModel.create({
        ...propertyData,
        branch: branchData, // Guardar todo el objeto branch en la base de datos
      });

      return newProperty;
    } catch (error) {
      console.error('Error al obtener datos del usuario/inmobiliaria:', error.message);
      throw new HttpException('No se pudo obtener los datos del usuario/inmobiliaria', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return this.propertyModel.find().exec();
  }

  async findByBranchId(branchId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit; // Calcular cuántos documentos saltar
  
    const properties = await this.propertyModel
      .find({ 'branch.id': branchId }) // Filtrar por `branch.id`
      .skip(skip) // Saltar registros según la página
      .limit(limit) // Definir cantidad por página
      .exec();
  
    const total = await this.propertyModel.countDocuments({ 'branch.id': branchId }); // Contar total de propiedades
  
    return {
      total, // Total de propiedades encontradas
      page, // Página actual
      totalPages: Math.ceil(total / limit), // Número total de páginas
      limit, // Cantidad de propiedades por página
      data: properties, // Resultados paginados
    };
  }
  
  
  async findOne(id: string) {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) return null;

    try {
      // Llamar al microservicio de usuarios para obtener la información del usuario
      const response = await axios.get(`${this.userServiceUrl}/${property.branch}`);
      const user = response.data;

      return {
        ...property.toObject(),
        branch: user, // Reemplazar el ID del usuario con sus datos
      };
    } catch (error) {
      console.error('Error al obtener usuario:', error.message);
      return property; // Si hay error, devolver solo la propiedad sin popular el usuario
    }
  }

  async update(id: string, propertyData: any) {
    return this.propertyModel.findByIdAndUpdate(id, propertyData, { new: true }).exec();
  }

  async delete(id: string) {
    return this.propertyModel.findByIdAndDelete(id).exec();
  }
}
