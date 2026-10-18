# SQL Syntax · SQL语言

An interactive, bilingual (English / 中文) Progressive Web App for learning SQL. Its structure follows the
[LeetCode Top SQL 50](https://leetcode.com/studyplan/top-sql-50/) study plan.

**Live app:** https://bryanwoo988.github.io/Learn-SQL/

## Features
- **7 lessons**, one per study-plan topic: Select, Basic Joins, Aggregates, Sorting & Grouping, Advanced Select & Joins, Subqueries, and String/Regex/Clause. Every example can be edited and run, and each lesson ends with a short quiz.
- **50 practice problems** with sample tables, a syntax-highlighted editor, Run / Submit, progressive hints, a reference solution with explanation, and a link to the original LeetCode problem. Answers are checked against the expected output; some problems also have hidden edge cases.
- **Playground**: a free SQL sandbox over a sample company database.
- **Settings** (gear icon): language, System/Light/Dark mode with 4 light and 4 dark themes, QR code and share link, install, version and update history.
- New versions are offered with an "Update now" bar, and the changes are shown once after updating.
- Progress, drafts, language and theme are saved locally.
- **Works offline**: the PWA can be installed, and SQLite runs in the browser through [sql.js](https://github.com/sql-js/sql.js) (WebAssembly). Nothing is sent to a server.

## Engine notes
LeetCode uses MySQL; this app uses SQLite with a MySQL compatibility layer (`js/sqlcompat.js`). That layer handles:
decimal `/`, `IF`, `DATEDIFF`, `DATE_ADD/DATE_SUB … INTERVAL`, `DATE_FORMAT`, `LEFT/RIGHT`, `CHAR_LENGTH`, `MOD`, `REGEXP`,
and `GROUP_CONCAT … SEPARATOR`. These are not supported: multi-table `DELETE`, parenthesised `UNION` members, and `@variables`.

Problem statements and data are written for this app; they are not copied from LeetCode.

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
Any static host works (GitHub Pages: Settings → Pages → deploy from branch, root folder).

## Releasing
Add an entry to the top of `js/releases.js`, set the same `VERSION` in `sw.js`, then run `node tools/check-release.mjs`. See `CLAUDE.md`.

## Structure
| Path | Purpose |
|---|---|
| `index.html`, `css/style.css` | App shell and styles |
| `js/app.js` | Router, views, editor, answer checker, progress |
| `js/problems.js` | 50 problems (bilingual) |
| `js/lessons.js` | Lessons, quizzes, demo database |
| `js/sqlcompat.js` | MySQL → SQLite compatibility |
| `js/releases.js`, `js/whatsnew.js` | Release notes and the shared what's-new / update bar |
| `js/icons.js`, `js/qrcode.js` | SVG icons, offline QR encoder |
| `sw.js`, `manifest.webmanifest`, `icons/` | PWA / offline support |
| `tools/check-release.mjs` | Pre-push release check |
| `vendor/` | sql.js 1.10.3 (MIT) |
