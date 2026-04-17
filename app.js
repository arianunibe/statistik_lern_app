// ─── app.js ─── Statistik Lern-App ─────────────────────────────

// ─── API-Key (gespeichert in localStorage, nicht im Code) ────────
const LS_APIKEY = 'statprue_apikey';

function getApiKey() {
  return localStorage.getItem(LS_APIKEY) || '';
}

function saveApiKey(key) {
  localStorage.setItem(LS_APIKEY, key.trim());
}

// ─── State ──────────────────────────────────────────────────────
let currentTopicId = null;
let currentTab = 'home';
let exerciseState = null; // { question, solution, topicId }
let chatHistory  = [];   // [{ role, content }, …]
let chatTopicId  = null; // topic currently loaded in chat

// ─── LocalStorage Keys ──────────────────────────────────────────
const LS_KEY = 'statprue_tracking';

// ─── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderChapterOverview();
  setupTabButtons();
  updateCountdown();
  updateProgress();
  updateWeakList();
  populateTopicSelect(null);
  document.getElementById('gen-btn').addEventListener('click', generateExercise);
  document.getElementById('show-solution-btn').addEventListener('click', showSolution);
  setupApiKeyInput();
  initFinder();
  initReference();
  setupChat();
});

// ─── API-Key Input ────────────────────────────────────────────────
function setupApiKeyInput() {
  const input = document.getElementById('api-key-input');
  const saveBtn = document.getElementById('api-key-save-btn');
  const status = document.getElementById('api-key-status');

  function updateStatus() {
    const key = getApiKey();
    if (key) {
      status.textContent = '✓ Key gespeichert';
      status.className = 'api-key-ok';
      input.value = '';
      input.placeholder = key.slice(0, 10) + '…';
    } else {
      status.textContent = '⚠ Kein Key';
      status.className = 'api-key-missing';
      input.placeholder = 'sk-ant-api03-…';
    }
  }

  saveBtn.addEventListener('click', () => {
    const val = input.value.trim();
    if (val) {
      saveApiKey(val);
      updateStatus();
      showToast('✓ API-Key gespeichert');
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') saveBtn.click();
  });

  updateStatus();
}

// ─── Sidebar ────────────────────────────────────────────────────
function renderSidebar() {
  const nav = document.getElementById('chapter-nav');
  nav.innerHTML = CHAPTERS.map(ch => `
    <div class="chapter-item" id="ch-item-${ch.id}">
      <div class="chapter-header" onclick="toggleChapter('${ch.id}')">
        <span class="ch-icon">${ch.icon}</span>
        <span class="ch-label">
          <span class="ch-num">Kapitel ${ch.num}</span>
          <span class="ch-title">${ch.title}</span>
        </span>
        <span class="ch-arrow">▶</span>
      </div>
      <div class="topic-list" id="tl-${ch.id}">
        ${ch.topics.map(t => `
          <div class="topic-item" id="ti-${t.id}" onclick="selectTopic('${t.id}')">
            <div class="topic-dot ${getStatusClass(t.id)}"></div>
            <span>${t.title}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function toggleChapter(chId) {
  const item = document.getElementById(`ch-item-${chId}`);
  item.classList.toggle('open');
}

function openChapter(chId) {
  const item = document.getElementById(`ch-item-${chId}`);
  if (item) item.classList.add('open');
}

// ─── Chapter Overview Cards ─────────────────────────────────────
function renderChapterOverview() {
  const grid = document.getElementById('chapter-overview');
  if (!grid) return;
  const tracking = getTracking();
  grid.innerHTML = CHAPTERS.map(ch => {
    const topicCount = ch.topics.length;
    const practiced = ch.topics.filter(t => {
      const d = tracking[t.id];
      return d && (d.understood > 0 || d.review > 0);
    }).length;
    return `
      <div class="ch-card" style="color:${ch.color}; border-top-color:${ch.color}"
           onclick="selectTopic('${ch.topics[0].id}')">
        <div class="ch-card-icon">${ch.icon}</div>
        <div class="ch-card-num">Kapitel ${ch.num}</div>
        <div class="ch-card-title">${ch.title}</div>
        <div class="ch-card-sub">${ch.subtitle}</div>
        <div class="ch-card-progress">${practiced}/${topicCount} Themen geübt</div>
      </div>
    `;
  }).join('');
}

// ─── Topic Selection ─────────────────────────────────────────────
function selectTopic(topicId) {
  currentTopicId = topicId;
  const topic = getTopicById(topicId);
  if (!topic) return;
  if (topicId !== chatTopicId) resetChat(topicId);

  // Update sidebar state
  document.querySelectorAll('.topic-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.chapter-header').forEach(el => el.classList.remove('active'));
  const topicEl = document.getElementById(`ti-${topicId}`);
  if (topicEl) topicEl.classList.add('active');
  const chHeader = document.querySelector(`#ch-item-${topic.chapterId} .chapter-header`);
  if (chHeader) chHeader.classList.add('active');

  // Open chapter
  openChapter(topic.chapterId);

  // Update breadcrumb
  const ch = getChapterById(topic.chapterId);
  document.getElementById('breadcrumb').innerHTML =
    `<span>${ch.title}</span> › ${topic.title}`;

  // Render theory
  renderTheory(topic);

  // Update exercise topic selector
  populateTopicSelect(topicId);

  // Switch to theory tab
  switchTab('theory');
}

// ─── Theory Rendering ────────────────────────────────────────────
function renderTheory(topic) {
  const container = document.getElementById('theory-content');
  const ch = getChapterById(topic.chapterId);
  const topics = ch.topics;
  const idx = topics.findIndex(t => t.id === topic.id);
  const prev = idx > 0 ? topics[idx - 1] : null;
  const next = idx < topics.length - 1 ? topics[idx + 1] : null;

  container.innerHTML = `
    <div class="topic-header">
      <h1>${topic.title}</h1>
      <div class="topic-meta">Kapitel ${ch.num}: ${ch.title} · ${ch.subtitle}</div>
    </div>
    ${topic.content}
    <div class="topic-nav">
      <button class="topic-nav-btn ${prev ? '' : 'disabled'}"
        onclick="${prev ? `selectTopic('${prev.id}')` : ''}">
        ← ${prev ? prev.title : 'Kein vorheriges Thema'}
      </button>
      <button class="topic-nav-btn ${next ? '' : 'disabled'}"
        onclick="${next ? `selectTopic('${next.id}')` : ''}">
        ${next ? next.title : 'Kein nächstes Thema'} →
      </button>
    </div>
  `;

  // Re-render MathJax
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([container]).catch(err => console.warn('MathJax error:', err));
  }
}

// ─── Tabs ─────────────────────────────────────────────────────────
function setupTabButtons() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-content').forEach(p => p.classList.toggle('active', p.id === `${tab}-tab`));
}

// ─── Exercise Topic Selector ─────────────────────────────────────
function populateTopicSelect(selectedId) {
  const sel = document.getElementById('ex-topic');
  sel.innerHTML = CHAPTERS.map(ch => `
    <optgroup label="Kapitel ${ch.num}: ${ch.title}">
      ${ch.topics.map(t =>
        `<option value="${t.id}" ${t.id === selectedId ? 'selected' : ''}>${t.title}</option>`
      ).join('')}
    </optgroup>
  `).join('');
}

// ─── Exercise Generation ─────────────────────────────────────────

async function generateExercise() {
  const topicId = document.getElementById('ex-topic').value;
  const type = document.getElementById('ex-type').value;
  const topic = getTopicById(topicId);
  if (!topic) return;

  // Reset UI
  showExerciseState('loading');
  document.getElementById('gen-btn').disabled = true;

  const apiKey = getApiKey();
  if (!apiKey) {
    showExerciseState('error');
    document.getElementById('ex-error-msg').textContent =
      'Kein API-Key gefunden. Bitte trage deinen Anthropic API-Key in der Sidebar ein (🔑 API-Key).';
    document.getElementById('gen-btn').disabled = false;
    return;
  }

  try {
    const prompt = buildPrompt(topic, type);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const { question, solution } = parseExercise(text);

    exerciseState = { question, solution, topicId };
    displayExercise(question, solution);
    showExerciseState('result');

  } catch (err) {
    showExerciseState('error');
    document.getElementById('ex-error-msg').textContent = err.message;
  } finally {
    document.getElementById('gen-btn').disabled = false;
  }
}

function buildPrompt(topic, type) {
  const typeInstructions = {
    berechnung: `Erstelle eine **Berechnungsaufgabe** mit konkreten Zahlen (gut händisch rechenbar, ca. 5–15 Datenpunkte). Gib alle notwendigen Daten als Tabelle an. Zeige in der Lösung jeden Rechenschritt.`,
    mc: `Erstelle **2 Multiple-Choice-Fragen** zum Thema. Jede Frage hat 4 Antwortoptionen (a–d), genau eine ist richtig. In der Lösung: richtige Antworten + kurze Erklärung.`,
    interpretation: `Erstelle eine **Interpretationsaufgabe**: Gib einen fiktiven statistischen Output (Kreuztabelle, Regressionsoutput oder Korrelationsmatrix) und stelle 3–4 Interpretationsfragen dazu.`,
    mix: `Erstelle eine gemischte Aufgabe: 1 kurze Berechnungsaufgabe + 2 Interpretationsfragen.`
  };

  return `Du bist ein Statistik-Tutor für eine sozialwissenschaftliche Statistikvorlesung.
Erstelle eine Übungsaufgabe zum Thema: **${topic.title}**

Inhaltlicher Kontext: ${topic.exerciseContext}

Aufgabentyp: ${typeInstructions[type]}

Anforderungen:
- Aufgabe auf Deutsch
- Wenn möglich Schweizer oder sozialwissenschaftlicher Kontext (z.B. SHP-Daten, Bildung, Einkommen, SAKE)
- Realistische, überschaubare Zahlen

Antworte GENAU in diesem Format (ohne weitere Einleitungen):

## Aufgabe
[Aufgabenstellung hier]

## Lösung
[Vollständige Lösung mit allen Schritten hier]

Verwende LaTeX-Notation: $formel$ für Inline-Formeln, $$formel$$ für abgesetzte Formeln.`;
}

function parseExercise(text) {
  const solutionMarker = /^##\s*Lösung/m;
  const parts = text.split(solutionMarker);
  if (parts.length >= 2) {
    const questionRaw = parts[0].replace(/^##\s*Aufgabe\s*/m, '').trim();
    const solutionRaw = parts.slice(1).join('').trim();
    return { question: markdownToHtml(questionRaw), solution: markdownToHtml(solutionRaw) };
  }
  return { question: markdownToHtml(text), solution: '' };
}

// Minimal markdown → HTML conversion
function markdownToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Headers
    if (/^### /.test(line)) { if (inList) { out.push('</ul>'); inList = false; } out.push(`<h3>${inlineMd(line.slice(4))}</h3>`); continue; }
    if (/^## /.test(line))  { if (inList) { out.push('</ul>'); inList = false; } out.push(`<h2>${inlineMd(line.slice(3))}</h2>`); continue; }
    if (/^# /.test(line))   { if (inList) { out.push('</ul>'); inList = false; } out.push(`<h1>${inlineMd(line.slice(2))}</h1>`); continue; }

    // Unordered list
    if (/^- /.test(line) || /^\* /.test(line)) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inlineMd(line.slice(2))}</li>`);
      continue;
    }
    // Ordered list
    if (/^\d+\. /.test(line)) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inlineMd(line.replace(/^\d+\. /, ''))}</li>`);
      continue;
    }

    // End list on blank/non-list line
    if (inList && line.trim() === '') { out.push('</ul>'); inList = false; }
    if (inList) { out.push(`<li>${inlineMd(line.slice(2))}</li>`); continue; }

    // Blank line → paragraph break
    if (line.trim() === '') { out.push(''); continue; }

    out.push(inlineMd(line));
  }
  if (inList) out.push('</ul>');

  // Group non-empty non-block lines into <p>
  const result = [];
  let para = [];
  for (const line of out) {
    if (line === '') {
      if (para.length) { result.push(`<p>${para.join(' ')}</p>`); para = []; }
    } else if (/^<[hul]/.test(line)) {
      if (para.length) { result.push(`<p>${para.join(' ')}</p>`); para = []; }
      result.push(line);
    } else {
      para.push(line);
    }
  }
  if (para.length) result.push(`<p>${para.join(' ')}</p>`);
  return result.join('\n');
}

