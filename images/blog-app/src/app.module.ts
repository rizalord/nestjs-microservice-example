import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './modules/blogs/blogs.module';
import configuration from './config/configuration';
import databaseConfig from './config/database';
import authConfig from './config/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, databaseConfig, authConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('connectionString'),
        dbName: configService.get<string>('name'),
      }),
    }),
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
