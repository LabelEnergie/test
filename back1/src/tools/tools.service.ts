import { HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { TProduct } from 'src/maintenance/maintenance.type';
import { throwError } from 'src/utils/error';
import { roundNumber } from 'src/utils/number';
import { getStaticFilePath } from 'src/utils/image';

@Injectable()
export class ToolsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getProducts(productIds: number[]): Promise<any[]> {
    try {
      const products = await this.firebaseService.query(
        'products',
        'id',
        'in',
        productIds
      );
      return products;
    } catch (error) {
      throwError('Error fetching products', 500);
    }
  }

  formatRowsToProducts(rows: any[]): TProduct[] {
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      image: getStaticFilePath(r.image),
      soloPrice: r.soloPrice,
      manyPrice: r.manyPrice,
    }));
  }

  async getCustomContractPrice(type: string, productIds: number[]) {
    const rows = await this.getProducts(productIds);
    const products = this.formatRowsToProducts(rows);

    const priceByType = this.getPriceByType(type);

    const productPrices = products.map((product) => {
      let price = priceByType;
      if (type == 'custom') {
        price = product.soloPrice;
        if (products.length > 1) {
          price = product.manyPrice;
        }
      }
      return {
        ...product,
        realPrice: roundNumber(price, 2),
      } as TProduct;
    });

    const totalPrice =
      type == 'custom'
        ? roundNumber(
            productPrices.reduce((acc, product) => acc + product.realPrice, 0),
            2,
          )
        : this.getPriceByType(type);

    return {
      totalPrice,
      products: productPrices,
    };
  }

  private getPriceByType(type: string): number {
    switch (type) {
      case 'essentiel':
        return 11.9;
      case 'liberte':
        return 19.9;
      case 'securite':
        return 24.9;
      default:
        return 0;
    }
  }
}
