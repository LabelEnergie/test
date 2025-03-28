import { TAuth } from 'src/auth/auth.types';

export type TFolder = {
  id: string;
  name: string;
  numMPR?: string;
  date: Date;
  userId: string;  // Add this field
  simulationId: string;  // Add this field
  status: {
    id: FolderType;
    color: string;
    label: string;
  };
  products: { id: number; title: string }[];
  documents: {
    name: string;
    url: string;
    iconUrl: string;
    type: FolderDocumentType;
  }[];
  user?: TAuth;
  pdfLink: string;
};

export enum FolderType {
  Pending = 1,
  Done = 2,
  Completed = 3,
  Canceled = 99,
}

export enum FolderDocumentType {
  Identity = 1,
  Taxes = 2,
  PropertyTax = 3,
  Home = 4,
  Other = 5,
}

export type TFolderBody = {
  productIds: number[];
  simulationId: string;
};

export type TFolderAddDocumentsBody = {
  files: {
    name: string; // Match with /public/auth.id/*
    type: FolderDocumentType;
  }[];
};

export type TFolderUpdateStatusBody = {
  status: FolderType;
};

export type TFolderUpdateNumMPRBody = {
  numMPR: string;
};
