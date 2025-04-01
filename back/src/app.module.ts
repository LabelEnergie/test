import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { FoldersModule } from './folders/folders.module';
import { ArticlesModule } from './articles/articles.module';
import { ChatModule } from './chat/chat.module';
import { ToolsModule } from './tools/tools.module';
import { PaymentModule } from './payment/payment.module';
import { FirebaseModule } from './firebase/firebase.module';
import { SimulatorModule } from './simulator/simulator.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { InvoicesModule } from './invoices/invoices.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './guard';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    SimulatorModule,
    AuthModule,
    FilesModule,
    InvoicesModule,
    FoldersModule,
    ArticlesModule,
    ChatModule,
    MaintenanceModule,
    ToolsModule,
    PaymentModule,
    PdfModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
