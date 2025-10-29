export interface ClickEvent {
  id: string;
  productId: string;
  stepId: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  eventType: 'view' | 'click' | 'conversion' | 'exit';
  metadata?: {
    source?: string;
    device?: string;
    browser?: string;
    [key: string]: any;
  };
}

export interface ProductClickAnalytics {
  productId: string;
  productName: string;
  totalClicks: number;
  uniqueUsers: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  clicksByStep: { [stepId: string]: number };
}
