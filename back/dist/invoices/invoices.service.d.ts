import { FirebaseService } from '../firebase/firebase.service';
import { Invoice, CreateInvoiceDto } from './invoices.types';
export declare class InvoicesService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    findAll(userId: string): Promise<Invoice[]>;
    findOne(userId: string, id: string): Promise<Invoice>;
    create(userId: string, data: CreateInvoiceDto): Promise<Invoice>;
}
