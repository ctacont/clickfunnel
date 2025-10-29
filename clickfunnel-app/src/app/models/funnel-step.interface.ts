export interface FunnelStep {
  id: string;
  name: string;
  description: string;
  order: number;
  type: 'landing' | 'product' | 'checkout' | 'thank-you';
}

export interface FunnelStepAnalytics {
  stepId: string;
  stepName: string;
  totalVisits: number;
  uniqueVisitors: number;
  conversions: number;
  conversionRate: number;
  dropOffRate: number;
  averageTimeSpent: number; // in seconds
}
