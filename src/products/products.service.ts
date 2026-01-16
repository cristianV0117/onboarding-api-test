import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Savings Account', price: 0 },
    { id: 2, name: 'Credit Card', price: 50 },
    { id: 3, name: 'Personal Loan', price: 100 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
