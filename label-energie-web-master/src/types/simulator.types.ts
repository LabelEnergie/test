import { TFolder } from "./folder.type";

export type TSimulationSuccess = {
  folders: TFolder[];
};

export type TSimulatorResult = {
  id: string; // "id" or "parentId.childId"
  type: TSimulatorType;
  value: TSimulatorResultValue;
};

export type TSimulatorResultValue = string | number | string[];

export type TSimulatorTree = {
  id: string;
  title?: string;
  type: TSimulatorType;
  // Nullable fields
  values?: TSimulatorTreeValue[];
  valuesSection?: { title: string; values: TSimulatorTreeValue[] }[];
  dependencies?: { [key: string]: TSimulatorTree[] };
  idfDependencies?: { [key: string]: TSimulatorTree[] };
  label?: string;
  tag?: string;
  subtitle?: string;
  max?: number;
  mask?: string;
  bigTitle?: string;
};

export type TSimulatorTreeValue = {
  title: string;
  icon?: string;
  id: string;
  subtitle?: string;
};

export type TSimulatorType =
  | "select"
  | "select-multi"
  | "input-number"
  | "input-address"
  | "signup"
  | "input-text"
  | "input-moreless";
