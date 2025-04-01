import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { ToolsModule } from '../tools/tools.module';

@Module({
  imports: [FirebaseModule, ToolsModule],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
  exports: [MaintenanceService]
})
export class MaintenanceModule {}
