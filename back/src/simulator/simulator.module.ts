import { Module } from '@nestjs/common';
import { SimulatorController } from './simulator.controller';
import { SimulatorService } from './simulator.service';

@Module({
  controllers: [SimulatorController],
  providers: [SimulatorService],
  exports: [SimulatorService], // Important: exportez le service
})
export class SimulatorModule {}
