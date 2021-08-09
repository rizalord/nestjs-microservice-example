import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Method } from 'src/schema/method.schema';

@Injectable()
export class MethodSeeder implements Seeder {
  constructor(
    @InjectModel(Method.name) private readonly method: Model<Method>,
  ) {}

  async seed(): Promise<any> {
    const emailMethod = new Method();
    emailMethod.name = 'email';
    emailMethod.description = 'Authentication Method using Email & Password';

    const googleMethod = new Method();
    googleMethod.name = 'google-auth';
    googleMethod.description = 'Authentication Method using Google OAuth';

    const methods: Method[] = [emailMethod, googleMethod];

    return this.method.insertMany(methods);
  }

  async drop(): Promise<any> {
    return this.method.deleteMany({});
  }
}
