# Statistik Lern-App – Uni Bern

Interaktive Web-App zum Lernen für die Statistik-Prüfung bei Prof. Dr. Axel Franzen, Universität Bern, **11. Juni 2026**.

## Projektstand

Die App ist vollständig funktionsfähig. Alle 4 Kerndateien sind implementiert:

| Datei | Inhalt |
|---|---|
| `index.html` | Struktur: Sidebar + Theorie-Tab + Übungs-Tab |
| `style.css` | Dark-Sidebar-Design, responsiv |
| `data.js` | 8 Kapitel, 34 Themen, LaTeX-Theorie-Inhalte |
| `app.js` | Navigation, KI-Aufgaben-Generator, Tracking |

**Inhalt:** 8 Kapitel aus den Vorlesungsskripten (Quellen: `txt_files/`):
1. Einführung (Variablen, Skalenniveaus, Häufigkeitstabellen)
2. Univariate Verteilungen (Lagemasse, Streuung, Schiefe, Gini)
3. Bivariate Analyse I – Nominal (Kreuztabellen, Chi², Phi, Lambda, Tau)
4. Bivariate Analyse II – Ordinal/Metrisch (Kendall, Pearson r, Spearman, Eta)
5. Inferenzstatistik I (Normalverteilung, Konfidenzintervalle)
6. Inferenzstatistik II (z-Test, t-Test, Chi²-Test, Korrelationstest)
7. Regression I – Bivariat (OLS, R², Signifikanztest, Stata-Output)
8. Regression II – Multivariat (Dummies, korr. R², Interaktion, Transformationen)

## App starten

**Wichtig:** Nicht per Doppelklick öffnen (`file://` blockiert JS). Stattdessen:

```bash
cd "X:/Arian/allerlei/StatPrue"
python -m http.server 8080
```

Dann im Browser: `http://localhost:8080`

Für alle Geräte im WLAN: `python -m http.server 8080 --bind 0.0.0.0` → `http://192.168.x.x:8080`

## API-Key

In `app.js` Zeile 3, Variable `API_KEY`. Modell: `claude-haiku-4-5-20251001`.

## Offene Punkte / Ideen

- [ ] GitHub Pages Deployment (damit App von überall erreichbar ist)
- [ ] Inhalt der `excercises/`-PDFs stärker in `exerciseContext` der Themen einarbeiten
- [ ] Evtl. Formelblatt-Tab oder Suchfunktion ergänzen