function inlineMd(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

function displayExercise(question, solution) {
  document.getElementById('ex-question').innerHTML = question;
  document.getElementById('ex-solution').innerHTML = solution;
  document.getElementById('ex-solution-box').style.display = 'none';
  document.getElementById('show-solution-btn').textContent = 'Lösung anzeigen';
  document.getElementById('rating-row').style.display = 'none';

  // Typeset MathJax
  const area = document.getElementById('exercise-area');
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([area]).catch(e => console.warn(e));
  }
}

function showExerciseState(state) {
  ['ex-placeholder', 'ex-loading', 'ex-result', 'ex-error'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  const el = document.getElementById(`ex-${state}`);
  el.style.display = (state === 'result') ? 'flex' : 'block';
}

function showSolution() {
  const solutionBox = document.getElementById('ex-solution-box');
  const btn = document.getElementById('show-solution-btn');
  const rating = document.getElementById('rating-row');

  if (solutionBox.style.display === 'none') {
    solutionBox.style.display = 'block';
    btn.textContent = 'Lösung ausblenden';
    rating.style.display = 'flex';
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([solutionBox]).catch(() => {});
    }
  } else {
    solutionBox.style.display = 'none';
    btn.textContent = 'Lösung anzeigen';
    rating.style.display = 'none';
  }
}

