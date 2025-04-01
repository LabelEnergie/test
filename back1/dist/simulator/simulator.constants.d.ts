import { ResourceType, TSimulatorTree } from './simulator.type';
export declare const TABLE_REVENUES: {
    1: number[];
    2: number[];
    3: number[];
    4: number[];
    5: number[];
    more: number[];
};
export declare const HELPS_COLORS: {
    [key: string]: string;
};
export declare const CEE_TABLE: {
    types: ResourceType[];
    helps: {
        proId: number;
        value: number;
    }[];
}[];
export declare const MAPRIMERENOV_TABLE: {
    [key: number]: {
        proId: number;
        value: number;
    }[];
};
export declare const MAPRIMERENOV_LIMIT = 20000;
export declare const SIMULATOR_TREE: TSimulatorTree[];
