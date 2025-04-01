import { TAuth } from 'src/auth/auth.types';
import { TSimulatorResult } from 'src/simulator/simulator.type';
import { TFolder } from './folders.type';
export declare function pixelInjectLead(auth: TAuth, simulatorResult: TSimulatorResult[], folder: TFolder): Promise<void>;
