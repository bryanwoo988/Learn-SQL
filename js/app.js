(function () {
  'use strict';

  // ---------------------------------------------------------------- i18n
  const STR = {
    appName: { en: 'SQL Syntax', zh: 'SQL语言' },
    tagline: { en: 'Learn SQL by doing — 7 topics, 50 interactive problems', zh: '边做边学 SQL —— 7 个主题，50 道互动练习' },
    navHome: { en: 'Home', zh: '首页' }, navLearn: { en: 'Learn', zh: '学习' }, navPractice: { en: 'Practice', zh: '练习' }, navPlay: { en: 'Playground', zh: '练习场' },
    loading: { en: 'Loading SQL engine…', zh: '正在加载 SQL 引擎…' },
    engineFail: { en: 'Could not load the SQL engine. Please reload the page.', zh: '无法加载 SQL 引擎，请刷新页面。' },
    solved: { en: 'solved', zh: '已解决' }, lessons: { en: 'lessons', zh: '课程' },
    continue: { en: 'Continue', zh: '继续' }, startLesson: { en: 'Start lesson', zh: '开始学习' },
    nextUp: { en: 'Next problem', zh: '下一题' }, allDone: { en: 'All 50 problems solved — amazing!', zh: '50 道题全部完成——太棒了！' },
    studyPlan: { en: 'Study plan', zh: '学习计划' }, learnThen: { en: 'Read the lesson, then solve the problems.', zh: '先学课程，再做练习。' },
    run: { en: 'Run', zh: '运行' }, submit: { en: 'Submit', zh: '提交' }, reset: { en: 'Reset', zh: '重置' },
    hint: { en: 'Hint', zh: '提示' }, solution: { en: 'Solution', zh: '答案' }, showSolution: { en: 'Show solution', zh: '查看答案' },
    useSolution: { en: 'Copy into editor', zh: '复制到编辑器' },
    revealConfirm: { en: 'Try a little longer? Reveal the solution anyway?', zh: '再试一会儿？仍然要查看答案吗？' },
    noMoreHints: { en: 'No more hints.', zh: '没有更多提示了。' },
    tables: { en: 'Tables', zh: '数据表' }, expected: { en: 'Expected output', zh: '期望输出' }, yourOutput: { en: 'Your output', zh: '你的输出' },
    showExpected: { en: 'Show expected output', zh: '显示期望输出' },
    accepted: { en: 'Accepted', zh: '通过' }, wrong: { en: 'Wrong Answer', zh: '答案错误' }, error: { en: 'Error', zh: '错误' },
    rows: { en: 'rows', zh: '行' }, noRows: { en: 'Query OK — no rows returned.', zh: '执行成功——没有返回行。' },
    noResultSet: { en: 'Your SQL did not return a result set. Did you forget SELECT?', zh: '你的 SQL 没有返回结果集。是不是忘了 SELECT？' },
    colCount: { en: 'Column count differs: expected {e}, got {g}.', zh: '列数不同：期望 {e} 列，实际 {g} 列。' },
    colNames: { en: 'Column names differ: expected {e}, got {g}.', zh: '列名不同：期望 {e}，实际 {g}。' },
    rowCount: { en: 'Row count differs: expected {e}, got {g}.', zh: '行数不同：期望 {e} 行，实际 {g} 行。' },
    rowDiff: { en: 'Some values differ.', zh: '部分数值不一致。' },
    orderDiff: { en: 'Rows are right but the order is wrong — check ORDER BY.', zh: '行内容正确但顺序不对——检查 ORDER BY。' },
    extraCase: { en: 'Failed on an additional hidden test case.', zh: '在一个额外的隐藏测试用例上失败。' },
    mutationNote: { en: 'Result: contents of the table after your statement', zh: '结果：执行语句后表中的内容' },
    anyOrder: { en: 'Any row order is accepted.', zh: '行的顺序不限。' }, mustOrder: { en: 'Row order matters.', zh: '需要按指定顺序。' },
    openLeetcode: { en: 'Open on LeetCode', zh: '在 LeetCode 打开' },
    prev: { en: 'Previous', zh: '上一题' }, next: { en: 'Next', zh: '下一题' }, backList: { en: 'All problems', zh: '全部题目' },
    quiz: { en: 'Quick quiz', zh: '小测验' }, quizDone: { en: 'Lesson complete!', zh: '课程完成！' },
    correct: { en: 'Correct!', zh: '正确！' }, incorrect: { en: 'Not quite.', zh: '不太对。' },
    practiceSection: { en: 'Practice this topic', zh: '练习本主题' },
    concepts: { en: 'Concepts', zh: '知识点' },
    easy: { en: 'Easy', zh: '简单' }, medium: { en: 'Medium', zh: '中等' }, hard: { en: 'Hard', zh: '困难' },
    filterAll: { en: 'All', zh: '全部' }, filterTodo: { en: 'To do', zh: '未完成' }, filterDone: { en: 'Solved', zh: '已解决' },
    search: { en: 'Search problems…', zh: '搜索题目…' },
    playIntro: { en: 'A free sandbox with a sample company database. Every run starts from fresh data.', zh: '自由练习场，内置示例公司数据库。每次运行都会从全新数据开始。' },
    schema: { en: 'Schema', zh: '表结构' }, preview: { en: 'Preview', zh: '预览' },
    install: { en: 'Install', zh: '安装' }, about: { en: 'About & engine notes', zh: '关于与引擎说明' },
    resetProgress: { en: 'Reset progress', zh: '重置进度' }, resetConfirm: { en: 'Erase all progress and saved code?', zh: '要清除所有进度和保存的代码吗？' },
    close: { en: 'Close', zh: '关闭' }, shortcut: { en: 'Ctrl/⌘ + Enter to run', zh: 'Ctrl/⌘ + Enter 运行' },
    offlineReady: { en: 'Ready to work offline', zh: '已可离线使用' },
    aboutBody: {
      en: '<p>An interactive SQL course that follows the structure of the <a href="https://leetcode.com/studyplan/top-sql-50/" target="_blank" rel="noopener">LeetCode Top SQL 50</a> study plan. Problem statements and data here are written for this app; each problem links to the original on LeetCode.</p><p><b>Engine.</b> Queries run locally in your browser with SQLite (sql.js, WebAssembly). Nothing is sent to a server, and the app works offline once installed.</p><p><b>MySQL compatibility.</b> LeetCode uses MySQL, so common MySQL features are emulated: <code>/</code> returns decimals, <code>IF()</code>, <code>DATEDIFF()</code>, <code>DATE_ADD/DATE_SUB(… INTERVAL n DAY)</code>, <code>DATE_FORMAT()</code>, <code>YEAR()/MONTH()</code>, <code>LEFT()/RIGHT()</code>, <code>CHAR_LENGTH()</code>, <code>MOD()</code>, <code>REGEXP</code>, <code>GROUP_CONCAT(… SEPARATOR …)</code>.</p><p><b>Known differences.</b> SQLite does not support multi-table <code>DELETE</code>/<code>UPDATE</code>, parentheses around <code>UNION</code> members, or variables like <code>@x</code>. String comparison with <code>=</code> is case-sensitive in SQLite.</p>',
      zh: '<p>一个互动式 SQL 课程，结构参照 <a href="https://leetcode.com/studyplan/top-sql-50/" target="_blank" rel="noopener">LeetCode 高频 SQL 50 题</a> 学习计划。本应用的题目描述和数据均为重新编写，每题都附有 LeetCode 原题链接。</p><p><b>引擎。</b>查询在浏览器本地通过 SQLite（sql.js，WebAssembly）运行，不会发送到服务器；安装后可离线使用。</p><p><b>MySQL 兼容。</b>LeetCode 使用 MySQL，因此本应用模拟了常用的 MySQL 特性：<code>/</code> 返回小数、<code>IF()</code>、<code>DATEDIFF()</code>、<code>DATE_ADD/DATE_SUB(… INTERVAL n DAY)</code>、<code>DATE_FORMAT()</code>、<code>YEAR()/MONTH()</code>、<code>LEFT()/RIGHT()</code>、<code>CHAR_LENGTH()</code>、<code>MOD()</code>、<code>REGEXP</code>、<code>GROUP_CONCAT(… SEPARATOR …)</code>。</p><p><b>已知差异。</b>SQLite 不支持多表 <code>DELETE</code>/<code>UPDATE</code>、给 <code>UNION</code> 的各部分加括号、以及 <code>@x</code> 这样的变量。SQLite 中用 <code>=</code> 比较字符串区分大小写。</p>'
    }
  };

  const store = {
    get(k, d) { try { const v = localStorage.getItem('sqlsyntax.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('sqlsyntax.' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  let lang = store.get('lang', (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en');
  const t = k => (STR[k] ? STR[k][lang] : k);
  const tr = o => (o == null ? '' : typeof o === 'string' ? o : o[lang] || o.en);
  const fill = (s, m) => s.replace(/\{(\w+)\}/g, (_, k) => m[k]);

  const progress = Object.assign({ solved: {}, lessons: {}, drafts: {} }, store.get('progress', {}));
  const saveProgress = () => store.set('progress', progress);

  const SECTIONS = window.SQL_SECTIONS, PROBLEMS = window.SQL_PROBLEMS, LESSONS = window.SQL_LESSONS;
  const byId = Object.fromEntries(PROBLEMS.map(p => [p.id, p]));

  // ---------------------------------------------------------------- helpers
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function h(html) { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; }
  function toast(msg, kind) {
    const el = h(`<div class="toast ${kind || ''}">${msg}</div>`);
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 2200);
  }

  // ---------------------------------------------------------------- SQL engine
  let SQL = null;
  const enginePromise = window.initSqlJs({ locateFile: f => 'vendor/' + f }).then(s => (SQL = s));

  const lit = v => (v === null ? 'NULL' : typeof v === 'number' ? String(v) : "'" + String(v).replace(/'/g, "''") + "'");
  function buildDb(tables, override) {
    const db = new SQL.Database();
    window.SQLCompat.install(db);
    const parts = [];
    for (const tb of tables) {
      const rows = (override && override[tb.name]) || tb.rows;
      parts.push(`CREATE TABLE ${tb.name} (${tb.cols.map(c => `"${c[0]}" ${c[1]}`).join(', ')});`);
      if (rows.length) parts.push(`INSERT INTO ${tb.name} VALUES ${rows.map(r => '(' + r.map(lit).join(', ') + ')').join(', ')};`);
    }
    db.run(parts.join('\n'));
    return db;
  }

  // Runs every statement; returns the result sets of statements that produce columns.
  function execAll(db, sql) {
    const sets = [];
    const it = db.iterateStatements(window.SQLCompat.rewrite(sql));
    for (const stmt of it) {
      try {
        const columns = stmt.getColumnNames();
        const values = [];
        while (stmt.step()) values.push(stmt.get());
        if (columns.length) sets.push({ columns, values });
      } finally { stmt.free(); }
    }
    return sets;
  }

  function runProblem(p, sql, override) {
    const db = buildDb(p.tables, override);
    try {
      let sets = execAll(db, sql);
      if (p.mutation) sets = execAll(db, p.check);
      return { set: sets.length ? sets[sets.length - 1] : null };
    } catch (e) {
      return { error: String(e.message || e) };
    } finally { db.close(); }
  }

  const expectedCache = {};
  function expectedFor(p, idx) {
    const key = p.id + ':' + idx;
    if (!(key in expectedCache)) expectedCache[key] = runProblem(p, p.solution, idx ? p.extra[idx - 1] : null).set;
    return expectedCache[key];
  }

  const isNum = v => typeof v === 'number' || (typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v.trim()));
  const cellKey = v => (v === null || v === undefined ? '∅' : isNum(v) ? 'n' + (Math.round(Number(v) * 1e5) / 1e5) : 's' + v);
  const rowKey = r => r.map(cellKey).join('\u0001');

  function compare(got, exp, ordered) {
    if (!got) return { ok: false, msg: t('noResultSet') };
    if (got.columns.length !== exp.columns.length) return { ok: false, msg: fill(t('colCount'), { e: exp.columns.length, g: got.columns.length }) };
    const norm = c => String(c).toLowerCase().replace(/^.*\./, '');
    if (got.columns.some((c, i) => norm(c) !== norm(exp.columns[i]))) {
      return { ok: false, msg: fill(t('colNames'), { e: exp.columns.join(', '), g: got.columns.join(', ') }) };
    }
    if (got.values.length !== exp.values.length) return { ok: false, msg: fill(t('rowCount'), { e: exp.values.length, g: got.values.length }) };
    const a = got.values.map(rowKey), b = exp.values.map(rowKey);
    if (ordered && a.every((k, i) => k === b[i])) return { ok: true };
    const sa = [...a].sort(), sb = [...b].sort();
    const same = sa.every((k, i) => k === sb[i]);
    if (!ordered) return same ? { ok: true } : { ok: false, msg: t('rowDiff') };
    return { ok: false, msg: same ? t('orderDiff') : t('rowDiff') };
  }

  // ---------------------------------------------------------------- rendering helpers
  function resultTable(set, limit = 200) {
    if (!set) return `<div class="muted small">${t('noRows')}</div>`;
    const head = set.columns.map(c => `<th>${esc(c)}</th>`).join('');
    const body = set.values.slice(0, limit).map(r => '<tr>' + r.map(v =>
      v === null ? '<td class="null">NULL</td>' : `<td class="${typeof v === 'number' ? 'num' : ''}">${esc(typeof v === 'number' ? +v.toFixed(6) : v)}</td>`).join('') + '</tr>').join('');
    const more = set.values.length > limit ? `<div class="muted small">… ${set.values.length - limit} more</div>` : '';
    return `<div class="tbl-wrap"><table class="data"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
      <div class="muted small">${set.values.length} ${t('rows')}</div>${more}`;
  }

  function schemaTable(tb, rowsOverride) {
    const set = { columns: tb.cols.map(c => c[0]), values: rowsOverride || tb.rows };
    const types = tb.cols.map(c => `<span class="col-chip"><b>${esc(c[0])}</b> <i>${esc(c[1])}</i></span>`).join('');
    return `<div class="schema"><div class="schema-title">${esc(tb.name)}</div><div class="cols">${types}</div>${resultTable(set)}</div>`;
  }

  const levelBadge = lv => `<span class="badge ${lv}">${t(lv)}</span>`;

  // ---------------------------------------------------------------- editor
  const KW = 'SELECT|FROM|WHERE|AND|OR|NOT|IN|IS|NULL|AS|ON|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|CROSS|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|DISTINCT|UNION|ALL|CASE|WHEN|THEN|ELSE|END|BETWEEN|LIKE|REGEXP|EXISTS|ASC|DESC|WITH|OVER|PARTITION|ROWS|PRECEDING|FOLLOWING|CURRENT|ROW|INTERVAL|DAY|MONTH|YEAR|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|TRUE|FALSE|SEPARATOR|USING|RECURSIVE|UNBOUNDED|DIV|MOD';
  const HL_RE = new RegExp(`(--[^\\n]*|#[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)|('(?:[^'\\\\]|\\\\.|'')*'?|"(?:[^"\\\\]|\\\\.)*"?|\`[^\`]*\`?)|\\b(\\d+(?:\\.\\d+)?)\\b|\\b(${KW})\\b|\\b([A-Za-z_][A-Za-z0-9_]*)(?=\\s*\\()`, 'gi');
  function highlight(code) {
    let out = '', last = 0, m;
    HL_RE.lastIndex = 0;
    while ((m = HL_RE.exec(code))) {
      out += esc(code.slice(last, m.index));
      const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'n' : m[4] ? 'k' : 'f';
      out += `<span class="tk-${cls}">${esc(m[0])}</span>`;
      last = m.index + m[0].length;
    }
    return out + esc(code.slice(last)) + '\n';
  }

  const CHIPS = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'ON', 'GROUP BY', 'HAVING', 'ORDER BY', 'DESC', 'LIMIT', 'AS', 'IS NULL', 'DISTINCT', 'COUNT(', 'SUM(', 'AVG(', 'ROUND(', 'CASE WHEN', 'THEN', 'ELSE', 'END', '*', '=', '<>', '(', ')', ',', "'", ';'];

  function createEditor(mount, value, opts = {}) {
    const el = h(`<div class="editor-box">
      <div class="editor"><pre class="hl" aria-hidden="true"></pre><textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="SQL editor"></textarea></div>
      ${opts.chips === false ? '' : `<div class="chips">${CHIPS.map(c => `<button type="button" class="chip">${esc(c)}</button>`).join('')}</div>`}
    </div>`);
    mount.appendChild(el);
    const ta = $('textarea', el), pre = $('.hl', el);
    const sync = () => {
      pre.innerHTML = highlight(ta.value);
      ta.style.height = 'auto';
      const hgt = Math.max(ta.scrollHeight, opts.minHeight || 120);
      ta.style.height = hgt + 'px';
      pre.style.height = hgt + 'px';
      if (opts.onChange) opts.onChange(ta.value);
    };
    const insert = text => {
      const s = ta.selectionStart, e = ta.selectionEnd;
      ta.setRangeText(text, s, e, 'end');
      ta.focus();
      sync();
    };
    ta.value = value || '';
    ta.addEventListener('input', sync);
    ta.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); if (opts.onRun) opts.onRun(); }
      else if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); insert('  '); }
    });
    el.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => {
      const c = b.textContent;
      const before = ta.value.slice(0, ta.selectionStart);
      const needsSpace = /^[A-Z]/.test(c) && before && !/[\s(]$/.test(before);
      insert((needsSpace ? ' ' : '') + c + (/^[A-Z ]+$/.test(c) ? ' ' : ''));
    }));
    requestAnimationFrame(sync);
    return { get: () => ta.value, set: v => { ta.value = v; sync(); }, focus: () => ta.focus() };
  }

  // ---------------------------------------------------------------- views
  const view = () => $('#view');

  function sectionStats(secId) {
    const ps = PROBLEMS.filter(p => p.section === secId);
    return { total: ps.length, done: ps.filter(p => progress.solved[p.id]).length };
  }

  function ring(pct, label) {
    const r = 42, c = 2 * Math.PI * r;
    return `<svg class="ring" viewBox="0 0 100 100" role="img" aria-label="${esc(label)}">
      <circle cx="50" cy="50" r="${r}" class="ring-bg"/>
      <circle cx="50" cy="50" r="${r}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}"/>
      <text x="50" y="50" class="ring-text">${esc(label)}</text></svg>`;
  }

  function renderHome() {
    const solved = Object.keys(progress.solved).length;
    const lessonsDone = Object.keys(progress.lessons).length;
    const next = PROBLEMS.find(p => !progress.solved[p.id]);
    const v = view();
    v.innerHTML = `
      <section class="hero">
        <img src="icons/icon-192.png" alt="" class="hero-logo" width="88" height="88">
        <div>
          <h1>${t('appName')}</h1>
          <p class="muted">${t('tagline')}</p>
        </div>
      </section>
      <section class="stats">
        <div class="stat card">${ring(solved / PROBLEMS.length, `${solved}/${PROBLEMS.length}`)}<div>${t('solved')}</div></div>
        <div class="stat card">${ring(lessonsDone / SECTIONS.length, `${lessonsDone}/${SECTIONS.length}`)}<div>${t('lessons')}</div></div>
        <div class="stat card next">
          ${next ? `<div class="muted small">${t('nextUp')}</div>
            <div class="next-title">${next.id}. ${esc(tr(next.title))}</div>
            ${levelBadge(next.level)}
            <a class="btn primary" href="#/problem/${next.id}">${t('continue')} →</a>`
          : `<div class="next-title">🎉 ${t('allDone')}</div>`}
        </div>
      </section>
      <h2>${t('studyPlan')}</h2>
      <p class="muted">${t('learnThen')}</p>
      <section class="sec-grid">
        ${SECTIONS.map((s, i) => {
          const st = sectionStats(s.id);
          return `<div class="card sec-card">
            <div class="sec-head"><span class="sec-icon">${s.icon}</span><span class="muted small">${i + 1} / ${SECTIONS.length}</span>${progress.lessons[s.id] ? '<span class="tick" title="lesson done">✓</span>' : ''}</div>
            <h3>${esc(tr(s.title))}</h3>
            <div class="bar"><span style="width:${(st.done / st.total) * 100}%"></span></div>
            <div class="muted small">${st.done}/${st.total} ${t('solved')}</div>
            <div class="sec-actions"><a class="btn" href="#/learn/${s.id}">${t('navLearn')}</a><a class="btn ghost" href="#/practice/${s.id}">${t('navPractice')}</a></div>
          </div>`;
        }).join('')}
      </section>
      <footer class="foot">
        <button class="link" id="aboutBtn">${t('about')}</button> ·
        <button class="link danger" id="resetBtn">${t('resetProgress')}</button>
      </footer>`;
    $('#aboutBtn', v).onclick = showAbout;
    $('#resetBtn', v).onclick = () => {
      if (!confirm(t('resetConfirm'))) return;
      progress.solved = {}; progress.lessons = {}; progress.drafts = {};
      saveProgress(); render();
    };
  }

  function showAbout() {
    const m = h(`<div class="modal" role="dialog" aria-modal="true"><div class="modal-card card">
      <h2>${t('appName')}</h2>${STR.aboutBody[lang]}
      <div class="right"><button class="btn primary">${t('close')}</button></div></div></div>`);
    document.body.appendChild(m);
    const close = () => m.remove();
    $('button', m).onclick = close;
    m.addEventListener('click', e => { if (e.target === m) close(); });
  }

  function renderLearnIndex() {
    view().innerHTML = `<h1>${t('navLearn')}</h1><section class="sec-grid">
      ${SECTIONS.map((s, i) => `<a class="card sec-card link-card" href="#/learn/${s.id}">
        <div class="sec-head"><span class="sec-icon">${s.icon}</span><span class="muted small">${i + 1}</span>${progress.lessons[s.id] ? '<span class="tick">✓</span>' : ''}</div>
        <h3>${esc(tr(s.title))}</h3>
        <div class="muted small">${LESSONS[s.id].cards.length} ${t('concepts').toLowerCase()} · ${LESSONS[s.id].quiz.length} quiz</div>
      </a>`).join('')}</section>`;
  }

  const lessonDrafts = {};
  function runner(mount, getSql, tables) {
    const out = mount;
    try {
      const db = buildDb(tables);
      try {
        const sets = execAll(db, getSql());
        out.innerHTML = sets.length ? resultTable(sets[sets.length - 1]) : `<div class="muted small">${t('noRows')}</div>`;
      } finally { db.close(); }
    } catch (e) {
      out.innerHTML = `<div class="err">${t('error')}: ${esc(e.message || e)}</div>`;
    }
  }

  function renderLesson(secId) {
    const sec = SECTIONS.find(s => s.id === secId);
    const L = LESSONS[secId];
    if (!sec || !L) return renderLearnIndex();
    const idx = SECTIONS.indexOf(sec);
    const v = view();
    v.innerHTML = `
      <nav class="crumbs"><a href="#/learn">${t('navLearn')}</a> › ${esc(tr(sec.title))}</nav>
      <h1>${sec.icon} ${esc(tr(sec.title))}</h1>
      <p class="lead">${tr(L.intro)}</p>
      <div id="cards"></div>
      <h2>📝 ${t('quiz')}</h2>
      <div id="quiz"></div>
      <div class="card cta">
        <div>${t('practiceSection')}: <b>${esc(tr(sec.title))}</b> (${sectionStats(secId).done}/${sectionStats(secId).total})</div>
        <a class="btn primary" href="#/practice/${secId}">${t('navPractice')} →</a>
      </div>
      <div class="pager">
        ${idx > 0 ? `<a class="btn ghost" href="#/learn/${SECTIONS[idx - 1].id}">← ${esc(tr(SECTIONS[idx - 1].title))}</a>` : '<span></span>'}
        ${idx < SECTIONS.length - 1 ? `<a class="btn ghost" href="#/learn/${SECTIONS[idx + 1].id}">${esc(tr(SECTIONS[idx + 1].title))} →</a>` : ''}
      </div>`;

    const cards = $('#cards', v);
    L.cards.forEach((c, i) => {
      const key = secId + i;
      const card = h(`<article class="card lesson-card">
        <h3><span class="step">${i + 1}</span> ${tr(c.title)}</h3>
        <p>${tr(c.body)}</p>
        <div class="ed"></div>
        <div class="row"><button class="btn primary run">▶ ${t('run')}</button><button class="btn ghost rst">${t('reset')}</button><span class="muted small kbd">${t('shortcut')}</span></div>
        <div class="out"></div>
      </article>`);
      cards.appendChild(card);
      const out = $('.out', card);
      const ed = createEditor($('.ed', card), lessonDrafts[key] || c.sql, {
        chips: false, minHeight: 60,
        onChange: val => { lessonDrafts[key] = val; },
        onRun: () => runner(out, ed.get, window.SQL_DEMO_DB)
      });
      $('.run', card).onclick = () => runner(out, ed.get, window.SQL_DEMO_DB);
      $('.rst', card).onclick = () => { ed.set(c.sql); out.innerHTML = ''; };
    });

    const quiz = $('#quiz', v);
    const answered = {};
    L.quiz.forEach((q, qi) => {
      const box = h(`<div class="card quiz-q"><div class="q">${qi + 1}. ${tr(q.q)}</div>
        <div class="opts">${q.options.map((o, oi) => `<button class="opt" data-i="${oi}">${tr(o)}</button>`).join('')}</div>
        <div class="why"></div></div>`);
      quiz.appendChild(box);
      box.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const i = +b.dataset.i;
        box.querySelectorAll('.opt').forEach(x => x.classList.remove('right', 'wrongc'));
        const ok = i === q.answer;
        b.classList.add(ok ? 'right' : 'wrongc');
        if (ok) answered[qi] = true;
        $('.why', box).innerHTML = `<b>${ok ? '✅ ' + t('correct') : '❌ ' + t('incorrect')}</b> ${ok ? tr(q.why) : ''}`;
        if (Object.keys(answered).length === L.quiz.length && !progress.lessons[secId]) {
          progress.lessons[secId] = true; saveProgress();
          toast('🎓 ' + t('quizDone'), 'ok');
        }
      });
    });
  }

  let practiceFilter = 'all', practiceQuery = '';
  function renderPractice(secFilter) {
    const v = view();
    v.innerHTML = `<h1>${t('navPractice')}</h1>
      <div class="toolbar">
        <input type="search" id="q" placeholder="${t('search')}" value="${esc(practiceQuery)}">
        <div class="seg">${['all', 'todo', 'done'].map(f => `<button data-f="${f}" class="${practiceFilter === f ? 'on' : ''}">${t('filter' + f[0].toUpperCase() + f.slice(1))}</button>`).join('')}</div>
      </div>
      <div id="plist"></div>`;
    const list = $('#plist', v);
    const draw = () => {
      const q = practiceQuery.trim().toLowerCase();
      list.innerHTML = SECTIONS.filter(s => !secFilter || s.id === secFilter).map(s => {
        const ps = PROBLEMS.filter(p => p.section === s.id)
          .filter(p => practiceFilter === 'all' || (practiceFilter === 'done') === !!progress.solved[p.id])
          .filter(p => !q || String(p.id).includes(q) || p.title.en.toLowerCase().includes(q) || p.title.zh.includes(q));
        if (!ps.length) return '';
        const st = sectionStats(s.id);
        return `<section class="plist-sec"><h2>${s.icon} ${esc(tr(s.title))} <span class="muted small">${st.done}/${st.total}</span>
            <a class="small" href="#/learn/${s.id}">${t('navLearn')} →</a></h2>
          <ul class="plist">${ps.map(p => `<li><a href="#/problem/${p.id}">
            <span class="status ${progress.solved[p.id] ? 'done' : ''}">${progress.solved[p.id] ? '✓' : ''}</span>
            <span class="pid">${p.id}</span><span class="ptitle">${esc(tr(p.title))}</span>${levelBadge(p.level)}</a></li>`).join('')}</ul></section>`;
      }).join('') || `<p class="muted">—</p>`;
    };
    draw();
    $('#q', v).oninput = e => { practiceQuery = e.target.value; draw(); };
    v.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
      practiceFilter = b.dataset.f;
      v.querySelectorAll('.seg button').forEach(x => x.classList.toggle('on', x === b));
      draw();
    });
    if (secFilter) {
      const s = SECTIONS.find(x => x.id === secFilter);
      if (s) $('h1', v).innerHTML = `<a href="#/practice">${t('navPractice')}</a> › ${esc(tr(s.title))}`;
    }
  }

  function renderProblem(id) {
    const p = byId[id];
    if (!p) return renderPractice();
    const i = PROBLEMS.indexOf(p);
    const prev = PROBLEMS[i - 1], next = PROBLEMS[i + 1];
    const sec = SECTIONS.find(s => s.id === p.section);
    let hintsShown = 0;
    const v = view();
    v.innerHTML = `
      <nav class="crumbs"><a href="#/practice">${t('navPractice')}</a> › <a href="#/practice/${sec.id}">${esc(tr(sec.title))}</a></nav>
      <div class="prob-layout">
        <div class="prob-desc">
          <h1>${p.id}. ${esc(tr(p.title))} ${progress.solved[p.id] ? '<span class="tick">✓</span>' : ''}</h1>
          <div class="meta">${levelBadge(p.level)}<span class="muted small">${p.ordered ? t('mustOrder') : t('anyOrder')}</span>
            <a class="small" href="https://leetcode.com/problems/${p.slug}/" target="_blank" rel="noopener">${t('openLeetcode')} ↗</a></div>
          <div class="desc">${tr(p.desc)}</div>
          <h3>${t('tables')}</h3>
          <div class="tabs">${p.tables.map((tb, k) => `<button class="tab ${k ? '' : 'on'}" data-k="${k}">${esc(tb.name)}</button>`).join('')}</div>
          <div id="tblView">${schemaTable(p.tables[0])}</div>
          <details class="expected"><summary>${t('showExpected')}</summary><div id="expView"></div></details>
          <div id="hints"></div>
          <div id="sol"></div>
        </div>
        <div class="prob-work">
          <div id="ed"></div>
          <div class="row actions">
            <button class="btn" id="runBtn">▶ ${t('run')}</button>
            <button class="btn primary" id="subBtn">✔ ${t('submit')}</button>
            <button class="btn ghost" id="hintBtn">💡 ${t('hint')}</button>
            <button class="btn ghost" id="solBtn">🔑 ${t('solution')}</button>
            <button class="btn ghost" id="rstBtn">${t('reset')}</button>
          </div>
          <div class="muted small kbd">${t('shortcut')}</div>
          <div id="verdict"></div>
          <div id="out"></div>
        </div>
      </div>
      <div class="pager">
        ${prev ? `<a class="btn ghost" href="#/problem/${prev.id}">← ${t('prev')}</a>` : '<span></span>'}
        <a class="btn ghost" href="#/practice">${t('backList')}</a>
        ${next ? `<a class="btn ghost" href="#/problem/${next.id}">${t('next')} →</a>` : '<span></span>'}
      </div>`;

    v.querySelectorAll('.tab').forEach(b => b.onclick = () => {
      v.querySelectorAll('.tab').forEach(x => x.classList.toggle('on', x === b));
      $('#tblView', v).innerHTML = schemaTable(p.tables[+b.dataset.k]);
    });
    $('details.expected', v).addEventListener('toggle', e => {
      if (e.target.open) $('#expView', v).innerHTML = (p.mutation ? `<div class="muted small">${t('mutationNote')}</div>` : '') + resultTable(expectedFor(p, 0));
    });

    const starter = '';
    const ed = createEditor($('#ed', v), progress.drafts[p.id] != null ? progress.drafts[p.id] : starter, {
      minHeight: 160,
      onChange: val => { progress.drafts[p.id] = val; saveProgress(); },
      onRun: () => doRun()
    });
    const out = $('#out', v), verdict = $('#verdict', v);

    function doRun() {
      verdict.innerHTML = '';
      const r = runProblem(p, ed.get());
      out.innerHTML = r.error ? `<div class="err">${t('error')}: ${esc(r.error)}</div>`
        : `<h4>${t('yourOutput')}</h4>${p.mutation ? `<div class="muted small">${t('mutationNote')}</div>` : ''}${resultTable(r.set)}`;
    }
    function doSubmit() {
      const sql = ed.get();
      const cases = 1 + (p.extra ? p.extra.length : 0);
      for (let k = 0; k < cases; k++) {
        const r = runProblem(p, sql, k ? p.extra[k - 1] : null);
        const exp = expectedFor(p, k);
        if (r.error) {
          verdict.innerHTML = `<div class="verdict bad">❌ ${t('error')}</div>`;
          out.innerHTML = `<div class="err">${esc(r.error)}</div>`;
          return;
        }
        const c = compare(r.set, exp, p.ordered);
        if (!c.ok) {
          verdict.innerHTML = `<div class="verdict bad">❌ ${t('wrong')}<div class="small">${esc(c.msg)}${k ? ' ' + t('extraCase') : ''}</div></div>`;
          const data = k ? `<h4>${t('tables')}</h4>${p.tables.map(tb => schemaTable(tb, p.extra[k - 1][tb.name])).join('')}` : '';
          out.innerHTML = `${data}<div class="diff"><div><h4>${t('yourOutput')}</h4>${resultTable(r.set)}</div><div><h4>${t('expected')}</h4>${resultTable(exp)}</div></div>`;
          return;
        }
      }
      verdict.innerHTML = `<div class="verdict ok">✅ ${t('accepted')}</div>`;
      out.innerHTML = `<h4>${t('yourOutput')}</h4>${resultTable(runProblem(p, sql).set)}<div class="card explain"><b>${t('concepts')}:</b> ${tr(p.explain)}</div>`;
      if (!progress.solved[p.id]) {
        progress.solved[p.id] = true; saveProgress();
        celebrate();
        const h1 = $('h1', v);
        if (h1 && !$('.tick', h1)) h1.insertAdjacentHTML('beforeend', ' <span class="tick">✓</span>');
      }
      if (next) out.insertAdjacentHTML('beforeend', `<a class="btn primary" href="#/problem/${next.id}">${t('next')}: ${next.id}. ${esc(tr(next.title))} →</a>`);
    }

    $('#runBtn', v).onclick = doRun;
    $('#subBtn', v).onclick = doSubmit;
    $('#rstBtn', v).onclick = () => { ed.set(starter); out.innerHTML = ''; verdict.innerHTML = ''; };
    $('#hintBtn', v).onclick = () => {
      if (hintsShown >= p.hints.length) { toast(t('noMoreHints')); return; }
      $('#hints', v).insertAdjacentHTML('beforeend', `<div class="hint">💡 ${t('hint')} ${hintsShown + 1}: ${tr(p.hints[hintsShown])}</div>`);
      hintsShown++;
    };
    $('#solBtn', v).onclick = () => {
      if ($('#sol', v).innerHTML) return;
      if (!progress.solved[p.id] && hintsShown < p.hints.length && !confirm(t('revealConfirm'))) return;
      $('#sol', v).innerHTML = `<div class="card solution"><h3>🔑 ${t('solution')}</h3>
        <pre class="code">${highlight(p.solution)}</pre><p>${tr(p.explain)}</p>
        <button class="btn ghost" id="useSol">${t('useSolution')}</button></div>`;
      $('#useSol', v).onclick = () => ed.set(p.solution);
    };
  }

  function celebrate() {
    toast('🎉 ' + t('accepted') + '!', 'ok');
    const box = h('<div class="confetti" aria-hidden="true"></div>');
    const colors = ['#FFE600', '#BCE2F6', '#3D8BD9', '#34C38F', '#F5A524'];
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('i');
      s.style.left = Math.random() * 100 + '%';
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = Math.random() * 0.3 + 's';
      s.style.transform = `rotate(${Math.random() * 360}deg)`;
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 1800);
  }

  let playDraft = store.get('playDraft', "SELECT d.name AS department, COUNT(e.id) AS headcount, ROUND(AVG(e.salary), 2) AS avg_salary\nFROM departments d\nLEFT JOIN employees e ON e.dept_id = d.id\nGROUP BY d.id, d.name\nORDER BY headcount DESC;");
  function renderPlayground() {
    const v = view();
    const tables = window.SQL_DEMO_DB;
    v.innerHTML = `<h1>${t('navPlay')}</h1><p class="muted">${t('playIntro')}</p>
      <div class="play-layout">
        <aside class="card schema-side"><h3>${t('schema')}</h3>
          ${tables.map((tb, k) => `<div class="side-tbl"><button class="link tname" data-k="${k}">${esc(tb.name)}</button>
            <div class="small muted">${tb.cols.map(c => esc(c[0])).join(', ')}</div></div>`).join('')}
        </aside>
        <div>
          <div id="ed"></div>
          <div class="row"><button class="btn primary" id="runBtn">▶ ${t('run')}</button><button class="btn ghost" id="rstBtn">${t('reset')}</button><span class="muted small kbd">${t('shortcut')}</span></div>
          <div id="out"></div>
        </div>
      </div>`;
    const out = $('#out', v);
    const ed = createEditor($('#ed', v), playDraft, {
      minHeight: 160,
      onChange: val => { playDraft = val; store.set('playDraft', val); },
      onRun: () => runner(out, ed.get, tables)
    });
    $('#runBtn', v).onclick = () => runner(out, ed.get, tables);
    $('#rstBtn', v).onclick = () => { ed.set(''); out.innerHTML = ''; };
    v.querySelectorAll('.tname').forEach(b => b.onclick = () => {
      const tb = tables[+b.dataset.k];
      ed.set(`SELECT *\nFROM ${tb.name};`);
      runner(out, ed.get, tables);
    });
  }

  // ---------------------------------------------------------------- router & chrome
  function applyChrome() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('appName');
    $('#brandName').textContent = t('appName');
    $('#langBtn').textContent = lang === 'zh' ? 'EN' : '中文';
    $('#langBtn').setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
    document.querySelectorAll('[data-nav]').forEach(a => { a.querySelector('span').textContent = t(a.dataset.nav); });
    $('#installBtn').textContent = t('install');
  }

  function render() {
    applyChrome();
    if (!SQL) {
      view().innerHTML = `<div class="loading"><div class="spinner"></div>${t('loading')}</div>`;
      return;
    }
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/');
    const route = parts[0] || '';
    document.querySelectorAll('[data-nav]').forEach(a => {
      const r = a.getAttribute('href').replace('#/', '');
      a.classList.toggle('on', r === route || (r === 'practice' && route === 'problem'));
    });
    if (route === 'learn') parts[1] ? renderLesson(parts[1]) : renderLearnIndex();
    else if (route === 'practice') renderPractice(parts[1]);
    else if (route === 'problem') renderProblem(+parts[1]);
    else if (route === 'playground') renderPlayground();
    else renderHome();
  }

  window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });
  $('#langBtn').onclick = () => { lang = lang === 'zh' ? 'en' : 'zh'; store.set('lang', lang); render(); };

  // theme
  const root = document.documentElement;
  const savedTheme = store.get('theme', null);
  if (savedTheme) root.dataset.theme = savedTheme;
  $('#themeBtn').onclick = () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    store.set('theme', root.dataset.theme);
  };

  // install prompt
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; $('#installBtn').hidden = false; });
  $('#installBtn').onclick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    $('#installBtn').hidden = true;
  };

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then(reg => {
        if (!navigator.serviceWorker.controller) {
          reg.addEventListener('updatefound', () => {
            const w = reg.installing;
            if (w) w.addEventListener('statechange', () => { if (w.state === 'activated') toast('✈️ ' + t('offlineReady')); });
          });
        }
      }).catch(() => { /* offline support unavailable */ });
    });
  }

  render();
  enginePromise.then(render).catch(() => { view().innerHTML = `<div class="err">${t('engineFail')}</div>`; });
})();
