import { TUser } from "./auth.types";
import { TSimulatorResult } from "./simulator.types";

// Add the simulationId property to your TFolder interface
export interface TFolder {
  id: string;
  userId: string;
  name: string;
  date: Date;
  status: {
    id: FolderType;
    color: string;
    label: string;
  };
  documents: Array<{
    name: string;
    type: FolderDocumentType;
    url?: string;
  }>;
  products: Array<any>; // Or define a more specific type
  pdfLink: string;
  numMPR?: string;
  simulationId: string; // Add this property
};

export enum FolderType {
  Pending = 1,
  Done = 2,
  Completed = 3,
  Cancel = 99,
}

export enum FolderDocumentType {
  Identity = 1,
  Taxes = 2,
  PropertyTax = 3,
  Home = 4,
  Other = 5,
}
