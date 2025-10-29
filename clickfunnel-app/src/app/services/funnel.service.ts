import { Injectable, signal } from '@angular/core';
import { Funnel, FunnelAnalytics } from '../models/funnel.interface';
import { FunnelStep, FunnelStepAnalytics } from '../models/funnel-step.interface';
import { ClickTrackingService } from './click-tracking.service';

@Injectable({
  providedIn: 'root'
})
export class FunnelService {
  private funnelsSignal = signal<Funnel[]>([
    {
      id: 'funnel-1',
      name: 'Standard Sales Funnel',
      description: 'Klassischer Verkaufs-Funnel für digitale Produkte',
      products: [],
      steps: [
        {
          id: 'landing',
          name: 'Landing Page',
          description: 'Erste Berührung mit dem Angebot',
          order: 1,
          type: 'landing'
        },
        {
          id: 'product',
          name: 'Produkt Details',
          description: 'Detaillierte Produktinformationen',
          order: 2,
          type: 'product'
        },
        {
          id: 'checkout',
          name: 'Checkout',
          description: 'Kaufabschluss',
          order: 3,
          type: 'checkout'
        },
        {
          id: 'thank-you',
          name: 'Danke Seite',
          description: 'Bestätigung nach Kauf',
          order: 4,
          type: 'thank-you'
        }
      ],
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date()
    }
  ]);

  funnels = this.funnelsSignal.asReadonly();

  constructor(private clickTrackingService: ClickTrackingService) {}

  getFunnelById(id: string): Funnel | undefined {
    return this.funnelsSignal().find(f => f.id === id);
  }

  getFunnelSteps(funnelId: string): FunnelStep[] {
    const funnel = this.getFunnelById(funnelId);
    return funnel ? funnel.steps.sort((a, b) => a.order - b.order) : [];
  }

  getFunnelStepAnalytics(funnelId: string): FunnelStepAnalytics[] {
    const steps = this.getFunnelSteps(funnelId);
    const events = this.clickTrackingService.clickEvents();

    return steps.map(step => {
      const stepEvents = events.filter(e => e.stepId === step.id);
      const views = stepEvents.filter(e => e.eventType === 'view' || e.eventType === 'click');
      const conversions = stepEvents.filter(e => e.eventType === 'conversion');
      const uniqueVisitors = new Set(stepEvents.map(e => e.userId)).size;

      return {
        stepId: step.id,
        stepName: step.name,
        totalVisits: stepEvents.length,
        uniqueVisitors,
        conversions: conversions.length,
        conversionRate: views.length > 0 ? (conversions.length / views.length) * 100 : 0,
        dropOffRate: 0, // Wird berechnet im Vergleich zum vorherigen Step
        averageTimeSpent: Math.floor(Math.random() * 120) + 30 // Demo: 30-150 Sekunden
      };
    });
  }

  getFunnelAnalytics(funnelId: string): FunnelAnalytics {
    const funnel = this.getFunnelById(funnelId);
    const events = this.clickTrackingService.clickEvents();
    
    const funnelEvents = events.filter(e => 
      funnel?.steps.some(step => step.id === e.stepId)
    );

    const totalVisitors = new Set(funnelEvents.map(e => e.userId)).size;
    const completedFunnels = events.filter(e => 
      e.stepId === 'thank-you' && e.eventType === 'conversion'
    ).length;

    return {
      funnelId,
      funnelName: funnel?.name || 'Unknown',
      totalVisitors,
      completedFunnels,
      overallConversionRate: totalVisitors > 0 ? (completedFunnels / totalVisitors) * 100 : 0,
      totalRevenue: completedFunnels * 150, // Demo: durchschnittlich 150€ pro Conversion
      averageOrderValue: 150,
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 Tage zurück
        end: new Date()
      }
    };
  }

  addFunnel(funnel: Funnel): void {
    this.funnelsSignal.update(funnels => [...funnels, funnel]);
  }

  updateFunnel(id: string, updates: Partial<Funnel>): void {
    this.funnelsSignal.update(funnels =>
      funnels.map(f => f.id === id ? { ...f, ...updates, updatedAt: new Date() } : f)
    );
  }
}
