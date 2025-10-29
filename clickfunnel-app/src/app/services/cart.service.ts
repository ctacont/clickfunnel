import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from '../models/product.interface';
import { CartItem } from '../models/cart-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);
  private lastAddedSignal = signal<Product | null>(null);

  cartItems = this.cartItemsSignal.asReadonly();
  lastAdded = this.lastAddedSignal.asReadonly();

  totalItems = computed(() => 
    this.cartItemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartItemsSignal().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );

  constructor() {
    this.loadFromStorage();
  }

  addToCart(product: Product, quantity: number = 1): void {
    this.cartItemsSignal.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...items, { product, quantity, addedAt: new Date() }];
      }
    });

    this.lastAddedSignal.set(product);
    this.saveToStorage();

    // Reset "last added" nach 3 Sekunden
    setTimeout(() => {
      if (this.lastAddedSignal() === product) {
        this.lastAddedSignal.set(null);
      }
    }, 3000);
  }

  removeFromCart(productId: string): void {
    this.cartItemsSignal.update(items =>
      items.filter(item => item.product.id !== productId)
    );
    this.saveToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItemsSignal.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
    this.saveToStorage();
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
    this.lastAddedSignal.set(null);
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.cartItemsSignal()));
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('cart_items');
    if (stored) {
      try {
        const items = JSON.parse(stored);
        this.cartItemsSignal.set(items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })));
      } catch (e) {
        console.error('Failed to load cart from storage', e);
      }
    }
  }
}
