import { SimulatorService } from './simulator.service';
import { TAuth } from 'src/auth/auth.types';
import { TCreateSimulationBody } from './simulator.type';
export declare class SimulatorController {
    private readonly simulatorService;
    constructor(simulatorService: SimulatorService);
    getTree(): Promise<import("./simulator.type").TSimulatorTree[]>;
    createSimulation(auth: TAuth, body: TCreateSimulationBody): Promise<{
        id: `${string}-${string}-${string}-${string}-${string}`;
        userId: string;
        simulation: import("./simulator.type").TSimulatorResult[];
        createdAt: string;
        json: import("./simulator.type").TSimulatorResult[];
    }>;
    getSimulation(auth: TAuth, id: string): Promise<{
        json: import("./simulator.type").TSimulatorResult[];
        id: string;
        userId: string;
        simulation: import("./simulator.type").TSimulatorResult[];
    }>;
}
