/* MySQL compatibility layer on top of SQLite (sql.js).
 * LeetCode's SQL problems target MySQL; this makes the common MySQL idioms work here. */
(function (root) {
  'use strict';

  // ---- query rewriting -------------------------------------------------------
  // Splits SQL into code / string / comment segments so rewrites never touch literals.
  function segments(sql) {
    const out = [];
    let i = 0, buf = '';
    const flush = () => { if (buf) { out.push({ code: true, text: buf }); buf = ''; } };
    while (i < sql.length) {
      const c = sql[i], n = sql[i + 1];
      if (c === "'" || c === '"' || c === '`') {
        flush();
        let j = i + 1;
        while (j < sql.length) {
          if (sql[j] === c && sql[j + 1] === c) { j += 2; continue; }
          if (sql[j] === '\\' && c !== '`') { j += 2; continue; }
          if (sql[j] === c) break;
          j++;
        }
        out.push({ code: false, text: sql.slice(i, j + 1) });
        i = j + 1;
      } else if (c === '-' && n === '-' || c === '#') {
        flush();
        let j = sql.indexOf('\n', i);
        if (j < 0) j = sql.length;
        out.push({ code: false, text: sql.slice(i, j) });
        i = j;
      } else if (c === '/' && n === '*') {
        flush();
        let j = sql.indexOf('*/', i + 2);
        j = j < 0 ? sql.length : j + 2;
        out.push({ code: false, text: sql.slice(i, j) });
        i = j;
      } else { buf += c; i++; }
    }
    flush();
    return out;
  }

  function rewrite(sql) {
    let s = segments(sql).map(seg => {
      if (!seg.code) {
        // MySQL backslash escapes inside single-quoted strings -> SQLite doubling
        if (seg.text[0] === "'") {
          return seg.text.replace(/\\(.)/g, (m, ch) =>
            ch === "'" ? "''" : ch === '\\' ? '\\' : ch === '"' ? '"' : m);
        }
        if (seg.text[0] === '#') return '--' + seg.text.slice(1);
        return seg.text;
      }
      return seg.text
        // MySQL "/" is decimal division; SQLite truncates integers. Force real division.
        .replace(/\//g, ' * 1.0 / ')
        // a DIV b -> integer division
        .replace(/\bDIV\b/gi, '/')
        // DATE_ADD(x, INTERVAL n DAY) -> DATE_ADD(x, n, 'DAY')
        .replace(/,\s*INTERVAL\s+([^,()]+?)\s+(DAY|MONTH|YEAR|WEEK)\s*\)/gi, ", $1, '$2')");
    }).join('');
    // GROUP_CONCAT(... SEPARATOR 'x') -> SQLite syntax
    s = s.replace(/GROUP_CONCAT\s*\(([^()]*(?:\([^()]*\)[^()]*)*?)\s+SEPARATOR\s+('(?:[^']|'')*')\s*\)/gi, (m, body, sep) => {
      if (sep === "','") return 'GROUP_CONCAT(' + body + ')';
      if (/^\s*DISTINCT\b/i.test(body)) return 'GROUP_CONCAT(' + body + ')';
      const ob = body.search(/\sORDER\s+BY\s/i);
      if (ob < 0) return 'GROUP_CONCAT(' + body + ', ' + sep + ')';
      return 'GROUP_CONCAT(' + body.slice(0, ob) + ', ' + sep + body.slice(ob) + ')';
    });
    return s;
  }

  // ---- date helpers ----------------------------------------------------------
  function toDate(v) {
    if (v === null || v === undefined) return null;
    const m = String(v).match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (!m) return null;
    return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  }
  const pad = (n, w = 2) => String(n).padStart(w, '0');
  const fmt = d => d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function addInterval(v, n, unit, sign) {
    const d = toDate(v);
    if (!d || n === null) return null;
    n = Number(n) * sign;
    switch (String(unit || 'DAY').toUpperCase()) {
      case 'YEAR': d.setUTCFullYear(d.getUTCFullYear() + n); break;
      case 'MONTH': d.setUTCMonth(d.getUTCMonth() + n); break;
      case 'WEEK': d.setUTCDate(d.getUTCDate() + 7 * n); break;
      default: d.setUTCDate(d.getUTCDate() + n);
    }
    return fmt(d);
  }

  function dateFormat(v, f) {
    const d = toDate(v);
    if (!d || f === null) return null;
    return String(f).replace(/%([a-zA-Z%])/g, (m, k) => {
      switch (k) {
        case 'Y': return String(d.getUTCFullYear());
        case 'y': return pad(d.getUTCFullYear() % 100);
        case 'm': return pad(d.getUTCMonth() + 1);
        case 'c': return String(d.getUTCMonth() + 1);
        case 'd': return pad(d.getUTCDate());
        case 'e': return String(d.getUTCDate());
        case 'M': return MONTHS[d.getUTCMonth()];
        case 'b': return MONTHS[d.getUTCMonth()].slice(0, 3);
        case 'W': return DAYS[d.getUTCDay()];
        case 'a': return DAYS[d.getUTCDay()].slice(0, 3);
        case '%': return '%';
        default: return m;
      }
    });
  }

  function mysqlRegex(pat, flags) {
    return new RegExp(String(pat), flags || '');
  }

  // ---- function registration -------------------------------------------------
  function install(db) {
    const f = (name, fn) => db.create_function(name, fn);
    f('IF', (c, a, b) => (c ? a : b));
    f('LEFT', (s, n) => (s === null ? null : String(s).slice(0, Math.max(0, n))));
    f('RIGHT', (s, n) => (s === null ? null : n <= 0 ? '' : String(s).slice(-n)));
    f('CHAR_LENGTH', s => (s === null ? null : [...String(s)].length));
    f('MOD', (a, b) => (a === null || b === null || b === 0 ? null : a % b));
    f('DATEDIFF', (a, b) => {
      const x = toDate(a), y = toDate(b);
      return x && y ? Math.round((x - y) / 86400000) : null;
    });
    f('DATE_ADD', (d, n, u) => addInterval(d, n, u, 1));
    f('DATE_SUB', (d, n, u) => addInterval(d, n, u, -1));
    f('ADDDATE', (d, n, u) => addInterval(d, n, u, 1));
    f('SUBDATE', (d, n, u) => addInterval(d, n, u, -1));
    f('DATE_FORMAT', dateFormat);
    f('YEAR', d => { const x = toDate(d); return x ? x.getUTCFullYear() : null; });
    f('MONTH', d => { const x = toDate(d); return x ? x.getUTCMonth() + 1 : null; });
    f('DAY', d => { const x = toDate(d); return x ? x.getUTCDate() : null; });
    f('DAYOFMONTH', d => { const x = toDate(d); return x ? x.getUTCDate() : null; });
    f('DAYOFWEEK', d => { const x = toDate(d); return x ? x.getUTCDay() + 1 : null; });
    f('DAYNAME', d => { const x = toDate(d); return x ? DAYS[x.getUTCDay()] : null; });
    f('MONTHNAME', d => { const x = toDate(d); return x ? MONTHS[x.getUTCMonth()] : null; });
    f('LAST_DAY', d => { const x = toDate(d); return x ? fmt(new Date(Date.UTC(x.getUTCFullYear(), x.getUTCMonth() + 1, 0))) : null; });
    f('CURDATE', () => fmt(new Date()));
    f('REGEXP', (p, s) => (p === null || s === null ? null : mysqlRegex(p).test(String(s)) ? 1 : 0));
    f('REGEXP_LIKE', (s, p, m) => {
      if (p === null || s === null) return null;
      const fl = m && String(m).includes('i') ? 'i' : '';
      return mysqlRegex(p, fl).test(String(s)) ? 1 : 0;
    });
    f('REGEXP_REPLACE', (s, p, r) => (s === null ? null : String(s).replace(mysqlRegex(p, 'g'), r)));
    f('SUBSTRING_INDEX', (s, delim, count) => {
      if (s === null) return null;
      const parts = String(s).split(delim);
      return count > 0 ? parts.slice(0, count).join(delim) : parts.slice(count).join(delim);
    });
    f('LOCATE', (sub, s) => (s === null ? null : String(s).indexOf(sub) + 1));
    f('LPAD', (s, n, p) => (s === null ? null : String(s).padStart(n, p).slice(0, n)));
    f('RPAD', (s, n, p) => (s === null ? null : String(s).padEnd(n, p).slice(0, n)));
    f('REVERSE', s => (s === null ? null : [...String(s)].reverse().join('')));
    f('CONCAT_WS', function () {
      const a = [...arguments];
      const sep = a.shift();
      return a.filter(x => x !== null).join(sep);
    });
    f('POWER', (a, b) => Math.pow(a, b));
    f('POW', (a, b) => Math.pow(a, b));
    f('SQRT', a => Math.sqrt(a));
    f('CEIL', a => Math.ceil(a));
    f('CEILING', a => Math.ceil(a));
    f('FLOOR', a => Math.floor(a));
    f('TRUNCATE', (a, d) => { const k = Math.pow(10, d || 0); return Math.trunc(a * k) / k; });
  }

  root.SQLCompat = { rewrite, install };
})(typeof window !== 'undefined' ? window : globalThis);
