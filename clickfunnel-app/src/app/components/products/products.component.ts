import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ClickTrackingService } from '../../services/click-tracking.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private productService = inject(ProductService);
  private clickTrackingService = inject(ClickTrackingService);
  private cartService = inject(CartService);
  private router = inject(Router);

  products = this.productService.products;

  addToCart(product: Product): void {
    // Track als checkout click wenn "In den Warenkorb" geklickt wird
    this.clickTrackingService.trackClick(product.id, 'checkout', 'click', {
      source: 'product-list',
      action: 'add-to-cart',
      timestamp: new Date()
    });
    // Dann zum Warenkorb hinzufügen
    this.cartService.addToCart(product);
  }

  viewDetails(product: Product): void {
    // Track als product step (Produktdetails werden angesehen)
    this.clickTrackingService.trackClick(product.id, 'product', 'click', {
      source: 'product-list',
      action: 'view-details',
      timestamp: new Date()
    });
    this.router.navigate(['/products', product.id]);
  }
}
