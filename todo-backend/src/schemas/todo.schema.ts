import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  task: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ required: false })
  userId: string;

  @Prop({ required: true })
  username: string; // Ensure it's required
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
