import { TUser } from "./auth.types";
import { TSimulatorResult } from "./simulator.types";

export type TFolder = {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  date: Date;
  status: {
    id: FolderType;
    color: string;
    label: string;
  };
  products: TSimulatorResult[];
  documents: {
    name: string;
    url: string;
    iconUrl: string;
    type: FolderDocumentType;
  }[];
  pdfLink: string;
  numMPR?: string;
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
