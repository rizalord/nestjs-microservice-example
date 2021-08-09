import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../../schema/blog.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(createBlogDto: CreateBlogDto, userId: string) {
    const blog: Blog = new Blog();
    blog.title = createBlogDto.title;
    blog.content = createBlogDto.content;
    blog.author = await this.usersService.findOne(userId);

    return this.blogModel.create(blog);
  }

  findAll() {
    return this.blogModel.find().lean().exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} blog`;
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: string) {
    return `This action removes a #${id} blog`;
  }
}
