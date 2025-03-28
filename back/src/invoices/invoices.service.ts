import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { throwError } from 'src/utils/error';
import { Invoice, CreateInvoiceDto } from './invoices.types';
import { randomUUID } from 'crypto';

@Injectable()
export class InvoicesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findAll(userId: string): Promise<Invoice[]> {
    try {
      return await this.firebaseService.query<Invoice>(
        'invoices', 
        'userId', 
        '==', 
        userId
      );
    } catch (error) {
      throwError('Error fetching invoices', 500);
    }
  }

  async findOne(userId: string, id: string): Promise<Invoice> {
    try {
      const invoice = await this.firebaseService.getDocument<Invoice>('invoices', id);
      if (!invoice || invoice.userId !== userId) {
        throwError('Invoice not found', 404);
      }
      return invoice;
    } catch (error) {
      throwError('Error fetching invoice', 500);
    }
  }

  async create(userId: string, data: CreateInvoiceDto): Promise<Invoice> {
    try {
      const invoice: Invoice = {
        id: randomUUID(),
        userId,
        createdAt: new Date(),
        ...data
      };
      return await this.firebaseService.createDocument<Invoice>('invoices', invoice);
    } catch (error) {
      throwError('Error creating invoice', 500);
    }
  }
}
