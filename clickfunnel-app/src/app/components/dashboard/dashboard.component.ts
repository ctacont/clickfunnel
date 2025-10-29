import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FunnelService } from '../../services/funnel.service';
import { ClickTrackingService } from '../../services/click-tracking.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private productService = inject(ProductService);
  private funnelService = inject(FunnelService);
  private clickTrackingService = inject(ClickTrackingService);

  products = this.productService.products;
  funnels = this.funnelService.funnels;
  
  funnelAnalytics = computed(() => {
    const funnel = this.funnels()[0];
    return funnel ? this.funnelService.getFunnelAnalytics(funnel.id) : null;
  });

  productAnalytics = computed(() => 
    this.clickTrackingService.getAllProductsAnalytics()
  );

  totalClicks = computed(() => 
    this.productAnalytics().reduce((sum, p) => sum + p.totalClicks, 0)
  );

  totalConversions = computed(() => 
    this.productAnalytics().reduce((sum, p) => sum + p.conversions, 0)
  );

  averageConversionRate = computed(() => {
    const analytics = this.productAnalytics();
    if (analytics.length === 0) return 0;
    const sum = analytics.reduce((total, p) => total + p.conversionRate, 0);
    return sum / analytics.length;
  });

  resetData(): void {
    if (confirm('Möchten Sie wirklich alle Daten auf Null zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      this.clickTrackingService.resetAllData();
    }
  }

  restoreDemoData(): void {
    if (confirm('Möchten Sie die Demo-Daten wiederherstellen?')) {
      this.clickTrackingService.restoreDemoData();
    }
  }

  getProductName(productId: string): string {
    const product = this.products().find(p => p.id === productId);
    return product ? product.name : `Product ${productId}`;
  }
}
