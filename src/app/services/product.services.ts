// product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { name: 'Zapatillas deportivas', price: 99.99 },
    { name: 'Camiseta de entrenamiento', price: 29.99 },
    { name: 'Pantalones cortos', price: 19.99 }
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }
}
