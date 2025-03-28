import { FirebaseService } from 'src/firebase/firebase.service';
import { TAuth } from 'src/auth/auth.types';
import { TCreateSimulationBody, TSimulatorResult, TSimulatorTree } from './simulator.type';
export declare class SimulatorService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    getSimulation(auth: TAuth, id: string): Promise<{
        json: TSimulatorResult[];
        id: string;
        userId: string;
        simulation: TSimulatorResult[];
    }>;
    generateHelpsPdf(auth: TAuth, id: string): Promise<{
        json: TSimulatorResult[];
        id: string;
        userId: string;
        simulation: TSimulatorResult[];
    }>;
    createSimulation(auth: TAuth, body: TCreateSimulationBody): Promise<{
        id: `${string}-${string}-${string}-${string}-${string}`;
        userId: string;
        simulation: TSimulatorResult[];
        createdAt: string;
        json: TSimulatorResult[];
    }>;
    getTree(): Promise<TSimulatorTree[]>;
}
