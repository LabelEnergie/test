import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { TAuth } from 'src/auth/auth.types';
import { TCreateSimulationBody, TSimulatorResult, TSimulatorTree } from './simulator.type';
import { loadRevenuesTreeDependencies, isIdf } from 'src/utils/simulator';
import { DatabaseBuilder } from 'src/DB';
import { throwError } from 'src/utils/error';
import { SIMULATOR_TREE, TABLE_REVENUES } from './simulator.constants';
import { randomUUID } from 'crypto';

@Injectable()
export class SimulatorService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getSimulation(auth: TAuth, id: string) {
    try {
      console.log('Fetching simulation with ID:', id);
      const simulation = await this.firebaseService.getDocument<{
        id: string;
        userId: string;
        simulation: TSimulatorResult[];
      }>('simulations', id);
      
      console.log('Found simulation:', simulation);
      
      if (!simulation) {
        throwError('Simulation not found', 404);
      }

      if (simulation.userId !== auth.id) {
        throwError('Unauthorized access to simulation', 403);
      }

      return {
        ...simulation,
        json: simulation.simulation // For backward compatibility
      };
    } catch (error) {
      console.error('Detailed error:', error);
      if (error.status === 404) {
        throwError('Simulation not found', 404);
      }
      throwError('Error fetching simulation', 500);
    }
  }

  async generateHelpsPdf(auth: TAuth, id: string) {
    const simulation = await this.getSimulation(auth, id);
    // Implement PDF generation logic here
    return simulation;
  }

  /**
   * Tests Postman:
   * 
   * 1. Créer une simulation
   * POST http://localhost:3000/simulator/simulation
   * Body: {
   *   "simulation": [
   *     { "id": "foyer-personnes", "type": "select", "value": ["2"] }
   *   ]
   * }
   * 
   * 2. Récupérer une simulation
   * GET http://localhost:3000/simulator/simulation/{id}
   * 
   * 3. Récupérer l'arbre des options
   * GET http://localhost:3000/simulator/tree
   */
  async createSimulation(auth: TAuth, body: TCreateSimulationBody) {
    try {
      console.log('Auth data:', auth);
      console.log('Simulation data:', body);

      if (!auth?.id) {
        console.error('Missing auth data:', {
          auth,
          timestamp: new Date().toISOString()
        });
        throwError('Authentication required', 401);
      }

      const simulation = {
        id: randomUUID(),
        userId: auth.id,
        simulation: body.simulation,
        createdAt: new Date().toISOString(),
        json: body.simulation
      };

      console.log('Attempting to create simulation:', {
        simulationId: simulation.id,
        userId: simulation.userId,
        timestamp: simulation.createdAt
      });

      await this.firebaseService.createDocument('simulations', simulation);
      
      console.log('Simulation created successfully:', {
        id: simulation.id,
        userId: simulation.userId
      });

      return simulation;
    } catch (error) {
      console.error('Creation error details:', {
        error: {
          message: error.message,
          code: error.code,
          stack: error.stack
        },
        auth: auth ? {
          id: auth.id,
          hasAuth: !!auth
        } : 'No auth',
        timestamp: new Date().toISOString()
      });
      throwError('Error creating simulation', 500);
    }
  }

  async getTree(): Promise<TSimulatorTree[]> {
    try {
      const revenuesTable = await this.firebaseService.getDocument<{
        table: {
          1: number[];
          2: number[];
          3: number[];
          4: number[];
          5: number[];
          more: number[];
        }
      }>('config', 'revenues');
      
      return SIMULATOR_TREE.map(tree => {
        if (tree.id === 'revenue') {
          return {
            ...tree,
            dependencies: loadRevenuesTreeDependencies(revenuesTable?.table || TABLE_REVENUES)
          };
        }
        return tree;
      });
    } catch (error) {
      console.error('Error fetching revenue table:', error);
      return SIMULATOR_TREE;
    }
  }
}
