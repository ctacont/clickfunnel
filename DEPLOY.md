# GitHub Pages Deploy

Diese Datei dokumentiert den GitHub Pages Deploy-Prozess.

## Live Demo

Die App ist verfügbar unter: **https://ctacont.github.io/clickfunnel/**

## Deploy-Prozess

### Automatischer Deploy

1. Build erstellen:
```bash
cd clickfunnel-app
ng build --base-href /clickfunnel/
```

2. 404.html erstellen (für SPA-Routing):
```bash
cd dist/clickfunnel-app/browser
Copy-Item index.html 404.html
```

3. Build nach docs/ kopieren:
```bash
cd ../../..
if (Test-Path docs) { Remove-Item -Recurse -Force docs }
New-Item -ItemType Directory -Path docs
Copy-Item -Recurse clickfunnel-app\dist\clickfunnel-app\browser\* docs\
```

4. Commit und Push:
```bash
git add .
git commit -m "Deploy: Update GitHub Pages"
git push
```

### GitHub Pages Einstellungen

1. Gehe zu Repository Settings
2. Navigiere zu "Pages" im linken Menü
3. Source: "Deploy from a branch"
4. Branch: "main"
5. Folder: "/docs"
6. Speichern

## Build-Größe

- **main.js**: ~296 KB
- **styles.css**: ~227 KB
- **polyfills.js**: ~35 KB
- **Total**: ~558 KB (komprimiert ~114 KB)

## Notizen

- Die App verwendet HashLocationStrategy für bessere Kompatibilität mit GitHub Pages
- LocalStorage wird für Datenpersistenz verwendet
- Alle Assets werden relativ geladen mit base-href `/clickfunnel/`
