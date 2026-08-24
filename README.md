# Thailand Steuer-App 2026 🇹🇭 (Bilingual: DE / EN)

Eine moderne, präzise und interaktive Web-Applikation zur Berechnung der **Persönlichen Einkommensteuer (PIT)** und der **Körperschaftsteuer (CIT)** nach den aktuellen gesetzlichen Vorgaben des thailändischen Revenue Code für das Steuerjahr **2026**.

---

## 🌟 Hauptfunktionen & Neuerungen

### 1. Altersabhängige Freibeträge (50 Jahre vs. 70 Jahre)
- **Standard (unter 65 Jahren):** Grundfreibetrag von **60.000 THB**.
- **Senioren-Freibetrag (ab 65 Jahren):**
  - Gemäß **Section 42(17)** des thailändischen Revenue Code (Ministerial Regulation No. 126) erhalten Steueransässige ($\ge 180$ Tage) ab dem 65. Lebensjahr eine zusätzliche Steuerbefreiung von **190.000 THB**.
  - **Vergleich:**
    - Ein **50-Jähriger** hat einen Grundfreibetrag von **60.000 THB** (zusammen mit der 0%-Stufe bis 150k sind 210.000 THB steuerfrei).
    - Ein **70-Jähriger** hat **250.000 THB** Freibeträge ($60.000 + 190.000\text{ THB}$) – zusammen mit der 0%-Stufe sind **400.000 THB** steuerfrei!
- **Unterhalt für ältere Eltern:** Zusätzlicher Freibetrag von **30.000 THB je Elternteil** (ab 60 Jahren mit eigenem Einkommen $\le 30.000\text{ THB}$).

---

### 2. Vollständige Zweisprachigkeit (Deutsch & Englisch)
- Umschaltbar über den **DE / EN** Toggle im Header.
- Sämtliche Beschriftungen, Eingabemasken, Tooltips, Diagramme, Auswertungen, Praxisszenarien und druckbare PDF-Steuerberichte passen sich nahtlos an.

---

### 3. Neuregelung Auslandseinkünfte & LTR-Visum (2026)
- **Tax Resident ($\ge 180$ Tage):** Jedes nach Thailand transferierte Auslandseinkommen unterliegt der vollen Besteuerung im Jahr der Überweisung (Erwirtschaftungsjahr unerheblich).
- **LTR-Visum (Long-Term Resident):** Vollständige Steuerbefreiung für Auslandseinkünfte qualifizierter Visuminhaber.
- **Non-Resident ($< 180$ Tage):** Auslandstransfers bleiben in Thailand steuerfrei.

---

### 4. Automatische Abzüge & Progressive PIT-Staffelung
- **50 % Pauschalabzug** auf Gehalt (gedeckelt auf maximal 100.000 THB).
- **30 % Standardabzug** auf Mieteinnahmen ohne Belege.
- **Progressive Steuertabelle (2026):**
  - `0 – 150.000 THB`: **0 %**
  - `150.001 – 300.000 THB`: **5 %**
  - `300.001 – 500.000 THB`: **10 %**
  - `500.001 – 750.000 THB`: **15 %**
  - `750.001 – 1.000.000 THB`: **20 %**
  - `1.000.001 – 2.000.000 THB`: **25 %**
  - `2.000.001 – 5.000.000 THB`: **30 %**
  - `Über 5.000.000 THB`: **35 %**

---

### 5. Körperschaftsteuer (CIT) & SME-Vorteilsrechner
- **SME-Kriterien:** Stammkapital $\le 5\text{ Mio. THB}$ **UND** Jahresumsatz $\le 30\text{ Mio. THB}$.
- **SME-Staffelung:** 0 % bis 300k, 15 % bis 3 Mio., 20 % ab 3 Mio. THB.
- **Non-SME:** 20 % pauschal.

---

## 🚀 Starten der App

Einfach die Datei [index.html](file:///c:/Users/Stephan/Projekte/Thailand%20Steuer%20APP/index.html) per Doppelklick in einem beliebigen Browser öffnen oder:
```bash
python -m http.server 8080
```
Browser-Aufruf: [http://localhost:8080](http://localhost:8080)

---

## 🧪 Tests ausführen
```bash
python -m unittest tests/test_tax_logic.py
```
