import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(userData: any) {
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds); // 🔒 Hasheamos la contraseña antes de guardarla
        return this.userModel.create(userData);
    }

    async findAll() {
        return this.userModel.find().exec();
    }

    async findOne(id: string | number) {
        return this.userModel.findOne({ id: Number(id) }).populate('branchId', 'name logo address').exec();
    }
    
    async findOneByEmail(email: string) {
        return this.userModel.findOne({ email }).exec();
    }
    
    async update(id: string, userData: any) {
        return this.userModel.findOneAndUpdate({ id: Number(id) }, userData, { new: true }).exec();
    }

    async delete(id: string) {
        return this.userModel.findOneAndDelete({ id: Number(id) }).exec();
    }
    
}