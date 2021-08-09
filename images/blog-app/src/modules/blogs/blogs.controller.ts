import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post('/create')
  create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    const user: { _id: string; email: string } = JSON.parse(req.headers.user);
    const userId = user._id;

    return this.blogsService.create(createBlogDto, userId);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
  //   return this.blogsService.update(id, updateBlogDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.blogsService.remove(id);
  // }
}
