# Click Funnel Analytics

Eine moderne Angular-Anwendung zur Messung und Analyse von Click-Funnels für digitale Produkte.

## 🚀 Features

- **📊 Dashboard** - Übersicht über KPIs (Klicks, Conversions, Conversion Rate, Revenue)
- **🛍️ Produktverwaltung** - 4 Demo-Produkte mit Pexels-Bildern
- **🔍 Funnel-Analyse** - Detaillierte Tracking-Analyse über 4 Funnel-Steps
- **🛒 Warenkorb** - Interaktive Sidebar mit Produktverwaltung
- **📈 Echtzeit-Tracking** - Alle Benutzerinteraktionen werden getrackt
- **💾 LocalStorage** - Persistente Datenspeicherung

## 🛠️ Technologie-Stack

- **Angular 20.3.0** - Neueste Version mit Standalone Components
- **Bootstrap 5.3.8** - Responsive UI Framework
- **TypeScript 5.9.2** - Type-safe JavaScript
- **ng-bootstrap 19.0.1** - Bootstrap Components für Angular
- **Chart.js 4.5.1** - Datenvisualisierung (vorbereitet)
- **Signals** - Reaktive State Management

## 📦 Installation

```bash
# Repository klonen
git clone https://github.com/ctacont/clickfunnel.git
cd clickfunnel/clickfunnel-app

# Dependencies installieren
npm install

# Development Server starten
ng serve
```

Die App läuft dann unter `http://localhost:4200/`

## 🎯 Funnel-Steps

1. **Product Details** - Nutzer klickt auf "Details anzeigen"
2. **Add to Cart** - Nutzer klickt auf "In den Warenkorb"
3. **Checkout** - Warenkorb-Sidebar wird geöffnet
4. **Thank You** - Klick auf "Zur Kasse" → Conversion

## 📱 Funktionen

### Dashboard
- Gesamte Klicks, Conversions, durchschnittliche Rate
- Revenue-Tracking
- Produkt-Performance-Tabelle
- Funnel-Übersicht
- **Daten zurücksetzen** - Alle Daten auf null setzen
- **Demo-Daten wiederherstellen** - 50 Demo-Events generieren

### Produkte
- 4 vorkonfigurierte Produkte:
  - Premium E-Book (€29.99)
  - Online-Kurs: SEO Mastery (€149.99)
  - Consulting Paket (€499.99)
  - Software Tool Lizenz (€99.99)
- Produktbilder von Pexels
- "Details anzeigen" und "In den Warenkorb" Buttons

### Funnel-Analyse
- Visuelle Darstellung des Sales Funnels
- Detaillierte Metriken pro Step
- Conversion Rates und Drop-Off Rates
- Durchschnittliche Verweildauer

### Warenkorb
- Slide-in Sidebar von rechts
- Produkt-Liste mit Mengen
- Gesamtpreis-Berechnung
- Einzelne Produkte entfernen
- "Zur Kasse" → Thank-You Modal
- "Warenkorb leeren" Button

## 🔧 Projekt-Struktur

```
clickfunnel-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   ├── product-detail/
│   │   │   └── funnel-view/
│   │   ├── models/
│   │   │   ├── product.interface.ts
│   │   │   ├── click-event.interface.ts
│   │   │   ├── funnel.interface.ts
│   │   │   ├── funnel-step.interface.ts
│   │   │   └── cart-item.interface.ts
│   │   ├── services/
│   │   │   ├── product.service.ts
│   │   │   ├── click-tracking.service.ts
│   │   │   ├── funnel.service.ts
│   │   │   └── cart.service.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.scss
│   │   └── app.routes.ts
│   └── styles.scss
├── angular.json
├── package.json
└── tsconfig.json
```

## 📊 Event-Tracking

Die App trackt folgende Events:

- **view** - Seitenaufruf oder Produktansicht
- **click** - Button-Klick
- **conversion** - Erfolgreicher Kauf
- **exit** - Verlassen des Funnels (vorbereitet)

Jedes Event enthält:
```typescript
{
  id: string;
  productId: string;
  stepId: 'landing' | 'product' | 'checkout' | 'thank-you';
  userId: string;
  sessionId: string;
  timestamp: Date;
  eventType: 'view' | 'click' | 'conversion' | 'exit';
  metadata?: any;
}
```

## 🎨 Design

- **Responsive** - Mobile-first Design
- **Bootstrap 5** - Moderne UI-Komponenten
- **Animationen** - Smooth Transitions und Hover-Effekte
- **Toast-Benachrichtigungen** - Feedback bei Warenkorb-Aktionen
- **Modal** - Thank-You Popup nach Kauf

## 👤 Autor

**Hasan Yüksel**
- Website: [https://hasanyuksel.de/](https://hasanyuksel.de/)
- Email: info@hasanyueksel.de
- GitHub: [@ctacont](https://github.com/ctacont/)

## 📄 Lizenz

© 2025 by Hasan Yüksel - Alle Rechte vorbehalten.

---

**DEMO APP: Click Funnel Analytics**  
Erstellt mit Angular 20 + Bootstrap 5
