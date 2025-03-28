export type TMaintenanceForm = {
  tree: TMaintenanceTree[];
  totalPrice: number;
  products: TProduct[];
  type: {
    type: string;
    label: string;
  };
};

export type TProduct = {
  id: number;
  name: string;
  image: string;
  soloPrice: number;
  manyPrice: number;
  realPrice?: number;
};

export type TMaintenanceTree = {
  title: string;
  subtitle?: string;
  items: {
    id: string;
    title?: string;
    placeholder?: string;
    type:
      | "input"
      | "select"
      | "input-address"
      | "input-date"
      | "input-contract"
      | "input-payment";
    notRequired?: boolean;
    values?: { title: string; id: string }[];
  }[];
  hideButton?: boolean;
  dependencies?: {
    [key: string]: {
      [key2: string]: { type: "modal-change-type-to-liberte"; ifValue: string };
    };
  };
};

export type TGenerateContractBody = {
  type: string;
  productIds: number[];
  currentForm: any;
};
