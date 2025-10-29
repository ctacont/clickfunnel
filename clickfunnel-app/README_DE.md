# Click Funnel Analytics App

Eine moderne Angular 18 Anwendung zur Messung und Analyse von Click-Funnels für Produkte.

## 🚀 Features

- **Dashboard**: Übersichtliche KPIs und Performance-Metriken
- **Produkt-Verwaltung**: Anzeige und Tracking von Produkten
- **Funnel-Analyse**: Visualisierung des Conversion-Funnels mit Step-by-Step Analytics
- **Click-Tracking**: Automatisches Tracking von Klicks und Conversions
- **Responsive Design**: Vollständig responsive mit Bootstrap 5

## 🛠️ Technologien

- **Angular 18**: Neueste Version mit Standalone Components und Signals
- **Bootstrap 5**: Modernes, responsives UI-Framework
- **TypeScript**: Type-safe Entwicklung
- **SCSS**: Moderne Stylesheets
- **RxJS Signals**: Reaktives State Management

## 📦 Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
ng serve

# Öffne Browser unter http://localhost:4200
```

## 🏗️ Projektstruktur

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Dashboard mit KPIs
│   │   ├── products/           # Produkt-Übersicht
│   │   └── funnel-view/        # Funnel Visualisierung
│   ├── models/                 # TypeScript Interfaces
│   │   ├── product.interface.ts
│   │   ├── funnel.interface.ts
│   │   ├── funnel-step.interface.ts
│   │   └── click-event.interface.ts
│   ├── services/               # Business Logic
│   │   ├── product.service.ts
│   │   ├── funnel.service.ts
│   │   └── click-tracking.service.ts
│   ├── app.routes.ts           # Routing Konfiguration
│   ├── app.ts                  # Root Component
│   └── app.html                # Main Template
└── styles.scss                 # Globale Styles
```

## 📊 Funktionalität

### Dashboard
- **KPI-Karten**: Gesamte Klicks, Conversions, Conversion Rate, Revenue
- **Produkt-Performance-Tabelle**: Detaillierte Metriken pro Produkt
- **Funnel-Übersicht**: Schnellzugriff auf wichtige Funnel-Statistiken
- **Quick Actions**: Direkte Navigation zu allen Bereichen

### Produkte
- **Produkt-Grid**: Ansprechende Karten-Darstellung
- **Click-Tracking**: Automatisches Tracking bei View und Click
- **Produkt-Details**: Preis, Kategorie, Beschreibung
- **Hover-Effects**: Moderne Animationen

### Funnel-Analyse
- **Visueller Funnel**: Step-by-Step Darstellung des Conversion-Funnels
- **Step-Analytics**: 
  - Anzahl Besuche pro Step
  - Unique Visitors
  - Conversions
  - Conversion Rate
  - Durchschnittliche Verweildauer
- **Detaillierte Tabelle**: Alle Metriken auf einen Blick
- **Progress-Bars**: Visuelle Darstellung der Conversion Rates

## 🎯 Funnel-Steps

1. **Landing Page** 🎯 - Erste Berührung mit dem Angebot
2. **Produkt Details** 📦 - Detaillierte Produktinformationen
3. **Checkout** 💳 - Kaufabschluss
4. **Danke Seite** ✅ - Bestätigung nach Kauf

## 💾 Datenspeicherung

- Click-Events werden im `localStorage` gespeichert
- Demo-Daten werden automatisch generiert
- Persistente User-ID für wiederkehrende Besucher
- Session-basiertes Tracking

## 🎨 Design-Features

- **Bootstrap 5 Components**: Buttons, Cards, Tables, Navigation
- **Custom Animations**: Smooth transitions und hover effects
- **Responsive Grid**: Optimiert für alle Bildschirmgrößen
- **Accessibility**: ARIA-Labels und semantisches HTML
- **Dark/Light Badges**: Farbcodierte Performance-Indikatoren

## 🔧 Commands

```bash
# Development Server
ng serve

# Production Build
ng build

# Tests ausführen
ng test

# Linting
ng lint
```

## 📱 Browser-Unterstützung

- Chrome (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Edge (neueste Version)

## 🚧 Zukünftige Erweiterungen

- [ ] Echtzeit-Datenaktualisierung
- [ ] Export-Funktion für Analytics
- [ ] Custom Date-Range Picker
- [ ] A/B-Testing Unterstützung
- [ ] Email-Reports
- [ ] API-Integration
- [ ] Erweiterte Filteroptionen
- [ ] Chart.js Integration für Graphen

## 📄 Lizenz

Dieses Projekt wurde für Demo-Zwecke erstellt.

## 👨‍💻 Entwicklung

Entwickelt mit Angular 18, Bootstrap 5 und TypeScript.

**Angular Version**: 18.x  
**Node Version**: 22.x  
**npm Version**: 11.x

---

Built with ❤️ using Angular 18 & Bootstrap 5
