// data.js – Alle Kapitel und Themen für die Statistik Lern-App
// Quelle: Vorlesungsskripte Prof. Dr. Axel Franzen, Universität Bern

const CHAPTERS = [

/* ═══════════════════════════════════════════════════════ KAPITEL 1 */
{
  id: 'ch1', num: 1, icon: '📐',
  title: 'Einführung',
  subtitle: 'Variablen & Skalenniveaus',
  color: '#6366f1',
  topics: [
    {
      id: 'ch1_variables', chapterId: 'ch1',
      title: 'Variablen & Datenmatrix',
      exerciseContext: 'Variablen, Merkmalsausprägungen, abhängige/unabhängige Variable, Datenmatrix-Notation',
      content: String.raw`
<h2>Variablen und Datenmatrix</h2>
<p><strong>Variable:</strong> Eine Eigenschaft, die von Beobachtungseinheit zu Beobachtungseinheit variieren kann. Notation: \(X, Y, Z\).</p>
<p><strong>Merkmalsausprägungen</strong> \(a_j\), \(j=1,\ldots,k\): mögliche Werte einer Variable.<br>
<strong>Realisierungen</strong> \(x_i\), \(i=1,\ldots,n\): beobachtete Werte einer Einheit.</p>

<h3>Datenmatrix</h3>
<p>Zeilen = Beobachtungseinheiten \(O_1,\ldots,O_n\); Spalten = Variablen \(X_1,\ldots,X_m\):</p>
\[\begin{array}{c|cccc}
 & X_1 & X_2 & \cdots & X_m \\
\hline
O_1 & x_{11} & x_{12} & \cdots & x_{1m} \\
O_2 & x_{21} & x_{22} & \cdots & x_{2m} \\
\vdots & \vdots & \vdots & & \vdots \\
O_n & x_{n1} & x_{n2} & \cdots & x_{nm}
\end{array}\]

<h3>Abhängige und unabhängige Variable</h3>
<ul>
  <li><strong>Unabhängige Variable (UV / Regressor):</strong> vermeintliche Ursache, in der Kreuztabelle in den Spalten.</li>
  <li><strong>Abhängige Variable (AV / Regressand):</strong> vermeintliche Wirkung, in den Zeilen.</li>
</ul>
<div class="info-box">Statistik beginnt erst, wenn Daten numerisch vorliegen. Sie umfasst <em>nicht</em> die Datenerhebung.</div>
<div class="info-box"><strong>Praxistipp AV/UV:</strong> In einer Umfrage ist die AV meist eine Einstellung oder ein Verhalten (z.B. Wahlabsicht, Einkommen), die UV eine Eigenschaft, die sie erklären soll (z.B. Bildung, Geschlecht). Die Frage lautet: „Erklärt die UV die Variation in der AV?"</div>
`
    },
    {
      id: 'ch1_scales', chapterId: 'ch1',
      title: 'Skalenniveaus',
      exerciseContext: 'Nominalskala, Ordinalskala, Intervallskala, Ratioskala, Absolutskala; zulässige Berechnungen und Transformationen; diskret vs. kontinuierlich',
      content: String.raw`
<h2>Mess- und Skalenniveaus</h2>
<table>
  <thead><tr><th>Skala</th><th>Beispiele</th><th>Zulässige Berechnungen</th><th>Transformation</th></tr></thead>
  <tbody>
    <tr><td><strong>Nominal</strong></td><td>Nationalität, Geschlecht, Telefonnr.</td><td>Zählen, Modus</td><td>Bijektiv (beliebige Umcodierung)</td></tr>
    <tr><td><strong>Ordinal</strong></td><td>Schulnoten, sozialer Status</td><td>Modus, Median</td><td>Rangfolge bewahrend: \(x_i>x_j \Rightarrow y_i>y_j\)</td></tr>
    <tr><td><strong>Intervall</strong></td><td>Temperatur in °C</td><td>Modus, Median, Mittelwert</td><td>Positiv linear: \(y=ax+b,\; a>0\)</td></tr>
    <tr><td><strong>Ratio</strong></td><td>Einkommen, Schuljahre, Körpergrösse</td><td>Alle inkl. geom. Mittel</td><td>Proportional: \(y=ax,\; a>0\)</td></tr>
    <tr><td><strong>Absolut</strong></td><td>Häufigkeiten, Anzahl Kinder</td><td>Alle</td><td>Keine (\(y=x\))</td></tr>
  </tbody>
</table>

<h3>Qualitativ vs. Quantitativ</h3>
<ul>
  <li><strong>Qualitativ:</strong> nominal oder ordinal → keine mathematischen Operationen möglich</li>
  <li><strong>Quantitativ (metrisch):</strong> intervall- oder ratioskaliiert → Addition, Subtraktion, Multiplikation, Division möglich</li>
</ul>

<h3>Diskret vs. Kontinuierlich</h3>
<ul>
  <li><strong>Diskret:</strong> endliche Anzahl Ausprägungen (z.B. Anzahl Kinder, Schulnoten)</li>
  <li><strong>Kontinuierlich (stetig):</strong> beliebige Werte in einem Intervall (z.B. Einkommen, Körpergrösse)</li>
</ul>

<h3>Nominalskala: Eigenschaften</h3>
<p>Symmetrisch (\(A=B \Leftrightarrow B=A\)) und transitiv (\(A=B \land B=C \Rightarrow A=C\)).</p>
<h3>Ordinalskala: Eigenschaften</h3>
<p>Asymmetrisch (\(A>B \Rightarrow B<A\)) und transitiv (\(A>B \land B>C \Rightarrow A>C\)).</p>
<div class="info-box"><strong>Warum das Skalenniveau wichtig ist:</strong> Es bestimmt, welche statistischen Methoden zulässig sind. Faustregel: Niemals mehr rechnen, als das Skalenniveau erlaubt. Schulnoten z.B. als metrisch zu behandeln und einen Mittelwert zu bilden, ist methodisch problematisch — aber in der Praxis weit verbreitet und oft toleriert, solange man es begründen kann.</div>
`
    },
    {
      id: 'ch1_freq_tables', chapterId: 'ch1',
      title: 'Häufigkeitstabellen',
      exerciseContext: 'Absolute und relative Häufigkeiten (h_j, f_j), kumulierte Häufigkeiten (H_j, F_j), Häufigkeitstabellen ausfüllen, Histogramm',
      content: String.raw`
<h2>Häufigkeitstabellen</h2>
<p>Der erste Schritt jeder Auswertung ist die Darstellung der Daten in einer <strong>Häufigkeitstabelle</strong>:</p>
<table>
  <thead><tr><th>Symbol</th><th>Name</th><th>Formel</th></tr></thead>
  <tbody>
    <tr><td>\(h_j\)</td><td>Absolute Häufigkeit</td><td>Anzahl der Beobachtungen mit Wert \(a_j\)</td></tr>
    <tr><td>\(f_j\)</td><td>Relative Häufigkeit</td><td>\(f_j = h_j / n\)</td></tr>
    <tr><td>\(H_j\)</td><td>Kumulierte abs. Häufigkeit</td><td>\(H_j = \sum_{l=1}^{j} h_l\)</td></tr>
    <tr><td>\(F_j\)</td><td>Kumulierte rel. Häufigkeit</td><td>\(F_j = H_j / n = \sum_{l=1}^{j} f_l\)</td></tr>
  </tbody>
</table>
<p>Multipliziert man \(f_j\) mit 100, erhält man Prozentwerte.<br>
<strong>Achtung:</strong> Bei \(n < 50\) sollte auf Prozentwerte verzichtet werden.</p>
<p><strong>Lesehilfe \(F_j\):</strong> \(F_j = 0{,}516\) bedeutet: 51,6% aller Beobachtungen haben einen Wert ≤ \(a_j\). Die kumulierte Häufigkeit ist besonders nützlich um den Median abzulesen (wo überschreitet \(F_j\) den Wert 0,5?).</p>

<h3>Beispiel</h3>
<table>
  <thead><tr><th>\(a_j\)</th><th>\(h_j\)</th><th>\(f_j\)</th><th>\(H_j\)</th><th>\(F_j\)</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>63</td><td>0.079</td><td>63</td><td>0.079</td></tr>
    <tr><td>2</td><td>82</td><td>0.103</td><td>145</td><td>0.181</td></tr>
    <tr><td>3</td><td>268</td><td>0.335</td><td>413</td><td>0.516</td></tr>
    <tr><td>4</td><td>327</td><td>0.409</td><td>740</td><td>0.925</td></tr>
    <tr><td>5</td><td>54</td><td>0.068</td><td>794</td><td>0.993</td></tr>
    <tr><td>6</td><td>6</td><td>0.008</td><td>800</td><td>1.000</td></tr>
    <tr><td><strong>Total</strong></td><td><strong>800</strong></td><td><strong>1.000</strong></td><td></td><td></td></tr>
  </tbody>
</table>

<h3>Stetige Merkmale: Histogramm</h3>
<p>Kontinuierliche Variablen werden in <strong>gleich grosse Intervalle</strong> eingeteilt und im Histogramm dargestellt. Intervallmittelwerte dienen als Klassenmitte \(m_j\).</p>
<p><strong>Verteilungsformen:</strong> symmetrisch, rechtsschief (linkssteil), linksschief (rechtssteil), unimodal, bimodal, u-förmig.</p>
`
    }
  ]
},

/* ═══════════════════════════════════════════════════════ KAPITEL 2 */
{
  id: 'ch2', num: 2, icon: '📏',
  title: 'Univariate Verteilungen',
  subtitle: 'Lagemasse, Streuung, Schiefe, Konzentration',
  color: '#10b981',
  topics: [
    {
      id: 'ch2_location', chapterId: 'ch2',
      title: 'Lagemasse (Mittelwerte)',
      exerciseContext: 'Modus, Median, arithmetisches Mittel, geometrisches Mittel; Berechnung und Interpretation; Lageregeln bei Schiefe',
      content: String.raw`
<h2>Masse der zentralen Tendenz (Lagemasse)</h2>

<h3>Modus / Modalwert \(M\)</h3>
<p>Die Ausprägung mit der <strong>höchsten Häufigkeit</strong>. Einziges sinnvolles Lagemass bei <strong>Nominalskala</strong>.</p>
<p>Falls mehrere Ausprägungen gleich häufig: multiple Modalwerte → bei metrischen Daten Mittelwert der Modalwerte.</p>

<h3>Median \(\tilde{x}\)</h3>
<p>Teilt die geordneten Beobachtungen in der Mitte. Benötigt mindestens <strong>Ordinalskalenniveau</strong>.</p>
\[\tilde{x} = \begin{cases} x_{((n+1)/2)} & \text{falls } n \text{ ungerade} \\ \frac{1}{2}(x_{(n/2)} + x_{(n/2+1)}) & \text{falls } n \text{ gerade, metrisch} \end{cases}\]
<p><strong>Eigenschaft:</strong> \(\sum_{i=1}^{n}|x_i - \tilde{x}|\) ist <em>minimal</em>. Robust gegenüber Ausreissern → wird bei Einkommensverteilungen bevorzugt.</p>
<p><strong>Klassierte Daten:</strong> Klasse mit \(F_{j-1} < 0{,}5 \leq F_j\).</p>

<h3>Quantile \(x_p\)</h3>
<p>Das \(p\)-Quantil teilt die Daten so, dass mindestens Anteil \(p\) kleiner/gleich und \(1-p\) grösser/gleich ist.</p>
\[x_p = \begin{cases} x_{(\lfloor np \rfloor + 1)} & \text{falls } np \notin \mathbb{Z} \\ x_{(np)} & \text{falls } np \in \mathbb{Z} \end{cases}\]
<p>Spezialfall: Median = 50%-Quantil = \(x_{0{,}5}\). Quartile: \(Q_1=x_{0{,}25}\), \(Q_3=x_{0{,}75}\).</p>
<p><strong>Rechenbeispiel:</strong> \(n=8\) Werte aufsteigend: 2, 4, 5, 6, 7, 9, 10, 13. Erstes Quartil \(Q_1 = x_{0{,}25}\): \(np = 8 \cdot 0{,}25 = 2\) (ganzzahlig) → \(Q_1 \in [x_{(2)},\, x_{(3)}] = [4,\, 5]\). Median: \(np = 4\) (ganzzahlig) → \(\tilde{x} \in [x_{(4)},\, x_{(5)}] = [6,\, 7]\), Mittelwert = 6,5.</p>

<h3>Arithmetisches Mittel \(\bar{x}\)</h3>
\[\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_i = \frac{1}{n}\sum_{j=1}^{k} h_j \cdot a_j = \sum_{j=1}^{k} f_j \cdot a_j\]
<p><strong>Klassierte Daten</strong> (mit Klassenmitte \(m_j\)):
\[\bar{x}_k = \sum_{j=1}^{k} f_j \cdot m_j\]</p>
<p><strong>Gewogenes Mittel</strong> (bei Gruppen mit Gewicht \(g_j = n_j/n\)):
\[\bar{x}_s = \sum_{j=1}^{r} g_j \cdot \bar{x}_j\]</p>
<p><strong>Eigenschaften:</strong> Benötigt <strong>Intervallskalenniveau</strong>. Summe der Abweichungen ist 0. Quadrierte Abweichungen sind minimal. Sensibel gegenüber Ausreissern.<br>
Äquivarianz: \(y_i = a+bx_i \Rightarrow \bar{y} = a + b\bar{x}\).</p>

<h3>Geometrisches Mittel \(\bar{x}_g\)</h3>
\[\bar{x}_g = \sqrt[n]{\prod_{i=1}^{n} x_i} \quad \text{(nur Ratioskala, z.B. Wachstumsraten)}\]
<p>Beispiel: Renditen +20%, +25%, −33% → geom. Mittel = 1{,}00 (korrekt), arith. Mittel = 3{,}89% (falsch).</p>

<h3>Welches Lagemass wann verwenden?</h3>
<table>
  <thead><tr><th>Situation</th><th>Empfohlenes Mass</th><th>Grund</th></tr></thead>
  <tbody>
    <tr><td>Nominalskala</td><td>Modus</td><td>Kein Ordnen möglich</td></tr>
    <tr><td>Ordinalskala</td><td>Median</td><td>Rangordnung bekannt, aber Abstände unklar</td></tr>
    <tr><td>Metrisch, symmetrisch</td><td>Arithm. Mittel</td><td>Nutzt alle Informationen</td></tr>
    <tr><td>Metrisch, schiefe Verteilung oder Ausreisser</td><td>Median</td><td>Robust; Mittelwert wird von Extremwerten verzerrt</td></tr>
    <tr><td>Wachstumsraten, Verhältnisse</td><td>Geometr. Mittel</td><td>Berücksichtigt multiplikative Struktur</td></tr>
  </tbody>
</table>

<h3>Lageregeln (Schiefe)</h3>
<ul>
  <li>\(\bar{x} \approx \tilde{x} \approx M\): <strong>symmetrisch</strong></li>
  <li>\(\bar{x} > \tilde{x} > M\): <strong>rechtsschief (linkssteil)</strong> — z.B. Einkommen: die meisten verdienen wenig, wenige sehr viel → langer rechter Schwanz, zieht Mittelwert nach oben</li>
  <li>\(\bar{x} < \tilde{x} < M\): <strong>linksschief (rechtssteil)</strong> — z.B. Alter bei Pensionierung</li>
</ul>
`
    },
    {
      id: 'ch2_dispersion', chapterId: 'ch2',
      title: 'Streuungsmasse',
      exerciseContext: 'Spannweite, Interquartilsabstand, Varianz, Standardabweichung, Variationskoeffizient, z-Standardisierung; Berechnungen und Eigenschaften',
      content: String.raw`
<h2>Streuungsmasse (Masse der Dispersion)</h2>

<h3>Spannweite \(R\)</h3>
\[R = x_{\max} - x_{\min}\]
<p>Nur bei metrischen Daten sinnvoll; sehr sensibel gegenüber Ausreissern.</p>

<h3>Interquartilsabstand \(d_Q\)</h3>
\[d_Q = Q_3 - Q_1 = x_{0{,}75} - x_{0{,}25}\]
<p>Robust, aber berücksichtigt nur 2 Messwerte. <strong>Box-Plot:</strong> zeigt \(x_{\min}, Q_1, \tilde{x}, Q_3, x_{\max}\).</p>

<h3>Varianz \(s^2\)</h3>
\[s^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2 = \frac{1}{n}\sum_{j=1}^{k} h_j(a_j-\bar{x})^2\]
<p><strong>Stichprobenvarianz (korrigiert):</strong>
\[S^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2\]
Wird bei Inferenz verwendet (unverzerrter Schätzer für \(\sigma^2\)).</p>
<div class="info-box"><strong>Warum n−1?</strong> Die Formel mit \(n\) im Nenner unterschätzt die Populationsvarianz \(\sigma^2\) systematisch (die Abweichungen werden vom <em>Stichproben</em>mittelwert berechnet, der zufällig nahe bei den Daten liegt). Division durch \(n-1\) korrigiert diese Verzerrung. Man „verliert" einen Freiheitsgrad, weil \(\bar{x}\) bereits aus den Daten geschätzt wurde. Bei grossen \(n\) spielt der Unterschied kaum eine Rolle.</div>
<p><strong>Eigenschaften:</strong>
\[y_i = a \cdot x_i + b \Rightarrow s^2_y = a^2 \cdot s^2_x\]
Invariant gegenüber Addition einer Konstanten.</p>

<h3>Standardabweichung \(s\)</h3>
\[s = \sqrt{s^2} = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2}\]
<p>\[y_i = a \cdot x_i + b \Rightarrow s_y = |a| \cdot s_x\]</p>
<p><strong>Bei Normalverteilung:</strong> \(\bar{x} \pm 1s\) ≈ 68%; \(\bar{x} \pm 2s\) ≈ 95%; \(\bar{x} \pm 3s\) ≈ 99%.</p>

<h3>Varianzzerlegung (Within / Between)</h3>
\[s^2 = \underbrace{\frac{1}{n}\sum_{j=1}^{r} n_j s^2_j}_{s^2_w \text{ (within)}} + \underbrace{\frac{1}{n}\sum_{j=1}^{r} n_j(\bar{x}_j - \bar{x})^2}_{s^2_b \text{ (between)}}\]

<h3>z-Standardisierung</h3>
\[z_i = \frac{x_i - \bar{x}}{s_x} \quad \Rightarrow \quad \bar{z}=0,\; s_z=1\]
<p>Erlaubt Vergleich unterschiedlich skalierter Variablen. Ändert <em>nicht</em> die Form der Verteilung.</p>

<h3>Variationskoeffizient \(v\)</h3>
\[v = \frac{s}{\bar{x}}\]
<p>Für ratioskalierte Daten; invariant gegenüber proportionalen Transformationen (erlaubt Vergleich über Einheiten hinweg).</p>
`
    },
    {
      id: 'ch2_skewness', chapterId: 'ch2',
      title: 'Schiefe & Wölbung',
      exerciseContext: 'Momentkoeffizient der Schiefe (Skewness γ₁), Kurtosis (γ₂), Berechnung und Interpretation',
      content: String.raw`
<h2>Masse der Schiefe und Wölbung</h2>

<h3>Schiefe (Skewness) \(\gamma_1\)</h3>
\[\gamma_1 = \frac{m_3}{s^3} \quad \text{mit} \quad m_3 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^3\]
<p>Äquivalent: \(\gamma_1 = \frac{1}{n}\sum_{i=1}^{n}\left(\frac{x_i-\bar{x}}{s}\right)^3\)</p>
<table>
  <thead><tr><th>Wert</th><th>Bedeutung</th></tr></thead>
  <tbody>
    <tr><td>\(\gamma_1 = 0\)</td><td>Symmetrische Verteilung</td></tr>
    <tr><td>\(\gamma_1 > 0\)</td><td>Rechtsschief (linkssteil), langer rechter Schwanz</td></tr>
    <tr><td>\(\gamma_1 < 0\)</td><td>Linksschief (rechtssteil), langer linker Schwanz</td></tr>
  </tbody>
</table>

<h3>Wölbung (Kurtosis) \(\gamma_2\)</h3>
\[\gamma_2 = \frac{m_4}{s^4} - 3 \quad \text{mit} \quad m_4 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^4\]
<table>
  <thead><tr><th>Wert</th><th>Bedeutung</th></tr></thead>
  <tbody>
    <tr><td>\(\gamma_2 = 0\)</td><td>Normalverteilung (Referenz)</td></tr>
    <tr><td>\(\gamma_2 > 0\)</td><td>Spitz (leptokurtisch)</td></tr>
    <tr><td>\(\gamma_2 < 0\)</td><td>Flach (platykurtisch)</td></tr>
  </tbody>
</table>

<p><strong>Realbeispiel Schiefe:</strong> Einkommensverteilungen sind fast immer rechtsschief (\(\gamma_1 > 0\)): wenige Personen mit sehr hohem Einkommen ziehen den Mittelwert nach oben, während die Mehrheit unter dem Mittelwert liegt. Deshalb gilt bei Einkommen: \(\bar{x} > \tilde{x} > M\).</p>
<div class="info-box">Die Subtraktion von 3 in der Kurtosis-Formel normiert auf die Normalverteilung als Referenz. Ohne die −3 wäre der Referenzwert 3 (nicht 0). Der Begriff <em>Excess Kurtosis</em> bezeichnet genau diese normierte Version.</div>
`
    },
    {
      id: 'ch2_concentration', chapterId: 'ch2',
      title: 'Konzentrationsmasse (Lorenz / Gini)',
      exerciseContext: 'Lorenzkurve, Gini-Koeffizient, Interpretation von Ungleichverteilung',
      content: String.raw`
<h2>Konzentrationsmasse</h2>

<h3>Lorenzkurve</h3>
<p>Zeigt die Relation zwischen dem kumulierten Anteil der <strong>Merkmalsträger</strong> (x-Achse) und dem kumulierten Anteil der <strong>Merkmalssumme</strong> (y-Achse).</p>
<ul>
  <li><strong>Gleichverteilung:</strong> Kurve = Diagonale (jedes Prozent der Bevölkerung besitzt gleich viel)</li>
  <li>Je stärker die Kurve nach <strong>unten gewölbt</strong>, desto grösser die Konzentration/Ungleichheit</li>
</ul>
<h3>Konstruktion der Lorenzkurve (Schritt für Schritt)</h3>
<ol>
  <li>Werte <strong>aufsteigend</strong> sortieren (ärmste zuerst)</li>
  <li>Kumulierten Anteil der Merkmalsträger berechnen: \(u_j = j/n\) (x-Achse)</li>
  <li>Kumulierten Anteil der Merkmalssumme berechnen: \(v_j = \sum_{i=1}^{j} x_{(i)} / \sum_{i=1}^{n} x_i\) (y-Achse)</li>
  <li>Punkte \((u_j, v_j)\) verbinden — plus Startpunkt \((0,0)\) und Endpunkt \((1,1)\)</li>
</ol>
<p><strong>Beispiel:</strong> 4 Personen mit Einkommen 10, 20, 30, 40 (gesamt 100). Ärmste 25% besitzen 10% → Punkt (0.25; 0.10). Ärmste 50% besitzen 30% → Punkt (0.50; 0.30). Etc.</p>

<h3>Gini-Koeffizient \(G\)</h3>
\[G = \frac{2\cdot\sum_{i=1}^{n} i \cdot x_{(i)}}{n \cdot \sum_{i=1}^{n} x_i} - \frac{n+1}{n}\]
<p>Wobei \(x_{(i)}\) die aufsteigend geordneten Werte sind.</p>
<ul>
  <li>\(G = 0\): vollständige Gleichverteilung</li>
  <li>\(G_{\max} = (n-1)/n \approx 1\): maximale Ungleichheit</li>
  <li><strong>Normierter Gini:</strong> \(G^* = \frac{n}{n-1} \cdot G\)</li>
</ul>
<p><strong>Zusammenhang mit MAD:</strong>
\[G = \frac{MAD}{2\bar{x}}\]</p>
<p><strong>Beispiel Europa (2017):</strong> Portugal: 0.41 (hoch), Schweiz: 0.29 (niedrig).</p>
`
    },
    {
      id: 'ch2_nominal_dispersion', chapterId: 'ch2',
      title: 'Streumaße für Nominaldaten (HF, Entropie)',
      exerciseContext: 'Herfindahl-Streumaß (Simpson\'s D / HF), Entropie; Berechnung aus Häufigkeiten, Interpretation, Normierung',
      content: String.raw`
<h2>Streumaße für nominalskalierte Daten</h2>
<p>Da bei Nominalskala keine Rangordnung existiert, braucht man speziell angepasste Streumaße.</p>

<h3>Herfindahl-Streumaß (Simpson's D)</h3>
\[HF = 1 - \sum_{j=1}^{k}\left(\frac{h_j}{n}\right)^2 = 1 - \sum_{j=1}^{k} f_j^2\]
<ul>
  <li>\(HF = 0\): alle Beobachtungen in einer einzigen Kategorie (maximale Konzentration, minimale Streuung)</li>
  <li>\(HF_{\max} = \frac{k-1}{k}\): bei Gleichverteilung (maximale Streuung)</li>
  <li><strong>Je kleiner</strong> die Unterschiede zwischen den relativen Häufigkeiten, desto <strong>grösser</strong> HF</li>
</ul>
<p><strong>Normiertes HF:</strong>
\[HF^* = HF \cdot \frac{k}{k-1} \in [0,1]\]</p>

<h3>Berechnungsbeispiel</h3>
<p>Variable Nationalität mit \(k=3\) Kategorien: \(f_1=0.5, f_2=0.3, f_3=0.2\)</p>
\[HF = 1 - (0.5^2 + 0.3^2 + 0.2^2) = 1 - (0.25 + 0.09 + 0.04) = 0.62\]
\[HF^* = 0.62 \cdot \frac{3}{2} = 0.93\]

<h3>Entropie \(H\)</h3>
\[H = -\sum_{j=1}^{k} f_j \cdot \text{ld}(f_j) = \sum_{j=1}^{k} f_j \cdot \text{ld}\!\left(\frac{1}{f_j}\right)\]
<p>mit dem <strong>Zweierlogarithmus</strong>: \(\text{ld}(x) = \log_2(x) = \dfrac{\ln x}{\ln 2}\)</p>
<ul>
  <li>\(H = 0\): alle in einer Kategorie</li>
  <li>\(H_{\max} = \text{ld}(k)\): bei Gleichverteilung</li>
  <li>Misst die Abweichung von der Gleichverteilung</li>
</ul>
<div class="info-box">HF ist häufiger in der Sozialstatistik. Entropie kommt aus der Informationstheorie (Shannon). Beide messen dasselbe Konzept — je grösser, desto gleichmässiger die Verteilung.</div>
`
    }
  ]
},

/* ═══════════════════════════════════════════════════════ KAPITEL 3 */
{
  id: 'ch3', num: 3, icon: '🔢',
  title: 'Bivariate Analyse I',
  subtitle: 'Nominale Variablen: Kreuztabellen & Chi²',
  color: '#f59e0b',
  topics: [
    {
      id: 'ch3_crosstabs', chapterId: 'ch3',
      title: 'Kreuztabellen (Konstruktion)',
      exerciseContext: 'Kreuztabellen erstellen, Spaltenprozente, Zeilenprozente, abhängige/unabhängige Variable anordnen, Interpretation',
      content: String.raw`
<h2>Kreuztabellenanalyse</h2>
<p>Eine <strong>Kontingenztabelle</strong> (\(k \times m\)) zeigt die gemeinsame Häufigkeitsverteilung zweier Merkmale.</p>
<p>\(h_{ij} = h(a_i, b_j)\): Häufigkeit der Merkmalskombination aus Zeile \(i\) und Spalte \(j\).</p>

<h3>Konstruktionsregeln</h3>
<ul>
  <li><strong>Unabhängige Variable (UV)</strong> → in die <strong>Spalten</strong></li>
  <li><strong>Abhängige Variable (AV)</strong> → in die <strong>Zeilen</strong></li>
  <li>Man berichtet: absolute Häufigkeiten + <strong>Spaltenprozente</strong></li>
  <li>Statistische Unabhängigkeit: Spaltenprozente unterscheiden sich nicht (oder kaum)</li>
</ul>

<h3>Randverteilungen</h3>
<p>Zeilensummen: \(h_{i\cdot} = \sum_j h_{ij}\)<br>
Spaltensummen: \(h_{\cdot j} = \sum_i h_{ij}\)<br>
Gesamtsumme: \(n = \sum_i \sum_j h_{ij}\)</p>

<h3>Bedingte Verteilungen</h3>
<p>Spaltenprozente: \(f_{i|j} = h_{ij} / h_{\cdot j}\) – Anteil von Zeile \(i\) in Spalte \(j\).<br>
Ein Zusammenhang zeigt sich, wenn sich die Spaltenprozente über die Spalten unterscheiden.</p>
<div class="info-box"><strong>Merkhilfe:</strong> Wenn die Spaltenprozente für jede Zeile über alle Spalten gleich sind, besteht <em>statistische Unabhängigkeit</em> — Kenntnis der UV verbessert die Vorhersage der AV nicht. Je stärker die Spaltenprozente zwischen den Spalten variieren, desto stärker der Zusammenhang.</div>
`
    },
    {
      id: 'ch3_percentage_or', chapterId: 'ch3',
      title: 'Prozentsatzdifferenz & Odds-Ratio',
      exerciseContext: 'Prozentsatzdifferenz d%, Odds-Ratio (OR), Berechnung und Interpretation für 2x2-Tabellen',
      content: String.raw`
<h2>Prozentsatzdifferenz und Odds-Ratio</h2>

<h3>Prozentsatzdifferenz \(d\%\)</h3>
\[d\% = \left(\frac{h_{11}}{h_{\cdot 1}} - \frac{h_{12}}{h_{\cdot 2}}\right) \times 100\]
<ul>
  <li>Nur für <strong>Vierfeldertabellen</strong> (\(2 \times 2\)) anwendbar</li>
  <li>Wertebereich: \(-100 \leq d\% \leq 100\)</li>
  <li>\(d\% = 0\): kein Zusammenhang; \(|\,d\%\,| = 100\): perfekter Zusammenhang</li>
</ul>
<div class="info-box">Vorzeichen hängt von der Anordnung der Ausprägungen ab – immer inhaltlich kommentieren!</div>

<h3>Odds-Ratio \(OR\)</h3>
<p>Die <em>Chance</em> (Odds) für Ausprägung \(b_1\) vs. \(b_2\) in Gruppe \(a_i\):</p>
<p><strong>Intuition Odds:</strong> Odds ist das Verhältnis von Treffer zu Nicht-Treffer. Odds = 3 bedeutet: 3-mal so viele Treffer wie Nicht-Treffer (entspricht 75% Wahrscheinlichkeit). Nicht zu verwechseln mit Wahrscheinlichkeit!</p>
\[O_i = \frac{h_{i1}}{h_{i2}}\]
\[OR = \frac{O_1}{O_2} = \frac{h_{11}/h_{12}}{h_{21}/h_{22}} = \frac{h_{11} \cdot h_{22}}{h_{12} \cdot h_{21}}\]
<table>
  <thead><tr><th>Wert</th><th>Bedeutung</th></tr></thead>
  <tbody>
    <tr><td>\(OR = 1\)</td><td>Kein Zusammenhang</td></tr>
    <tr><td>\(OR > 1\)</td><td>Hauptdiagonale stärker besetzt</td></tr>
    <tr><td>\(OR < 1\)</td><td>Nebendiagonale stärker besetzt</td></tr>
  </tbody>
</table>
<p><strong>Beispiel:</strong> OR = 2{,}5/4 = 0{,}625 bedeutet: die Chance in Gruppe 1, Ergebnis \(b_1\) zu erzielen, ist schlechter als in Gruppe 2.</p>
`
    },
    {
      id: 'ch3_chi2', chapterId: 'ch3',
      title: 'Chi²-Koeffizient',
      exerciseContext: 'Chi²-Berechnung, erwartete Häufigkeiten, Freiheitsgrade, kritischer Wert',
      content: String.raw`
<h2>Der Chi²-Koeffizient (\(\chi^2\))</h2>

<h3>Erwartete Häufigkeiten bei Unabhängigkeit</h3>
\[\tilde{h}_{ij} = \frac{h_{i\cdot} \cdot h_{\cdot j}}{n}\]

<h3>Chi²-Berechnung</h3>
\[\chi^2 = \sum_{i=1}^{k}\sum_{j=1}^{m} \frac{(h_{ij} - \tilde{h}_{ij})^2}{\tilde{h}_{ij}}\]
<ul>
  <li>Je grösser die Abweichungen, desto grösser \(\chi^2\)</li>
  <li>\(\chi^2 \geq 0\) immer</li>
  <li>\(\chi^2 = 0\) bei statistischer Unabhängigkeit</li>
  <li>\(\chi^2\) wächst mit Fallzahl und Tabellengrösse</li>
</ul>

<h3>Voraussetzung</h3>
<p>Kleinste Zellbesetzung ≥ 5. Bei \(2 \times 2\)-Tabellen: Yates-Korrektur.</p>

<h3>Als Signifikanztest (→ Kapitel 6)</h3>
<p>Freiheitsgrade: \(df = (k-1)(m-1)\)<br>
Kritischer Wert bei \(\alpha = 5\%, df=1\): \(\chi^2_{\text{krit}} = 3{,}84\)<br>
Nullhypothese verwerfen, wenn: \(\chi^2 > \chi^2_{1-\alpha}(df)\)</p>
`
    },
    {
      id: 'ch3_chi_measures', chapterId: 'ch3',
      title: 'Chi²-basierte Masse (φ, K, Cramer\'s V)',
      exerciseContext: 'Kontingenzkoeffizient K, Phi-Koeffizient φ, Cramer\'s V; Berechnungen, Normierung, wann welches Mass verwenden',
      content: String.raw`
<h2>Chi²-basierte Zusammenhangsmasse</h2>
<p>Diese Masse korrigieren \(\chi^2\) für Fallzahl und Tabellengrösse. Sie messen die <strong>Stärke</strong> des Zusammenhangs, nicht die Richtung.</p>

<h3>Kontingenzkoeffizient \(K\)</h3>
\[K = \sqrt{\frac{\chi^2}{n + \chi^2}} \in [0, 1)\]
<p><strong>Korrigiertes</strong> \(K^*\) (normiert auf [0,1]):
\[K^* = \frac{K}{\sqrt{(I-1)/I}}, \quad I = \min\{k, m\}\]</p>

<h3>Phi-Koeffizient \(\varphi\)</h3>
<p>Nur für <strong>\(2 \times 2\)-Tabellen</strong>:</p>
\[\varphi = \sqrt{\frac{\chi^2}{n}} = \frac{h_{11}h_{22} - h_{12}h_{21}}{\sqrt{h_{1\cdot}\,h_{2\cdot}\,h_{\cdot 1}\,h_{\cdot 2}}} \in [0,1]\]
<p>Entspricht der Korrelation zwischen zwei dichotomen Variablen (= Pearson's \(r\) bei binären Variablen).</p>

<h3>Cramer's V</h3>
<p>Verallgemeinerung von Phi für grössere Tabellen:</p>
\[V = \sqrt{\frac{\chi^2}{n(I-1)}}, \quad I = \min\{k, m\}, \quad V \in [0,1]\]

<h3>Wann welches Mass?</h3>
<table>
  <thead><tr><th>Mass</th><th>Tabellengrösse</th><th>Normiert?</th></tr></thead>
  <tbody>
    <tr><td>\(\chi^2\)</td><td>Beliebig (gleiche Grösse, ähnl. \(n\))</td><td>Nein</td></tr>
    <tr><td>\(K\)</td><td>Gleich gross, unabh. von \(n\)</td><td>Auf \([0,1)\)</td></tr>
    <tr><td>\(K^*\), \(V\)</td><td>Unterschiedlich gross, unabh. von \(n\)</td><td>Auf \([0,1]\)</td></tr>
    <tr><td>\(\varphi\)</td><td>Nur \(2\times 2\)</td><td>Auf \([0,1]\)</td></tr>
  </tbody>
</table>
<div class="info-box">Alle chi²-basierten Masse sagen nichts über die <strong>Richtung</strong> des Zusammenhangs aus – nur über die Stärke.</div>
`
    },
    {
      id: 'ch3_pre', chapterId: 'ch3',
      title: 'PRE-Masse: Lambda & Tau',
      exerciseContext: 'Guttman\'s Lambda, Goodman & Kruskal\'s Tau; proportionale Fehlerreduktion, Berechnung und Interpretation',
      content: String.raw`
<h2>PRE-Masse (Proportionale Fehlerreduktion)</h2>
<p>PRE-Masse geben an, um wie viel sich die Vorhersage von \(X\) verbessert, wenn man \(Y\) kennt:</p>
\[PRE = \frac{E_1 - E_2}{E_1}\]
<p>\(E_1\): Fehler ohne Kenntnis von \(Y\); \(E_2\): Fehler mit Kenntnis von \(Y\).</p>

<h3>Guttman's Lambda \(\lambda\)</h3>
<p><strong>Vorhersageregel:</strong> Modalwert (jeweils der häufigste Wert).</p>
\[E_1 = n - \max_i(h_{i\cdot})\]
\[E_2 = n - \sum_{j=1}^{m}\max_i(h_{ij})\]
\[\lambda_X = \frac{\sum_{j}\max_i(h_{ij}) - \max_i(h_{i\cdot})}{n - \max_i(h_{i\cdot})}\]
<p>Problem: Wenn alle Zeilen den gleichen Modalwert haben, ist \(\lambda = 0\) – auch wenn ein Zusammenhang besteht.</p>
<h3>Mini-Beispiel Lambda</h3>
<p>Variable X (Zeile): krank/gesund. Variable Y (Spalte): Raucher/Nichtraucher.</p>
<table>
  <thead><tr><th></th><th>Raucher</th><th>Nichtraucher</th><th>Zeilensumme</th></tr></thead>
  <tbody>
    <tr><td>krank</td><td>40</td><td>10</td><td>50</td></tr>
    <tr><td>gesund</td><td>20</td><td>30</td><td>50</td></tr>
    <tr><td>Spaltensumme</td><td>60</td><td>40</td><td>100</td></tr>
  </tbody>
</table>
<p>\(E_1 = n - \max_i(h_{i\cdot}) = 100 - 50 = 50\)</p>
<p>\(\sum_j \max_i(h_{ij}) = \max(40,20) + \max(10,30) = 40 + 30 = 70\)</p>
<p>\(E_2 = n - 70 = 30\)</p>
<p>\(\lambda_X = (70-50)/(100-50) = 20/50 = 0{,}40\): Kenntnis des Raucherstatus reduziert den Vorhersagefehler um 40%.</p>

<h3>Goodman & Kruskal's \(\tau\)</h3>
<p>Proportionale Fehlerreduktion bei probabilistischer Vorhersage:</p>
\[E_1 = 1 - \sum_i f_{i\cdot}^2\]
\[E_2 = 1 - \sum_i\sum_j \frac{f_{ij}^2}{f_{\cdot j}}\]
\[\tau_X = \frac{\sum_i\sum_j f_{ij}^2/f_{\cdot j} - \sum_i f_{i\cdot}^2}{1 - \sum_i f_{i\cdot}^2}\]
<p>Interpretiert als Verbesserung der Vorhersage von \(X\) durch Kenntnis von \(Y\).</p>
<div class="info-box">Tau ist robuster als Lambda und gibt auch dann einen Wert &gt; 0, wenn Lambda 0 ist.</div>
`
    }
  ]
},

/* ═══════════════════════════════════════════════════════ KAPITEL 4 */
{
  id: 'ch4', num: 4, icon: '📈',
  title: 'Bivariate Analyse II',
  subtitle: 'Ordinale & metrische Variablen',
  color: '#ec4899',
  topics: [
    {
      id: 'ch4_ordinal', chapterId: 'ch4',
      title: 'Ordinale Zusammenhangsmasse',
      exerciseContext: 'Konkordante/diskordante Paare, Kendall\'s Tau-a, Tau-b, Tau-c, Gamma; Berechnung und Interpretation',
      content: String.raw`
<h2>Zusammenhangsmasse für Ordinaldaten</h2>
<p>Basis: <strong>Paarvergleiche</strong> zwischen je zwei Beobachtungen \((x_i, y_i)\) und \((x_j, y_j)\).</p>
<ul>
  <li><strong>Konkordant (C):</strong> beide Variablen ändern sich <em>gleichsinnig</em> — \(x_i > x_j \land y_i > y_j\) oder \(x_i < x_j \land y_i < y_j\)</li>
  <li><strong>Diskordant (D):</strong> beide Variablen ändern sich <em>gegensinnig</em> — \(x_i > x_j \land y_i < y_j\) oder \(x_i < x_j \land y_i > y_j\)</li>
  <li><strong>Bindung in X (\(T_X\)):</strong> \(x_i = x_j\)</li>
  <li><strong>Bindung in Y (\(T_Y\)):</strong> \(y_i = y_j\)</li>
</ul>
<p><strong>Intuition:</strong> \(C > D\) bedeutet, dass wenn jemand bei X höher liegt als jemand anderes, er tendenziell auch bei Y höher liegt → positiver Zusammenhang. \(C = D\) → kein Zusammenhang. \(C < D\) → negativer Zusammenhang.</p>
<p><strong>Zählen von C und D (Schritt für Schritt):</strong> Sortiere nach X aufsteigend. Für jede Beobachtung zähle, wie viele <em>nachfolgenden</em> Beobachtungen ein höheres Y haben (= konkordant) bzw. ein niedrigeres Y (= diskordant).</p>

<h3>Kendall's Tau-a</h3>
\[\tau_a = \frac{C - D}{n(n-1)/2} \in [-1, 1]\]
<p>Problem: Bei Bindungen (ties) kann das Maximum 1 nicht mehr erreicht werden.</p>

<h3>Kendall's Tau-b (am häufigsten verwendet)</h3>
\[\tau_b = \frac{C - D}{\sqrt{(C+D+T_X)(C+D+T_Y)}}\]
<p>Berücksichtigt Ties in X und Y. Nur bei <strong>quadratischen Tabellen</strong> (\(k=m\)) verwendbar. Bei \(2\times 2\) = Phi = Pearson's \(r\).</p>

<h3>Kendall's Tau-c</h3>
\[\tau_c = \frac{C-D}{\frac{1}{2}n^2\frac{I-1}{I}}, \quad I = \min\{k,m\}\]
<p>Für <strong>nicht-quadratische</strong> Tabellen (\(k \neq m\)).</p>

<h3>Goodman & Kruskal's Gamma \(\gamma\)</h3>
\[\gamma = \frac{C-D}{C+D} \in [-1, 1]\]
<ul>
  <li>Ignoriert Ties komplett → immer \(|\gamma| \geq |\tau_b| \geq |\tau_a|\)</li>
  <li>Verlangt nur <strong>schwache Monotonie</strong> (Y darf nicht abnehmen wenn X zunimmt)</li>
  <li>Interpretierbar als PRE-Mass</li>
  <li>Für Tabellen beliebiger Grösse berechenbar</li>
</ul>
`
    },
    {
      id: 'ch4_pearson', chapterId: 'ch4',
      title: 'Pearson\'s r (Korrelation)',
      exerciseContext: 'Pearson-Korrelationskoeffizient r, Kovarianz, Standardabweichungen, Berechnung und Interpretation, partielle Korrelation',
      content: String.raw`
<h2>Pearson's Korrelationskoeffizient \(r\)</h2>
<p>Misst den <strong>linearen</strong> Zusammenhang zweier <strong>metrischer</strong> Merkmale.</p>

<h3>Formel</h3>
\[r = r_{XY} = \frac{COV(X,Y)}{S_x \cdot S_y} = \frac{\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum_i(x_i-\bar{x})^2 \cdot \sum_i(y_i-\bar{y})^2}} \in [-1,1]\]

<h3>Kovarianz und Standardabweichungen</h3>
\[S_{XY} = \frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})\]
\[S_x = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2}, \quad S_y = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(y_i-\bar{y})^2}\]

<h3>Interpretation</h3>
<table>
  <thead><tr><th>Wert</th><th>Bedeutung</th></tr></thead>
  <tbody>
    <tr><td>\(r = 0\)</td><td>Kein linearer Zusammenhang</td></tr>
    <tr><td>\(|r| \in [0.1, 0.4]\)</td><td>Schwacher Zusammenhang</td></tr>
    <tr><td>\(|r| \in [0.4, 0.7]\)</td><td>Mittlerer Zusammenhang</td></tr>
    <tr><td>\(|r| \in [0.7, 1.0]\)</td><td>Starker Zusammenhang</td></tr>
  </tbody>
</table>
<p><strong>Achtung:</strong> \(r = 0\) schließt nicht-linearen Zusammenhang nicht aus! U-förmige Zusammenhänge werden nicht erfasst.</p>

<h3>Partielle Korrelation</h3>
\[r_{XY|Z} = \frac{r_{XY} - r_{XZ} \cdot r_{YZ}}{\sqrt{(1-r^2_{XZ})(1-r^2_{YZ})}}\]
<p>Kontrolliert den Einfluss einer dritten Variable \(Z\). Verschwindet \(r_{XY|Z} \approx 0\), liegt möglicherweise eine <strong>Scheinkorrelation</strong> vor.</p>
<div class="info-box"><strong>Korrelation ≠ Kausalität!</strong> Ein hoher \(r\)-Wert zeigt nur einen statistischen Zusammenhang, keine Ursache-Wirkungs-Beziehung. Klassisches Beispiel: Eisverkauf korreliert mit Ertrinkungsunfällen — die gemeinsame Ursache ist warmes Wetter (Confounder). Immer inhaltlich argumentieren und auf Drittvariablen prüfen.</div>
`
    },
    {
      id: 'ch4_spearman', chapterId: 'ch4',
      title: 'Spearman\'s Rangkorrelation',
      exerciseContext: 'Spearman-Rangkorrelationskoeffizient r_S, Rangbildung, Berechnung und wann anwenden',
      content: String.raw`
<h2>Spearman's Rangkorrelation \(r_S\)</h2>
<p>Analogon zu Pearson's \(r\) für <strong>ordinalskalierte</strong> (oder stark nicht-normalverteilte) Daten.</p>

<h3>Vorgehensweise</h3>
<ol>
  <li>Beobachtungen für X und Y jeweils aufsteigend rangieren: \(\text{rg}(x_1),\ldots,\text{rg}(x_n)\)</li>
  <li>Bei Bindungen: mittleren Rang vergeben (Durchschnittsrang)</li>
  <li>Pearson-Formel auf die Ränge anwenden</li>
</ol>

<h3>Formel</h3>
\[r_S = \frac{\sum_{i=1}^{n}(\text{rg}(x_i)-\overline{\text{rg}}_X)(\text{rg}(y_i)-\overline{\text{rg}}_Y)}{\sqrt{\sum_i(\text{rg}(x_i)-\overline{\text{rg}}_X)^2 \cdot \sum_i(\text{rg}(y_i)-\overline{\text{rg}}_Y)^2}}\]
<p>Der durchschnittliche Rang: \(\overline{\text{rg}} = \frac{n+1}{2}\)</p>

<h3>Vereinfachte Formel (ohne Bindungen)</h3>
\[r_S = 1 - \frac{6\sum_{i=1}^{n}d_i^2}{n(n^2-1)}, \quad d_i = \text{rg}(x_i) - \text{rg}(y_i)\]

<h3>Wann Spearman statt Pearson?</h3>
<ul>
  <li>Ordinalskalierte Daten</li>
  <li>Ausreisser im Datensatz (Spearman ist robust gegenüber Extremwerten, da nur Ränge zählen)</li>
  <li>Stark nicht-normalverteilte metrische Daten</li>
  <li>Nicht-linearer, aber monotoner Zusammenhang (beide steigen, aber nicht proportional)</li>
</ul>
<div class="info-box">Spearman ist Pearson's r angewendet auf Ränge — dadurch verliert man keine Informationen über die Rangordnung, ignoriert aber die genauen Abstände zwischen den Werten. Bindungen (ties) erhalten den Durchschnittsrang.</div>
`
    },
    {
      id: 'ch4_eta', chapterId: 'ch4',
      title: 'Eta / Eta² (gemischte Skalenniveaus)',
      exerciseContext: 'Eta und Eta², Varianzzerlegung zwischen und innerhalb von Gruppen, Anwendung bei gemischtem Skalenniveau',
      content: String.raw`
<h2>Eta und Eta² (gemischte Skalenniveaus)</h2>
<p><strong>Anwendung:</strong> Eine nominalskalierte (\(Y\)) und eine metrische (\(X\)) Variable. Klassisches Beispiel: Beeinflusst das Geschlecht (nominal) das Einkommen (metrisch)?</p>
<p><strong>Grundidee:</strong> Wenn die Gruppe (Y) relevant ist, sollten die Gruppenmittelwerte weit auseinander liegen (grosse Zwischen-Varianz) und die Werte innerhalb jeder Gruppe nahe beieinanderliegen (kleine Innerhalb-Varianz). \(\eta^2\) misst das Verhältnis dieser erklärten Streuung zur Gesamtstreuung.</p>

<h3>Varianzzerlegung</h3>
\[\underbrace{\sum_{j,i}(x_{ij}-\bar{x})^2}_{SQT} = \underbrace{\sum_j n_j(\bar{x}_j-\bar{x})^2}_{SQE \text{ (zwischen Gruppen)}} + \underbrace{\sum_{j,i}(x_{ij}-\bar{x}_j)^2}_{SQR \text{ (innerhalb Gruppen)}}\]

<h3>Eta</h3>
\[\eta^2 = \frac{SQE}{SQT} = \frac{\text{erklärte Varianz}}{\text{Gesamtvarianz}} \in [0,1]\]
\[\eta = \sqrt{\eta^2} \in [0,1]\]

<h3>Interpretation</h3>
<ul>
  <li>\(\eta^2\) ist ein <strong>PRE-Mass</strong>: gibt den Anteil der durch die Gruppierung erklärten Varianz an.</li>
  <li>Falls \(Y\) dichotom ist: \(\eta = |r|\) (identisch mit dem Betrag von Pearson's r)</li>
</ul>
<table>
  <thead><tr><th>Komponente</th><th>Bezeichnung</th><th>Formel</th></tr></thead>
  <tbody>
    <tr><td>Gesamtvarianz</td><td>SQT</td><td>\(\sum_j\sum_i(x_{ij}-\bar{x})^2\)</td></tr>
    <tr><td>Erkl. Varianz</td><td>SQE</td><td>\(\sum_j n_j(\bar{x}_j-\bar{x})^2\)</td></tr>
    <tr><td>Residualvarianz</td><td>SQR</td><td>\(\sum_j\sum_i(x_{ij}-\bar{x}_j)^2\)</td></tr>
  </tbody>
</table>
`
    }
  ]
},

/* ═══════════════════════════════════════════════════════ KAPITEL 5 */
{
  id: 'ch5', num: 5, icon: '🔔',
  title: 'Inferenzstatistik I',
  subtitle: 'Normalverteilung & Konfidenzintervalle',
  color: '#14b8a6',
  topics: [
    {
      id: 'ch5_normal', chapterId: 'ch5',
      title: 'Normalverteilung & Zentraler Grenzwertsatz',
      exerciseContext: 'Normalverteilung, Standardnormalverteilung, z-Standardisierung, zentraler Grenzwertsatz, Wahrscheinlichkeiten ablesen',
      content: String.raw`
<h2>Normalverteilung und Zentraler Grenzwertsatz</h2>

<h3>Zentraler Grenzwertsatz (ZGW)</h3>
<p>Wenn ein Merkmal aus vielen <strong>additiven Einzeleinflüssen</strong> besteht und keiner dominiert, sind die Werte <strong>normalverteilt</strong>.</p>
<p>Noch wichtiger für die Praxis: <strong>Unabhängig davon, wie die Grundgesamtheit verteilt ist</strong> — die Mittelwerte vieler Stichproben nähern sich mit wachsendem \(n\) einer Normalverteilung an. Ab \(n \geq 30\) ist diese Näherung in der Regel gut genug, um Konfidenzintervalle und Tests durchzuführen.</p>
<p>Die <strong>Mittelwerte aus Stichproben</strong> aus einer Grundgesamtheit sind normalverteilt mit:
\[E(\bar{X}_n) = \mu_x, \quad \text{Var}(\bar{X}_n) = \frac{\sigma^2_x}{n}, \quad SE(\bar{X}_n) = \frac{\sigma_x}{\sqrt{n}}\]</p>

<h3>Dichtefunktion der Normalverteilung</h3>
\[f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-\frac{(x-\mu)^2}{2\sigma^2}}\]
<p>Parameter: \(\mu\) (Lage), \(\sigma\) (Breite). Symmetrisch, unimodal, Wendepunkte bei \(\mu \pm \sigma\).</p>

<h3>Wahrscheinlichkeiten</h3>
<table>
  <thead><tr><th>Intervall</th><th>Anteil</th></tr></thead>
  <tbody>
    <tr><td>\(\mu \pm 1\sigma\)</td><td>68,3%</td></tr>
    <tr><td>\(\mu \pm 2\sigma\)</td><td>95,5%</td></tr>
    <tr><td>\(\mu \pm 3\sigma\)</td><td>99,7%</td></tr>
  </tbody>
</table>

<h3>Standardnormalverteilung \(N(0,1)\)</h3>
<p>Erhalten durch z-Standardisierung: \(z = \frac{x-\mu}{\sigma}\)</p>
\[\varphi(z) = \frac{1}{\sqrt{2\pi}}\,e^{-z^2/2}\]
<p>\(\Phi(z) = P(Z \leq z)\): Tabellenwert (Fläche links von \(z\)). Wichtige Werte:</p>
<ul>
  <li>\(z_{0.95} = 1{,}645\) (einseitig, 5%)</li>
  <li>\(z_{0.975} = 1{,}96\) (zweiseitig, 5%)</li>
  <li>\(z_{0.995} = 2{,}576\) (zweiseitig, 1%)</li>
</ul>
`
    },
    {
      id: 'ch5_ci_means', chapterId: 'ch5',
      title: 'Konfidenzintervalle für Mittelwerte',
      exerciseContext: 'KI für Mittelwert, Standardfehler, z- und t-Verteilung, Berechnung und Interpretation',
      content: String.raw`
<h2>Konfidenzintervalle für Mittelwerte</h2>
<p>Aus einer Stichprobe kann keine <strong>Punktschätzung</strong>, sondern nur eine <strong>Intervallschätzung</strong> des Populationsparameters gemacht werden.</p>

<h3>95%-KI für den Mittelwert (grosse Stichprobe, \(n \geq 30\))</h3>
\[\bar{x} \pm z_{1-\alpha/2} \cdot \frac{s_x}{\sqrt{n}}\]
<p>Bei \(\alpha = 0{,}05\): \(z = 1{,}96\). Formel explizit:</p>
\[\bar{x} - 1{,}96 \cdot \frac{s_x}{\sqrt{n}} \leq \mu \leq \bar{x} + 1{,}96 \cdot \frac{s_x}{\sqrt{n}}\]

<h3>t-Verteilung bei kleinen Stichproben (\(n < 30\))</h3>
<p>Zusätzliche Annahme: Merkmal in der Grundgesamtheit normalverteilt.</p>
\[\bar{x} \pm t_{1-\alpha/2}(n-1) \cdot \frac{s_x}{\sqrt{n-1}}\]
<p>Der t-Wert hängt von den <strong>Freiheitsgraden</strong> \(df = n-1\) ab. Je kleiner \(n\), desto breiter das Intervall.</p>

<h3>Interpretation</h3>
<p>Ein 95%-KI bedeutet: Würde man das Verfahren sehr oft wiederholen, würde das Intervall in 95% der Fälle den wahren Parameter \(\mu\) enthalten.</p>
<div class="info-box">Das KI selbst ist entweder korrekt oder nicht – es ist kein Wahrscheinlichkeitsintervall für den fixen Parameter \(\mu\).</div>
<h3>Numerisches Beispiel</h3>
<p>\(n = 1000\) Schülerinnen, \(\bar{x} = 100\) (IQ), \(s = 15\). Das 95%-KI ist:</p>
\[100 \pm 1{,}96 \cdot \frac{15}{\sqrt{1000}} = 100 \pm 1{,}96 \cdot 0{,}474 = 100 \pm 0{,}93 = [99{,}07;\; 100{,}93]\]
<p>Interpretation: Mit 95% Konfidenz liegt der wahre Mittelwert der Grundgesamtheit zwischen 99,07 und 100,93. Das Intervall ist eng, weil \(n\) gross ist — grössere Stichproben liefern präzisere Schätzungen.</p>
<p><strong>Einfluss von n:</strong> Bei \(n = 100\) wäre das KI: \(100 \pm 1{,}96 \cdot 1{,}5 = [97{,}06;\; 102{,}94]\) — deutlich breiter.</p>
`
    },
    {
      id: 'ch5_ci_props', chapterId: 'ch5',
      title: 'Konfidenzintervalle für Anteilswerte',
      exerciseContext: 'KI für Anteilswerte (Proportionen), Standardfehler des Anteils, Berechnung und Anforderungen',
      content: String.raw`
<h2>Konfidenzintervalle für Anteilswerte</h2>
<p>Anteilswerte \(\hat{\pi}\) aus vielen Stichproben sind näherungsweise normalverteilt mit:</p>
\[E(\hat{\pi}) = \pi, \quad \text{Var}(\hat{\pi}) = \frac{\pi(1-\pi)}{n}\]

<h3>Standardfehler des Anteilsschätzers</h3>
\[SE(\hat{\pi}) = \sqrt{\frac{\hat{\pi}(1-\hat{\pi})}{n}}\]

<h3>Konfidenzintervall</h3>
\[\hat{\pi} - z_{1-\alpha/2}\sqrt{\frac{\hat{\pi}(1-\hat{\pi})}{n}} \leq \pi \leq \hat{\pi} + z_{1-\alpha/2}\sqrt{\frac{\hat{\pi}(1-\hat{\pi})}{n}}\]

<h3>Anforderungen</h3>
<ul>
  <li>\(n \geq 25\)</li>
  <li>Beide Gruppen: mindestens 10% Anteil (kleiner Anteil ≥ 10%)</li>
  <li>Kleinere Gruppe: mindestens 5 Beobachtungen</li>
</ul>
<h3>Beispiel</h3>
<p>\(n = 1000\), \(\hat{\pi} = 6\%\), 95%-KI:</p>
\[0{,}06 \pm 1{,}96\sqrt{\frac{0{,}06 \cdot 0{,}94}{1000}} = 0{,}06 \pm 0{,}015 = [0{,}045;\; 0{,}075]\]

<h3>Varianz einer binären (Bernoulli-)Variable</h3>
\[\text{Var}(X) = \pi(1-\pi)\]
`
    }
  ]
},

/* ═══════════════════════════════════════════════════════ KAPITEL 6 */
{
  id: 'ch6', num: 6, icon: '🔬',
  title: 'Inferenzstatistik II',
  subtitle: 'Signifikanztests',
  color: '#ef4444',
  topics: [
    {
      id: 'ch6_logic', chapterId: 'ch6',
      title: 'Logik der Hypothesentests',
      exerciseContext: 'H0 und H1 formulieren, Signifikanzniveau α, Fehler 1. und 2. Art (α-Fehler, β-Fehler), ein- und zweiseitige Tests',
      content: String.raw`
<h2>Logik der Signifikanztests</h2>

<h3>Hypothesen</h3>
<p><strong>Nullhypothese \(H_0\):</strong> behauptet in der Regel Unabhängigkeit / keinen Unterschied.<br>
<strong>Gegenhypothese \(H_1\):</strong> das eigentliche Forschungsinteresse.</p>
<p><strong>Zweiseitig:</strong>
\[H_0: \pi_1 - \pi_2 = 0 \quad H_1: \pi_1 - \pi_2 \neq 0\]</p>
<p><strong>Einseitig:</strong>
\[H_0: \pi_1 - \pi_2 \leq 0 \quad H_1: \pi_1 - \pi_2 > 0\]</p>

<h3>Fehlerarten</h3>
<table>
  <thead><tr><th>Entscheidung \ Wahrheit</th><th>\(H_0\) wahr</th><th>\(H_1\) wahr</th></tr></thead>
  <tbody>
    <tr><td>\(H_0\) beibehalten</td><td>✓ korrekt</td><td>β-Fehler (Fehler 2. Art)</td></tr>
    <tr><td>\(H_0\) ablehnen</td><td>α-Fehler (Fehler 1. Art)</td><td>✓ korrekt</td></tr>
  </tbody>
</table>
<ul>
  <li><strong>\(\alpha\)-Fehler:</strong> H₀ fälschlicherweise abgelehnt. Konvention: \(\alpha = 0{,}05\) (5%).</li>
  <li><strong>\(\beta\)-Fehler:</strong> H₀ fälschlicherweise beibehalten.</li>
  <li>Wenn \(\alpha\) sinkt, steigt \(\beta\) (Kompromiss). </li>
</ul>

<h3>Kritische Werte (Standardnormalverteilung)</h3>
<table>
  <thead><tr><th>Test</th><th>Kritischer Wert (\(\alpha=5\%\))</th></tr></thead>
  <tbody>
    <tr><td>Zweiseitig</td><td>\(z = \pm 1{,}96\)</td></tr>
    <tr><td>Einseitig rechts</td><td>\(z = 1{,}645\)</td></tr>
    <tr><td>Einseitig links</td><td>\(z = -1{,}645\)</td></tr>
  </tbody>
</table>

<h3>Der p-Wert</h3>
<p>Der <strong>p-Wert</strong> gibt die Wahrscheinlichkeit an, ein so extremes oder extremeres Ergebnis zu beobachten, <em>wenn H₀ wahr wäre</em>.</p>
<ul>
  <li>\(p < \alpha\): Ergebnis ist bei wahrer H₀ sehr unwahrscheinlich → H₀ verwerfen</li>
  <li>\(p \geq \alpha\): Kein ausreichender Grund, H₀ zu verwerfen</li>
  <li>Häufige Schwellen: \(p < 0{,}05\) (*), \(p < 0{,}01\) (**), \(p < 0{,}001\) (***)</li>
</ul>
<div class="info-box"><strong>p-Wert ≠ Wahrscheinlichkeit dass H₀ wahr ist!</strong> Ein p-Wert von 0,05 bedeutet nicht „5% Wahrscheinlichkeit, dass H₀ stimmt", sondern: „Wenn H₀ stimmt, wäre ein solches Ergebnis in 5% aller Stichproben zu beobachten."</div>

<h3>Schritte eines Tests</h3>
<ol>
  <li>Hypothesen formulieren (\(H_0, H_1\))</li>
  <li>Signifikanzniveau \(\alpha\) festlegen</li>
  <li>Prüfgrösse berechnen</li>
  <li>Kritischen Wert bestimmen (oder p-Wert)</li>
  <li>Entscheiden: verwerfen oder beibehalten</li>
</ol>
`
    },
    {
      id: 'ch6_zt_test', chapterId: 'ch6',
      title: 'z-Test & t-Test',
      exerciseContext: 'z-Test für Mittelwertsdifferenzen, t-Test bei kleinen Stichproben (gleiche/ungleiche Varianzen), Test für Anteilsdifferenzen, gepoolter Schätzer',
      content: String.raw`
<h2>z-Test und t-Test</h2>

<h3>z-Test für Mittelwertsdifferenzen (\(n_1 + n_2 > 30\))</h3>
\[z = \frac{(\bar{x}_1 - \bar{x}_2) - \delta}{\sqrt{S^2_{x_1}/n_1 + S^2_{x_2}/n_2}} \approx N(0,1)\]
<p>Unter \(H_0: \delta = \mu_1 - \mu_2 = 0\).</p>

<h3>t-Test für kleine Stichproben (\(n_1 + n_2 < 30\))</h3>
<p><strong>Gleiche Varianzen:</strong>
\[t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{\frac{n_1 s^2_1 + n_2 s^2_2}{n_1+n_2-2} \cdot \frac{n_1+n_2}{n_1 n_2}}} \sim t(n_1+n_2-2)\]</p>
<p><strong>Ungleiche Varianzen (Welch-Test):</strong>
\[t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{s^2_1/(n_1-1) + s^2_2/(n_2-1)}}\]</p>

<h3>Test für Anteilsdifferenzen</h3>
<p>Nullhypothese: \(H_0: \pi_1 = \pi_2\). Gepoolter Schätzer:
\[\hat{p} = \frac{n_1\hat{\pi}_1 + n_2\hat{\pi}_2}{n_1+n_2}\]
\[SE = \sqrt{\hat{p}(1-\hat{p})\left(\frac{1}{n_1}+\frac{1}{n_2}\right)}\]
\[z = \frac{\hat{\pi}_1 - \hat{\pi}_2}{SE} \approx N(0,1)\]</p>
<div class="info-box">Der gepoolte Schätzer wird verwendet, weil unter H₀ gilt: π₁ = π₂ = p. Daher schätzt man einen gemeinsamen Wert.</div>

<h3>Welcher Test wann?</h3>
<table>
  <thead><tr><th>Situation</th><th>Test</th><th>Voraussetzung</th></tr></thead>
  <tbody>
    <tr><td>Mittelwertsdifferenz, \(n_1+n_2 > 30\)</td><td>z-Test</td><td>—</td></tr>
    <tr><td>Mittelwertsdifferenz, \(n_1+n_2 \leq 30\), gleiche Varianzen</td><td>t-Test (gepoolte Varianz)</td><td>Normalverteilung in GG</td></tr>
    <tr><td>Mittelwertsdifferenz, kleine n, ungleiche Varianzen</td><td>Welch-t-Test</td><td>Normalverteilung in GG</td></tr>
    <tr><td>Anteilsdifferenz</td><td>z-Test mit gepooltem \(\hat{p}\)</td><td>\(n \geq 25\), Anteil ≥ 10%</td></tr>
  </tbody>
</table>
`
    },
    {
      id: 'ch6_chi_test', chapterId: 'ch6',
      title: 'Chi²-Unabhängigkeitstest',
      exerciseContext: 'Chi²-Unabhängigkeitstest, Freiheitsgrade, kritischer Chi²-Wert, Entscheidung, Voraussetzungen',
      content: String.raw`
<h2>Chi²-Unabhängigkeitstest</h2>
<p><strong>Nullhypothese:</strong> \(H_0: P_{ij} = P_{i\cdot} \cdot P_{\cdot j}\) (die zwei Merkmale sind statistisch unabhängig).</p>

<h3>Teststatistik</h3>
\[\chi^2 = \sum_{i=1}^{k}\sum_{j=1}^{m}\frac{(h_{ij}-\tilde{h}_{ij})^2}{\tilde{h}_{ij}}, \quad \tilde{h}_{ij} = \frac{h_{i\cdot} \cdot h_{\cdot j}}{n}\]
<p>Die Teststatistik folgt (unter H₀) einer <strong>Chi²-Verteilung</strong> mit \(df = (k-1)(m-1)\) Freiheitsgraden.</p>

<h3>Kritische Werte</h3>
<table>
  <thead><tr><th>df</th><th>\(\alpha=5\%\)</th><th>\(\alpha=1\%\)</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>3,84</td><td>6,63</td></tr>
    <tr><td>2</td><td>5,99</td><td>9,21</td></tr>
    <tr><td>3</td><td>7,81</td><td>11,34</td></tr>
    <tr><td>4</td><td>9,49</td><td>13,28</td></tr>
  </tbody>
</table>

<h3>Entscheidung</h3>
<p>\(H_0\) verwerfen, wenn \(\chi^2 > \chi^2_{1-\alpha}(df)\).</p>

<h3>Voraussetzungen</h3>
<ul>
  <li>Alle erwarteten Zellhäufigkeiten \(\geq 5\)</li>
  <li>Bei \(2 \times 2\)-Tabellen und kleinen Häufigkeiten: Yates-Korrektur</li>
</ul>
`
    },
    {
      id: 'ch6_corr_test', chapterId: 'ch6',
      title: 'Signifikanztest für r',
      exerciseContext: 'Signifikanztest für Pearson\'s r und Spearman-Korrelation; t-Statistik, Freiheitsgrade',
      content: String.raw`
<h2>Signifikanztest für Korrelationskoeffizienten</h2>
<p>\(H_0: \rho_{XY} = 0\) vs. \(H_1: \rho_{XY} \neq 0\)</p>

<h3>Teststatistik für Pearson's r</h3>
\[T = r_{xy} \cdot \frac{\sqrt{n-2}}{\sqrt{1-r^2}} \sim t(n-2)\]
<p>Standardfehler: \(SE(r) = \sqrt{\frac{1-r^2}{n-2}}\)</p>

<h3>Entscheidung</h3>
<p>\(H_0\) verwerfen, wenn \(|T| > t_{1-\alpha/2}(n-2)\).</p>

<h3>Gleiches gilt für:</h3>
<ul>
  <li><strong>Spearman's \(r_S\)</strong> (mit angepasstem SE)</li>
  <li><strong>Kendall's Tau-b</strong></li>
  <li><strong>Gamma</strong></li>
</ul>

<h3>Wichtig: Signifikant ≠ Relevant</h3>
<p>Bei grossen Stichproben werden auch sehr kleine Korrelationen signifikant. Die <strong>Effektstärke</strong> (Grösse des r) muss inhaltlich bewertet werden.</p>
`
    }
  ]
},

/* ═══════════════════════════════════════════════════════ KAPITEL 7 */
{
  id: 'ch7', num: 7, icon: '📉',
  title: 'Regression I',
  subtitle: 'Bivariate Regressionsanalyse',
  color: '#8b5cf6',
  topics: [
    {
      id: 'ch7_ols', chapterId: 'ch7',
      title: 'OLS-Prinzip & Modell',
      exerciseContext: 'Lineares Regressionsmodell, abhängige/unabhängige Variable, Residuen, OLS-Prinzip, Modellgleichung, BLUE-Eigenschaften',
      content: String.raw`
<h2>Das bivariate Regressionsmodell</h2>

<h3>Modellgleichung</h3>
\[Y_i = \alpha + \beta \cdot x_i + \varepsilon_i\]
<p><strong>\(\alpha\) (Intercept):</strong> Wert von \(Y\) wenn \(X = 0\) (Achsenabschnitt).<br>
<strong>\(\beta\) (Slope):</strong> Durchschnittliche Veränderung von \(Y\) wenn \(X\) um 1 zunimmt.<br>
<strong>\(\varepsilon_i\) (Residual):</strong> Störterm, enthält alle anderen Einflüsse auf \(Y\).</p>

<h3>OLS-Prinzip (Methode der kleinsten Quadrate)</h3>
\[Q(\hat{\alpha}, \hat{\beta}) = \sum_{i=1}^{n}\hat{\varepsilon}_i^2 = \sum_{i=1}^{n}(Y_i - \hat{\alpha} - \hat{\beta}x_i)^2 \rightarrow \text{Minimum}\]

<h3>BLUE-Annahmen</h3>
<ul>
  <li><strong>A1 – Linearität:</strong> Der Zusammenhang ist linear in den Parametern</li>
  <li><strong>A2 – Null-Mittelwert:</strong> \(E(\varepsilon_i) = 0 = E(\varepsilon|X=x_i)\)</li>
  <li><strong>A3 – Homoskedastizität:</strong> \(\text{Var}(\varepsilon_i) = \sigma^2_\varepsilon\) für alle \(i\)</li>
  <li><strong>A4 – Keine Autokorrelation:</strong> \(COV(\varepsilon_i, \varepsilon_j) = 0\)</li>
  <li><strong>A5 – Normalverteilung der Residuen:</strong> \(\varepsilon_i \sim N(0, \sigma^2_\varepsilon)\)</li>
</ul>
<div class="info-box">Sind diese Annahmen erfüllt, sind die OLS-Schätzer die <strong>besten linearen unverzerrten Schätzer (BLUE)</strong>.</div>

<h3>Unterschied zu Pearson's r</h3>
<p>Pearson's \(r\) ist <em>symmetrisch</em> (\(r_{XY} = r_{YX}\)). Regression verlangt a priori eine Unterscheidung zwischen AV und UV – also eine inhaltliche Theorie über Ursache und Wirkung.</p>
`
    },
    {
      id: 'ch7_coefficients', chapterId: 'ch7',
      title: 'Berechnung von α und β',
      exerciseContext: 'OLS-Formeln für β (Steigung) und α (Intercept), Rechenbeispiele, Eigenschaften der Regressionsgeraden',
      content: String.raw`
<h2>OLS-Schätzer: Berechnung von \(\hat{\alpha}\) und \(\hat{\beta}\)</h2>

<h3>Steigungskoeffizient \(\hat{\beta}\)</h3>
\[\hat{\beta} = \frac{\sum_i(x_i-\bar{x})(y_i-\bar{y})}{\sum_i(x_i-\bar{x})^2} = \frac{COV(X,Y)}{S^2_x} = r_{XY} \cdot \frac{S_y}{S_x}\]

<h3>Achsenabschnitt \(\hat{\alpha}\)</h3>
\[\hat{\alpha} = \bar{Y} - \hat{\beta} \cdot \bar{x}\]

<h3>Vorhergesagte Werte</h3>
\[\hat{Y}_i = \hat{\alpha} + \hat{\beta} \cdot x_i\]

<h3>Residuen</h3>
\[\hat{\varepsilon}_i = Y_i - \hat{Y}_i\]

<h3>Eigenschaften der OLS-Lösung</h3>
<ul>
  <li>Die Regressionsgerade verläuft durch den Punkt \((\bar{x}, \bar{y})\)</li>
  <li>\(\sum_i \hat{\varepsilon}_i = 0\) (Summe der Residuen ist null)</li>
  <li>\(\bar{\hat{Y}} = \bar{Y}\) (Mittelwert der Vorhersagen = Mittelwert der Beobachtungen)</li>
</ul>

<h3>Standardfehler der Schätzer</h3>
\[\hat{\sigma}_\beta = \frac{\hat{\sigma}_\varepsilon}{\sqrt{\sum_i(x_i-\bar{x})^2}}, \quad \hat{\sigma}_\varepsilon = \sqrt{\frac{\sum_i\hat{\varepsilon}_i^2}{n-2}}\]
`
    },
    {
      id: 'ch7_r2', chapterId: 'ch7',
      title: 'Bestimmtheitsmass R²',
      exerciseContext: 'R², Varianzzerlegung (SQT, SQE, SQR), Berechnung, Interpretation; Zusammenhang R² und r²',
      content: String.raw`
<h2>Das Bestimmtheitsmass \(R^2\)</h2>

<h3>Varianzzerlegung</h3>
\[SQT = \underbrace{SQE}_{\text{erklärt}} + \underbrace{SQR}_{\text{Residual}}\]
\[SQT = \sum_i(Y_i-\bar{Y})^2 \quad \text{(Gesamtstreuung)}\]
\[SQE = \sum_i(\hat{Y}_i-\bar{Y})^2 \quad \text{(erklärte Streuung)}\]
\[SQR = \sum_i(Y_i-\hat{Y}_i)^2 = \sum_i\hat{\varepsilon}_i^2 \quad \text{(Residualstreuung)}\]

<h3>Definition</h3>
\[R^2 = \frac{SQE}{SQT} = 1 - \frac{SQR}{SQT} \in [0,1]\]

<h3>Interpretation</h3>
<p>\(R^2\) gibt den Anteil der Varianz von \(Y\) an, der durch die Regressionsgerade (durch \(X\)) erklärt wird.</p>

<h3>Zusammenhang mit Pearson's r</h3>
<p>Im bivariaten Fall: \(R^2 = r^2_{XY}\)</p>

<h3>Beispiel</h3>
<p>\(R^2 = 0{,}35\): 35% der Varianz im Einkommen werden durch die Ausbildungsjahre erklärt.</p>
<div class="info-box">Bei multiplen Regressionen: korrigiertes \(\tilde{R}^2\) verwenden (→ Kapitel 8).</div>
`
    },
    {
      id: 'ch7_significance', chapterId: 'ch7',
      title: 'Signifikanztest für β',
      exerciseContext: 'T-Test für den Regressionskoeffizienten β, Konfidenzintervall für β, Standardfehler',
      content: String.raw`
<h2>Signifikanztest für \(\hat{\beta}\)</h2>
<p>\(H_0: \beta = 0\) (X hat keinen Einfluss auf Y)<br>
\(H_1: \beta \neq 0\)</p>

<h3>t-Statistik</h3>
\[T_\beta = \frac{\hat{\beta}}{\hat{\sigma}_\beta} \sim t(n-2)\]
<p>\(H_0\) verwerfen, wenn \(|T_\beta| > t_{1-\alpha/2}(n-2)\).</p>

<h3>Konfidenzintervall für \(\beta\)</h3>
\[\hat{\beta} \pm \hat{\sigma}_\beta \cdot t_{1-\alpha/2}(n-2)\]

<h3>Standardfehler von \(\hat{\alpha}\)</h3>
\[\hat{\sigma}_\alpha = \hat{\sigma}_\varepsilon \cdot \sqrt{\frac{\sum_i x_i^2}{n \cdot \sum_i(x_i-\bar{x})^2}}\]

<h3>Interpretation</h3>
<p>Ist \(T_\beta > t_{\text{krit}}\), ist der Regressionskoeffizient auf dem Niveau \(\alpha\) statistisch signifikant: Der Effekt von X auf Y lässt sich von Null unterscheiden.</p>
<div class="info-box">Achtung: Signifikanz ≠ praktische Bedeutsamkeit. Immer auch die Grösse von \(\hat{\beta}\) und \(R^2\) inhaltlich bewerten!</div>
`
    },
    {
      id: 'ch7_stata_output', chapterId: 'ch7',
      title: 'Stata Regressions-Output lesen (bivariat)',
      exerciseContext: 'Stata-Output einer bivariaten Regression vollständig lesen: SQE/SQR/SQT, df, R², Root MSE, Koeffizient, SE, t-Wert, p-Wert, 95%-KI; Formeln zum Nachrechnen fehlender Werte',
      content: String.raw`
<h2>Stata Regressions-Output: Bivariate Regression</h2>
<p>Stata-Ausgabe einer Regression von <em>Lohn</em> auf <em>Ausbildungsjahre</em> (fiktives Beispiel):</p>

<pre style="background:#f1f5f9;border-radius:6px;padding:14px;font-size:.82rem;line-height:1.6;overflow-x:auto">      Source |       SS        df        MS
-------------+-----------------------------   Number of obs =    10
       Model |   982.12         1     982.12   R-squared     = 0.3489
    Residual |  1834.58         8     229.32   Adj R-squared = 0.2676
-------------+-----------------------------   Root MSE      = 15.144
       Total |  2816.70         9     313.00

------------------------------------------------------------------------------
        lohn |    Coef.    Std. Err.      t    P&gt;|t|   [95% Conf. Interval]
-------------+----------------------------------------------------------------
   ausbjahre |    3.451      1.145     3.01    0.017      0.809    6.093
       _cons |   -5.620      14.36    -0.39    0.706    -38.74    27.50
------------------------------------------------------------------------------</pre>

<h3>Obere Tabelle: Varianzzerlegung</h3>
<table>
  <thead><tr><th>Zeile</th><th>SS</th><th>df</th><th>Bedeutung</th></tr></thead>
  <tbody>
    <tr><td>Model</td><td>\(SQE\)</td><td>\(k\) (Anzahl Regressoren, hier 1)</td><td>Erklärte Streuung</td></tr>
    <tr><td>Residual</td><td>\(SQR\)</td><td>\(n-k-1\) (hier \(10-1-1=8\))</td><td>Nicht erklärte Streuung</td></tr>
    <tr><td>Total</td><td>\(SQT\)</td><td>\(n-1\) (hier 9)</td><td>Gesamtstreuung</td></tr>
  </tbody>
</table>
<p>Prüfen: \(SQT = SQE + SQR\) (hier: \(982.12 + 1834.58 = 2816.70\) ✓)</p>

<h3>Kennzahlen rechts oben</h3>
<table>
  <thead><tr><th>Ausgabe</th><th>Formel</th><th>Hier</th></tr></thead>
  <tbody>
    <tr><td>R-squared</td><td>\(R^2 = SQE/SQT\)</td><td>\(982.12/2816.70 = 0.349\)</td></tr>
    <tr><td>Adj R-squared</td><td>\(\tilde{R}^2 = 1-\frac{SQR/(n-k-1)}{SQT/(n-1)}\)</td><td>\(0.268\)</td></tr>
    <tr><td>Root MSE</td><td>\(\hat{\sigma}_\varepsilon = \sqrt{SQR/(n-k-1)}\)</td><td>\(\sqrt{229.32}=15.14\)</td></tr>
  </tbody>
</table>

<h3>Untere Tabelle: Koeffizienten</h3>
<table>
  <thead><tr><th>Spalte</th><th>Bedeutung</th><th>Formel</th></tr></thead>
  <tbody>
    <tr><td>Coef.</td><td>Geschätzter Koeffizient \(\hat{\beta}\)</td><td>—</td></tr>
    <tr><td>Std. Err.</td><td>Standardfehler \(\hat{\sigma}_\beta\)</td><td>\(\hat{\sigma}_\varepsilon / \sqrt{\sum(x_i-\bar{x})^2}\)</td></tr>
    <tr><td>t</td><td>t-Statistik</td><td>\(t = \hat{\beta} / \hat{\sigma}_\beta\)</td></tr>
    <tr><td>P&gt;|t|</td><td>p-Wert (zweiseitig)</td><td>Aus t-Tabelle mit \(df=n-2\)</td></tr>
    <tr><td>[95% CI]</td><td>Konfidenzintervall</td><td>\(\hat{\beta} \pm t_{0.975}(n-2) \cdot \hat{\sigma}_\beta\)</td></tr>
  </tbody>
</table>

<h3>Fehlende Werte aus dem Output berechnen</h3>
<p>Häufige Prüfungsfrage: Werte sind ausgeblendet → berechnen:</p>
<ul>
  <li><strong>TSS fehlt:</strong> \(SQT = SQE + SQR\)</li>
  <li><strong>R² fehlt:</strong> \(R^2 = SQE / SQT\)</li>
  <li><strong>t-Wert fehlt:</strong> \(t = \text{Coef} / \text{SE}\)</li>
  <li><strong>SE fehlt, t bekannt:</strong> \(SE = \text{Coef} / t\)</li>
  <li><strong>KI:</strong> \([\hat{\beta} - t_{\text{krit}} \cdot SE \;;\; \hat{\beta} + t_{\text{krit}} \cdot SE]\), bei \(n \geq 30\): \(t_{\text{krit}} \approx 1.96\)</li>
</ul>

<h3>Interpretation Beispiel</h3>
<p><strong>Koeffizient 3.451:</strong> Jedes zusätzliche Ausbildungsjahr geht im Durchschnitt mit einem um 3.45 CHF/h höheren Bruttolohn einher, ceteris paribus.</p>
<p><strong>Konstante −5.62:</strong> Erwarteter Lohn bei 0 Ausbildungsjahren. Oft inhaltlich nicht sinnvoll interpretierbar.</p>
<p><strong>R² = 0.35:</strong> 35% der Varianz im Lohn werden durch die Ausbildungsjahre erklärt.</p>
<p><strong>p = 0.017:</strong> Der Koeffizient ist auf dem 5%-Niveau signifikant (p &lt; 0.05). \(H_0: \beta=0\) wird verworfen.</p>
`
    }
  ]
},

/* ═══════════════════════════════════════════════════════ KAPITEL 8 */
{
  id: 'ch8', num: 8, icon: '🔭',
  title: 'Regression II',
  subtitle: 'Multiple Regression',
  color: '#f97316',
  topics: [
    {
      id: 'ch8_multiple', chapterId: 'ch8',
      title: 'Multiple Regression',
      exerciseContext: 'Multiple Regressionsgleichung, partielle Koeffizienten, Interpretation, Multikollinearität, Stichprobengrösse',
      content: String.raw`
<h2>Multiple Regressionsanalyse</h2>

<h3>Motivation</h3>
<p>In der Praxis hängt eine AV von mehreren UVs ab. Die multiple Regression ermöglicht es, den Einfluss jeder Variable <strong>unter Kontrolle</strong> der anderen zu schätzen.</p>
<p>Lazarsfeld unterscheidet vier Fälle, was beim Hinzufügen einer Kontrollvariable \(Z\) passiert:</p>
<table>
  <thead><tr><th>Fall</th><th>Was passiert mit \(r_{XY}\)?</th><th>Bedeutung</th></tr></thead>
  <tbody>
    <tr><td>Scheinkorrelation</td><td>Wird unter Kontrolle von Z ≈ 0</td><td>Z ist die eigentliche Ursache beider Variablen</td></tr>
    <tr><td>Mediation (Interpretation)</td><td>Wird unter Kontrolle von Z ≈ 0</td><td>Z liegt auf dem Kausalweg von X → Z → Y</td></tr>
    <tr><td>Multikausalität</td><td>Bleibt signifikant</td><td>X und Z haben je einen unabhängigen Effekt auf Y</td></tr>
    <tr><td>Interaktion (Moderation)</td><td>Variiert nach Gruppen von Z</td><td>Effekt von X auf Y unterscheidet sich je nach Z</td></tr>
  </tbody>
</table>

<h3>Modellgleichung</h3>
\[Y_i = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \cdots + \beta_k x_{ik} + \varepsilon_i\]

<h3>Interpretation der Koeffizienten</h3>
<p>\(\hat{\beta}_j\): Durchschnittliche Veränderung von \(Y\), wenn \(X_j\) um 1 zunimmt, <strong>unter Konstanthaltung aller anderen</strong> \(X\)-Variablen (partieller Effekt, <em>ceteris paribus</em>).</p>

<h3>Multikollinearität</h3>
<p>Sind zwei oder mehr Regressoren stark korreliert, werden die Standardfehler sehr gross → die Schätzer sind ungenau. Vollständige Kollinearität: keine eindeutige Lösung möglich.</p>
<p><strong>Standardfehler wächst</strong> mit der Varianz der Residuen und <strong>sinkt</strong> mit der Varianz von \(X_j\):</p>
\[\text{Var}(\hat{\beta}_j) = \frac{\sigma^2}{\sum_i(x_{ji}-\bar{x}_j)^2(1-R^2_j)}\]
<p>\(R^2_j\) = \(R^2\) der Regression von \(X_j\) auf alle anderen Regressoren.</p>

<h3>Signifikanztest</h3>
\[T_j = \frac{\hat{\beta}_j}{\hat{\sigma}_j} \sim t(n-k-1)\]
`
    },
    {
      id: 'ch8_dummies', chapterId: 'ch8',
      title: 'Dummy-Variablen',
      exerciseContext: 'Dummy-Kodierung nominaler Variablen, Referenzkategorie, Interpretation der Koeffizienten, m-1 Dummies für m Kategorien',
      content: String.raw`
<h2>Dummy-Variablen</h2>
<p>Die OLS-Regression verlangt metrische Variablen. Kategoriale Variablen werden als <strong>0/1-Dummy-Variablen</strong> eingebaut.</p>

<h3>Kodierung</h3>
<p>Für eine kategoriale Variable mit \(m\) Ausprägungen: \(m-1\) Dummy-Variablen. Die ausgelassene Kategorie ist die <strong>Referenzkategorie</strong>.</p>
\[X^j = \begin{cases}1 & \text{falls } X = j \\ 0 & \text{sonst}\end{cases}\]

<h3>Interpretation</h3>
<p>Der Koeffizient einer Dummy-Variable gibt die <strong>Mittelwertsdifferenz</strong> zwischen der betreffenden Gruppe und der Referenzkategorie an (ceteris paribus).</p>

<h3>Beispiel: Zivilstand (Referenz: verheiratet)</h3>
<p>Wenn \(\hat{\beta}_{\text{ledig}} = -200\): Ledige verdienen im Durchschnitt 200 CHF weniger als Verheiratete, unter Kontrolle der anderen Variablen.</p>

<h3>Grafische Intuition</h3>
<p>Dummy-Variablen verschieben den Y-Achsenabschnitt – die Geraden der Gruppen liegen <strong>parallel</strong> zueinander (gleiche Steigung, verschiedener Intercept).</p>
<div class="info-box">Nie alle m Kategorien als Dummies kodieren! Das erzeugt <strong>perfekte Multikollinearität</strong> (Dummy-Variable-Falle).</div>
`
    },
    {
      id: 'ch8_adj_r2', chapterId: 'ch8',
      title: 'Korrigiertes R² & Standardisiertes β',
      exerciseContext: 'Korrigiertes (adjusted) R², Formel und Interpretation; standardisierte Regressionskoeffizienten β*',
      content: String.raw`
<h2>Korrigiertes \(R^2\) und standardisierte Koeffizienten</h2>

<h3>Problem mit dem einfachen \(R^2\)</h3>
<p>\(R^2\) kann durch das Hinzufügen weiterer Variablen nur steigen (oder gleich bleiben), auch wenn diese nichts erklären. Das führt zu <strong>Overfitting</strong>.</p>

<h3>Korrigiertes \(\tilde{R}^2\) (Adjusted R²)</h3>
\[\tilde{R}^2 = 1 - \frac{SQR/(n-k-1)}{SQT/(n-1)}\]
<p>Bestraft das Hinzufügen nicht-erklärender Variablen. Kann negativ werden.</p>
<ul>
  <li>\(n\): Anzahl Beobachtungen</li>
  <li>\(k\): Anzahl Regressoren (ohne Konstante)</li>
</ul>

<h3>Standardisierte Regressionskoeffizienten \(\beta^*\)</h3>
<p>Werden beide Variablen z-standardisiert, erhält man \(\beta^*\):</p>
\[Y^z = \beta^*_1 x^z_1 + \beta^*_2 x^z_2 + \cdots + \varepsilon^z\]
\[\beta^*_j = \hat{\beta}_j \cdot \frac{S_{x_j}}{S_y}\]
<p><strong>Interpretation:</strong> \(\beta^*_j\) gibt an, um wie viele <em>Standardabweichungen</em> sich \(Y\) verändert, wenn \(X_j\) um eine Standardabweichung steigt.</p>
<p>Erlaubt den <strong>Vergleich der Effektstärken</strong> über Variablen mit verschiedenen Einheiten hinweg. Bei standardisiertem Modell: Konstante = 0.</p>
`
    },
    {
      id: 'ch8_extensions', chapterId: 'ch8',
      title: 'Interaktionen & Transformationen',
      exerciseContext: 'Interaktionseffekte, quadratische Terme, log-Transformationen; Interpretation der Koeffizienten',
      content: String.raw`
<h2>Erweiterungen des Regressionsmodells</h2>

<h3>Interaktionseffekte</h3>
\[\hat{Y} = \hat{\beta}_0 + \hat{\beta}_1 X_1 + \hat{\beta}_2 X_2 + \hat{\beta}_3 X_1 X_2\]
<p>\(\hat{\beta}_3\): zusätzlicher Effekt von \(X_1\), wenn \(X_2\) um 1 zunimmt.<br>
Gesamteffekt von \(X_1\) auf \(Y\): \(\hat{\beta}_1 + \hat{\beta}_3 X_2\)</p>

<h3>Parabolische Effekte (U-Form)</h3>
\[Y = \beta_0 + \beta_1 X + \beta_2 X^2\]
<p>Maximum/Minimum bei: \(X^* = \frac{-\beta_1}{2\beta_2}\)</p>

<h3>Log-Transformationen</h3>
<table>
  <thead><tr><th>Modell</th><th>Interpretation von \(\beta\)</th></tr></thead>
  <tbody>
    <tr><td>\(\ln(Y) = \beta_0 + \beta_1 X\)</td><td>\(Y\) steigt um \((\exp(\beta_1)-1)\times100\%\) wenn \(X\) um 1 steigt</td></tr>
    <tr><td>\(Y = \beta_0 + \beta_1\ln(X)\)</td><td>\(Y\) steigt um \(\beta_1/100\) wenn \(X\) um 1% steigt</td></tr>
    <tr><td>\(\ln(Y) = \beta_0 + \beta_1\ln(X)\)</td><td>Elastizität: \(Y\) steigt um \(\beta_1\%\) wenn \(X\) um 1% steigt</td></tr>
  </tbody>
</table>
<p>Log-Transformation wird verwendet, wenn \(Y\) exponentiell mit \(X\) wächst (z.B. Einkommen nach Ausbildungsjahren).</p>

<h3>Vorgehen beim Modellvergleich</h3>
<ul>
  <li>Modell 1: nur Kontrollvariablen</li>
  <li>Modell 2: + theoretische Variable</li>
  <li>Vergleich: \(\tilde{R}^2\), Signifikanz der Koeffizienten</li>
</ul>
`
    },
    {
      id: 'ch8_stata_output', chapterId: 'ch8',
      title: 'Stata Output: Fehlende Werte berechnen',
      exerciseContext: 'Vollständiger multipler Regressions-Output: TSS, R², t-Wert, 95%-KI, Dummy-Koeffizient, Standardfehler berechnen; Vorhergesagten Wert berechnen; Signifikanz und Interpretation',
      content: String.raw`
<h2>Stata Output: Multiple Regression — Fehlende Werte berechnen</h2>
<p>Dies ist einer der häufigsten Prüfungsaufgabentypen: Ein Regressionsoutput ist abgebildet, einzelne Werte fehlen und müssen berechnet werden.</p>

<h3>Beispiel-Output (Wohnungsgrösse in m²)</h3>
<p>Regression: \(\widehat{sqm} = \hat{\beta}_0 + \hat{\beta}_1\,hhinc + \hat{\beta}_2\,hhsize + \text{Dummies Zivilstand}\)<br>
Referenzkategorie Zivilstand: <strong>verheiratet</strong></p>

<pre style="background:#f1f5f9;border-radius:6px;padding:14px;font-size:.8rem;line-height:1.7;overflow-x:auto">      Source |       SS        df        MS
-------------+-----------------------------   R-squared     =   [?]
       Model |  82'345.6        6   13'724.3   Adj R-squared = 0.4389
    Residual |  99'456.3      120      828.8   Root MSE      = 28.79
-------------+-----------------------------
       Total |    [?]         126     [?]

------------------------------------------------------------------------------
         sqm |   Coef.    Std. Err.     t    P&gt;|t|   [95% Conf. Interval]
-------------+----------------------------------------------------------------
       hhinc |   0.0032     0.0008    [?]    0.000      [?]        [?]
      hhsize |  12.45        2.31     5.39   0.000      [?]        [?]
             |
   zivilstand (Referenz: verheiratet)
    getrennt |  -18.50        6.20   -2.98   0.003   -30.78      -6.22
      ledig  |  -14.67        4.57    [?]    0.002   -23.73      -5.61
  geschieden |    [?]         5.10   -1.82   0.071   -17.35       0.71
   verwitwet |   -6.20        3.80   -1.63   0.105   -13.73       1.33
             |
       _cons |  45.23       12.34    3.67   0.000    20.79      69.67
------------------------------------------------------------------------------</pre>

<h3>Berechnung aller fehlenden Werte</h3>
<table>
  <thead><tr><th>Gesuchter Wert</th><th>Formel</th><th>Rechnung</th><th>Ergebnis</th></tr></thead>
  <tbody>
    <tr><td><strong>TSS</strong></td><td>\(SQT = SQE + SQR\)</td><td>\(82\,345.6 + 99\,456.3\)</td><td>\(181\,801.9\)</td></tr>
    <tr><td><strong>R²</strong></td><td>\(R^2 = SQE/SQT\)</td><td>\(82\,345.6 / 181\,801.9\)</td><td>\(0.453\)</td></tr>
    <tr><td><strong>t für hhinc</strong></td><td>\(t = \hat{\beta}/SE\)</td><td>\(0.0032 / 0.0008\)</td><td>\(4.00\)</td></tr>
    <tr><td><strong>95%-KI hhinc</strong></td><td>\(\hat{\beta} \pm 1.96 \cdot SE\)</td><td>\(0.0032 \pm 1.96 \cdot 0.0008\)</td><td>\([0.0016;\; 0.0048]\)</td></tr>
    <tr><td><strong>95%-KI hhsize</strong></td><td>\(\hat{\beta} \pm 1.96 \cdot SE\)</td><td>\(12.45 \pm 1.96 \cdot 2.31\)</td><td>\([7.92;\; 16.98]\)</td></tr>
    <tr><td><strong>Koeff. geschieden</strong></td><td>\(\hat{\beta} = t \cdot SE\)</td><td>\(-1.82 \times 5.10\)</td><td>\(-9.28\)</td></tr>
    <tr><td><strong>t für ledig</strong></td><td>\(t = \hat{\beta}/SE\)</td><td>\(-14.67 / 4.57\)</td><td>\(-3.21\)</td></tr>
  </tbody>
</table>

<h3>Signifikanz auf 5%-Niveau</h3>
<p>Signifikant wenn \(p < 0.05\) oder \(|t| > 1.96\) (bei grossem n):</p>
<ul>
  <li>hhinc (\(p=0.000\)), hhsize (\(p=0.000\)), getrennt (\(p=0.003\)), ledig (\(p=0.002\)): <strong>signifikant</strong></li>
  <li>geschieden (\(p=0.071\)), verwitwet (\(p=0.105\)): <strong>nicht signifikant</strong></li>
</ul>

<h3>Interpretation der Koeffizienten</h3>
<ul>
  <li><strong>hhinc = 0.0032:</strong> Pro 1 € mehr Haushaltseinkommen/Monat ist die Wohnung 0.0032 m² grösser (c.p.) — oder: pro 1000 € monatlich → +3.2 m².</li>
  <li><strong>hhsize = 12.45:</strong> Pro zusätzliche Person im Haushalt → +12.45 m² Wohnfläche (c.p.).</li>
  <li><strong>ledig = −14.67:</strong> Ledige Haushalte wohnen 14.67 m² kleiner als verheiratete (Referenz), c.p.</li>
  <li><strong>Konstante = 45.23:</strong> Erwartete Wohnfläche für verheiratete Haushalte mit 0 Personen und 0 Einkommen → inhaltlich nicht sinnvoll interpretierbar.</li>
</ul>

<h3>Vorhergesagten Wert berechnen</h3>
<p>Beispiel: Lediges Paar, 3 Personen, 5'500 € Einkommen/Monat:</p>
\[\hat{sqm} = 45.23 + 0.0032 \cdot 5500 + 12.45 \cdot 3 + (-14.67) \cdot 1\]
\[= 45.23 + 17.60 + 37.35 - 14.67 = 85.51\; m^2\]
<p><strong>Welche Dummies einsetzen:</strong> Für <em>ledig</em>: \(D_{ledig}=1\), alle anderen Zivilstandsdummies = 0.</p>

<h3>F-Test (Gesamtsignifikanz)</h3>
\[F = \frac{SQE/k}{SQR/(n-k-1)} = \frac{MS_{\text{Model}}}{MS_{\text{Residual}}} \sim F(k,\; n-k-1)\]
<p>\(H_0:\) alle \(\beta_j = 0\). Stata gibt F-Wert und p-Wert aus. Wenn \(p < 0.05\): das Modell als Ganzes ist signifikant.</p>

<h3>Adjusted R² vs. R²</h3>
<p>\(R^2 = 0.453\) aber \(\tilde{R}^2 = 0.439\): Für jede nicht-erklärende Variable wird \(\tilde{R}^2\) kleiner. Bei Modellvergleichen immer \(\tilde{R}^2\) verwenden.</p>

<div class="info-box">Bei grossen Stichproben (\(n \geq 30\)): \(t_{\text{krit}} \approx 1.96\) für 95%-KI. Bei kleinen Stichproben genauen t-Wert mit \(df = n-k-1\) aus der t-Tabelle ablesen.</div>
`
    }
  ]
}

]; // Ende CHAPTERS

// ─── Hilfsfunktionen ───────────────────────────────────────────
function getAllTopics() {
  return CHAPTERS.flatMap(ch => ch.topics);
}

function getTopicById(id) {
  return getAllTopics().find(t => t.id === id);
}

function getChapterById(id) {
  return CHAPTERS.find(ch => ch.id === id);
}

function getChapterTopics(chapterId) {
  const ch = getChapterById(chapterId);
  return ch ? ch.topics : [];
}
