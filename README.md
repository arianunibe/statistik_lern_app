# Statistik Lern-App

Interaktive Web-App zur Prüfungsvorbereitung, **Prüfung: 11. Juni 2026**.

**Live:** https://arianunibe.github.io/statistik_lern_app  
**Repo:** https://github.com/arianunibe/statistik_lern_app  
**Lokal:** `python -m http.server 8080` → `http://localhost:8080`

---

## Dateien (6)

| Datei | Inhalt |
|---|---|
| `index.html` | Struktur: Sidebar + 6 Tabs |
| `style.css` | Dark-Sidebar-Design, Layout |
| `data.js` | 8 Kapitel, 34 Themen, LaTeX-Theorie-Inhalte |
| `app.js` | Navigation, KI-Aufgaben-Generator, Chat, Tracking |
| `finder.js` | Methoden-Finder (Entscheidungsbaum) + Szenario-Training |
| `reference.js` | Formelsammlung (10 Abschnitte, Suchfunktion) |

Quellen: `txt_files/` (8 Vorlesungsskripte), `excercises/` (Übungs-PDFs)

---

## Tabs (6)

| Tab | Funktion |
|---|---|
| 🏠 Start | Homepage mit App-Erklärung und Quickstart-Guide |
| 📖 Theorie | 8 Kapitel / 34 Themen mit LaTeX-Inhalt + **Chat-Panel** rechts |
| ✏ Übungsaufgaben | KI-generierte Aufgaben (Berechnung / MC / Interpretation / Mix) |
| 🧭 Methoden-Finder | Entscheidungsbaum + KI-Szenario-Training |
| 📋 Formelsammlung | Kernformeln, Notation-Tabelle, Legenden, Suchfunktion |
| 📖 Anleitung: API-Key | Schritt-für-Schritt-Anleitung zur Einrichtung des Anthropic API-Keys |

---

## Technisches

- **Anthropic API:** `claude-haiku-4-5-20251001`, direkt aus dem Browser (`anthropic-dangerous-direct-browser-access: true`)
- **API-Key:** in `localStorage` (`statprue_apikey`), niemals im Code
- **MathJax v3:** LaTeX-Rendering, manuell mit `MathJax.typesetPromise()` aufgerufen
- **Tracking:** `localStorage` (`statprue_tracking`), Schwächen-Tracking pro Thema
- **Deployment:** GitHub Pages (public repo, kostenlos), nach `git push` ca. 1 Min. bis live

---

## Chat-Panel (Theorie-Tab)

Beim Öffnen eines Theorie-Themas erscheint rechts ein 360px-Chat-Panel:
- Setzt sich automatisch zurück wenn ein neues Thema geöffnet wird
- Bewahrt Gesprächshistorie innerhalb desselben Themas (Multi-Turn)
- Claude erhält als Systemprompt das aktuell geöffnete Thema als Kontext
- ↺-Knopf zum manuellen Zurücksetzen
- Nutzt denselben API-Key und `markdownToHtml`-Parser wie Übungsaufgaben

---

## Stand der Theorie-Inhalte (`data.js`)

Alle 34 Themen sind implementiert. Die Inhalte wurden zuletzt umfassend überarbeitet:
- Intuitive Erklärungen und Beispiele ergänzt (wo vorher nur Formeln standen)
- „Welches Lagemass wann?" Tabelle, Quantile-Rechenbeispiel, Lorenzkurve Schritt für Schritt
- Warum n−1? (Freiheitsgrade), Einkommensverteilung als Schiefe-Beispiel
- Lambda-Beispiel (krank/gesund), C/D-Paar-Intuition, Pearson Kausalitätswarnung
- p-Wert richtig erklärt, „Welcher Test wann?" Tabelle
- Lazarsfeld 4 Fälle als Tabelle, ZGW n≥30-Regel, KI-Zahlenbeispiel (IQ)

---

## Offene Ideen / mögliche nächste Schritte

- [ ] Prüfungssimulations-Modus: gemischte Aufgaben aus allen Kapiteln mit Timer
- [ ] Inhalt der `excercises/`-PDFs stärker in `exerciseContext` der Themen einarbeiten
- [ ] Chat-Verlauf pro Thema in `localStorage` speichern (bleibt nach Reload erhalten)
- [ ] Mobile-Layout für Chat-Panel (ausklappbar)
