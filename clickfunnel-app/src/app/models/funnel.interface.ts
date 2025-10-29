import { FunnelStep } from './funnel-step.interface';
import { Product } from './product.interface';

export interface Funnel {
  id: string;
  name: string;
  description: string;
  products: Product[];
  steps: FunnelStep[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FunnelAnalytics {
  funnelId: string;
  funnelName: string;
  totalVisitors: number;
  completedFunnels: number;
  overallConversionRate: number;
  totalRevenue: number;
  averageOrderValue: number;
  dateRange: {
    start: Date;
    end: Date;
  };
}
