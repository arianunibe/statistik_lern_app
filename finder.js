// ─── finder.js ─── Methoden-Finder & Szenario-Training ──────────

// ─── Decision Tree ───────────────────────────────────────────────
const DECISION_TREE = {

  start: {
    q: 'Was ist das Ziel deiner Analyse?',
    opts: [
      { label: '📊 Eine Variable beschreiben', next: 'uni_level' },
      { label: '🔗 Zusammenhang zweier Variablen messen', next: 'biv_v1' },
      { label: '📈 Einfluss auf eine Zielvariable modellieren', next: 'reg_nvars' },
      { label: '🔬 Hypothese testen / Inferenz', next: 'inf_type' },
    ]
  },

  // ── UNIVARIATE ─────────────────────────────────────────────────
  uni_level: {
    q: 'Welches Messniveau hat deine Variable?',
    opts: [
      { label: 'Nominal (z.B. Geschlecht, Partei)', next: 'r_uni_nom' },
      { label: 'Ordinal (z.B. Bildungsstufe, Zufriedenheit 1–5)', next: 'r_uni_ord' },
      { label: 'Metrisch / Intervall (z.B. Einkommen, Alter)', next: 'r_uni_met' },
    ]
  },

  // ── BIVARIAT – Variable 1 ──────────────────────────────────────
  biv_v1: {
    q: 'Messniveau der ersten Variable (bzw. der unabhängigen Variable)?',
    opts: [
      { label: 'Nominal', next: 'biv_nom_v2' },
      { label: 'Ordinal', next: 'biv_ord_v2' },
      { label: 'Metrisch', next: 'biv_met_v2' },
    ]
  },

  biv_nom_v2: {
    q: 'Messniveau der zweiten Variable?',
    opts: [
      { label: 'Nominal oder Ordinal', next: 'biv_nom_size' },
      { label: 'Metrisch', next: 'r_biv_nom_met' },
    ]
  },
  biv_nom_size: {
    q: 'Wie gross ist die Kreuztabelle?',
    opts: [
      { label: 'Beide dichotom → 2×2 Tabelle', next: 'r_biv_2x2' },
      { label: 'Mindestens eine Variable hat >2 Ausprägungen', next: 'r_biv_nxm' },
    ]
  },
  biv_ord_v2: {
    q: 'Messniveau der zweiten Variable?',
    opts: [
      { label: 'Nominal', next: 'biv_nom_size' },
      { label: 'Ordinal', next: 'biv_ord_shape' },
      { label: 'Metrisch', next: 'r_biv_ord_met' },
    ]
  },
  biv_ord_shape: {
    q: 'Form der Kreuztabelle?',
    opts: [
      { label: 'Quadratisch – gleich viele Zeilen und Spalten (k×k)', next: 'r_biv_ord_sq' },
      { label: 'Rechteckig – unterschiedlich viele Zeilen/Spalten (k×m)', next: 'r_biv_ord_rect' },
    ]
  },
  biv_met_v2: {
    q: 'Messniveau der zweiten Variable?',
    opts: [
      { label: 'Nominal', next: 'r_biv_nom_met' },
      { label: 'Ordinal', next: 'r_biv_ord_met' },
      { label: 'Metrisch', next: 'r_biv_met_met' },
    ]
  },

  // ── REGRESSION ─────────────────────────────────────────────────
  reg_nvars: {
    q: 'Wie viele unabhängige Variablen hat das Modell?',
    opts: [
      { label: 'Eine unabhängige Variable (bivariat)', next: 'r_reg_biv' },
      { label: 'Mehrere unabhängige Variablen (multivariat)', next: 'r_reg_mult' },
    ]
  },

  // ── INFERENZ ───────────────────────────────────────────────────
  inf_type: {
    q: 'Was möchtest du testen oder schätzen?',
    opts: [
      { label: 'Konfidenzintervall für einen Mittelwert', next: 'ci_n' },
      { label: 'Konfidenzintervall für einen Anteil (0/1-Variable)', next: 'r_ci_prop' },
      { label: 'Mittelwertunterschied zweier Gruppen testen', next: 'test_n' },
      { label: 'Anteilsunterschied zweier Gruppen testen', next: 'r_test_prop' },
      { label: 'Unabhängigkeit nominaler Variablen testen', next: 'r_chi_test' },
      { label: 'Signifikanz einer Korrelation testen', next: 'r_corr_test' },
    ]
  },
  ci_n: {
    q: 'Stichprobengrösse?',
    opts: [
      { label: 'n ≥ 30 (Zentraler Grenzwertsatz gilt)', next: 'r_ci_z' },
      { label: 'n < 30 (Normalverteilung in Grundgesamtheit nötig)', next: 'r_ci_t' },
    ]
  },
  test_n: {
    q: 'Stichprobengrösse (pro Gruppe)?',
    opts: [
      { label: 'n ≥ 30', next: 'r_z_test' },
      { label: 'n < 30', next: 'r_t_test' },
    ]
  },

  // ── RESULTATE ──────────────────────────────────────────────────
  r_uni_nom: {
    result: true,
    title: 'Univariate Beschreibung – Nominal',
    methods: [
      { name: 'Modus', desc: 'Häufigste Ausprägung', topicId: 'ch2_location' },
      { name: 'Häufigkeitstabelle', desc: 'Absolute und relative Häufigkeiten', topicId: 'ch1_freq_tables' },
      { name: 'Qualitative Variationsbreite', desc: 'Nominales Streuungsmass', topicId: 'ch2_nominal_dispersion' },
    ],
    note: 'Kein Mittelwert bei nominalen Variablen – Zahlen sind nur Etiketten ohne Rangordnung.'
  },
  r_uni_ord: {
    result: true,
    title: 'Univariate Beschreibung – Ordinal',
    methods: [
      { name: 'Median', desc: 'Mittlerer Rangwert (50%-Quantil)', topicId: 'ch2_location' },
      { name: 'Quantile / Perzentile', desc: 'Q1, Q3, Interquartilsabstand', topicId: 'ch2_location' },
      { name: 'Box-Plot', desc: 'Grafische Zusammenfassung der Verteilung', topicId: 'ch2_dispersion' },
    ],
    note: 'Mittelwert nur bedingt sinnvoll; bei ordinalen Variablen Median bevorzugen.'
  },
  r_uni_met: {
    result: true,
    title: 'Univariate Beschreibung – Metrisch',
    methods: [
      { name: 'Mittelwert (x̄)', desc: 'Arithmetisches Mittel', topicId: 'ch2_location' },
      { name: 'Standardabweichung / Varianz', desc: 'Streuung um den Mittelwert', topicId: 'ch2_dispersion' },
      { name: 'Schiefe', desc: 'Asymmetrie der Verteilung', topicId: 'ch2_skewness' },
      { name: 'Gini-Koeffizient', desc: 'Ungleichverteilung (z.B. Einkommen)', topicId: 'ch2_concentration' },
      { name: 'Box-Plot / Histogramm', desc: 'Verteilungsform visualisieren', topicId: 'ch2_dispersion' },
    ],
    note: 'Bei schiefer Verteilung (z.B. Einkommen) ist der Median robuster als der Mittelwert.'
  },
  r_biv_2x2: {
    result: true,
    title: 'Bivariate Analyse – Nominal × Nominal (2×2)',
    methods: [
      { name: 'Prozentsatzdifferenz', desc: 'Einfachstes deskriptives Mass', topicId: 'ch3_percentage_or' },
      { name: 'Chi² (χ²)', desc: 'Abweichung von statistischer Unabhängigkeit', topicId: 'ch3_chi2' },
      { name: 'Phi-Koeffizient (φ)', desc: 'Normiertes Mass für 2×2-Tabellen, φ ∈ [0,1]', topicId: 'ch3_chi_measures' },
      { name: 'Lambda (λ)', desc: 'PRE-Mass: asymmetrisch, für gerichtete Hypothesen', topicId: 'ch3_pre' },
      { name: 'Goodman-Kruskal Tau (τ)', desc: 'PRE-Mass: symmetrisch', topicId: 'ch3_pre' },
    ],
    note: "Phi nur für 2×2 korrekt. Für grössere Tabellen → Cramér's V verwenden."
  },
  r_biv_nxm: {
    result: true,
    title: 'Bivariate Analyse – Nominal × Nominal (k×m)',
    methods: [
      { name: 'Chi² (χ²)', desc: 'df = (k−1)(m−1); misst Gesamtabweichung', topicId: 'ch3_chi2' },
      { name: 'Kontingenzkoeffizient K*', desc: 'Korrigiertes K, normiert auf [0,1]', topicId: 'ch3_chi_measures' },
      { name: "Cramér's V", desc: 'Normiertes Chi²-Mass, V ∈ [0,1]', topicId: 'ch3_chi_measures' },
      { name: 'Lambda (λ)', desc: 'PRE-Mass für asymmetrische Fragen', topicId: 'ch3_pre' },
      { name: 'Goodman-Kruskal Tau (τ)', desc: 'PRE-Mass: symmetrisch', topicId: 'ch3_pre' },
    ],
    note: "Cramér's V bevorzugen wenn kein PRE-Mass nötig. Phi nur für 2×2."
  },
  r_biv_nom_met: {
    result: true,
    title: 'Bivariate Analyse – Nominal × Metrisch',
    methods: [
      { name: 'Eta (η)', desc: 'Zusammenhangsmass nominal×metrisch, η ∈ [0,1]', topicId: 'ch4_eta' },
      { name: 'Gruppenvergleich', desc: 'Mittelwert der metrischen Variable je Gruppe', topicId: 'ch4_eta' },
    ],
    note: 'Eta misst Stärke, nicht Richtung. Bei 2 Gruppen auch t-Test auf Mittelwertdifferenz möglich.'
  },
  r_biv_ord_sq: {
    result: true,
    title: 'Bivariate Analyse – Ordinal × Ordinal (quadratisch)',
    methods: [
      { name: "Kendall's Tau-b (τ_b)", desc: 'Für quadratische k×k-Tabellen, τ_b ∈ [−1,1]', topicId: 'ch4_ordinal' },
      { name: "Goodman-Kruskal's Gamma (γ)", desc: 'Einfacher zu berechnen, etwas überschätzend', topicId: 'ch4_ordinal' },
      { name: "Spearman's ρ", desc: 'Bei vielen Ausprägungen (quasi-metrisch behandelt)', topicId: 'ch4_spearman' },
    ],
    note: 'Positive Werte = gleichsinniger Zusammenhang; negative = gegensinniger.'
  },
  r_biv_ord_rect: {
    result: true,
    title: 'Bivariate Analyse – Ordinal × Ordinal (rechteckig)',
    methods: [
      { name: "Kendall's Tau-c (τ_c)", desc: 'Für rechteckige k×m-Tabellen, τ_c ∈ [−1,1]', topicId: 'ch4_ordinal' },
      { name: "Goodman-Kruskal's Gamma (γ)", desc: 'Tabellenform-unabhängig, leicht überschätzend', topicId: 'ch4_ordinal' },
    ],
    note: "Tau-b bei rechteckigen Tabellen nicht geeignet → Tau-c verwenden."
  },
  r_biv_ord_met: {
    result: true,
    title: 'Bivariate Analyse – Ordinal × Metrisch',
    methods: [
      { name: "Spearman's ρ", desc: 'Rangkorrelation, ρ ∈ [−1,1]', topicId: 'ch4_spearman' },
      { name: 'Eta (η)', desc: 'Wenn ordinal als Gruppiervariable behandelt', topicId: 'ch4_eta' },
    ],
    note: "Spearman ist robuster als Pearson bei Ausreissern oder nicht-normaler Verteilung."
  },
  r_biv_met_met: {
    result: true,
    title: 'Bivariate Analyse – Metrisch × Metrisch',
    methods: [
      { name: "Pearson's r", desc: 'Lineare Korrelation, r ∈ [−1,1]', topicId: 'ch4_pearson' },
      { name: 'Bivariate OLS-Regression', desc: 'Schätzt Einfluss und Richtung', topicId: 'ch7_ols' },
      { name: "Spearman's ρ", desc: 'Wenn Normalverteilung verletzt oder Ausreisser', topicId: 'ch4_spearman' },
    ],
    note: "Pearson setzt lineare Beziehung voraus. Streudiagramm zur Prüfung empfehlenswert."
  },
  r_reg_biv: {
    result: true,
    title: 'Bivariate Regression (OLS)',
    methods: [
      { name: 'OLS-Regression', desc: 'Ŷ = a + b·X; Methode der kleinsten Quadrate', topicId: 'ch7_ols' },
      { name: 'Regressionskoeffizient b', desc: 'Veränderung in Y pro Einheit X', topicId: 'ch7_coefficients' },
      { name: 'Bestimmtheitsmass R²', desc: 'Anteil erklärter Varianz (0–1)', topicId: 'ch7_r2' },
      { name: 't-Test für b (H₀: β = 0)', desc: 'Signifikanzprüfung des Koeffizienten', topicId: 'ch7_significance' },
    ],
    note: 'Voraussetzung: lineare Beziehung, metrische AV, keine extremen Ausreisser.'
  },
  r_reg_mult: {
    result: true,
    title: 'Multiple Regression (OLS)',
    methods: [
      { name: 'OLS-Regression (multivariat)', desc: 'Ŷ = a + b₁X₁ + b₂X₂ + … (Partialeffekte)', topicId: 'ch8_multiple' },
      { name: 'Korrigiertes R² (R²_adj)', desc: 'Penalisiert für Anzahl Prädiktoren', topicId: 'ch8_adj_r2' },
      { name: 'Dummy-Variablen', desc: 'Für nominale unabhängige Variablen (0/1-Codierung)', topicId: 'ch8_dummies' },
      { name: 'Interaktion / Transformationen', desc: 'Nicht-lineare oder bedingte Effekte', topicId: 'ch8_extensions' },
    ],
    note: 'Koeffizienten sind ceteris-paribus-Effekte. Korrigiertes R² bei Modellvergleichen verwenden.'
  },
  r_ci_z: {
    result: true,
    title: 'Konfidenzintervall für Mittelwert (z)',
    methods: [
      { name: 'z-Konfidenzintervall', desc: 'x̄ ± z_{1−α/2} · σ/√n', topicId: 'ch5_ci_means' },
    ],
    note: 'Bei α = 5%: z_{0.975} = 1.96. Voraussetzung: n ≥ 30 oder σ bekannt.'
  },
  r_ci_t: {
    result: true,
    title: 'Konfidenzintervall für Mittelwert (t)',
    methods: [
      { name: 't-Konfidenzintervall', desc: 'x̄ ± t_{1−α/2, n−1} · s/√n', topicId: 'ch5_ci_means' },
    ],
    note: 'Voraussetzung: Normalverteilung in der Grundgesamtheit.'
  },
  r_ci_prop: {
    result: true,
    title: 'Konfidenzintervall für Anteil',
    methods: [
      { name: 'KI für Proportion', desc: 'p̂ ± z_{1−α/2} · √(p̂(1−p̂)/n)', topicId: 'ch5_ci_props' },
    ],
    note: 'Voraussetzung: n·p̂ ≥ 5 und n·(1−p̂) ≥ 5.'
  },
  r_z_test: {
    result: true,
    title: 'z-Test (Mittelwertvergleich, n ≥ 30)',
    methods: [
      { name: 'Zweistichproben-z-Test', desc: 'z = (x̄₁ − x̄₂) / σ_{x̄₁−x̄₂}', topicId: 'ch6_zt_test' },
    ],
    note: 'Zweiseitig: |z| > 1.96 → H₀ verwerfen (α = 5%). Einseitig: z > 1.645.'
  },
  r_t_test: {
    result: true,
    title: 't-Test (Mittelwertvergleich, n < 30)',
    methods: [
      { name: 'Zweistichproben-t-Test', desc: 't = (x̄₁ − x̄₂) / s_{x̄₁−x̄₂}, df = n₁+n₂−2', topicId: 'ch6_zt_test' },
    ],
    note: 'Voraussetzung: Normalverteilung in beiden Gruppen.'
  },
  r_test_prop: {
    result: true,
    title: 'z-Test für Anteilsunterschied',
    methods: [
      { name: 'Zweistichproben-z-Test für Anteile', desc: 'z = (p̂₁ − p̂₂) / σ_{p̂₁−p̂₂}', topicId: 'ch6_zt_test' },
    ],
    note: 'Pooled estimate von p unter H₀.'
  },
  r_chi_test: {
    result: true,
    title: 'Chi²-Unabhängigkeitstest',
    methods: [
      { name: 'Chi²-Test', desc: 'χ² = Σ(b_ij − e_ij)² / e_ij; df = (k−1)(m−1)', topicId: 'ch6_chi_test' },
    ],
    note: 'Voraussetzung: erwartete Häufigkeiten ≥ 5 pro Zelle.'
  },
  r_corr_test: {
    result: true,
    title: 'Signifikanztest für Korrelation',
    methods: [
      { name: 't-Test für Pearson r / Spearman ρ', desc: 't = r·√(n−2) / √(1−r²), df = n−2', topicId: 'ch6_corr_test' },
    ],
    note: 'H₀: ρ = 0 (kein Zusammenhang in der Grundgesamtheit).'
  },
};

