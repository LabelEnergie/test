import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { Public } from 'src/constants';
import { Auth } from 'src/guard';
import { TAuth } from 'src/auth/auth.types';
import { TCreateSimulationBody } from './simulator.type';

@Controller('simulator')  // Remove 'api' since it's already set globally
export class SimulatorController {
  constructor(private readonly simulatorService: SimulatorService) {}

  @Public()
  @Get('tree')
  async getTree() {
    return this.simulatorService.getTree();
  }

  @Post('simulation')
  async createSimulation(
    @Auth() auth: TAuth,  // Enlever le paramètre 'auth'
    @Body() body: TCreateSimulationBody,
  ) {
    return await this.simulatorService.createSimulation(auth, body);
  }

  @Get('simulation/:id')
  async getSimulation(
    @Auth() auth: TAuth,
    @Param('id') id: string,
  ) {
    return await this.simulatorService.getSimulation(auth, id);
  }
}
