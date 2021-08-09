import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Blog } from '../schema/blog.schema';

@Injectable()
export class BlogSeeder implements Seeder {
  constructor(@InjectModel(Blog.name) private readonly blog: Model<Blog>) {}

  async seed(): Promise<any> {
    const blogs = DataFactory.createForClass(Blog).generate(10);

    return this.blog.insertMany(blogs);
  }

  async drop(): Promise<any> {
    return this.blog.deleteMany({});
  }
}
