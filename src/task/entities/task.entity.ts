import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {

    @Prop({
        unique: false,
        index: true
    })
    name: string;
  
    @Prop({
      unique: false,
      index: false
    })
    description: string;

    @Prop({
      unique: false,
      index: true
    })
    type: string;
  
    @Prop({
      unique: false,
      index: true
    })
    status: string;

    @Prop({
      unique: false,
      index: true
    })
    owner: string;
  
    @Prop({
      unique: false,
      index: true
    })
    assigned: string;

    @Prop({
      unique: false,
      index: false
    })
    due_date: string;
}

export const taskSchema = SchemaFactory.createForClass(Task);
