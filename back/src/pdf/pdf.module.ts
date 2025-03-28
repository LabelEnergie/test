// src/pdf/pdf.module.ts
import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  providers: [PdfService, FirebaseService],
  exports: [PdfService]
})
export class PdfModule {}