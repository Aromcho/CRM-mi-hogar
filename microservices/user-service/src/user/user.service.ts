import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(userData: any) {
        return this.userModel.create(userData);
    }

    async findAll() {
        return this.userModel.find().exec();
    }

    async findOne(id: string) {
        return this.userModel.findById(id).exec();
    }
    
    async findOneById(id: number) {
        return this.userModel.findOne({ id }).exec(); // 🔍 Buscar por `id` numérico en lugar de `_id`
      }
      
    async update(id: string, userData: any) {
        return this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
    }

    async delete(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}