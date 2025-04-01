import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Auth } from 'src/guard';
import { TAuth } from 'src/auth/auth.types';
import { Invoice, CreateInvoiceDto } from './invoices.types';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll(@Auth('auth') auth: TAuth): Promise<Invoice[]> {
    return this.invoicesService.findAll(auth.id);
  }

  @Get(':id')
  findOne(@Auth('auth') auth: TAuth, @Param('id') id: string): Promise<Invoice> {
    return this.invoicesService.findOne(auth.id, id);
  }

  @Post()
  create(@Auth('auth') auth: TAuth, @Body() data: CreateInvoiceDto): Promise<Invoice> {
    return this.invoicesService.create(auth.id, data);
  }
}
