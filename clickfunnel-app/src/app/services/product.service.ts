import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSignal = signal<Product[]>([
    {
      id: '1',
      name: 'Premium E-Book',
      description: 'Umfassendes E-Book über digitales Marketing',
      price: 29.99,
      category: 'Digital',
      imageUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Online-Kurs: SEO Mastery',
      description: 'Lernen Sie SEO von Grund auf',
      price: 149.99,
      category: 'Kurse',
      imageUrl: 'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=600',
      createdAt: new Date('2024-02-20')
    },
    {
      id: '3',
      name: 'Consulting Paket',
      description: '1:1 Beratung für Ihr Business',
      price: 499.99,
      category: 'Services',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      createdAt: new Date('2024-03-10')
    },
    {
      id: '4',
      name: 'Software Tool Lizenz',
      description: 'Jahres-Lizenz für unser Analytics Tool',
      price: 99.99,
      category: 'Software',
      imageUrl: 'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=600',
      createdAt: new Date('2024-04-05')
    }
  ]);

  products = this.productsSignal.asReadonly();

  getProductById(id: string): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }

  addProduct(product: Product): void {
    this.productsSignal.update(products => [...products, product]);
  }

  updateProduct(id: string, updates: Partial<Product>): void {
    this.productsSignal.update(products =>
      products.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  }

  deleteProduct(id: string): void {
    this.productsSignal.update(products => products.filter(p => p.id !== id));
  }
}
