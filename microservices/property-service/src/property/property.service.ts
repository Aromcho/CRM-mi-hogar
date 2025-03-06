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
    if (!propertyData.agentId) {
        throw new HttpException('El campo agentId es obligatorio', HttpStatus.BAD_REQUEST);
    }

    try {
        console.log('Obteniendo datos del agente...', propertyData.agentId);
        
        const response = await axios.get(`${this.userServiceUrl}/${propertyData.agentId}`);
        const agentData = response.data;

        const newProperty = await this.propertyModel.create({
            ...propertyData,
            agentId: agentData.id,
            branchId: agentData.branchId || null, 
        });

        return newProperty;
    } catch (error) {
        console.error('Error al obtener datos del agente:', error.message);
        throw new HttpException('No se pudo obtener los datos del agente', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


async findAll() {
  return this.propertyModel
      .find()
      .populate('agentId', 'name email') // Traer nombre y email del agente
      .populate('branchId', 'name logo address') // Traer info de la inmobiliaria (si aplica)
      .exec();
}


async findByBranchId(branchId: number, page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  const properties = await this.propertyModel
      .find({ branchId }) // ✅ Buscar usando `branchId` como `number`
      .skip(skip)
      .limit(limit)
      .exec();

  const total = await this.propertyModel.countDocuments({ branchId });

  return {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
      data: properties,
  };
}


  
  
  async findOne(id: string) {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) return null;

    try {
        const agentResponse = await axios.get(`${this.userServiceUrl}/${property.agentId}`);
        const agent = agentResponse.data;

        let branch = null;

        if (property.branchId) {
            const branchResponse = await axios.get(`${this.userServiceUrl}/${property.branchId}`);
            branch = branchResponse.data;
        }

        return {
            ...property.toObject(),
            agent,  
            branch, 
        };
    } catch (error) {
        console.error('Error al obtener información del agente o inmobiliaria:', error.message);
        return property;
    }
}


  async update(id: string, propertyData: any) {
    return this.propertyModel.findByIdAndUpdate(id, propertyData, { new: true }).exec();
  }

  async delete(id: string) {
    return this.propertyModel.findByIdAndDelete(id).exec();
  }
}
