import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Role } from 'src/schema/role.schema';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(@InjectModel(Role.name) private readonly role: Model<Role>) {}

  async seed(): Promise<any> {
    const userRole = new Role();
    userRole.name = 'User';
    userRole.description = 'Simple User Client';

    const roles: Role[] = [userRole];

    return this.role.insertMany(roles);
  }

  async drop(): Promise<any> {
    return this.role.deleteMany({});
  }
}
