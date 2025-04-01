import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import {
  TFolderAddDocumentsBody,
  TFolderUpdateNumMPRBody,
  TFolderUpdateStatusBody,
  TFolder, // Add this import
} from './folders.type';
import { TAuth } from 'src/auth/auth.types';
import { Auth } from 'src/guard';
import { Admin } from 'src/constants';
import { Response } from 'express';
import { AuthGuard } from '../guard';
@UseGuards(AuthGuard)
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@Auth('auth') auth: TAuth, @Body() data: Partial<TFolder>) {
    return this.foldersService.create(auth, data);
  }

  @Get()
  findAll(@Auth('auth') auth: TAuth) {
    return this.foldersService.findAll(auth);
  }

  @Post(':id/documents')
  update(
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

  // Only admin routes
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

  @Get(':id/pdf')
  async generatePdf(
    @Auth('auth') auth: TAuth,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const pdfBuffer = await this.foldersService.generatePdf(auth, id);
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="synthese-${id}.pdf"`,
        'Cache-Control': 'no-cache'
      });
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ message: 'Error generating PDF' });
    }
  }
}
