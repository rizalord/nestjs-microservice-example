import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { Method } from './method.schema';
import { Factory } from 'nestjs-seeder';
import { Hash } from '../helpers/hash';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Factory((faker) => faker.internet.email())
  @Prop({ required: true })
  email: string;

  @Factory((faker) => Hash.encrypt(faker.internet.password(10)))
  @Prop({ required: true })
  password: string;

  @Factory((faker) => faker.name.findName())
  @Prop({ required: true, select: false })
  name: string;

  @Factory(() => false)
  @Prop({ required: true })
  activated: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Method' })
  method: Method;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User)
  .pre('save', function save(this: any, next) {
    if (!this.isModified('password')) return next();
    this.password = Hash.encrypt(this.password);
    next();
  })
  .set('toJSON', {
    transform: function (_, ret) {
      delete ret['password'];
      return ret;
    },
  });
