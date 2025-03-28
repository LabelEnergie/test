import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { TArticleBody } from './articles.types';
import { Auth } from 'src/guard';
import { TAuth } from 'src/auth/auth.types';
import { Admin, Public } from 'src/constants';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Admin()
  @Post()
  async create(@Auth('auth') auth: TAuth, @Body() body: TArticleBody) {
    return await this.articlesService.create(auth, body);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.articlesService.findAll();
  }

  @Public()
  @Get(':code')
  async findOne(@Param('code') code: string) {
    return await this.articlesService.findOne(code);
  }

  @Admin()
  @Put(':id')
  async update(
    @Auth('auth') auth: TAuth,
    @Param('id') id: string,
    @Body() body: TArticleBody,
  ) {
    return await this.articlesService.update(auth, id, body);
  }

  @Admin()
  @Delete(':id')
  async remove(@Auth('auth') auth: TAuth, @Param('id') id: string) {
    return await this.articlesService.remove(auth, id);
  }
}
