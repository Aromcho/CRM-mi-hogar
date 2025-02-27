import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
    ADMIN = 'admin',
    AGENT = 'agent',
    USER = 'user',
}
// "address" "logo" "name"





@Schema()
export class User extends Document {
    @Prop()
    address: string;

    @Prop()
    id: number;

    @Prop()
    email: string;

    @Prop()
    logo: string

    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop()
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);