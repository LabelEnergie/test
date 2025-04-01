export interface Invoice {
    id: string;
    userId: string;
    amount: number;
    description: string;
    status: string;
    createdAt: Date;
}
export type CreateInvoiceDto = Omit<Invoice, 'id' | 'userId' | 'createdAt'>;
