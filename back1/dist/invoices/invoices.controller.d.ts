import { InvoicesService } from './invoices.service';
import { TAuth } from 'src/auth/auth.types';
import { Invoice, CreateInvoiceDto } from './invoices.types';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    findAll(auth: TAuth): Promise<Invoice[]>;
    findOne(auth: TAuth, id: string): Promise<Invoice>;
    create(auth: TAuth, data: CreateInvoiceDto): Promise<Invoice>;
}