// ─── State ───────────────────────────────────────────────────────
let finderHistory = [];
let scenarioData  = null;

// ─── Init ────────────────────────────────────────────────────────
function initFinder() {
  startFinder();
  document.getElementById('scenario-gen-btn').addEventListener('click', generateScenario);
  document.getElementById('scenario-new-btn').addEventListener('click', generateScenario);
  document.getElementById('scenario-reveal-btn').addEventListener('click', revealScenario);
}

// ─── Decision Tree ───────────────────────────────────────────────
function startFinder() {
  finderHistory = [{ nodeId: 'start', choiceLabel: null }];
  renderFinderStep();
}

function finderChoose(nextNodeId, choiceLabel) {
  finderHistory[finderHistory.length - 1].choiceLabel = choiceLabel;
  finderHistory.push({ nodeId: nextNodeId, choiceLabel: null });
  renderFinderStep();
  document.getElementById('finder-tree').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function finderBack() {
  if (finderHistory.length > 1) {
    finderHistory.pop();
    finderHistory[finderHistory.length - 1].choiceLabel = null;
    renderFinderStep();
  }
}

function renderFinderStep() {
  const current = finderHistory[finderHistory.length - 1];
  const node    = DECISION_TREE[current.nodeId];
  const el      = document.getElementById('finder-tree');

  // Breadcrumb
  const bcHtml = finderHistory.some(h => h.choiceLabel)
    ? `<div class="finder-breadcrumb">${
        finderHistory
          .filter(h => h.choiceLabel)
          .map(h => `<span class="bc-item">${h.choiceLabel}</span>`)
          .join('<span class="bc-sep"> › </span>')
      }</div>`
    : '';

  if (node.result) {
    el.innerHTML = `
      ${bcHtml}
      <div class="finder-result-box">
        <div class="finder-result-title">✓ ${node.title}</div>
        <div class="finder-methods-grid">
          ${node.methods.map(m => `
            <div class="finder-method" onclick="selectTopic('${m.topicId}'); switchTab('theory')">
              <div class="finder-method-name">${m.name}</div>
              <div class="finder-method-desc">${m.desc}</div>
              <span class="finder-theory-link">📖 Theorie</span>
            </div>
          `).join('')}
        </div>
        ${node.note ? `<div class="finder-note">💡 ${node.note}</div>` : ''}
      </div>
      <button class="finder-btn secondary" onclick="startFinder()">↺ Nochmal starten</button>
    `;
    updateScenarioCheck(current.nodeId);
  } else {
    el.innerHTML = `
      ${bcHtml}
      <div class="finder-question-box">
        <div class="finder-step-label">Schritt ${finderHistory.length}</div>
        <div class="finder-question-text">${node.q}</div>
        <div class="finder-options">
          ${node.opts.map(opt => `
            <button class="finder-option-btn"
              onclick="finderChoose('${opt.next}', ${JSON.stringify(opt.label)})">
              ${opt.label}
            </button>
          `).join('')}
        </div>
      </div>
      ${finderHistory.length > 1
        ? `<button class="finder-btn secondary finder-back-btn" onclick="finderBack()">← Zurück</button>`
        : ''}
    `;
    updateScenarioCheck(null);
  }
}

// ─── Szenario-Training ───────────────────────────────────────────
function updateScenarioCheck(resultNodeId) {
  const area = document.getElementById('scenario-check-area');
  if (!area || !scenarioData) return;
  if (!resultNodeId) { area.style.display = 'none'; return; }

  const correct = resultNodeId === scenarioData.result_node;
  area.style.display = 'block';
  area.innerHTML = correct
    ? `<div class="scenario-check correct">✓ Richtig! Du hast die passende Methode gefunden.</div>`
    : `<div class="scenario-check wrong">Deine Antwort: <em>${DECISION_TREE[resultNodeId]?.title || resultNodeId}</em> — nicht ganz. Klicke "Auflösen" für die Lösung.</div>`;
}

async function generateScenario() {
  const apiKey = getApiKey();
  if (!apiKey) { showToast('⚠ Kein API-Key gespeichert'); return; }

  // Reset UI
  document.getElementById('scenario-empty').style.display   = 'none';
  document.getElementById('scenario-content').style.display = 'none';
  document.getElementById('scenario-loading').style.display = 'flex';
  document.getElementById('scenario-gen-btn').disabled = true;
  scenarioData = null;
  startFinder();

  const resultList = Object.entries(DECISION_TREE)
    .filter(([, v]) => v.result)
    .map(([k, v]) => `"${k}": ${v.title}`)
    .join('\n');

  const prompt = `Du bist Statistik-Tutor an der Uni Bern (Prof. Franzen, Sozialwissenschaften).

Generiere ein realistisches Forschungsszenario auf Deutsch (2–3 Sätze) mit konkreten sozialwissenschaftlichen Variablen (z.B. Geschlecht, Bildung, Einkommen, Alter, Parteipräferenz, SAKE- oder SHP-Daten). Das Szenario soll eine klare statistische Forschungsfrage stellen.

Verfügbare Methoden-Kategorien (ID: Bezeichnung):
${resultList}

Wähle die eine passende Kategorie. Antworte NUR mit validem JSON, kein Markdown:
{"scenario":"...","result_node":"eine der obigen IDs","explanation":"Kurze Begründung (1–2 Sätze)"}`;

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const data  = await resp.json();
    const text  = data.content?.[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Kein JSON in Antwort');
    const parsed = JSON.parse(match[0]);
    if (!DECISION_TREE[parsed.result_node]?.result) throw new Error('Unbekannte Methoden-ID');
    scenarioData = parsed;

    document.getElementById('scenario-loading').style.display = 'none';
    document.getElementById('scenario-content').style.display = 'block';
    document.getElementById('scenario-text-box').textContent  = scenarioData.scenario;
    document.getElementById('scenario-answer').style.display      = 'none';
    document.getElementById('scenario-check-area').style.display  = 'none';

  } catch (err) {
    document.getElementById('scenario-loading').style.display = 'none';
    document.getElementById('scenario-empty').style.display   = 'block';
    showToast('Fehler: ' + err.message);
  } finally {
    document.getElementById('scenario-gen-btn').disabled = false;
  }
}

function revealScenario() {
  if (!scenarioData) return;
  const node = DECISION_TREE[scenarioData.result_node];
  const el   = document.getElementById('scenario-answer');
  el.style.display = 'block';
  el.innerHTML = `
    <div class="scenario-answer-box">
      <div class="scenario-answer-title">Lösung: ${node.title}</div>
      <div class="scenario-answer-methods">
        ${node.methods.map(m => `<span class="scenario-method-tag">${m.name}</span>`).join('')}
      </div>
      <div class="scenario-answer-expl">${scenarioData.explanation}</div>
    </div>
  `;
}
