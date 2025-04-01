export type TCreatePaymentBody = {
  interval: 'month' | 'year';
  paymentMethodId: string;
  contract: {
    type: 'essentiel' | 'liberte' | 'securite' | 'custom';
    productIds: number[];
  };
  email: string;
};
