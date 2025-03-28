import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { Auth } from 'src/guard';
import { TAuth } from 'src/auth/auth.types';
import { 
  TGenerateContractBody, 
  TStoreSignedContractBody,
  Maintenance,
  CreateMaintenanceDto  // Added this import
} from './maintenance.type';

@Controller('maintenance')  // Removed 'api/' prefix since it's handled globally
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get('/form')
  async getForm(
    @Query('type') type: string,
    @Query('products') products?: string,
  ) {
    return await this.maintenanceService.getForm(type, products);
  }

  @Post('create')  // New endpoint
  async createMaintenance(
    @Auth('auth') auth: TAuth,
    @Body() data: CreateMaintenanceDto
  ): Promise<Maintenance> {
    return await this.maintenanceService.create(auth.id, data);
  }

  @Post(':id/store-signed')
  async storeSignedContract(
    @Auth('auth') auth: TAuth,
    @Param('id') id: string,
    @Body() body: TStoreSignedContractBody
  ): Promise<Maintenance> {
    return await this.maintenanceService.storeSignedContract(auth, body);
  }
}
