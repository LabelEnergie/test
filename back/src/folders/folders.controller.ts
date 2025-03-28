import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import {
  TFolder,
  TFolderAddDocumentsBody,
  TFolderUpdateNumMPRBody,
  TFolderUpdateStatusBody,
} from './folders.type';
import { TAuth } from 'src/auth/auth.types';
import { Auth } from 'src/guard';
import { Admin } from 'src/constants';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  findAll(@Auth('auth') auth: TAuth) {
    return this.foldersService.findAll(auth);
  }

  @Post()
  create(@Auth('auth') auth: TAuth, @Body() data: Partial<TFolder>) {
    return this.foldersService.create(auth, data);
  }

  @Post(':id/documents')
  addDocuments(
    @Auth('auth') auth: TAuth,
    @Param('id') id: string,
    @Body() body: TFolderAddDocumentsBody,
  ) {
    return this.foldersService.addDocument(auth, id, body);
  }

  @Patch(':id/complete')
  completeFolder(@Auth('auth') auth: TAuth, @Param('id') id: string) {
    return this.foldersService.completeFolder(auth, id);
  }

  @Post(':id/generate-pdf')
  @HttpCode(HttpStatus.OK)
  async generatePdf(
    @Auth('auth') auth: TAuth,
    @Param('id') id: string
  ): Promise<{ pdfUrl: string }> {
    try {
      const pdfUrl = await this.foldersService.generatePdf(auth, id);
      return { pdfUrl };
    } catch (error) {
      throw error;
    }
  }

  // Admin routes
  @Admin()
  @Patch(':id/status')
  updateStatus(
    @Auth('auth') auth: TAuth,
    @Param('id') id: string,
    @Body() body: TFolderUpdateStatusBody,
  ) {
    return this.foldersService.updateStatus(auth, id, body.status);
  }

  @Admin()
  @Patch(':id/num-mpr')
  updateNumMPR(
    @Auth('auth') auth: TAuth,
    @Param('id') id: string,
    @Body() body: TFolderUpdateNumMPRBody,
  ) {
    return this.foldersService.updateNumMPR(auth, id, body.numMPR);
  }

  @Admin()
  @Delete(':id')
  remove(@Auth('auth') auth: TAuth, @Param('id') id: string) {
    return this.foldersService.remove(auth, id);
  }
}