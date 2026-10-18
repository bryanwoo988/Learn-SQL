/* Concept lessons (one per study-plan section) and the demo database they run against. */
(function (root) {
  'use strict';
  const T = (en, zh) => ({ en, zh });
  const tbl = (name, cols, rows) => ({ name, cols: cols.split(',').map(c => c.trim().split(/\s+/)), rows });

  const DEMO_DB = [
    tbl('departments', 'id INT, name TEXT', [[1, 'Engineering'], [2, 'Sales'], [3, 'Marketing'], [4, 'HR']]),
    tbl('employees', 'id INT, name TEXT, dept_id INT, manager_id INT, salary INT, hire_date DATE, email TEXT', [
      [1, 'Ava Chen', 1, null, 12000, '2019-03-15', 'ava.chen@corp.com'],
      [2, 'Ben Lim', 1, 1, 8500, '2020-07-01', 'ben@corp.com'],
      [3, 'Chloe Tan', 1, 1, 9200, '2021-01-10', 'chloe.tan@corp.com'],
      [4, 'Daniel Wong', 2, null, 9800, '2018-11-20', 'daniel@corp.com'],
      [5, 'Emma Lee', 2, 4, 6200, '2022-05-03', 'emma.lee@corp'],
      [6, 'Farid Rahman', 2, 4, 6200, '2023-02-14', 'farid@corp.com'],
      [7, 'Grace Ng', 3, null, 7600, '2020-09-30', null],
      [8, 'Henry Ho', null, 1, 5000, '2024-01-08', 'henry.ho@corp.com']]),
    tbl('products', 'id INT, name TEXT, category TEXT, price INT', [
      [1, 'Laptop', 'Electronics', 3500], [2, 'Mouse', 'Electronics', 80], [3, 'Desk', 'Furniture', 600],
      [4, 'Chair', 'Furniture', 450], [5, 'Notebook', 'Stationery', 12], [6, 'Pen', 'Stationery', 3]]),
    tbl('orders', 'id INT, customer TEXT, product_id INT, qty INT, order_date DATE', [
      [1, 'alice', 1, 1, '2024-01-05'], [2, 'bob', 2, 2, '2024-01-05'], [3, 'alice', 5, 10, '2024-01-06'],
      [4, 'carol', 3, 1, '2024-01-08'], [5, 'bob', 1, 1, '2024-02-01'], [6, 'dave', 6, 20, '2024-02-02'],
      [7, 'alice', 4, 2, '2024-02-10'], [8, 'carol', 2, 1, '2024-02-11'], [9, 'erin', 5, 5, '2024-02-11'], [10, 'bob', 6, 5, '2024-03-01']])
  ];

  const L = {};

  L.select = {
    intro: T('SQL (Structured Query Language) asks questions of tables. A table has <b>columns</b> (fields) and <b>rows</b> (records). Every example below runs on a real in-browser database — edit it and press <b>Run</b>.',
      'SQL（结构化查询语言）用来向表"提问"。表由<b>列</b>（字段）和<b>行</b>（记录）组成。下面每个例子都运行在浏览器内的真实数据库上——可以修改后点击<b>运行</b>。'),
    cards: [
      { title: T('SELECT … FROM', 'SELECT … FROM'), body: T('Pick columns from a table. <code>*</code> means all columns.', '从表中选择列。<code>*</code> 表示所有列。'), sql: 'SELECT name, salary\nFROM employees;' },
      { title: T('Aliases with AS', '用 AS 起别名'), body: T('Rename output columns or tables. Expressions can be computed on the fly.', '重命名输出列或表。可以即时计算表达式。'), sql: 'SELECT name AS employee, salary * 12 AS yearly_salary\nFROM employees;' },
      { title: T('WHERE filters rows', 'WHERE 过滤行'), body: T('Comparison operators: <code>= &lt;&gt; &lt; &gt; &lt;= &gt;=</code>. Combine with <code>AND</code>, <code>OR</code>, <code>NOT</code>.', '比较运算符：<code>= &lt;&gt; &lt; &gt; &lt;= &gt;=</code>。用 <code>AND</code>、<code>OR</code>、<code>NOT</code> 组合。'), sql: "SELECT name, dept_id, salary\nFROM employees\nWHERE dept_id = 1 AND salary > 9000;" },
      { title: T('NULL needs IS NULL', 'NULL 要用 IS NULL'), body: T('NULL means "unknown". <code>x = NULL</code> is never true — use <code>IS NULL</code> / <code>IS NOT NULL</code>. Try changing the query to <code>manager_id &lt;&gt; 1</code> and see who disappears.', 'NULL 表示"未知"。<code>x = NULL</code> 永远不为真——要用 <code>IS NULL</code> / <code>IS NOT NULL</code>。试着改成 <code>manager_id &lt;&gt; 1</code>，看看谁消失了。'), sql: 'SELECT name, manager_id\nFROM employees\nWHERE manager_id IS NULL;' },
      { title: T('DISTINCT, IN, BETWEEN', 'DISTINCT、IN、BETWEEN'), body: T('<code>DISTINCT</code> removes duplicates. <code>IN (…)</code> matches a list. <code>BETWEEN a AND b</code> is inclusive.', '<code>DISTINCT</code> 去重。<code>IN (…)</code> 匹配列表中任一值。<code>BETWEEN a AND b</code> 包含两端。'), sql: "SELECT DISTINCT customer\nFROM orders\nWHERE product_id IN (1, 2)\n  AND order_date BETWEEN '2024-01-01' AND '2024-01-31';" },
      { title: T('String length', '字符串长度'), body: T('<code>LENGTH()</code> returns the number of characters in SQLite (bytes in MySQL; use <code>CHAR_LENGTH()</code> there).', '<code>LENGTH()</code> 在 SQLite 中返回字符数（MySQL 中为字节数，那里应使用 <code>CHAR_LENGTH()</code>）。'), sql: 'SELECT name, LENGTH(name) AS len\nFROM employees\nWHERE LENGTH(name) > 9;' }
    ],
    quiz: [
      { q: T('Which query returns employees with no manager?', '哪个查询返回没有经理的员工？'), options: ['WHERE manager_id = NULL', 'WHERE manager_id IS NULL', "WHERE manager_id = ''", 'WHERE NOT manager_id'], answer: 1, why: T('Comparisons with NULL yield UNKNOWN; only IS NULL tests for NULL.', '与 NULL 比较结果为 UNKNOWN；只有 IS NULL 能判断空值。') },
      { q: T('<code>BETWEEN 10 AND 20</code> includes…', '<code>BETWEEN 10 AND 20</code> 包含……'), options: [T('10 and 20', '10 和 20'), T('neither 10 nor 20', '不含 10 和 20'), T('only 10', '只含 10'), T('only 20', '只含 20')], answer: 0, why: T('BETWEEN is inclusive on both ends.', 'BETWEEN 两端都包含。') },
      { q: T('What does <code>SELECT DISTINCT dept_id FROM employees</code> do?', '<code>SELECT DISTINCT dept_id FROM employees</code> 做什么？'), options: [T('Counts departments', '统计部门数'), T('Lists each dept_id once', '每个 dept_id 只列一次'), T('Sorts by dept_id', '按 dept_id 排序'), T('Removes NULL dept_id', '去掉为 NULL 的 dept_id')], answer: 1, why: T('DISTINCT removes duplicate rows (NULL is kept as one value).', 'DISTINCT 去除重复行（NULL 作为一个值保留）。') }
    ]
  };

  L.joins = {
    intro: T('Joins combine rows from two tables using a matching condition. The type of join decides what happens to rows <b>without</b> a match.', '连接通过匹配条件组合两张表的行。连接类型决定了<b>没有</b>匹配的行如何处理。'),
    cards: [
      { title: T('INNER JOIN', 'INNER JOIN 内连接'), body: T('Keeps only pairs that match. Henry (no department) disappears.', '只保留能匹配上的行对。Henry（没有部门）会消失。'), sql: 'SELECT e.name, d.name AS department\nFROM employees e\nJOIN departments d ON e.dept_id = d.id;' },
      { title: T('LEFT JOIN', 'LEFT JOIN 左连接'), body: T('Keeps every row of the left table; missing right columns become NULL.', '保留左表所有行；右表缺失的列为 NULL。'), sql: 'SELECT d.name AS department, e.name AS employee\nFROM departments d\nLEFT JOIN employees e ON e.dept_id = d.id;' },
      { title: T('Anti-join: find what is missing', '反连接：找出缺失的'), body: T('<code>LEFT JOIN … WHERE right.id IS NULL</code> finds rows with no match — here, departments with no employees.', '<code>LEFT JOIN … WHERE 右表.id IS NULL</code> 找出没有匹配的行——这里是没有员工的部门。'), sql: 'SELECT d.name\nFROM departments d\nLEFT JOIN employees e ON e.dept_id = d.id\nWHERE e.id IS NULL;' },
      { title: T('Self join', '自连接'), body: T('Join a table to itself with two aliases — e.g. each employee with their manager.', '用两个别名把表和自身连接——例如每个员工和他的经理。'), sql: 'SELECT e.name AS employee, m.name AS manager\nFROM employees e\nJOIN employees m ON e.manager_id = m.id;' },
      { title: T('CROSS JOIN', 'CROSS JOIN 交叉连接'), body: T('Every combination of rows (a Cartesian product). Useful to build "all pairs" before a LEFT JOIN.', '所有行的组合（笛卡尔积）。在 LEFT JOIN 之前构造"所有组合"很有用。'), sql: "SELECT d.name, p.category\nFROM departments d\nCROSS JOIN (SELECT DISTINCT category FROM products) p;" },
      { title: T('Joining on dates', '按日期连接'), body: T('Join conditions can be any expression, e.g. <code>DATEDIFF(a, b) = 1</code> to compare a day with the previous day.', '连接条件可以是任意表达式，如 <code>DATEDIFF(a, b) = 1</code> 用于比较某天和前一天。'), sql: 'SELECT a.order_date, b.order_date AS next_day\nFROM (SELECT DISTINCT order_date FROM orders) a\nJOIN (SELECT DISTINCT order_date FROM orders) b\n  ON DATEDIFF(b.order_date, a.order_date) = 1;' }
    ],
    quiz: [
      { q: T('Which join keeps all rows of the left table?', '哪种连接保留左表的所有行？'), options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'SELF JOIN'], answer: 1, why: T('LEFT JOIN keeps unmatched left rows with NULLs on the right.', 'LEFT JOIN 保留未匹配的左表行，右侧为 NULL。') },
      { q: T('Table A has 3 rows, B has 4. How many rows does <code>A CROSS JOIN B</code> return?', 'A 表 3 行，B 表 4 行。<code>A CROSS JOIN B</code> 返回多少行？'), options: ['3', '4', '7', '12'], answer: 3, why: T('A Cartesian product has 3 × 4 = 12 rows.', '笛卡尔积有 3 × 4 = 12 行。') },
      { q: T('After a LEFT JOIN, <code>COUNT(*)</code> vs <code>COUNT(right.col)</code> for an unmatched left row gives…', 'LEFT JOIN 后，对未匹配的左表行，<code>COUNT(*)</code> 与 <code>COUNT(右表.列)</code> 分别是……'), options: ['1 / 0', '0 / 0', '1 / 1', '0 / 1'], answer: 0, why: T('COUNT(*) counts the row; COUNT(col) skips NULL.', 'COUNT(*) 计算行数；COUNT(列) 跳过 NULL。') }
    ]
  };

  L.aggregate = {
    intro: T('Aggregate functions turn many rows into one value: <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>.', '聚合函数把多行变成一个值：<code>COUNT</code>、<code>SUM</code>、<code>AVG</code>、<code>MIN</code>、<code>MAX</code>。'),
    cards: [
      { title: T('Whole-table aggregates', '整表聚合'), body: T('Without GROUP BY the whole table is one group.', '没有 GROUP BY 时整张表是一个组。'), sql: 'SELECT COUNT(*) AS n, MIN(salary) AS min_sal, MAX(salary) AS max_sal, AVG(salary) AS avg_sal\nFROM employees;' },
      { title: T('COUNT(*) vs COUNT(col)', 'COUNT(*) 与 COUNT(列)'), body: T('<code>COUNT(col)</code> ignores NULL, <code>COUNT(DISTINCT col)</code> counts unique values.', '<code>COUNT(列)</code> 忽略 NULL，<code>COUNT(DISTINCT 列)</code> 统计不同值。'), sql: 'SELECT COUNT(*) AS all_rows, COUNT(email) AS with_email, COUNT(DISTINCT dept_id) AS depts\nFROM employees;' },
      { title: T('ROUND and division', 'ROUND 与除法'), body: T('<code>ROUND(x, 2)</code> keeps two decimals. This app follows MySQL: <code>/</code> always returns a decimal.', '<code>ROUND(x, 2)</code> 保留两位小数。本应用遵循 MySQL：<code>/</code> 总是返回小数。'), sql: 'SELECT ROUND(AVG(salary), 2) AS avg_salary, 7 / 2 AS division\nFROM employees;' },
      { title: T('Conditional aggregation', '条件聚合'), body: T('A comparison is 1 (true) or 0 (false). <code>SUM(cond)</code> counts matches and <code>AVG(cond)</code> gives a ratio. <code>CASE</code> works in any SQL dialect.', '比较表达式为 1（真）或 0（假）。<code>SUM(条件)</code> 统计匹配数，<code>AVG(条件)</code> 得到比例。<code>CASE</code> 适用于所有 SQL 方言。'), sql: "SELECT SUM(salary > 8000) AS high_paid,\n       ROUND(AVG(salary > 8000) * 100, 2) AS pct_high,\n       SUM(CASE WHEN dept_id = 1 THEN salary ELSE 0 END) AS eng_payroll\nFROM employees;" },
      { title: T('IFNULL / COALESCE', 'IFNULL / COALESCE'), body: T('Replace NULL with a default value.', '用默认值替换 NULL。'), sql: "SELECT name, IFNULL(email, 'no email') AS email, COALESCE(dept_id, 0) AS dept\nFROM employees;" },
      { title: T('Dates', '日期'), body: T('<code>DATE_FORMAT(d, \'%Y-%m\')</code> extracts a month; <code>DATEDIFF(a, b)</code> gives days between dates.', '<code>DATE_FORMAT(d, \'%Y-%m\')</code> 提取年月；<code>DATEDIFF(a, b)</code> 计算两个日期相差天数。'), sql: "SELECT name, hire_date,\n       DATE_FORMAT(hire_date, '%Y-%m') AS month,\n       DATEDIFF('2025-01-01', hire_date) AS days_employed\nFROM employees;" }
    ],
    quiz: [
      { q: T('<code>AVG(rating &lt; 3)</code> returns…', '<code>AVG(rating &lt; 3)</code> 返回……'), options: [T('the average of ratings below 3', '低于 3 的评分平均值'), T('the fraction of rows with rating &lt; 3', 'rating &lt; 3 的行所占比例'), T('an error', '错误'), T('the count of ratings below 3', '低于 3 的评分个数')], answer: 1, why: T('The condition is 1 or 0 per row; its mean is the fraction.', '条件在每行为 1 或 0；其平均值就是比例。') },
      { q: T('Which ignores NULL values?', '哪个会忽略 NULL 值？'), options: ['COUNT(*)', 'COUNT(col)', T('both', '都会'), T('neither', '都不会')], answer: 1, why: T('COUNT(*) counts rows; COUNT(col) counts non-NULL values.', 'COUNT(*) 统计行数；COUNT(列) 统计非 NULL 值。') },
      { q: T('<code>MAX(x)</code> on zero rows returns…', '对 0 行求 <code>MAX(x)</code> 返回……'), options: ['0', 'NULL', T('no row', '没有行'), T('an error', '错误')], answer: 1, why: T('Aggregates without GROUP BY always return one row; MAX of nothing is NULL.', '不带 GROUP BY 的聚合总是返回一行；空集的 MAX 为 NULL。') }
    ]
  };

  L.grouping = {
    intro: T('<code>GROUP BY</code> splits rows into groups and computes aggregates per group. <code>HAVING</code> filters groups; <code>ORDER BY</code> sorts; <code>LIMIT</code> caps the result.', '<code>GROUP BY</code> 把行分组并对每组计算聚合。<code>HAVING</code> 过滤分组；<code>ORDER BY</code> 排序；<code>LIMIT</code> 限制行数。'),
    cards: [
      { title: T('GROUP BY', 'GROUP BY 分组'), body: T('One output row per group.', '每组输出一行。'), sql: 'SELECT dept_id, COUNT(*) AS headcount, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY dept_id;' },
      { title: T('HAVING vs WHERE', 'HAVING 与 WHERE'), body: T('WHERE filters rows <i>before</i> grouping; HAVING filters groups <i>after</i>.', 'WHERE 在分组<i>之前</i>过滤行；HAVING 在分组<i>之后</i>过滤组。'), sql: 'SELECT customer, SUM(qty) AS total_qty\nFROM orders\nWHERE order_date >= \'2024-01-01\'\nGROUP BY customer\nHAVING COUNT(*) >= 2;' },
      { title: T('ORDER BY and LIMIT', 'ORDER BY 与 LIMIT'), body: T('Sort by several keys; <code>DESC</code> for descending. <code>LIMIT n OFFSET k</code> skips k rows.', '可按多个键排序；<code>DESC</code> 表示降序。<code>LIMIT n OFFSET k</code> 跳过 k 行。'), sql: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC, name\nLIMIT 3;' },
      { title: T('Logical execution order', '逻辑执行顺序'), body: T('<b>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT</b>. That is why a SELECT alias usually can\'t be used in WHERE.', '<b>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT</b>。所以 SELECT 中的别名通常不能在 WHERE 中使用。'), sql: "SELECT p.category, SUM(o.qty * p.price) AS revenue\nFROM orders o JOIN products p ON o.product_id = p.id\nGROUP BY p.category\nHAVING revenue > 100\nORDER BY revenue DESC;" },
      { title: T('Group by several columns', '按多列分组'), body: T('Each distinct combination is a group.', '每种不同的组合是一个组。'), sql: "SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, customer, COUNT(*) AS orders\nFROM orders\nGROUP BY month, customer\nORDER BY month, customer;" }
    ],
    quiz: [
      { q: T('Where can you filter on <code>COUNT(*) &gt; 5</code>?', '在哪里可以过滤 <code>COUNT(*) &gt; 5</code>？'), options: ['WHERE', 'HAVING', 'ORDER BY', 'FROM'], answer: 1, why: T('Aggregates exist only after grouping, so use HAVING.', '聚合值在分组后才存在，所以要用 HAVING。') },
      { q: T('Which runs first logically?', '逻辑上哪个先执行？'), options: ['SELECT', 'ORDER BY', 'WHERE', 'HAVING'], answer: 2, why: T('FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.', 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY。') },
      { q: T('<code>LIMIT 1 OFFSET 1</code> returns…', '<code>LIMIT 1 OFFSET 1</code> 返回……'), options: [T('the first row', '第一行'), T('the second row', '第二行'), T('two rows', '两行'), T('no rows', '没有行')], answer: 1, why: T('OFFSET 1 skips one row, LIMIT 1 takes the next.', 'OFFSET 1 跳过一行，LIMIT 1 取下一行。') }
    ]
  };

  L.advanced = {
    intro: T('Combine the basics: CASE expressions, UNION, multi-way self joins and window functions.', '组合基础知识：CASE 表达式、UNION、多重自连接和窗口函数。'),
    cards: [
      { title: T('CASE WHEN', 'CASE WHEN'), body: T('If/else inside a query. Conditions are checked top-down; the first true branch wins.', '查询中的 if/else。条件从上到下检查，第一个为真的分支生效。'), sql: "SELECT name, salary,\n       CASE WHEN salary >= 9000 THEN 'High'\n            WHEN salary >= 7000 THEN 'Mid'\n            ELSE 'Low' END AS band\nFROM employees;" },
      { title: T('UNION vs UNION ALL', 'UNION 与 UNION ALL'), body: T('Stack result sets. <code>UNION</code> removes duplicates, <code>UNION ALL</code> keeps them (and is faster).', '纵向拼接结果集。<code>UNION</code> 去重，<code>UNION ALL</code> 保留重复（且更快）。'), sql: "SELECT 'High' AS band, COUNT(*) AS n FROM employees WHERE salary >= 9000\nUNION ALL\nSELECT 'Mid', COUNT(*) FROM employees WHERE salary >= 7000 AND salary < 9000\nUNION ALL\nSELECT 'Low', COUNT(*) FROM employees WHERE salary < 7000;" },
      { title: T('Window functions: running total', '窗口函数：累计和'), body: T('<code>SUM(x) OVER (ORDER BY …)</code> computes a running total while keeping every row.', '<code>SUM(x) OVER (ORDER BY …)</code> 计算累计和，同时保留每一行。'), sql: 'SELECT id, order_date, qty,\n       SUM(qty) OVER (ORDER BY id) AS running_qty\nFROM orders;' },
      { title: T('PARTITION BY', 'PARTITION BY 分区'), body: T('Restart the window per group, like GROUP BY without collapsing rows.', '按组重新开始窗口计算，类似不合并行的 GROUP BY。'), sql: 'SELECT name, dept_id, salary,\n       AVG(salary) OVER (PARTITION BY dept_id) AS dept_avg\nFROM employees;' },
      { title: T('LAG / LEAD', 'LAG / LEAD'), body: T('Look at the previous/next row — handy for "consecutive" problems.', '查看前一行/后一行——处理"连续"问题非常方便。'), sql: 'SELECT id, customer,\n       LAG(customer) OVER (ORDER BY id) AS prev_customer,\n       LEAD(customer) OVER (ORDER BY id) AS next_customer\nFROM orders;' }
    ],
    quiz: [
      { q: T('Which keeps duplicate rows?', '哪个会保留重复行？'), options: ['UNION', 'UNION ALL', 'DISTINCT', 'INTERSECT'], answer: 1, why: T('UNION ALL does not deduplicate.', 'UNION ALL 不去重。') },
      { q: T('A window function with PARTITION BY…', '带 PARTITION BY 的窗口函数……'), options: [T('collapses each group to one row', '把每组合并为一行'), T('keeps all rows and computes per group', '保留所有行并按组计算'), T('sorts the output', '对输出排序'), T('removes NULLs', '去掉 NULL')], answer: 1, why: T('Unlike GROUP BY, window functions keep every row.', '与 GROUP BY 不同，窗口函数保留所有行。') },
      { q: T('In <code>CASE WHEN a THEN 1 WHEN b THEN 2 END</code>, if both a and b are true the result is…', '在 <code>CASE WHEN a THEN 1 WHEN b THEN 2 END</code> 中，若 a 和 b 都为真，结果是……'), options: ['1', '2', 'NULL', T('an error', '错误')], answer: 0, why: T('The first matching branch wins.', '第一个匹配的分支生效。') }
    ]
  };

  L.subqueries = {
    intro: T('A subquery is a query inside another query. It can return one value (scalar), a list (for IN), or a whole table (in FROM). CTEs (<code>WITH</code>) name subqueries for readability.', '子查询是嵌套在另一个查询中的查询。它可以返回单个值（标量）、一个列表（用于 IN）或一整张表（在 FROM 中）。CTE（<code>WITH</code>）给子查询命名，提升可读性。'),
    cards: [
      { title: T('Scalar subquery', '标量子查询'), body: T('Returns a single value — compare each row with the overall average.', '返回单个值——把每一行与整体平均值比较。'), sql: 'SELECT name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);' },
      { title: T('IN / NOT IN subquery', 'IN / NOT IN 子查询'), body: T('Test membership in a list produced by a query. Careful: <code>NOT IN</code> with a NULL in the list matches nothing — remove <code>WHERE dept_id IS NOT NULL</code> and see.', '判断是否属于子查询生成的列表。注意：如果列表中有 NULL，<code>NOT IN</code> 什么也匹配不到——删掉 <code>WHERE dept_id IS NOT NULL</code> 试试看。'), sql: 'SELECT name\nFROM departments\nWHERE id NOT IN (SELECT dept_id FROM employees WHERE dept_id IS NOT NULL);' },
      { title: T('Derived table', '派生表'), body: T('A subquery in FROM acts like a temporary table and must have an alias.', 'FROM 中的子查询相当于临时表，必须有别名。'), sql: 'SELECT customer, total\nFROM (\n  SELECT customer, SUM(qty) AS total\n  FROM orders GROUP BY customer\n) t\nWHERE total > 10;' },
      { title: T('WITH (CTE)', 'WITH（公用表表达式）'), body: T('Name a subquery once, use it below — clearer than nesting.', '先给子查询命名，再在下面使用——比层层嵌套更清晰。'), sql: 'WITH dept_stats AS (\n  SELECT dept_id, MAX(salary) AS top\n  FROM employees GROUP BY dept_id\n)\nSELECT e.name, e.dept_id, e.salary\nFROM employees e\nJOIN dept_stats s ON e.dept_id = s.dept_id AND e.salary = s.top;' },
      { title: T('Ranking: ROW_NUMBER, RANK, DENSE_RANK', '排名：ROW_NUMBER、RANK、DENSE_RANK'), body: T('Notice how the two 6200 salaries are ranked by each function.', '注意两个 6200 的工资在不同函数下的排名。'), sql: 'SELECT name, salary,\n       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,\n       RANK()       OVER (ORDER BY salary DESC) AS rnk,\n       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense\nFROM employees;' },
      { title: T('Tuple IN', '多列 IN'), body: T('<code>(a, b) IN (SELECT …)</code> is perfect for "first/latest row per group".', '<code>(a, b) IN (SELECT …)</code> 非常适合"每组第一条/最新一条"。'), sql: 'SELECT *\nFROM orders\nWHERE (customer, order_date) IN (\n  SELECT customer, MIN(order_date) FROM orders GROUP BY customer\n);' }
    ],
    quiz: [
      { q: T('A subquery in FROM must…', 'FROM 中的子查询必须……'), options: [T('return one row', '只返回一行'), T('have an alias', '有别名'), T('use GROUP BY', '使用 GROUP BY'), T('be a CTE', '是 CTE')], answer: 1, why: T('Derived tables need an alias (MySQL requires it).', '派生表需要别名（MySQL 强制要求）。') },
      { q: T('Salaries 90, 85, 85, 70. DENSE_RANK of 70 is…', '工资为 90、85、85、70。70 的 DENSE_RANK 是……'), options: ['2', '3', '4', '1'], answer: 1, why: T('DENSE_RANK: 1, 2, 2, 3 — no gaps.', 'DENSE_RANK：1、2、2、3——不跳号。') },
      { q: T('If <code>(SELECT … LIMIT 1 OFFSET 1)</code> finds no row, as a scalar subquery it returns…', '如果 <code>(SELECT … LIMIT 1 OFFSET 1)</code> 没有结果，作为标量子查询它返回……'), options: ['0', 'NULL', T('an error', '错误'), T('an empty string', '空字符串')], answer: 1, why: T('An empty scalar subquery evaluates to NULL.', '空的标量子查询结果为 NULL。') }
    ]
  };

  L.strings = {
    intro: T('Text processing, pattern matching and data-changing statements.', '文本处理、模式匹配和修改数据的语句。'),
    cards: [
      { title: T('UPPER, LOWER, SUBSTRING, CONCAT', 'UPPER、LOWER、SUBSTRING、CONCAT'), body: T('<code>SUBSTRING(s, start, len)</code> is 1-based. <code>LEFT(s, n)</code> / <code>RIGHT(s, n)</code> take the ends.', '<code>SUBSTRING(s, 起点, 长度)</code> 从 1 开始计数。<code>LEFT(s, n)</code> / <code>RIGHT(s, n)</code> 取两端。'), sql: "SELECT name,\n       UPPER(name) AS up,\n       LEFT(name, 1) AS initial,\n       CONCAT(LOWER(SUBSTRING(name, 1, 3)), '***') AS masked\nFROM employees;" },
      { title: T('LIKE patterns', 'LIKE 模式匹配'), body: T('<code>%</code> = any number of characters, <code>_</code> = exactly one.', '<code>%</code> = 任意个字符，<code>_</code> = 恰好一个字符。'), sql: "SELECT name\nFROM employees\nWHERE name LIKE '% L%' OR name LIKE '_r%';" },
      { title: T('REGEXP', 'REGEXP 正则表达式'), body: T('Regular expressions for stricter rules. <code>^</code> start, <code>$</code> end, <code>[a-z]</code> class, <code>*</code> zero or more.', '用正则表达式描述更严格的规则。<code>^</code> 开头，<code>$</code> 结尾，<code>[a-z]</code> 字符类，<code>*</code> 零次或多次。'), sql: "SELECT name, email,\n       email REGEXP '^[a-z][a-z.]*@corp[.]com$' AS valid\nFROM employees;" },
      { title: T('GROUP_CONCAT', 'GROUP_CONCAT 拼接'), body: T('Aggregate strings of a group into one list.', '把一组中的字符串聚合成一个列表。'), sql: "SELECT category,\n       GROUP_CONCAT(name ORDER BY name SEPARATOR ', ') AS items\nFROM products\nGROUP BY category;" },
      { title: T('Changing data: INSERT, UPDATE, DELETE', '修改数据：INSERT、UPDATE、DELETE'), body: T('Each run starts from a fresh copy of the data, so experiment freely.', '每次运行都从全新的数据副本开始，可以放心尝试。'), sql: "DELETE FROM orders WHERE customer = 'bob';\nUPDATE products SET price = price * 2 WHERE category = 'Stationery';\nINSERT INTO departments VALUES (5, 'Legal');\nSELECT * FROM products;" },
      { title: T('Second highest with OFFSET', '用 OFFSET 求第二高'), body: T('Wrap in a scalar subquery so "no second value" becomes NULL instead of no rows.', '包在标量子查询里，这样"不存在第二高"时返回 NULL 而不是空结果。'), sql: 'SELECT (\n  SELECT DISTINCT salary FROM employees\n  ORDER BY salary DESC LIMIT 1 OFFSET 1\n) AS second_highest;' }
    ],
    quiz: [
      { q: T("Which pattern matches 'DIAB100' only at the start of a word in 'ACNE DIAB100'?", "哪个模式能匹配 'ACNE DIAB100' 中位于单词开头的 'DIAB100'？"), options: ["LIKE 'DIAB1%'", "LIKE '%DIAB1%'", "LIKE '% DIAB1%'", "LIKE '_DIAB1%'"], answer: 2, why: T("'% DIAB1%' requires a space before the code; '%DIAB1%' would also match 'SADIAB100'.", "'% DIAB1%' 要求代码前有空格；'%DIAB1%' 也会匹配 'SADIAB100'。") },
      { q: T("<code>SUBSTRING('hello', 2)</code> returns…", "<code>SUBSTRING('hello', 2)</code> 返回……"), options: ["'hello'", "'ello'", "'llo'", "'he'"], answer: 1, why: T('Positions are 1-based; start at the 2nd character.', '位置从 1 开始；从第 2 个字符开始截取。') },
      { q: T('What does <code>$</code> mean in a regular expression?', '正则表达式中 <code>$</code> 表示什么？'), options: [T('any character', '任意字符'), T('end of string', '字符串结尾'), T('a literal dollar', '字面量美元符'), T('start of string', '字符串开头')], answer: 1, why: T('$ anchors the match to the end of the string.', '$ 把匹配锚定在字符串结尾。') }
    ]
  };

  root.SQL_DEMO_DB = DEMO_DB;
  root.SQL_LESSONS = L;
})(typeof window !== 'undefined' ? window : globalThis);
