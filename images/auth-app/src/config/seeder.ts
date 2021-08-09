import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import databaseConfig from './database';
import { Role, RoleSchema } from 'src/schema/role.schema';
import { RoleSeeder } from 'src/seeders/role.seeder';
import { MethodSeeder } from 'src/seeders/method.seeder';
import { Method, MethodSchema } from 'src/schema/method.schema';
import { UserSeeder } from 'src/seeders/user.seeder'
import { User, UserSchema } from 'src/schema/user.schema'

seeder({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, databaseConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('connectionString'),
        dbName: configService.get<string>('name'),
      }),
    }),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Method.name, schema: MethodSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
}).run([RoleSeeder, MethodSeeder, UserSeeder]);
