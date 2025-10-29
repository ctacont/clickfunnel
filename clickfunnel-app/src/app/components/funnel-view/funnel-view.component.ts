import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunnelService } from '../../services/funnel.service';
import { ClickTrackingService } from '../../services/click-tracking.service';

@Component({
  selector: 'app-funnel-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funnel-view.component.html',
  styleUrls: ['./funnel-view.component.scss']
})
export class FunnelViewComponent {
  private funnelService = inject(FunnelService);
  private clickTrackingService = inject(ClickTrackingService);

  funnels = this.funnelService.funnels;
  selectedFunnel = computed(() => this.funnels()[0]);
  
  funnelSteps = computed(() => {
    const funnel = this.selectedFunnel();
    return funnel ? this.funnelService.getFunnelSteps(funnel.id) : [];
  });

  stepAnalytics = computed(() => {
    const funnel = this.selectedFunnel();
    return funnel ? this.funnelService.getFunnelStepAnalytics(funnel.id) : [];
  });

  funnelAnalytics = computed(() => {
    const funnel = this.selectedFunnel();
    return funnel ? this.funnelService.getFunnelAnalytics(funnel.id) : null;
  });

  getStepIcon(type: string): string {
    switch (type) {
      case 'landing': return '🎯';
      case 'product': return '📦';
      case 'checkout': return '💳';
      case 'thank-you': return '✅';
      default: return '📄';
    }
  }

  getStepColor(index: number): string {
    const colors = ['primary', 'info', 'warning', 'success'];
    return colors[index % colors.length];
  }

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
}