// ─── Rating ───────────────────────────────────────────────────────
function rateExercise(rating) {
  if (!exerciseState) return;
  const { topicId } = exerciseState;
  const tracking = getTracking();
  if (!tracking[topicId]) tracking[topicId] = { understood: 0, review: 0 };
  tracking[topicId][rating]++;
  saveTracking(tracking);

  // Update dot in sidebar
  const dot = document.querySelector(`#ti-${topicId} .topic-dot`);
  if (dot) {
    dot.className = `topic-dot ${getStatusClass(topicId)}`;
  }
  updateProgress();
  updateWeakList();
  renderChapterOverview();

  // Toast
  showToast(rating === 'understood' ? '✓ Super!' : '↻ Wird vorgemerkt');
}

function showToast(msg) {
  const toast = document.createElement('div');
  const type = msg.includes('✓') ? 'ok' : 'bad';
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2100);
}

// ─── Tracking Helpers ─────────────────────────────────────────────
function getTracking() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); }
  catch { return {}; }
}

function saveTracking(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

function getStatusClass(topicId) {
  const tracking = getTracking();
  const d = tracking[topicId];
  if (!d || (d.understood === 0 && d.review === 0)) return '';
  const total = d.understood + d.review;
  const ratio = d.understood / total;
  if (ratio >= 0.67) return 'status-good';
  if (ratio >= 0.33) return 'status-warn';
  return 'status-bad';
}

// ─── Progress & Weak List ─────────────────────────────────────────
function updateProgress() {
  const tracking = getTracking();
  const allTopics = getAllTopics();
  const practiced = allTopics.filter(t => {
    const d = tracking[t.id];
    return d && (d.understood > 0 || d.review > 0);
  }).length;
  const pct = Math.round((practiced / allTopics.length) * 100);

  const fill = document.getElementById('progress-fill');
  const text = document.getElementById('progress-text');
  if (fill) fill.style.width = `${pct}%`;
  if (text) text.textContent = `${practiced} / ${allTopics.length} Themen geübt`;
}

function updateWeakList() {
  const tracking = getTracking();
  const allTopics = getAllTopics();
  const weak = allTopics.filter(t => {
    const d = tracking[t.id];
    if (!d || d.review === 0) return false;
    const total = d.understood + d.review;
    return (d.understood / total) < 0.5;
  });

  const list = document.getElementById('weak-list');
  if (!list) return;
  if (weak.length === 0) {
    list.innerHTML = '<div style="font-size:.72rem;color:#9ca3af">Noch keine schwachen Themen</div>';
    return;
  }
  list.innerHTML = weak.map(t => {
    const d = tracking[t.id];
    return `<div class="weak-item" onclick="selectTopic('${t.id}')">${t.title} (${d.review}×)</div>`;
  }).join('');
}

// ─── Countdown ────────────────────────────────────────────────────
function updateCountdown() {
  const exam = new Date('2026-06-11');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
  const el = document.getElementById('days-left');
  if (!el) return;
  if (diff > 0) el.textContent = `noch ${diff} Tage`;
  else if (diff === 0) el.textContent = 'Heute!';
  else el.textContent = 'Prüfung war bereits';
}

// ─── Theory Chat ──────────────────────────────────────────────────
function setupChat() {
  document.getElementById('chat-send-btn').addEventListener('click', sendChatMessage);
  document.getElementById('chat-clear-btn').addEventListener('click', () => {
    if (chatTopicId) resetChat(chatTopicId);
  });
  const input = document.getElementById('chat-input');
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });
  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });
}

