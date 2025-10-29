import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { ClickTrackingService } from './services/click-tracking.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Click Funnel Analytics');
  protected readonly isNavCollapsed = signal(false);
  protected readonly isCartOpen = signal(false);
  protected readonly showThankYouModal = signal(false);
  protected readonly cartService = inject(CartService);
  private readonly clickTrackingService = inject(ClickTrackingService);

  toggleNav(): void {
    this.isNavCollapsed.update(val => !val);
  }

  toggleCart(): void {
    const wasCartClosed = !this.isCartOpen();
    this.isCartOpen.update(val => !val);
    
    // Track Checkout nur wenn Cart gerade geöffnet wird UND Produkte im Warenkorb sind
    if (wasCartClosed && this.cartService.cartItems().length > 0) {
      const items = this.cartService.cartItems();
      items.forEach(item => {
        this.clickTrackingService.trackClick(item.product.id, 'checkout', 'view', {
          source: 'cart-sidebar',
          action: 'cart-opened',
          quantity: item.quantity
        });
      });
    }
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  checkout(): void {
    // Track für alle Produkte im Warenkorb ein thank-you Conversion Event
    const items = this.cartService.cartItems();
    items.forEach(item => {
      this.clickTrackingService.trackClick(item.product.id, 'thank-you', 'conversion', {
        source: 'cart',
        action: 'checkout',
        quantity: item.quantity,
        revenue: item.product.price * item.quantity
      });
    });
    
    // Danke Modal zeigen
    this.showThankYouModal.set(true);
    this.toggleCart();
  }

  closeThankYouModal(): void {
    this.showThankYouModal.set(false);
    this.cartService.clearCart();
  }
}
