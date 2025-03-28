import { TSimulatorResult, TSimulatorTree } from 'src/simulator/simulator.type';
export declare function loadRevenuesTreeDependencies(revenueTab: {
    1: number[];
    2: number[];
    3: number[];
    4: number[];
    5: number[];
    more: number[];
}): {
    [key: string]: TSimulatorTree[];
};
export declare function isIdf(result: TSimulatorResult[]): boolean;