function resetChat(topicId) {
  chatTopicId = topicId;
  chatHistory  = [];
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const topic = getTopicById(topicId);
  container.innerHTML = `
    <div class="chat-welcome">
      <div class="chat-welcome-icon">💬</div>
      <p>Du liest gerade <strong>${topic ? topic.title : 'ein Thema'}</strong>.<br>
         Stelle eine Frage — Claude erklärt, gibt Beispiele oder klärt Unklarheiten.</p>
    </div>`;
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text  = input.value.trim();
  if (!text) return;

  const apiKey = getApiKey();
  if (!apiKey) { showToast('⚠ Kein API-Key — bitte einrichten'); switchTab('setup'); return; }

  const topicId = chatTopicId || currentTopicId;
  const topic   = getTopicById(topicId);
  if (!topic) { showToast('Wähle zuerst ein Thema aus'); return; }

  // Clear input
  input.value = '';
  input.style.height = 'auto';

  // Add user message
  appendChatMsg('user', text);
  chatHistory.push({ role: 'user', content: text });

  // Loading indicator
  const loadingEl = appendChatLoading();
  const sendBtn   = document.getElementById('chat-send-btn');
  sendBtn.disabled = true;

  const system = `Du bist ein präziser Statistik-Tutor für eine sozialwissenschaftliche Statistikvorlesung (Uni-Niveau, Sozialwissenschaften).
Der Student liest gerade das Thema: "${topic.title}".
Beantworte Fragen dazu klar und kompakt (max. 3 Absätze). Nutze LaTeX wo sinnvoll: $...$ für Inline-Formeln, $$...$$ für abgesetzte Formeln.
Verwende keine Begrüssungsfloskeln. Antworte direkt und präzise.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system,
        messages: chatHistory
      })
    });
    loadingEl.remove();
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }
    const data  = await res.json();
    const reply = data.content[0].text;
    chatHistory.push({ role: 'assistant', content: reply });
    appendChatMsg('assistant', reply);
  } catch (err) {
    loadingEl.remove();
    appendChatMsg('assistant', '⚠ Fehler: ' + err.message);
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
}

function appendChatMsg(role, text) {
  const container = document.getElementById('chat-messages');
  container.querySelector('.chat-welcome')?.remove();

  const wrapper = document.createElement('div');
  wrapper.className = 'chat-msg ' + role;

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = markdownToHtml(text);
  wrapper.appendChild(bubble);

  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;

  if (window.MathJax?.typesetPromise) MathJax.typesetPromise([bubble]).catch(() => {});
}

function appendChatLoading() {
  const container = document.getElementById('chat-messages');
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-msg assistant';
  wrapper.innerHTML = '<div class="chat-bubble chat-typing"><span></span><span></span><span></span></div>';
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
  return wrapper;
}
