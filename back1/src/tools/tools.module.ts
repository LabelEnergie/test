import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { ToolsController } from './tools.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [ToolsController],
  providers: [ToolsService],
  exports: [ToolsService]
})
export class ToolsModule {}
