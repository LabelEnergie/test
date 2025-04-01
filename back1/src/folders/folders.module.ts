import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { SimulatorModule } from 'src/simulator/simulator.module';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  imports: [
    FirebaseModule,
    SimulatorModule,
    PdfModule  // Ajout de cette ligne
  ],
  controllers: [FoldersController],
  providers: [FoldersService]
})
export class FoldersModule {}
