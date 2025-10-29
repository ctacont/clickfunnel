import { Injectable, signal } from '@angular/core';
import { ClickEvent, ProductClickAnalytics } from '../models/click-event.interface';

@Injectable({
  providedIn: 'root'
})
export class ClickTrackingService {
  private clickEventsSignal = signal<ClickEvent[]>([]);
  private sessionId: string = this.generateSessionId();
  
  clickEvents = this.clickEventsSignal.asReadonly();

  constructor() {
    // Lade gespeicherte Events aus localStorage
    this.loadEventsFromStorage();
  }

  trackClick(
    productId: string,
    stepId: string,
    eventType: 'view' | 'click' | 'conversion' | 'exit',
    metadata?: any
  ): void {
    const event: ClickEvent = {
      id: this.generateId(),
      productId,
      stepId,
      userId: this.getUserId(),
      sessionId: this.sessionId,
      timestamp: new Date(),
      eventType,
      metadata
    };

    this.clickEventsSignal.update(events => [...events, event]);
    this.saveEventsToStorage();
  }

  getProductAnalytics(productId: string): ProductClickAnalytics {
    const events = this.clickEventsSignal().filter(e => e.productId === productId);
    const clicks = events.filter(e => e.eventType === 'click' || e.eventType === 'view');
    const conversions = events.filter(e => e.eventType === 'conversion');
    const uniqueUsers = new Set(events.map(e => e.userId)).size;

    const clicksByStep: { [stepId: string]: number } = {};
    events.forEach(event => {
      if (event.eventType === 'click' || event.eventType === 'view') {
        clicksByStep[event.stepId] = (clicksByStep[event.stepId] || 0) + 1;
      }
    });

    return {
      productId,
      productName: `Product ${productId}`,
      totalClicks: clicks.length,
      uniqueUsers,
      conversions: conversions.length,
      conversionRate: clicks.length > 0 ? (conversions.length / clicks.length) * 100 : 0,
      revenue: conversions.length * 100, // Demo value
      clicksByStep
    };
  }

  getAllProductsAnalytics(): ProductClickAnalytics[] {
    // Immer alle 4 Produkte anzeigen, auch wenn keine Events vorhanden sind
    const allProductIds = ['1', '2', '3', '4'];
    const existingProductIds = [...new Set(this.clickEventsSignal().map(e => e.productId))];
    
    // Kombiniere existierende und alle Produkt-IDs
    const productIds = [...new Set([...existingProductIds, ...allProductIds])].sort();
    
    return productIds.map(id => this.getProductAnalytics(id));
  }

  clearEvents(): void {
    this.clickEventsSignal.set([]);
    this.saveEventsToStorage();
  }

  resetAllData(): void {
    this.clickEventsSignal.set([]);
    localStorage.removeItem('clickEvents');
    localStorage.removeItem('userId');
    localStorage.removeItem('cart_items');
    this.sessionId = this.generateSessionId();
  }

  restoreDemoData(): void {
    this.clickEventsSignal.set([]);
    localStorage.removeItem('clickEvents');
    localStorage.removeItem('userId');
    this.sessionId = this.generateSessionId();
    this.generateDemoData();
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUserId(): string {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userId', userId);
    }
    return userId;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveEventsToStorage(): void {
    localStorage.setItem('clickEvents', JSON.stringify(this.clickEventsSignal()));
  }

  private loadEventsFromStorage(): void {
    const stored = localStorage.getItem('clickEvents');
    if (stored) {
      try {
        const events = JSON.parse(stored);
        this.clickEventsSignal.set(events.map((e: any) => ({
          ...e,
          timestamp: new Date(e.timestamp)
        })));
      } catch (error) {
        console.error('Error loading events from storage:', error);
      }
    }
  }

  generateDemoData(): void {
    const productIds = ['1', '2', '3', '4'];
    const stepIds = ['landing', 'product', 'checkout', 'thank-you'];
    const eventTypes: ('view' | 'click' | 'conversion' | 'exit')[] = ['view', 'click', 'conversion', 'exit'];

    for (let i = 0; i < 50; i++) {
      const productId = productIds[Math.floor(Math.random() * productIds.length)];
      const stepId = stepIds[Math.floor(Math.random() * stepIds.length)];
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      this.trackClick(productId, stepId, eventType, {
        source: 'demo',
        device: Math.random() > 0.5 ? 'desktop' : 'mobile'
      });
    }
  }
}
