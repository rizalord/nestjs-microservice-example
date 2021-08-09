import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MethodDocument = Method & Document;

@Schema({ timestamps: true })
export class Method {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const MethodSchema = SchemaFactory.createForClass(Method);
