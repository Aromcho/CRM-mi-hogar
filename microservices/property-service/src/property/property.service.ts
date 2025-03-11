import { Injectable, HttpException, HttpStatus, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from './property.schema';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import mongoose from 'mongoose';

@Injectable()
export class PropertyService {
  private readonly userServiceUrl = 'http://localhost:4001/users';

  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {}

  async create(req: Request, propertyData: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      console.log('🟢 Token válido. Usuario autenticado:', decoded);
    } catch (error) {
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }

    // 🔥 1. Usar `_id` en lugar de `id`
    propertyData.agentId = new mongoose.Types.ObjectId(decoded.id);

    if (!propertyData.agentId) {
      throw new HttpException(
        'No se pudo extraer el ID del usuario autenticado',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      console.log(
        `🔍 Obteniendo datos del agente desde: ${this.userServiceUrl}/${decoded.id}`,
      );

      const response = await axios.get(`${this.userServiceUrl}/${decoded.id}`);
      const agentData = response.data;

      if (!agentData) {
        throw new HttpException('El agente no existe', HttpStatus.NOT_FOUND);
      }

      // 🔥 2. Asegurar que `agentId` usa `_id`, no `id`
      if (!agentData._id) {
        throw new HttpException(
          'El agente no tiene un ObjectId válido',
          HttpStatus.BAD_REQUEST,
        );
      }

      // 🔥 3. Asignar correctamente `agentId`, `branchId` y `realEstateAgency`
      const newProperty = await this.propertyModel.create({
        ...propertyData,
        agentId: new mongoose.Types.ObjectId(agentData._id), // 🔥 Convertimos `_id` a ObjectId
        branchId: agentData.branchId
          ? new mongoose.Types.ObjectId(agentData.branchId)
          : null,
        realEstateAgency: agentData.realEstateAgency || 'Sin inmobiliaria',
      });

      console.log('✅ Propiedad creada con éxito:', newProperty);
      return newProperty;
    } catch (error) {
      console.error(
        '❌ Error al obtener datos del agente:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        'No se pudo obtener los datos del agente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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

async findByAgentId(agentId: string) {
  if (!mongoose.Types.ObjectId.isValid(agentId)) {
    throw new HttpException('ID de agente inválido', HttpStatus.BAD_REQUEST);
  }

  try {
    // 🔍 Buscar propiedades por `agentId`
    const properties = await this.propertyModel
      .find({ agentId: new mongoose.Types.ObjectId(agentId) })
      .exec();

    if (!properties.length) {
      throw new HttpException('No se encontraron propiedades para este agente', HttpStatus.NOT_FOUND);
    }

    // 🔥 Obtener datos del agente desde UserService
    const response = await axios.get(`http://localhost:4001/users/${agentId}`);
    const agentData = response.data;

    return {
      agent: agentData, // 🔥 Devolvemos los datos del agente
      properties,       // 🔥 Devolvemos las propiedades
    };
  } catch (error) {
    console.error('❌ Error al obtener datos del agente:', error.message);
    throw new HttpException(
      'No se pudo obtener los datos del agente',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

  
  async findOne(id: string) {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) return null;

    try {
      const agentResponse = await axios.get(
        `${this.userServiceUrl}/${property.agentId}`,
      );
      const agent = agentResponse.data;

      let branch = null;

      if (property.branchId) {
        const branchResponse = await axios.get(
          `${this.userServiceUrl}/${property.branchId}`,
        );
        branch = branchResponse.data;
      }

      return {
        ...property.toObject(),
        agent,
        branch,
      };
    } catch (error) {
      console.error(
        'Error al obtener información del agente o inmobiliaria:',
        error.message,
      );
      return property;
    }
  }

  async update(id: string, propertyData: any) {
    return this.propertyModel
      .findByIdAndUpdate(id, propertyData, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.propertyModel.findByIdAndDelete(id).exec();
  }
}
