import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
  @Factory((faker) => faker.name.title())
  @Prop({ required: true })
  title: string;

  @Factory((faker) => faker.internet.password(100))
  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
