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
    iosInstall: {
      en: '<ol><li>Open this page in <b>Safari</b>.</li><li>Tap the <b>Share</b> button (square with an up arrow).</li><li>Choose <b>Add to Home Screen</b>, then <b>Add</b>.</li></ol><p class="muted small">The app then opens full-screen from your home screen and works offline.</p>',
      zh: '<ol><li>用 <b>Safari</b> 打开本页。</li><li>点 <b>分享</b> 按钮（方框加向上箭头）。</li><li>选择 <b>添加到主屏幕</b>，再点 <b>添加</b>。</li></ol><p class="muted small">之后从主屏幕打开即为全屏 App，并可离线使用。</p>'
    },
    settings: { en: 'Settings', zh: '设置' }, language: { en: 'Language', zh: '语言' },
    appearance: { en: 'Appearance', zh: '外观' }, mode: { en: 'Mode', zh: '模式' },
    modeSystem: { en: 'System', zh: '跟随系统' }, modeLight: { en: 'Light', zh: '浅色' }, modeDark: { en: 'Dark', zh: '深色' },
    lightTheme: { en: 'Light theme', zh: '浅色主题' }, darkTheme: { en: 'Dark theme', zh: '深色主题' },
    th_classic: { en: 'Classic', zh: '经典' }, th_paper: { en: 'Paper', zh: '纸张' }, th_mint: { en: 'Mint', zh: '薄荷' }, th_lavender: { en: 'Lavender', zh: '薰衣草' },
    th_midnight: { en: 'Midnight', zh: '午夜' }, th_oled: { en: 'OLED Black', zh: '纯黑 OLED' }, th_slate: { en: 'Slate', zh: '石板' }, th_grape: { en: 'Grape', zh: '葡萄' },
    themeNote: { en: 'In System mode the app follows your phone: the light theme by day, the dark theme at night.', zh: '「跟随系统」时，手机为浅色就用浅色主题，为深色就用深色主题。' },
    share: { en: 'Share this app', zh: '分享本应用' }, shareHint: { en: 'Scan the QR code to open the app on another phone.', zh: '扫描二维码即可在另一部手机上打开本应用。' },
    shareBtn: { en: 'Share link', zh: '分享链接' }, copyLink: { en: 'Copy link', zh: '复制链接' }, copied: { en: 'Link copied', zh: '链接已复制' },
    installApp: { en: 'Install app', zh: '安装应用' }, installedNote: { en: 'Installed — you are using the app version.', zh: '已安装——你正在使用 App 版本。' },
    installHint: { en: 'Add it to your home screen for full-screen, offline use.', zh: '添加到主屏幕，即可全屏并离线使用。' },
    info: { en: 'App info', zh: '应用信息' }, version: { en: 'Version', zh: '版本' }, history: { en: 'Update history', zh: '更新记录' },
    checkUpdate: { en: 'Check for updates', zh: '检查更新' }, upToDate: { en: 'You have the latest version.', zh: '已是最新版本。' },
    downloading: { en: 'Downloading the new version…', zh: '正在下载新版本…' }, offline: { en: 'Offline use', zh: '离线使用' },
    offlineYes: { en: 'Ready', zh: '已就绪' }, offlineNo: { en: 'Not yet — open the app online once', zh: '尚未——请在联网时打开一次' },
    progressData: { en: 'Progress', zh: '学习进度' },
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
      <section class="hero card">
        <div class="hero-top">
          <img src="icons/icon-192.png" alt="" class="hero-logo" width="72" height="72">
          <div>
            <h1>${t('appName')}</h1>
            <p class="muted">${t('tagline')}</p>
          </div>
        </div>
        <div class="stats">
          <div class="stat">${ring(solved / PROBLEMS.length, `${solved}/${PROBLEMS.length}`)}<div>${t('solved')}</div></div>
          <div class="stat">${ring(lessonsDone / SECTIONS.length, `${lessonsDone}/${SECTIONS.length}`)}<div>${t('lessons')}</div></div>
        </div>
      </section>
      <a class="card next-card" href="${next ? '#/problem/' + next.id : '#/practice'}">
        ${next ? `<span class="next-icon">${icon('flag')}</span>
          <span class="next-body"><span class="muted small">${t('nextUp')}</span>
            <span class="next-title">${next.id}. ${esc(tr(next.title))}</span>${levelBadge(next.level)}</span>
          <span class="btn primary">${t('continue')} ${icon('chevron')}</span>`
        : `<span class="next-icon">${icon('trophy')}</span><span class="next-body"><span class="next-title">${t('allDone')}</span></span>`}
      </a>
      <h2>${t('studyPlan')}</h2>
      <p class="muted">${t('learnThen')}</p>
      <section class="sec-grid">
        ${SECTIONS.map((s, i) => {
          const st = sectionStats(s.id);
          return `<div class="card sec-card">
            <div class="sec-head"><span class="sec-icon">${icon(s.icon)}</span><span class="muted small">${i + 1} / ${SECTIONS.length}</span>${progress.lessons[s.id] ? `<span class="tick" title="lesson done">${icon('check')}</span>` : ''}</div>
            <h3>${esc(tr(s.title))}</h3>
            <div class="bar"><span style="width:${(st.done / st.total) * 100}%"></span></div>
            <div class="muted small">${st.done}/${st.total} ${t('solved')}</div>
            <div class="sec-actions"><a class="btn" href="#/learn/${s.id}">${t('navLearn')}</a><a class="btn ghost" href="#/practice/${s.id}">${t('navPractice')}</a></div>
          </div>`;
        }).join('')}
      </section>`;
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
        <div class="sec-head"><span class="sec-icon">${icon(s.icon)}</span><span class="muted small">${i + 1}</span>${progress.lessons[s.id] ? `<span class="tick">${icon('check')}</span>` : ''}</div>
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
      <h1 class="with-icon"><span class="sec-icon">${icon(sec.icon)}</span>${esc(tr(sec.title))}</h1>
      <p class="lead">${tr(L.intro)}</p>
      <div id="cards"></div>
      <h2 class="with-icon">${icon('quiz')} ${t('quiz')}</h2>
      <div id="quiz"></div>
      <div class="card cta">
        <div>${t('practiceSection')}: <b>${esc(tr(sec.title))}</b> (${sectionStats(secId).done}/${sectionStats(secId).total})</div>
        <a class="btn primary" href="#/practice/${secId}">${t('navPractice')} ${icon('chevron')}</a>
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
        <div class="row"><button class="btn primary run">${icon('play', 'fill')} ${t('run')}</button><button class="btn ghost rst">${icon('reset')} ${t('reset')}</button><span class="muted small kbd">${t('shortcut')}</span></div>
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
        $('.why', box).innerHTML = `<b class="${ok ? 'good' : 'badc'}">${icon(ok ? 'check' : 'x')} ${ok ? t('correct') : t('incorrect')}</b> ${ok ? tr(q.why) : ''}`;
        if (Object.keys(answered).length === L.quiz.length && !progress.lessons[secId]) {
          progress.lessons[secId] = true; saveProgress();
          toast(t('quizDone'), 'ok');
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
        return `<section class="plist-sec"><h2><span class="sec-icon sm">${icon(s.icon)}</span>${esc(tr(s.title))} <span class="muted small">${st.done}/${st.total}</span>
            <a class="small" href="#/learn/${s.id}">${t('navLearn')} ${icon('chevron')}</a></h2>
          <ul class="plist">${ps.map(p => `<li><a href="#/problem/${p.id}">
            <span class="status ${progress.solved[p.id] ? 'done' : ''}">${progress.solved[p.id] ? icon('check') : ''}</span>
            <span class="pid">${p.id}</span><span class="ptitle">${esc(tr(p.title))}</span>${levelBadge(p.level)}${icon('chevron', 'go')}</a></li>`).join('')}</ul></section>`;
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
          <h1>${p.id}. ${esc(tr(p.title))} ${progress.solved[p.id] ? `<span class="tick">${icon('check')}</span>` : ''}</h1>
          <div class="meta">${levelBadge(p.level)}<span class="muted small">${p.ordered ? t('mustOrder') : t('anyOrder')}</span>
            <a class="small" href="https://leetcode.com/problems/${p.slug}/" target="_blank" rel="noopener">${t('openLeetcode')} ${icon('external')}</a></div>
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
            <button class="btn" id="runBtn">${icon('play', 'fill')} ${t('run')}</button>
            <button class="btn primary" id="subBtn">${icon('check')} ${t('submit')}</button>
            <button class="btn ghost" id="hintBtn">${icon('bulb')} ${t('hint')}</button>
            <button class="btn ghost" id="solBtn">${icon('key')} ${t('solution')}</button>
            <button class="btn ghost" id="rstBtn">${icon('reset')} ${t('reset')}</button>
          </div>
          <div class="muted small kbd">${t('shortcut')}</div>
          <div id="verdict"></div>
          <div id="out"></div>
        </div>
      </div>
      <div class="pager">
        ${prev ? `<a class="btn ghost" href="#/problem/${prev.id}">${icon('arrowLeft')} ${t('prev')}</a>` : '<span></span>'}
        <a class="btn ghost" href="#/practice">${t('backList')}</a>
        ${next ? `<a class="btn ghost" href="#/problem/${next.id}">${t('next')} ${icon('chevron')}</a>` : '<span></span>'}
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
          verdict.innerHTML = `<div class="verdict bad">${icon('x')} ${t('error')}</div>`;
          out.innerHTML = `<div class="err">${esc(r.error)}</div>`;
          return;
        }
        const c = compare(r.set, exp, p.ordered);
        if (!c.ok) {
          verdict.innerHTML = `<div class="verdict bad">${icon('x')} ${t('wrong')}<div class="small">${esc(c.msg)}${k ? ' ' + t('extraCase') : ''}</div></div>`;
          const data = k ? `<h4>${t('tables')}</h4>${p.tables.map(tb => schemaTable(tb, p.extra[k - 1][tb.name])).join('')}` : '';
          out.innerHTML = `${data}<div class="diff"><div><h4>${t('yourOutput')}</h4>${resultTable(r.set)}</div><div><h4>${t('expected')}</h4>${resultTable(exp)}</div></div>`;
          return;
        }
      }
      verdict.innerHTML = `<div class="verdict ok">${icon('check')} ${t('accepted')}</div>`;
      out.innerHTML = `<h4>${t('yourOutput')}</h4>${resultTable(runProblem(p, sql).set)}<div class="card explain"><b>${t('concepts')}:</b> ${tr(p.explain)}</div>`;
      if (!progress.solved[p.id]) {
        progress.solved[p.id] = true; saveProgress();
        celebrate();
        const h1 = $('h1', v);
        if (h1 && !$('.tick', h1)) h1.insertAdjacentHTML('beforeend', ` <span class="tick">${icon('check')}</span>`);
      }
      if (next) out.insertAdjacentHTML('beforeend', `<a class="btn primary" href="#/problem/${next.id}">${t('next')}: ${next.id}. ${esc(tr(next.title))} ${icon('chevron')}</a>`);
    }

    $('#runBtn', v).onclick = doRun;
    $('#subBtn', v).onclick = doSubmit;
    $('#rstBtn', v).onclick = () => { ed.set(starter); out.innerHTML = ''; verdict.innerHTML = ''; };
    $('#hintBtn', v).onclick = () => {
      if (hintsShown >= p.hints.length) { toast(t('noMoreHints')); return; }
      $('#hints', v).insertAdjacentHTML('beforeend', `<div class="hint">${icon('bulb')}<div><b>${t('hint')} ${hintsShown + 1}</b> ${tr(p.hints[hintsShown])}</div></div>`);
      hintsShown++;
    };
    $('#solBtn', v).onclick = () => {
      if ($('#sol', v).innerHTML) return;
      if (!progress.solved[p.id] && hintsShown < p.hints.length && !confirm(t('revealConfirm'))) return;
      $('#sol', v).innerHTML = `<div class="card solution"><h3 class="with-icon">${icon('key')} ${t('solution')}</h3>
        <pre class="code">${highlight(p.solution)}</pre><p>${tr(p.explain)}</p>
        <button class="btn ghost" id="useSol">${icon('copy')} ${t('useSolution')}</button></div>`;
      $('#useSol', v).onclick = () => ed.set(p.solution);
    };
  }

  function celebrate() {
    toast(t('accepted') + '!', 'ok');
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
          <div class="row"><button class="btn primary" id="runBtn">${icon('play', 'fill')} ${t('run')}</button><button class="btn ghost" id="rstBtn">${icon('reset')} ${t('reset')}</button><span class="muted small kbd">${t('shortcut')}</span></div>
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

  // ---------------------------------------------------------------- appearance
  // Mode picks light or dark (or follows the phone); each side has its own theme.
  // index.html's prepaint script mirrors applyTheme() so nothing flashes on load.
  const THEMES = {
    light: [['classic', '#f6f8fb', '#ffffff', '#2f7fd0'], ['paper', '#f6f1e7', '#fffdf8', '#b4621b'],
      ['mint', '#eef7f3', '#ffffff', '#0d8466'], ['lavender', '#f5f3fc', '#ffffff', '#6a4fd3']],
    dark: [['midnight', '#0f141a', '#171e26', '#6cb3f5'], ['oled', '#000000', '#0d0d0d', '#6cb3f5'],
      ['slate', '#23272f', '#2c313b', '#83b9ec'], ['grape', '#17121f', '#221a2e', '#b89dff']]
  };
  const MODES = ['system', 'light', 'dark'];
  const prefs = Object.assign({ mode: 'system', light: 'classic', dark: 'midnight' }, store.get('prefs', {}));
  if (!MODES.includes(prefs.mode)) prefs.mode = 'system';
  if (!THEMES.light.some(x => x[0] === prefs.light)) prefs.light = 'classic';
  if (!THEMES.dark.some(x => x[0] === prefs.dark)) prefs.dark = 'midnight';
  const darkMQ = matchMedia('(prefers-color-scheme: dark)');

  function applyTheme() {
    const side = prefs.mode === 'system' ? (darkMQ.matches ? 'dark' : 'light') : prefs.mode;
    const name = prefs[side];
    const root = document.documentElement;
    root.dataset.theme = side;
    root.dataset.palette = name;
    const bg = THEMES[side].find(x => x[0] === name)[1];
    document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.setAttribute('content', bg));
  }
  function setPref(k, v) { prefs[k] = v; store.set('prefs', prefs); applyTheme(); }
  darkMQ.addEventListener('change', () => { if (prefs.mode === 'system') applyTheme(); });
  applyTheme();

  // ---------------------------------------------------------------- install
  // Chromium offers a native prompt; iOS Safari has none, so explain "Add to Home Screen" instead.
  let deferredPrompt = null;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; if (currentRoute === 'settings') render(); });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; if (currentRoute === 'settings') render(); });
  async function install() {
    if (!deferredPrompt) { showIOSInstall(); return; }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    render();
  }
  function showIOSInstall() {
    const m = h(`<div class="modal" role="dialog" aria-modal="true"><div class="modal-card card">
      <h2>${t('installApp')}</h2>${STR.iosInstall[lang]}
      <div class="right"><button class="btn primary">${t('close')}</button></div></div></div>`);
    document.body.appendChild(m);
    $('button', m).onclick = () => m.remove();
    m.addEventListener('click', e => { if (e.target === m) m.remove(); });
  }

  // ---------------------------------------------------------------- updates (APP-STANDARDS §1–2)
  const RELEASES = window.SQL_RELEASES;
  const APP_URL = 'https://bryanwoo988.github.io/Learn-SQL/';
  const firstLaunch = !store.get('launched', false) && store.get('progress', null) === null;
  store.set('launched', true);
  window.WhatsNew.init({
    version: RELEASES[0].v, releases: RELEASES, key: 'sqlsyntax.seenVersion',
    lang: () => lang, isNewUser: () => firstLaunch
  });

  let swReg = null, reloading = false;
  // The new service worker waits until the reader agrees; then it takes over and the page reloads once.
  function applyUpdate() {
    const w = swReg && swReg.waiting;
    if (!w) { location.reload(); return; }
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!reloading) { reloading = true; location.reload(); }
    });
    w.postMessage({ type: 'SKIP_WAITING' });
  }
  function track(w) {
    if (!w) return;
    w.addEventListener('statechange', () => {
      if (w.state !== 'installed') return;
      if (navigator.serviceWorker.controller) window.WhatsNew.offerUpdate(applyUpdate);
      else toast(t('offlineReady'));
    });
  }
  async function checkForUpdate(manual) {
    if (!swReg) { if (manual) toast(t('upToDate')); return; }
    try { await swReg.update(); } catch (e) { /* offline: try later */ }
    if (swReg.waiting && navigator.serviceWorker.controller) window.WhatsNew.offerUpdate(applyUpdate);
    else if (manual) toast(swReg.installing ? t('downloading') : t('upToDate'));
  }
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then(reg => {
        swReg = reg;
        if (reg.waiting && navigator.serviceWorker.controller) window.WhatsNew.offerUpdate(applyUpdate);
        track(reg.installing);
        reg.addEventListener('updatefound', () => track(reg.installing));
        // Home-screen apps are resumed far more often than relaunched: check on return and every 15 minutes.
        document.addEventListener('visibilitychange', () => { if (!document.hidden) checkForUpdate(false); });
        setInterval(() => checkForUpdate(false), 15 * 60e3);
      }).catch(() => { /* offline support unavailable */ });
    });
  }

  // ---------------------------------------------------------------- settings
  const segmented = (opts, cur, attr) => `<div class="seg wide" role="radiogroup">${opts.map(([v, label, ic]) =>
    `<button type="button" role="radio" aria-checked="${v === cur}" data-${attr}="${v}" class="${v === cur ? 'on' : ''}">${ic ? icon(ic) : ''}${label}</button>`).join('')}</div>`;
  const swatches = side => `<div class="swatches">${THEMES[side].map(([name, bg, surf, acc]) =>
    `<button type="button" class="swatch ${prefs[side] === name ? 'on' : ''}" data-side="${side}" data-name="${name}" aria-pressed="${prefs[side] === name}">
      <span class="sw-prev" style="background:${bg}"><span class="sw-card" style="background:${surf}"><i style="background:${acc}"></i><b></b></span></span>
      <span class="sw-name">${t('th_' + name)}</span></button>`).join('')}</div>`;

  function renderSettings() {
    const v = view();
    const installRow = standalone()
      ? `<p class="muted small">${t('installedNote')}</p>`
      : (deferredPrompt || isIOS)
        ? `<p class="muted small">${t('installHint')}</p><button class="btn primary" id="installBtn">${icon('download')} ${t('installApp')}</button>`
        : `<p class="muted small">${t('installHint')}</p>`;
    v.innerHTML = `<h1>${t('settings')}</h1>
      <section class="card setgroup">
        <h2 class="set-h">${icon('globe')} ${t('language')}</h2>
        ${segmented([['en', 'English'], ['zh', '中文']], lang, 'lang')}
      </section>
      <section class="card setgroup">
        <h2 class="set-h">${icon('palette')} ${t('appearance')}</h2>
        <h3>${t('mode')}</h3>
        ${segmented([['system', t('modeSystem'), 'monitor'], ['light', t('modeLight'), 'sun'], ['dark', t('modeDark'), 'moon']], prefs.mode, 'mode')}
        <p class="muted small">${t('themeNote')}</p>
        <h3>${t('lightTheme')}</h3>${swatches('light')}
        <h3>${t('darkTheme')}</h3>${swatches('dark')}
      </section>
      <section class="card setgroup">
        <h2 class="set-h">${icon('share')} ${t('share')}</h2>
        <div class="share-box">
          <div class="qr" id="qr" aria-label="${esc(APP_URL)}"></div>
          <div class="share-side">
            <p class="muted small">${t('shareHint')}</p>
            <p class="share-url">${esc(APP_URL)}</p>
            <div class="row">
              ${navigator.share ? `<button class="btn primary" id="shareBtn">${icon('share')} ${t('shareBtn')}</button>` : ''}
              <button class="btn ${navigator.share ? 'ghost' : 'primary'}" id="copyBtn">${icon('copy')} ${t('copyLink')}</button>
            </div>
          </div>
        </div>
      </section>
      <section class="card setgroup">
        <h2 class="set-h">${icon('download')} ${t('installApp')}</h2>
        ${installRow}
      </section>
      <section class="card setgroup">
        <h2 class="set-h">${icon('info')} ${t('info')}</h2>
        <dl class="keyval">
          <dt>${t('version')}</dt><dd>${esc(window.WhatsNew.label(RELEASES))}</dd>
          <dt>${t('offline')}</dt><dd id="offState">…</dd>
        </dl>
        <div class="row">
          <button class="btn" id="histBtn">${icon('history')} ${t('history')}</button>
          <button class="btn" id="updBtn">${icon('refresh')} ${t('checkUpdate')}</button>
          <button class="btn ghost" id="aboutBtn">${icon('info')} ${t('about')}</button>
        </div>
      </section>
      <section class="card setgroup">
        <h2 class="set-h">${icon('trash')} ${t('progressData')}</h2>
        <button class="btn danger" id="resetBtn">${icon('trash')} ${t('resetProgress')}</button>
      </section>`;

    $('#qr', v).appendChild(window.QR.toSVG(APP_URL, { quiet: 4, dark: '#111827', light: '#ffffff' }));
    v.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => { lang = b.dataset.lang; store.set('lang', lang); render(); });
    v.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { setPref('mode', b.dataset.mode); render(); });
    v.querySelectorAll('.swatch').forEach(b => b.onclick = () => {
      // Picking a theme previews it right away, even if the mode shows the other side.
      if (prefs.mode !== 'system' && prefs.mode !== b.dataset.side) prefs.mode = b.dataset.side;
      setPref(b.dataset.side, b.dataset.name); render();
    });
    if ($('#shareBtn', v)) $('#shareBtn', v).onclick = () => navigator.share({ title: t('appName'), url: APP_URL }).catch(() => {});
    $('#copyBtn', v).onclick = async () => {
      try { await navigator.clipboard.writeText(APP_URL); toast(t('copied')); }
      catch (e) {
        const r = document.createRange(); r.selectNodeContents($('.share-url', v));
        getSelection().removeAllRanges(); getSelection().addRange(r);
      }
    };
    if ($('#installBtn', v)) $('#installBtn', v).onclick = install;
    $('#histBtn', v).onclick = () => window.WhatsNew.history();
    $('#updBtn', v).onclick = () => checkForUpdate(true);
    $('#aboutBtn', v).onclick = showAbout;
    $('#resetBtn', v).onclick = () => {
      if (!confirm(t('resetConfirm'))) return;
      progress.solved = {}; progress.lessons = {}; progress.drafts = {};
      saveProgress(); toast(t('resetProgress') + ' ✓');
    };
    const off = $('#offState', v);
    (window.caches ? caches.keys() : Promise.resolve([]))
      .then(keys => { const ok = keys.some(k => k.startsWith('sql-syntax-')) && !!navigator.serviceWorker?.controller; off.textContent = t(ok ? 'offlineYes' : 'offlineNo'); off.className = ok ? 'good' : 'muted'; })
      .catch(() => { off.textContent = t('offlineNo'); });
  }

  // ---------------------------------------------------------------- router & chrome
  let currentRoute = '';
  document.querySelectorAll('[data-icon]').forEach(el => el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)));

  function applyChrome() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('appName');
    $('#brandName').textContent = t('appName');
    $('#settingsBtn').setAttribute('aria-label', t('settings'));
    document.querySelectorAll('[data-nav]').forEach(a => { a.querySelector('span').textContent = t(a.dataset.nav); });
  }

  function render() {
    applyChrome();
    if (!SQL) {
      view().innerHTML = `<div class="loading"><div class="spinner"></div>${t('loading')}</div>`;
      return;
    }
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/');
    const route = parts[0] || '';
    currentRoute = route;
    document.querySelectorAll('[data-nav]').forEach(a => {
      const r = a.getAttribute('href').replace('#/', '');
      const on = r === route || (r === 'practice' && route === 'problem');
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    $('#settingsBtn').classList.toggle('on', route === 'settings');
    if (route === 'learn') parts[1] ? renderLesson(parts[1]) : renderLearnIndex();
    else if (route === 'practice') renderPractice(parts[1]);
    else if (route === 'problem') renderProblem(+parts[1]);
    else if (route === 'playground') renderPlayground();
    else if (route === 'settings') renderSettings();
    else renderHome();
  }

  window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });

  render();
  enginePromise.then(render).catch(() => { view().innerHTML = `<div class="err">${t('engineFail')}</div>`; });
})();
