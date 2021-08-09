import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async seed(): Promise<any> {
    const users = DataFactory.createForClass(User).generate(10);

    const testUser = new User();
    testUser.name = 'Ahmad Khamdani';
    testUser.email = 'user@gmail.com';
    testUser.password = 'secretpassword';
    testUser.activated = true;

    this.user.create(testUser);

    return this.user.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
