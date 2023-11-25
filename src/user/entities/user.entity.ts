import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document { 

    @Prop({
        unique: true,
        index: true
      })
    user: string;

    @Prop({
        unique: false,
        index: false
      })
    name: string;

    @Prop({
        unique: false,
        index: false
      })
    lastname: string;

    @Prop({
        unique: false,
        index: false,
      })
    password: string;

    @Prop({
        unique: true,
        index: true
      })
    email: string;

    @Prop({
        unique: false,
        index: false
      })
    telephone?: string;

}

export const userSchema = SchemaFactory.createForClass(User);