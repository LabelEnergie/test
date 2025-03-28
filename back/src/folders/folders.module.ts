import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { SimulatorService } from '../simulator/simulator.service';
import { PdfModule } from '../pdf/pdf.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [PdfModule, FirebaseModule],
  controllers: [FoldersController],
  providers: [FoldersService, SimulatorService],
  exports: [FoldersService]
})
export class FoldersModule {}