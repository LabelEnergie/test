import {
  Body,
  Controller,
  Get,
  Param,
  HttpException,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
  UseGuards  // Add this import
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { join, dirname } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { Response } from 'express';
import { Admin, ENV } from 'src/constants';
import { Public } from 'src/constants';
import { Auth, AuthGuard } from 'src/guard';
import { TAuth } from 'src/auth/auth.types';
import { FileValidationPipe } from './files.validation';
import { UploadedFile } from './files.types'; 
import type { Multer } from 'multer';
import { Client } from 'pg';

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Get('/:id/:name')
  getFile(@Param() params: { id: string; name: string }, @Res() res: Response) {
    return this.filesService.getFile(params, res);
  }

  @Public()
  @Get('/:name')
  getStaticFile(@Param() params: { name: string }, @Res() res: Response) {
    return this.filesService.getFile(params, res, { isStatic: true });
  }

  @Public()
  @Get('/blog/:code/:name')
  getBlogFile(
    @Param() { name, code }: { name: string; code: string },
    @Res() res: Response,
  ) {
    return this.filesService.getFile({ name }, res, {
      isBlog: true,
      suppFolders: code,
    });
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @Auth('auth') auth: TAuth,
    @UploadedFiles() files: Multer.File[],  
  ) {
    return await this.filesService.uploadFile(auth, files);
  }

  @Admin()
  @Post('upload/article/:code')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadBlogFile(
    @Auth() auth: TAuth,
    @UploadedFiles() // Don't validate files because it's an admin route
    files: Array<UploadedFile>, // Utilisation de l'interface personnalisée
    @Res() res: Response,
    @Param('code') code: string,
  ) {
    const result = this.filesService.uploadFile(auth, files, {
      blogArticleCode: code,
    });
    res.statusCode = 200;
    res.json(result);
  }

  @Post('delete')
  async deleteFile(@Body() body: { names: string[] }) {
    return await this.filesService.deleteFile(body);
  }
}
