import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ClickTrackingService } from '../../services/click-tracking.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private clickTrackingService = inject(ClickTrackingService);

  product = signal<Product | undefined>(undefined);
  quantity = signal(1);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundProduct = this.productService.getProductById(id);
      if (foundProduct) {
        this.product.set(foundProduct);
        // Tracking erfolgt bereits in ProductsComponent.viewDetails()
      } else {
        this.router.navigate(['/products']);
      }
    }
  }

  addToCart(): void {
    const prod = this.product();
    if (prod) {
      // Track als checkout click wenn "In den Warenkorb" geklickt wird
      this.clickTrackingService.trackClick(prod.id, 'checkout', 'click', {
        source: 'product-detail',
        action: 'add-to-cart',
        quantity: this.quantity(),
        timestamp: new Date()
      });
      // Dann zum Warenkorb hinzufügen
      this.cartService.addToCart(prod, this.quantity());
    }
  }

  increaseQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  decreaseQuantity(): void {
    this.quantity.update(q => Math.max(1, q - 1));
  }
}
