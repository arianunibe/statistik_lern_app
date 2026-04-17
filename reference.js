// ─── reference.js ─── Formelsammlung ────────────────────────────

function initReference() {
  renderAllSections();
  document.getElementById('ref-search').addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    document.querySelectorAll('.ref-section').forEach(el => {
      const text = (el.dataset.keywords + ' ' + el.textContent).toLowerCase();
      el.style.display = (!q || text.includes(q)) ? '' : 'none';
    });
  });
}

function renderAllSections() {
  const container = document.getElementById('reference-list');
  container.innerHTML = REFERENCE_DATA.map(s => `
    <div class="ref-section" data-keywords="${s.keywords}">
      <div class="ref-section-title">${s.title}</div>
      <div class="ref-section-body">${s.content}</div>
    </div>
  `).join('');
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([container]).catch(() => {});
  }
}

// ─── Content ─────────────────────────────────────────────────────
const REFERENCE_DATA = [

// ── 1. Notation ──────────────────────────────────────────────────
{
  title: '📐 Notation: Schätzer vs. wahrer Wert',
  keywords: 'notation symbol schätzer parameter stichprobe grundgesamtheit pi hat dach varianz sigma mu rho beta alpha n N',
  content: `
<table class="ref-table">
  <thead><tr>
    <th>Grösse</th>
    <th>Schätzer (Stichprobe)</th>
    <th>Empirisch (Stichprobe)</th>
    <th>Wahrer Wert (Grundgesamtheit)</th>
  </tr></thead>
  <tbody>
    <tr><td>Mittelwert</td>
        <td>$\\bar{x}$</td>
        <td>–</td>
        <td>$\\mu$</td></tr>
    <tr><td>Varianz</td>
        <td>$s^2 = \\frac{1}{n-1}\\sum(x_i-\\bar{x})^2$</td>
        <td>$S^2 = \\frac{1}{n}\\sum(x_i-\\bar{x})^2$</td>
        <td>$\\sigma^2$</td></tr>
    <tr><td>Standardabweichung</td>
        <td>$s$</td>
        <td>$S$</td>
        <td>$\\sigma$</td></tr>
    <tr><td>Anteil / Proportion</td>
        <td>$\\hat{\\pi}$ (auch $\\hat{p}$)</td>
        <td>–</td>
        <td>$\\pi$</td></tr>
    <tr><td>Korrelation (Pearson)</td>
        <td>$r$</td>
        <td>–</td>
        <td>$\\rho$</td></tr>
    <tr><td>Regressionskoeffizient</td>
        <td>$b$ (OLS-Schätzer)</td>
        <td>–</td>
        <td>$\\beta$</td></tr>
    <tr><td>Regressionskonstante</td>
        <td>$a$</td>
        <td>–</td>
        <td>$\\alpha$</td></tr>
    <tr><td>Stichprobengrösse</td>
        <td>$n$</td>
        <td>–</td>
        <td>$N$</td></tr>
    <tr><td>Freiheitsgrade</td>
        <td colspan="3">$df = n - k$ (k = Anzahl geschätzte Parameter)</td></tr>
  </tbody>
</table>
<p class="ref-note">Faustregel: lateinische Buchstaben = Stichprobe; griechische = Grundgesamtheit.</p>
`},

// ── 2. Lagemasse ─────────────────────────────────────────────────
{
  title: '📍 Lagemasse',
  keywords: 'lagemasse mittelwert median modus quantil perzentil mean average location central tendency',
  content: `
<div class="ref-grid">
  <div class="ref-card">
    <div class="ref-card-name">Arithmetisches Mittel</div>
    $$\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i$$
    <div class="ref-card-note">Nur metrisch; anfällig auf Ausreisser</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Median $\\tilde{x}$</div>
    $$\\tilde{x} = \\begin{cases} x_{(m+1)} & n = 2m+1 \\text{ (ungerade)} \\\\ \\dfrac{x_{(m)}+x_{(m+1)}}{2} & n = 2m \\text{ (gerade)} \\end{cases}$$
    <div class="ref-card-note">Ab ordinal; robust gegenüber Ausreissern</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Modus $\\hat{x}$</div>
    <p>$$\\hat{x} = \\arg\\max_{a_j}\\, f(a_j)$$</p>
    <div class="ref-card-note">Ausprägung mit grösster Häufigkeit; ab nominal; nicht eindeutig bei Multimodalität</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">$p$-Quantil $Q_p$</div>
    <p>Berechne $g = n \\cdot p$, dann:</p>
    <p>$$Q_p = \\begin{cases} \\dfrac{x_{(g)} + x_{(g+1)}}{2} & g \\in \\mathbb{Z} \\\\ x_{(\\lceil g \\rceil)} & g \\notin \\mathbb{Z} \\end{cases}$$</p>
    <p style="font-size:.78rem;margin-top:6px">$Q_{0.25}$ = 1. Quartil &nbsp;|&nbsp; $Q_{0.5} = \\tilde{x}$ (Median) &nbsp;|&nbsp; $Q_{0.75}$ = 3. Quartil</p>
    <div class="ref-card-note">IQR $= Q_{0.75} - Q_{0.25}$</div>
  </div>
</div>
<p class="ref-note">Lageregel bei Schiefe: rechtsschief → $\\bar{x} > \\text{Median} > \\text{Modus}$</p>
<div class="ref-legend"><strong>Notation:</strong> &nbsp;
  $n$ Anzahl Beobachtungen &nbsp;·&nbsp;
  $x_i$ $i$-ter Beobachtungswert &nbsp;·&nbsp;
  $x_{(i)}$ $i$-ter Wert in aufsteigend sortierter Reihe &nbsp;·&nbsp;
  $m$ Hilfsgrösse: $n=2m$ (gerade) bzw. $n=2m+1$ (ungerade) &nbsp;·&nbsp;
  $g = n{\cdot}p$ Hilfsindex für Quantilberechnung &nbsp;·&nbsp;
  $\\lceil g \\rceil$ Aufrunden auf nächste ganze Zahl &nbsp;·&nbsp;
  $a_j$ $j$-te Ausprägung &nbsp;·&nbsp;
  $f(a_j)$ absolute Häufigkeit von $a_j$
</div>
`},

// ── 3. Streuungsmasse ────────────────────────────────────────────
{
  title: '📏 Streuungsmasse & Konzentration',
  keywords: 'streuung varianz standardabweichung gini konzentration dispersion spread variance standard deviation lorenz',
  content: `
<div class="ref-grid">
  <div class="ref-card">
    <div class="ref-card-name">Empirische Varianz (deskriptiv)</div>
    $$S^2 = \\frac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2$$
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Korrigierte Varianz (Schätzer)</div>
    $$s^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(x_i - \\bar{x})^2$$
    <div class="ref-card-note">Erwartungstreu: $E[s^2] = \\sigma^2$</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Variationskoeffizient</div>
    $$CV = \\frac{s}{\\bar{x}}$$
    <div class="ref-card-note">Relativmass; Vergleich über Skalen hinweg</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Gini-Koeffizient</div>
    $$G = \\frac{\\sum_i\\sum_j |x_i - x_j|}{2n^2\\bar{x}} \\in [0,1]$$
    <div class="ref-card-note">$G=0$: Gleichverteilung; $G=1$: maximale Ungleichheit</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Nominale Variationsbreite</div>
    $$M = 1 - \\sum_j p_j^2 \\in \\left[0,\\,\\frac{k-1}{k}\\right]$$
    <div class="ref-card-note">Nur für nominale Variablen</div>
  </div>
</div>
<div class="ref-legend"><strong>Notation:</strong> &nbsp;
  $n$ Anzahl Beobachtungen &nbsp;·&nbsp;
  $x_i$ $i$-ter Beobachtungswert &nbsp;·&nbsp;
  $\\bar{x}$ arithmetisches Mittel &nbsp;·&nbsp;
  $S^2$ empirische (deskriptive) Varianz mit Divisor $n$ &nbsp;·&nbsp;
  $s^2$ korrigierte Varianz mit Divisor $n{-}1$ (erwartungstreu) &nbsp;·&nbsp;
  $p_j$ relativer Anteil der Kategorie $j$ &nbsp;·&nbsp;
  $k$ Anzahl Kategorien
</div>
`},

// ── 4. Normalverteilung ──────────────────────────────────────────
{
  title: '🔔 Normalverteilung & Standardisierung',
  keywords: 'normalverteilung standardisierung z-wert z-score standardnormalverteilung phi zentraler grenzwertsatz',
  content: `
<div class="ref-grid">
  <div class="ref-card">
    <div class="ref-card-name">Standardisierung</div>
    $$z = \\frac{x - \\mu}{\\sigma}$$
    <div class="ref-card-note">$z \\sim N(0,1)$ wenn $X \\sim N(\\mu,\\sigma^2)$</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Standardfehler des Mittelwerts</div>
    $$\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}$$
    <div class="ref-card-note">Nimmt mit $\\sqrt{n}$ ab</div>
  </div>
</div>
<table class="ref-table" style="margin-top:12px">
  <thead><tr><th>Konfidenzniveau</th><th>$\\alpha$</th><th>$z_{1-\\alpha/2}$ (zweiseitig)</th><th>$z_{1-\\alpha}$ (einseitig)</th></tr></thead>
  <tbody>
    <tr><td>90%</td><td>0.10</td><td>1.645</td><td>1.282</td></tr>
    <tr><td>95%</td><td>0.05</td><td><strong>1.960</strong></td><td>1.645</td></tr>
    <tr><td>99%</td><td>0.01</td><td>2.576</td><td>2.326</td></tr>
  </tbody>
</table>
<div class="ref-legend"><strong>Notation:</strong> &nbsp;
  $x$ Beobachtungswert &nbsp;·&nbsp;
  $\\mu$ Mittelwert der Grundgesamtheit &nbsp;·&nbsp;
  $\\sigma$ Standardabweichung der Grundgesamtheit &nbsp;·&nbsp;
  $n$ Stichprobengrösse &nbsp;·&nbsp;
  $\\sigma_{\\bar{x}} = \\sigma/\\sqrt{n}$ Standardfehler des Mittelwerts &nbsp;·&nbsp;
  $\\alpha$ Signifikanzniveau (z.B. 0.05)
</div>
`},

// ── 5. Konfidenzintervalle ───────────────────────────────────────
{
  title: '📊 Konfidenzintervalle',
  keywords: 'konfidenzintervall ki ci confidence interval mittelwert anteil proportion z t',
  content: `
<div class="ref-grid">
  <div class="ref-card">
    <div class="ref-card-name">KI für Mittelwert (z, grosse Stichprobe)</div>
    $$\\bar{x} \\pm z_{1-\\alpha/2} \\cdot \\frac{s}{\\sqrt{n}}$$
    <div class="ref-card-note">Voraussetzung: $n \\geq 30$</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">KI für Mittelwert (t, kleine Stichprobe)</div>
    $$\\bar{x} \\pm t_{1-\\alpha/2,\\, n-1} \\cdot \\frac{s}{\\sqrt{n}}$$
    <div class="ref-card-note">Voraussetzung: $X \\sim N(\\mu, \\sigma^2)$</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">KI für Anteil $\\hat{\\pi}$</div>
    $$\\hat{\\pi} \\pm z_{1-\\alpha/2} \\cdot \\sqrt{\\frac{\\hat{\\pi}(1-\\hat{\\pi})}{n}}$$
    <div class="ref-card-note">Voraussetzung: $n\\hat{\\pi} \\geq 5$ und $n(1-\\hat{\\pi}) \\geq 5$</div>
  </div>
</div>
<div class="ref-legend"><strong>Notation:</strong> &nbsp;
  $\\bar{x}$ Stichprobenmittelwert &nbsp;·&nbsp;
  $s$ korrigierte Stichproben-Standardabweichung &nbsp;·&nbsp;
  $n$ Stichprobengrösse &nbsp;·&nbsp;
  $z_{1-\\alpha/2}$ kritischer z-Wert bei Signifikanzniveau $\\alpha$ &nbsp;·&nbsp;
  $t_{1-\\alpha/2,\\,n-1}$ kritischer t-Wert mit $n{-}1$ Freiheitsgraden &nbsp;·&nbsp;
  $\\hat{\\pi}$ geschätzter Anteil in der Stichprobe
</div>
`},

// ── 6. Signifikanztests ──────────────────────────────────────────
{
  title: '🔬 Signifikanztests',
  keywords: 'signifikanztest hypothesentest z-test t-test chi2 chi quadrat korrelationstest p-wert nullhypothese alpha fehler',
  content: `
<div class="ref-grid">
  <div class="ref-card">
    <div class="ref-card-name">z-Test (Mittelwertdifferenz, $n \\geq 30$)</div>
    $$z = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sigma_{\\bar{x}_1 - \\bar{x}_2}}, \\quad \\sigma_{\\bar{x}_1-\\bar{x}_2} = \\sqrt{\\frac{s_1^2}{n_1}+\\frac{s_2^2}{n_2}}$$
  </div>
  <div class="ref-card">
    <div class="ref-card-name">t-Test (Mittelwertdifferenz, $n < 30$)</div>
    $$t = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_{\\bar{x}_1-\\bar{x}_2}}, \\quad df = n_1+n_2-2$$
  </div>
  <div class="ref-card">
    <div class="ref-card-name">$\\chi^2$-Unabhängigkeitstest</div>
    $$\\chi^2 = \\sum_{i,j}\\frac{(b_{ij}-e_{ij})^2}{e_{ij}}, \\quad e_{ij}=\\frac{b_{i\\cdot}\\,b_{\\cdot j}}{n}$$
    $$df = (k-1)(m-1)$$
    <div class="ref-card-note">Voraussetzung: $e_{ij} \\geq 5$</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Signifikanztest für $r$ / $\\rho$</div>
    $$t = \\frac{r\\sqrt{n-2}}{\\sqrt{1-r^2}}, \\quad df = n-2$$
    <div class="ref-card-note">$H_0\\colon \\rho = 0$</div>
  </div>
</div>
<table class="ref-table" style="margin-top:12px">
  <thead><tr><th>Fehlerart</th><th>Bedeutung</th><th>Wahrscheinlichkeit</th></tr></thead>
  <tbody>
    <tr><td>Fehler 1. Art ($\\alpha$)</td><td>$H_0$ fälschlicherweise verworfen</td><td>$= \\alpha$ (z.B. 5%)</td></tr>
    <tr><td>Fehler 2. Art ($\\beta$)</td><td>$H_0$ fälschlicherweise beibehalten</td><td>$= 1 - \\text{Teststärke}$</td></tr>
  </tbody>
</table>
<div class="ref-legend"><strong>Notation:</strong> &nbsp;
  $\\bar{x}_1, \\bar{x}_2$ Gruppenmittelwerte &nbsp;·&nbsp;
  $s_1^2, s_2^2$ Gruppenvarianzen &nbsp;·&nbsp;
  $n_1, n_2$ Gruppenumfänge &nbsp;·&nbsp;
  $b_{ij}$ beobachtete Häufigkeit in Zelle $(i,j)$ &nbsp;·&nbsp;
  $e_{ij} = b_{i\\cdot}b_{\\cdot j}/n$ erwartete Häufigkeit unter Unabhängigkeit &nbsp;·&nbsp;
  $k$ Anzahl Zeilen, $m$ Anzahl Spalten &nbsp;·&nbsp;
  $r$ Pearson-Korrelation in der Stichprobe
</div>
`},

// ── 7. Zusammenhang – Nominal ────────────────────────────────────
{
  title: '🔲 Zusammenhangsmasse – Nominal',
  keywords: 'nominal chi2 phi cramer v kontingenzkoeffizient lambda tau pre prozentsatzdifferenz kreuztabelle',
  content: `
<div class="ref-grid">
  <div class="ref-card">
    <div class="ref-card-name">$\\chi^2$ (Basisgrösse)</div>
    $$\\chi^2 = n\\sum_{i,j}\\frac{(h_{ij}-h_{i\\cdot}h_{\\cdot j})^2}{h_{i\\cdot}\\,h_{\\cdot j}}$$
    <div class="ref-card-note">Kein normiertes Mass; abhängig von $n$</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Phi $\\varphi$ (nur 2×2)</div>
    $$\\varphi = \\sqrt{\\frac{\\chi^2}{n}} \\in [0,1]$$
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Cramér's $V$ ($k{\\times}m$)</div>
    $$V = \\sqrt{\\frac{\\chi^2}{n\\cdot(\\min(k,m)-1)}} \\in [0,1]$$
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Kontingenzkoeffizient $K^*$</div>
    $$K = \\sqrt{\\frac{\\chi^2}{n+\\chi^2}}, \\quad K^* = \\frac{K}{\\sqrt{(I-1)/I}}$$
    <div class="ref-card-note">$I = \\min(k,m)$; $K^* \\in [0,1]$</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Lambda $\\lambda$ (PRE, asymmetrisch)</div>
    $$\\lambda = \\frac{\\sum_j \\max_i f_{ij} - \\max_j f_{\\cdot j}}{n - \\max_j f_{\\cdot j}}$$
    <div class="ref-card-note">Verbesserung der Vorhersage von $Y$ durch $X$</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Goodman-Kruskal $\\tau$ (PRE, symm.)</div>
    $$\\tau = \\frac{\\sum_j\\sum_i f_{ij}^2/f_{\\cdot j} - \\sum_i f_{i\\cdot}^2/n}{n - \\sum_i f_{i\\cdot}^2/n}$$
  </div>
</div>
<div class="ref-legend"><strong>Notation:</strong> &nbsp;
  $h_{ij}$ relative Häufigkeit in Zelle $(i,j)$ &nbsp;·&nbsp;
  $h_{i\\cdot}$ Zeilenmarginal (relative Randhäufigkeit Zeile $i$) &nbsp;·&nbsp;
  $h_{\\cdot j}$ Spaltenmarginal &nbsp;·&nbsp;
  $f_{ij}$ absolute Häufigkeit in Zelle $(i,j)$ &nbsp;·&nbsp;
  $f_{i\\cdot}$ Zeilenrandsumme &nbsp;·&nbsp;
  $f_{\\cdot j}$ Spaltenrandsumme &nbsp;·&nbsp;
  $n$ Gesamtfallzahl &nbsp;·&nbsp;
  $k$ Zeilenanzahl, $m$ Spaltenanzahl &nbsp;·&nbsp;
  $I = \\min(k,m)$
</div>
`},

// ── 8. Zusammenhang – Ordinal ────────────────────────────────────
{
  title: '🔢 Zusammenhangsmasse – Ordinal',
  keywords: 'ordinal kendall tau gamma spearman rangkorrelation konkordant diskordant P Q',
  content: `
<p class="ref-note" style="margin-bottom:10px">Paarvergleich: Für jedes Paar $(i,j)$ mit $i \ne j$ prüfen ob beide Variablen gleich- oder gegensinnig geordnet sind.</p>
<div class="ref-grid">
  <div class="ref-card">
    <div class="ref-card-name">Kendall's $\\tau_b$ (quadratisch, $k{\\times}k$)</div>
    $$\\tau_b = \\frac{P-Q}{\\sqrt{(P+Q+T_x)(P+Q+T_y)}} \\in [-1,1]$$
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Kendall's $\\tau_c$ (rechteckig, $k{\\times}m$)</div>
    $$\\tau_c = \\frac{2(P-Q)\\cdot m}{n^2(m-1)} \\in [-1,1]$$
    <div class="ref-card-note">$m = \\min(k,m)$</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Goodman-Kruskal $\\gamma$</div>
    $$\\gamma = \\frac{P-Q}{P+Q} \\in [-1,1]$$
    <div class="ref-card-note">Ignoriert Bindungen; etwas überschätzend</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Spearman's $\\rho$</div>
    $$\\rho = 1 - \\frac{6\\sum d_i^2}{n(n^2-1)} \\in [-1,1]$$
    <div class="ref-card-note">$d_i$ = Rangdifferenz; bei vielen Bindungen Pearson-Formel auf Ränge</div>
  </div>
</div>
<div class="ref-legend"><strong>Notation:</strong> &nbsp;
  $P$ Anzahl konkordanter Paare (gleiche Rangordnung in beiden Variablen) &nbsp;·&nbsp;
  $Q$ Anzahl diskordanter Paare (umgekehrte Rangordnung) &nbsp;·&nbsp;
  $T_x$ Bindungen in Variable $X$ (gleiche Rangwerte) &nbsp;·&nbsp;
  $T_y$ Bindungen in Variable $Y$ &nbsp;·&nbsp;
  $m = \\min(k,m)$ kleinere Tabellendimension &nbsp;·&nbsp;
  $d_i$ Rangdifferenz des $i$-ten Falls &nbsp;·&nbsp;
  $n$ Fallzahl
</div>
`},

// ── 9. Zusammenhang – Metrisch & Eta ────────────────────────────
{
  title: '📈 Zusammenhangsmasse – Metrisch & Eta',
  keywords: 'pearson korrelation eta metrisch zusammenhang r kovarianz covariance metric',
  content: `
<div class="ref-grid">
  <div class="ref-card">
    <div class="ref-card-name">Pearson $r$ (metrisch × metrisch)</div>
    $$r = \\frac{\\sum(x_i-\\bar{x})(y_i-\\bar{y})}{n \\cdot s_x \\cdot s_y} \\in [-1,1]$$
    <div class="ref-card-note">Alternativ: $r = \\frac{\\text{Cov}(X,Y)}{s_X s_Y}$</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Kovarianz</div>
    $$\\text{Cov}(X,Y) = \\frac{1}{n}\\sum(x_i-\\bar{x})(y_i-\\bar{y})$$
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Eta $\\eta$ (nominal × metrisch)</div>
    $$\\eta^2 = \\frac{\\sum_j n_j(\\bar{y}_j - \\bar{y})^2}{\\sum_i(y_i-\\bar{y})^2} = \\frac{SSB}{SST} \\in [0,1]$$
    <div class="ref-card-note">Misst Stärke, nicht Richtung</div>
  </div>
</div>
<div class="ref-legend"><strong>Notation:</strong> &nbsp;
  $x_i, y_i$ Beobachtungswerte der zwei Variablen &nbsp;·&nbsp;
  $\\bar{x}, \\bar{y}$ Mittelwerte &nbsp;·&nbsp;
  $s_x, s_y$ Standardabweichungen &nbsp;·&nbsp;
  $n_j$ Anzahl Fälle in Gruppe $j$ (bei Eta) &nbsp;·&nbsp;
  $\\bar{y}_j$ Mittelwert der AV in Gruppe $j$ &nbsp;·&nbsp;
  $\\bar{y}$ Gesamtmittelwert der AV &nbsp;·&nbsp;
  $SSB$ erklärte Quadratsumme (between), $SST$ Gesamtquadratsumme
</div>
`},

// ── 10. Regression ───────────────────────────────────────────────
{
  title: '📉 Regression (OLS)',
  keywords: 'regression ols ordinary least squares regressionskoeffizient bestimmtheitsmass r2 adj dummy interaktion beta',
  content: `
<div class="ref-grid">
  <div class="ref-card">
    <div class="ref-card-name">OLS-Schätzer (bivariat)</div>
    $$b = \\frac{\\sum(x_i-\\bar{x})(y_i-\\bar{y})}{\\sum(x_i-\\bar{x})^2} = r_{xy}\\frac{s_y}{s_x}$$
    $$a = \\bar{y} - b\\bar{x}$$
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Bestimmtheitsmass $R^2$</div>
    $$R^2 = 1 - \\frac{SSR}{SST} = r_{xy}^2 \\in [0,1]$$
    $$SST = \\sum(y_i-\\bar{y})^2, \\quad SSR = \\sum(y_i-\\hat{y}_i)^2$$
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Korrigiertes $R^2$</div>
    $$R^2_{adj} = 1-(1-R^2)\\frac{n-1}{n-k-1}$$
    <div class="ref-card-note">$k$ = Anzahl Prädiktoren; für Modellvergleich verwenden</div>
  </div>
  <div class="ref-card">
    <div class="ref-card-name">t-Test für $b$ ($H_0\\colon \\beta=0$)</div>
    $$t = \\frac{b}{SE_b}, \\quad df = n-2$$
  </div>
  <div class="ref-card">
    <div class="ref-card-name">Dummy-Variable</div>
    <p>Nominale UV mit $k$ Kategorien → $k-1$ Dummies (Referenzkategorie ausgelassen)</p>
    <div class="ref-card-note">Koeffizient = Effekt relativ zur Referenzkategorie</div>
  </div>
</div>
<table class="ref-table" style="margin-top:12px">
  <thead><tr><th>Summe</th><th>Formel</th><th>Bedeutung</th></tr></thead>
  <tbody>
    <tr><td>$SST$</td><td>$\\sum(y_i-\\bar{y})^2$</td><td>Gesamtvarianz der AV</td></tr>
    <tr><td>$SSE$</td><td>$\\sum(\\hat{y}_i-\\bar{y})^2$</td><td>Durch Modell erklärte Varianz</td></tr>
    <tr><td>$SSR$</td><td>$\\sum(y_i-\\hat{y}_i)^2$</td><td>Residualvarianz (nicht erklärt)</td></tr>
    <tr><td colspan="3" style="font-size:.8rem;color:#6b7280">$SST = SSE + SSR$ &nbsp;|&nbsp; $R^2 = SSE/SST$</td></tr>
  </tbody>
</table>
<div class="ref-legend"><strong>Notation:</strong> &nbsp;
  $x_i$ Wert der unabhängigen Variable (UV) &nbsp;·&nbsp;
  $y_i$ Wert der abhängigen Variable (AV) &nbsp;·&nbsp;
  $\\hat{y}_i = a + bx_i$ geschätzter AV-Wert &nbsp;·&nbsp;
  $\\bar{x}, \\bar{y}$ Mittelwerte &nbsp;·&nbsp;
  $r_{xy}$ Pearson-Korrelation zwischen UV und AV &nbsp;·&nbsp;
  $s_x, s_y$ Standardabweichungen &nbsp;·&nbsp;
  $n$ Fallzahl &nbsp;·&nbsp;
  $k$ Anzahl Prädiktoren &nbsp;·&nbsp;
  $SE_b$ Standardfehler des Regressionskoeffizienten $b$
</div>
`},

]; // end REFERENCE_DATA
