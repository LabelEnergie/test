import { Module } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { SimulatorController } from './simulator.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [SimulatorController],
  providers: [SimulatorService],
  exports: [SimulatorService]
})
export class SimulatorModule {}
